import styles from './courseItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseItem({ courseID, title, imagePath }) {
    return (
        <Link href={`/course/${courseID}`}>
            <article className={styles.wrapper}>
                <Image className={styles.image} src={imagePath} alt='Portada del curso' width={600} height={400}></Image>
                <h3 className={styles.title}>{title}</h3>
            </article>
        </Link>
    )
}