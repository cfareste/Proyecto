import styles from './advantage.module.css';
import Image from 'next/image';

export default function Advantage({ title, text }){
    return (
        <article className={styles.advantage}>
            <Image alt='Icono de ventaja' className={styles.image} src={'/index/lupa.png'} width={500} height={500}></Image>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
            </div>
        </article>
    )
}