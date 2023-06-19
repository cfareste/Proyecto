import styles from './validationPopup.module.css';

export default function ValidationPopup({ message, changeColors }) {
    return (
        <section className={`${styles.wrapper} ${message ? styles.out : styles.in} ${changeColors && styles.changeColors}`}>
            <p className={styles.message}>{message}</p>
        </section>
    )
}