import { useEffect, useState } from "react";
import Image from "next/image";
import styles from './interactiveCourse.module.css';

export default function InteractiveCourse() {
    const courses = {
        matematicas: '/index/tools.jpg',
        biologia: '/index/biology.webp',
        fisica: '/index/galaxy.jpg',
        quimica: '/index/laboratory.jpg'
    };
    const [activeCourse, setActiveCourse] = useState("matematicas");

    useEffect(() => {
        if (localStorage.getItem('sessionToken')) localStorage.removeItem('sessionToken');
    })

    return (
        <section className={styles.wrapper}>  
            <Image className={styles.image} src={courses[activeCourse]} alt="Curso" width={1000} height={700}></Image>
            <article className={styles.courses}>
                <div className={`${styles.item} ${activeCourse === "matematicas" && styles.active}`} onClick={() => setActiveCourse("matematicas")}>
                    <Image className={styles.icon} src={'/index/lupa.png'} alt="Icono de curso" width={500} height={500}></Image>
                    <p>Matemáticas</p>
                </div>
                <div className={`${styles.item} ${activeCourse === "fisica" && styles.active}`} onClick={() => setActiveCourse("fisica")}>
                    <Image className={styles.icon} src={'/index/lupa.png'} alt="Icono de curso" width={500} height={500}></Image>
                    <p>Física</p>
                </div>
                <div className={`${styles.item} ${activeCourse === "biologia" && styles.active}`} onClick={() => setActiveCourse("biologia")}>
                    <Image className={styles.icon} src={'/index/lupa.png'} alt="Icono de curso" width={500} height={500}></Image>
                    <p>Biología</p>
                </div>
                <div className={`${styles.item} ${activeCourse === "quimica" && styles.active}`} onClick={() => setActiveCourse("quimica")}>
                    <Image className={styles.icon} src={'/index/lupa.png'} alt="Icono de curso" width={500} height={500}></Image>
                    <p>Química</p>
                </div>
            </article>
        </section>
    )
}