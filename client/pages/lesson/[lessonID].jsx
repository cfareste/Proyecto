import config from "@/config/config";
import styles from '@/styles/lesson/lesson.module.css';
import router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Exercise from "@/components/Exercise";
import ProgressBar from "@/components/ProgressBar";
import { useState, Fragment, useEffect } from "react";
import { calculateIndex, calculateProgress } from "@/utils/lessonCalcs";
import getSessionToken from "@/utils/getSessionToken";
import parseContent from "@/utils/parseLessonContent";
import getKatexFormula from "@/katexData/katexData";
import createLessonRelation from "@/services/createLessonRelation";
import createExercisesRelation from "@/services/createExercisesRelation";
import updateLessonRelation from "@/services/updateLessonRelation";
import updateExercisesRelation from "@/services/updateExercisesRelation";
import restartLessonRelation from "@/services/restartLessonRelation";
import restartExercisesRelation from "@/services/restartExercisesRelation";
import katex from "katex";

export default function Lesson(props){
    console.log(props.lesson, props.exercises)
    const [lessonProgress, setLessonProgress] = useState(props.lesson.progress);
    const lessonParts = props.lesson.content.split('\n');
    const index = calculateIndex(lessonProgress, lessonParts.length);
    const exerciseIndexes = props.exercises != null ? Object.keys(props.exercises) : null;

    function handleResolve(exerciseID, completed, isCorrect) {
        let newProgress = calculateProgress(index, lessonParts.length);
        let token = getSessionToken(document.cookie.split('; '));
    
        if (!token) router.push('/login');
    
        updateLessonRelation(props.lesson.ID, props.user.ID, token, newProgress);
        updateExercisesRelation(exerciseID, props.user.ID, token, completed, isCorrect);
    
        setLessonProgress(newProgress);
    }

    useEffect(() => {
        const katexElements = Array.from(document.getElementsByClassName(styles['katex']));
        
        if (katexElements.length != 0) {
            katexElements.map(element => {
                let katexFormula = getKatexFormula(element.getAttribute('name'));
                katex.render(katexFormula, element)
            })
        }

        const eraseKatexElements = Array.from(document.getElementsByClassName('katex-html'))
        eraseKatexElements.map(element => element.remove())
    }, [lessonProgress])

    return (
        <>
            <Head>
                <title>{props.lesson.title}</title>
                <meta name="description" content="Lección de la web" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.contentWrapper}>
                <section className={styles.container}>
                    <header className={styles.header}>
                        <Link className={styles.link} href={`/course/${props.lesson.courseID}`}>
                            <ion-icon class={styles.icon} name="close-outline"></ion-icon>
                        </Link>
                        <ProgressBar progress={lessonProgress} margin={true}></ProgressBar>
                    </header>
                    <section className={styles.lessonContainer}>
                        <h2 className={styles.title}>{props.lesson.title}</h2>
                        {lessonParts.slice(0, index).map((part, idx) => (
                            <Fragment key={idx}>
                                <section className={styles.lesson} dangerouslySetInnerHTML={{__html: part}}/>
                                {props.exercises !== null && <Exercise ID={props.exercises[exerciseIndexes[idx]].ID}
                                            type={props.exercises[exerciseIndexes[idx]].type}
                                            question={props.exercises[exerciseIndexes[idx]].question}
                                            details={props.exercises[exerciseIndexes[idx]].details}
                                            options={props.exercises[exerciseIndexes[idx]].options}
                                            answer={props.exercises[exerciseIndexes[idx]].answer}
                                            completed={props.exercises[exerciseIndexes[idx]].completed}
                                            correct={props.exercises[exerciseIndexes[idx]].isCorrect}
                                            onResolve={handleResolve}/>}
                            </Fragment>
                        ))}
                        {lessonProgress === 100 && (
                            <Link className={styles.return} href={`/course/${props.lesson.courseID}`}>Terminar lección</Link>
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const { lessonID } = context.query;
    const token = context.req.cookies.sessionToken;
    const userID = context.req.cookies.userID;
    const fetchInfo = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    if (!token) {
        return {
            redirect: {
              destination: '/login',
              permanent: false
            }
        };
    }

    const userResponse = await fetch(`${config.backend_url}/api/users/${userID}`, fetchInfo)
        .then(response => response.json());

    if (!userResponse.ok) {
        return {
            redirect: {
              destination: '/login',
              permanent: false
            }
        };
    }

    const lessonResponse = await fetch(`${config.backend_url}/api/lessons/${lessonID}`, fetchInfo)
        .then(response => {
            if (response.status === 404) return { ok: false, redirect: true }
            return response.json();
        });

    if (!lessonResponse.ok && lessonResponse.redirect) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    const lessonProgressResponse = await fetch(`${config.backend_url}/api/lessons/relation/${lessonID}/${userID}`, fetchInfo)
        .then(async response => {
            if (response.status === 404) createLessonRelation(lessonID, userID, token);

            return await fetch(`${config.backend_url}/api/lessons/relation/${lessonID}/${userID}`, fetchInfo)
                .then(response => response.json());

        });
    
    const exercisesResponse = await fetch(`${config.backend_url}/api/exercises/all/${lessonID}/${userID}`, fetchInfo)
        .then(async response => {
            if (response.status === 404) {
                let message = await response.json();
                if (message.details === 'noExercises') return null;
                createExercisesRelation(lessonID, userID, token)
            };

            return await fetch(`${config.backend_url}/api/exercises/all/${lessonID}/${userID}`, fetchInfo)
                .then(response => response.json());
        });    

    if (lessonProgressResponse.lessonUserRelation.progress === 100) {
        restartLessonRelation(lessonID, userID, token);
        restartExercisesRelation(lessonID, userID, token);

        lessonProgressResponse.lessonUserRelation.progress = 0;
        Object.keys(exercisesResponse.exercises).map(exerciseID => {
            exercisesResponse.exercises[exerciseID].completed = exercisesResponse.exercises[exerciseID].isCorrect = 0;
        }) 
    }

    lessonResponse.lessonInfo.content = parseContent(lessonResponse.lessonInfo.content, styles)

    return {
        props: {
            user: userResponse.userInfo,
            lesson: {
                ...lessonResponse.lessonInfo,
                progress: lessonProgressResponse.lessonUserRelation.progress,
            },
            exercises: exercisesResponse ? exercisesResponse.exercises : null
        }
    }

} 