import styles from './progressBar.module.css';

export default function ProgressBar({ progress, margin }) {
    const scale = `scale(${progress / 100 || 0}, 1)`;

    return (
        <section className={`${styles.progressBar} ${margin && styles.margin}`}>
            <div className={styles.progress} style={{transform: scale}}></div>
        </section>
    )
}