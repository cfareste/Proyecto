import styles from './advantageSection.module.css';
import Advantage from './Advantage.jsx';

export default function AdvantageSection() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.left}>
                <Advantage title="Aprendizaje rápido"
                            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, eos. Dolore vel veniam aperiam voluptas alias tempora vitae ratione fugiat, repellendus sed."></Advantage>
                <Advantage title="Enfoque diferente"
                            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, eos. Dolore vel veniam aperiam voluptas alias tempora vitae ratione fugiat, repellendus sed."></Advantage>
            </div>
            <div className={styles.right}>
                <Advantage title="Teoría y práctica"
                            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, eos. Dolore vel veniam aperiam voluptas alias tempora vitae ratione fugiat, repellendus sed."></Advantage>
                <Advantage title="Múltiples estudios"
                            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, eos. Dolore vel veniam aperiam voluptas alias tempora vitae ratione fugiat, repellendus sed."></Advantage>
            </div>
        </section>
    )
}