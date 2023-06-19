import { Fragment } from 'react';
import styles from './courses.module.css';
import CourseItem from './CourseItem';

export default function Courses({ courses }) {
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Cursos</h2>
            <section className={styles.courseContainer}>
                {Object.keys(courses).map(courseID => (
                    <Fragment key={courseID}>
                        <CourseItem courseID={courseID} title={courses[courseID].title} imagePath={`/courses/${courses[courseID].imagePath}`}></CourseItem>
                    </Fragment>
                ))}
            </section>
        </section>
    )
}