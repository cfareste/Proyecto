import Image from "next/image"
import styles from './streakItem.module.css';

export default function StreakItem({ day, imagePath, isToday }) {
    imagePath = imagePath + '?v=1.2';

    return (
        <article className={styles.wrapper}>
            <Image className={styles.image} src={imagePath} alt="Logo de racha" width={500} height={500}></Image>
            <p className={`${isToday && styles.today} ${styles.day}`}>{day}</p>
        </article>
    )
}