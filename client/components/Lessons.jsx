import styles from './lessons.module.css'
import LessonItem from './LessonItem'
import { Fragment } from 'react'

export default function Lessons({ lessons, noLessonsMessage, hideWhenCompleted }) {
    console.log(lessons, Object.keys(lessons).length)
    const areThereLessons = (lessons != null && Object.keys(lessons).length != 0);
    return (
        <section className={`${areThereLessons && styles.showScrollbar} ${styles.wrapper}`}>
            {areThereLessons ? (
                Object.keys(lessons).map(lessonID => (
                    <Fragment key={lessonID}>
                        {hideWhenCompleted ? (
                            lessons[lessonID].progress != 100 && <LessonItem lessonID={lessonID}
                                title={lessons[lessonID].title}
                                imagePath={lessons[lessonID].imagePath}
                                details={lessons[lessonID].courseTitle || lessons[lessonID].description}
                                progress={lessons[lessonID].progress}
                                ></LessonItem>
                        ) : (
                            <LessonItem lessonID={lessonID}
                                        title={lessons[lessonID].title}
                                        imagePath={lessons[lessonID].imagePath}
                                        details={lessons[lessonID].courseTitle || lessons[lessonID].description}
                                        progress={lessons[lessonID].progress}
                                        ></LessonItem>
                        )}
                    </Fragment>
                ))
            ) : (
                <p className={styles.message}>{noLessonsMessage}</p>
            )}
        </section>
    )
}