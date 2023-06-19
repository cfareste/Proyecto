import Head from "next/head"
import Link from "next/link";
import config from "@/config/config.js";
import Header from "@/components/Header"
import styles from '@/styles/course/course.module.css';
import CourseInfo from "@/components/CourseInfo";
import { Fragment } from "react";
import Unit from "@/components/Unit";
import calculateTotalLessons from "@/utils/calculateTotalLessons";
import router from 'next/router';

export default function Course(props) {
    const areThereUnits = Object.keys(props.units).length != 0;
    const totalLessons = calculateTotalLessons(props.lessonsByUnit);

    function handleClick () {
        let lessonID = Object.keys(
            Object.values(props.lessonsByUnit)[0]
        )[0];
        
        router.push(`/lesson/${lessonID}`)
    }

    return (
        <>
            <Head>
                <title>{`${props.course.title} (${props.course.year})`}</title>
                <meta name="description" content="Curso de la web" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header userName={props.user.name} userSurnames={props.user.surnames} userEmail={props.user.email} userImagePath={props.user.imagePath}></Header>
            <main className={styles.contentWrapper}>
                <section className={styles.container}>
                    <Link className={styles.link} href={'/home'}>&lt; Volver al home</Link>
                    <CourseInfo title={props.course.title}
                                description={props.course.description}
                                imagePath={props.course.imagePath}
                                totalLessons={totalLessons}
                                onClick={handleClick}></CourseInfo>
                    <section className={styles.lessons}>
                        {areThereUnits ? ( 
                            Object.keys(props.units).map(unitID => (
                                <Fragment key={unitID}>
                                    <Unit title={props.units[unitID].title}
                                            lessons={props.lessonsByUnit[unitID]}
                                            noLessonsMessage={'Esta unidad no cuenta con lecciones por el momento'}></Unit>
                                </Fragment>
                            ))
                        ) : (
                            <p className={styles.message}>Aún no hay contenido para este curso</p>
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.sessionToken;
    const userID = context.req.cookies.userID;
    const { courseID } = context.query;
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

    const courseResponse = await fetch(`${config.backend_url}/api/courses/${courseID}`, fetchInfo)
        .then(response => {
            if (response.status === 404) return { ok: false, redirect: true }
            return response.json();
        });

    if (!courseResponse.ok && courseResponse.redirect) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    const unitResponse = await fetch(`${config.backend_url}/api/units/all/${courseID}`, fetchInfo)
        .then(response => response.json());

    const lessonsByUnit = unitResponse.units != null && Object.assign(
        {}, ...await Promise.all(
            Object.keys(unitResponse.units).map(async (unitID) => {
                const lessonResponse = await fetch(`${config.backend_url}/api/lessons/all/${unitID}`, fetchInfo)
                .then(response => response.json());

                const unitLessons = lessonResponse.lessons;

                const lessonsProgress = Object.assign(
                    {}, ...await Promise.all(
                        Object.keys(unitLessons).map(async (lessonID) => {
                            const lessonProgressResponse = await fetch(`${config.backend_url}/api/lessons/relation/${lessonID}/${userID}`, fetchInfo)
                                .then(async response => {
                                    if (response.status === 404) return { lessonUserRelation: { progress: -1 } };
            
                                    return response.json();
                                });
                            return {
                                [lessonID]: {
                                    ...lessonProgressResponse.lessonUserRelation
                                }
                            }
                        })
                    )
                )

                const unitLessonsWithProgress = Object.keys(unitLessons).reduce((lastObj, lessonID) => {
                    const progress = lessonsProgress[lessonID].progress;
                    return {
                        ...lastObj,
                        [lessonID]: {
                            ...unitLessons[lessonID],
                            progress: progress
                        } 
                    }
                }, {});

                return {
                    [unitID]: {
                        ...unitLessonsWithProgress
                    }
                }
            })
        )
    )

    return {
        props: {
            user: userResponse.userInfo,
            course: courseResponse.courseInfo,
            units: { ...unitResponse.units },
            lessonsByUnit: lessonsByUnit
        }
    }
}