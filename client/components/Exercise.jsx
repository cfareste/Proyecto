import { Fragment, useState } from 'react';
import styles from './exercise.module.css';

export default function Exercise({ ID, type, question, details, options, answer, completed, correct, onResolve }) {
    const optionsArray = options.split('|');
    const [isCompleted, setIsCompleted] = useState(completed === 1);
    const [isCorrect, setIsCorrect] = useState(correct === 1);


    function handleClick (e) {
        let isCorrect = e.target.value === answer;

        setIsCompleted(true)
        setIsCorrect(isCorrect)

        onResolve(ID, true, isCorrect);
    }

    function handleSubmit (e) {
        e.preventDefault();

        const formData = Object.fromEntries(
            new FormData(e.target)
        );
        let isCorrect = formData[`exercise_${ID}`].replace('.', ',') === answer;
            
        setIsCompleted(true);
        setIsCorrect(isCorrect)

        onResolve(ID, true, isCorrect);
    }

    return (
        <article className={styles.wrapper}>
            {type === 'test' ? (
                <>
                    <h3 className={styles.question}>{question}</h3>
                    <section className={styles.radioContainer}>
                        {optionsArray.map((option, idx) => {
                            const correctAnswer = option === answer && isCompleted;
                            const incorrectAnswer = option != answer && isCompleted;

                            return (
                                <Fragment key={idx}>
                                    <input value={option}
                                            className={styles.radio}
                                            id={`exercise_${ID}_inp_${idx}`}
                                            type='radio'
                                            name={`exercise_${ID}`}
                                            onClick={handleClick}
                                            disabled={isCompleted}></input>
                                    <label className={`${styles.label} ${correctAnswer && styles.correct} ${incorrectAnswer && styles.incorrect}`} htmlFor={`exercise_${ID}_inp_${idx}`}>{option}</label>
                                </Fragment>
                            )
                        })}
                    </section>
                </>
            ) : (
                    <>
                        <h3 className={styles.question}>{question}</h3>
                        <span className={styles.details}>{details}</span>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input type="text"
                                max={1000}
                                min={-1000}
                                name={`exercise_${ID}`}
                                required
                                autoComplete='off'
                                defaultValue={isCompleted ? answer : ''}
                                className={styles.text}
                                disabled={isCompleted}
                                title='Introduce un número decimal válido (p.ej, -12,63)'
                                pattern='-?[0-9]*[.,]?[0-9]+'
                                placeholder="Escribe tu respuesta..."
                            ></input>
                            <input type="submit"
                                disabled={isCompleted}
                                className={`${styles.submit} ${isCompleted ? isCorrect ? styles.correct : styles.incorrect : ''}`}
                                value={`${isCompleted ? isCorrect ? 'Correcto!' : 'Incorrecto :(' : 'Comprobar'}`}
                            ></input>
                        </form>
                        <span className={`${isCompleted && !isCorrect && styles.showAnswer} ${styles.answerText}`}>Solución: {answer}</span>
                    </>
                )}
        </article>
    )
}  