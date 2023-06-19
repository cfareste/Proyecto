import styles from './courseInfo.module.css';
import Image from 'next/image';

export default function CourseInfo({ title, description, totalLessons, imagePath, onClick }) {
    return (
        <article className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.content}>{description}</p>
                <span className={styles.details}>Cantidad de lecciones: {totalLessons || 0}</span>
            </div>
            <div className={styles.container}>
                <Image className={styles.image} src={`/courses/${imagePath}`} width={900} height={500} alt='Foto del curso'></Image>
                <button className={styles.button} onClick={totalLessons != 0 ? onClick : null} disabled={totalLessons === 0}>Comenzar curso</button>
            </div>
        </article>
    )
}
