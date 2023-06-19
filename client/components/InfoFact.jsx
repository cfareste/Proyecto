import Image from "next/image";
import styles from "./infoFact.module.css";

export default function InfoFact({ title, content, bigSize, inverse }) {
    return (
        <article className={`${bigSize ? styles.main : styles.normal} ${styles.wrapper}`}>
            {!inverse ? (
                <>
                    <div className={`${!bigSize ? styles.bigTextContainer : styles.normalTextContainer} ${styles.textContainer} ${styles.leftTextContainer}`}>
                        <h2 className={`${bigSize ? styles.bigTitle : styles.normalTitle} ${styles.title}`}>{title}</h2>
                        <p className={styles.content}>{content}</p>
                    </div>
                    <div className={`${bigSize ? styles.bigImageContainer : styles.normalImageContainer} ${styles.imageContainer} ${styles.rightImageContainer}`}>
                        <Image alt="Ejemplo de curso" className={styles.image} src={'/index/photo.webp?v=1'} width={900} height={500}></Image>
                    </div>
                </>
            ) : (
                <>
                    <div className={`${bigSize ? styles.bigImageContainer : styles.normalImageContainer} ${styles.imageContainer}`}>
                        <Image alt="Ejemplo de curso" className={styles.image} src={'/index/photo.webp'} width={900} height={500}></Image>
                    </div>
                    <div className={`${!bigSize ? styles.bigTextContainer : styles.normalTextContainer} ${styles.textContainer} ${styles.rightTextContainer}`}>
                        <h2 className={`${bigSize ? styles.bigTitle : styles.normalTitle} ${styles.title}`}>{title}</h2>
                        <p className={styles.content}>{content}</p>
                    </div>
                </>
            )}
        </article>
    )
}