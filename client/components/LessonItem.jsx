import Image from "next/image"
import Link from "next/link"
import styles from './lessonItem.module.css'
import ProgressBar from "./ProgressBar"

export default function LessonItem({ lessonID, title, imagePath, details, progress }) {
    return (
        <Link href={`/lesson/${lessonID}`}>
            <article className={styles.wrapper}>
                <Image className={styles.image} src={`/lessons/${imagePath}`} alt='Portada de la lección' width={600} height={400}></Image>
                {progress != -1 && <ProgressBar progress={progress}></ProgressBar>}
                <div className={styles.textBox}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.details}>{details}</p>
                </div>
            </article>
        </Link>
    )
}