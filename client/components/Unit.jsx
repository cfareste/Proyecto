import Lessons from './Lessons';
import styles from './unit.module.css';

export default function Unit({ title, lessons, noLessonsMessage }) {
    return ( 
        <article className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            <Lessons lessons={lessons} noLessonsMessage={noLessonsMessage} hideWhenCompleted={false}></Lessons>
        </article>
    )
}