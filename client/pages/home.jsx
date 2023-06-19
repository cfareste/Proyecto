import Head from "next/head";
import Header from "@/components/Header";
import Streak from "@/components/Streak";
import Courses from '@/components/Courses';
import styles from '@/styles/home/home.module.css';
import { useState } from "react";
import config from "@/config/config.js";
import Lessons from "@/components/Lessons";
import createStreak from "@/services/createStreak.js";
import checkIfStreakNeedsToBeReseted from "@/utils/checkIfStreakNeedsToBeReseted";

export default function Home(props) {
    const defaultYear = props.user.age >= 16 ? 'bachillerato' : 'eso';
    const [year, setYear] = useState(defaultYear);

    function handleChange(e) {
        setYear(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home de la página web" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header userName={props.user.name} userSurnames={props.user.surnames} userEmail={props.user.email} userImagePath={props.user.imagePath}></Header>
            <main className={styles.contentWrapper}>
                <section className={styles.container}>
                    <Streak totalStreak={props.streak.total} streakDays={props.streak.streakDays}></Streak>
                    <section>
                        <div className={styles.changeYearSection}>
                            <h2 className={styles.title}>Continuar aprendiendo</h2>
                            <div className={styles.selectWrapper}>
                                <select defaultValue={year} onChange={handleChange} className={styles.select}>
                                    <option value={'bachillerato'}>Bachillerato</option>
                                    <option value={'eso'}>ESO</option>
                                </select>
                            </div>
                        </div>
                        <Lessons lessons={year === 'eso' ? props.lessons.eso : props.lessons.bachillerato} 
                                noLessonsMessage={'Aun no has comenzado ninguna lección de este año'}
                                hideWhenCompleted={true}></Lessons>
                    </section>
                    <Courses courses={year === 'eso' ? props.courses.eso : props.courses.bachillerato}></Courses>
                </section>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
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
    
    
    const bachCoursesResponse = await fetch(`${config.backend_url}/api/courses/all/bachillerato`, fetchInfo)
    .then(response => response.json());
    
    const esoCoursesResponse = await fetch(`${config.backend_url}/api/courses/all/eso`, fetchInfo)
    .then(response => response.json());
    
    const bachLessonsResponse = await fetch(`${config.backend_url}/api/lessons/all/started/bachillerato/${userID}`, fetchInfo)
    .then(response => response.json());
    
    const esoLessonsResponse = await fetch(`${config.backend_url}/api/lessons/all/started/eso/${userID}`, fetchInfo)
        .then(response => response.json());
        
    const streakResponse = await fetch(`${config.backend_url}/api/streaks/${userID}`, fetchInfo)
    .then(async response => {
        if (response.status === 404) createStreak(userID, token);
        return await fetch(`${config.backend_url}/api/streaks/${userID}`, fetchInfo).then(response => response.json());
    });
        
    const actualStreakResponse = checkIfStreakNeedsToBeReseted(userID, token, streakResponse.streakInfo, userResponse.userInfo.lastConnection);
    
    

    return {
        props: {
            user: { ...userResponse.userInfo },
            courses: {
                bachillerato: { ...bachCoursesResponse.courses },
                eso: { ...esoCoursesResponse.courses }
            },
            lessons: { 
                bachillerato: { ...bachLessonsResponse.lessons },
                eso: { ...esoLessonsResponse.lessons }
            },
            streak: { 
                total: actualStreakResponse.total,
                streakDays: {
                    beforeYesterday: actualStreakResponse.beforeYesterday,
                    yesterday: actualStreakResponse.yesterday,
                    today: actualStreakResponse.today,
                    tomorrow: 'inactiva',
                    afterTomorrow: 'inactiva'                    
                }
            }
        }
    }
}