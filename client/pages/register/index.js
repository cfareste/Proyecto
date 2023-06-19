import Head from "next/head";
import Link from 'next/link';
import styles from '@/styles/form/form.module.css';
import { useEffect, useState } from "react";
import config from "@/config/config";
import router from "next/router";
import createStreak from "@/services/createStreak";
import ValidationPopup from "@/components/ValidationPopup";

export default function Register() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnamesError, setSurnamesError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [ageError, setAgeError] = useState('');

    function handleInvalid(e) {
        e.preventDefault();

        switch (e.target.id) {
            case 'nameInp':
                setNameError('Este campo es obligatorio');
                break;
            case 'surnamesInp':
                setSurnamesError('Este campo es obligatorio');
                break;
            case 'emailInp':
                if (e.target.value === '') {
                    setEmailError('Este campo es obligatorio');
                } else {
                    setEmailError('Formato incorrecto (nombre@dominio.com)');
                }
                break;
            case 'pwdInp':
                setPwdError('Este campo es obligatorio');
                break;
            case 'ageInp':
                setAgeError('Este campo es obligatorio');
                break;

        }
    }

    function handleFocus(e) {
        switch (e.target.id) {
            case 'nameInp':
                setNameError('');
                break;
            case 'surnamesInp':
                setSurnamesError('');
                break;
            case 'emailInp':
                setEmailError('');
                break;
            case 'pwdInp':
                setPwdError('');
                break;
            case 'ageInp':
                setAgeError('');
                break;
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const body = new FormData();
        const photo = e.target.photo.files[0];
        const data = JSON.stringify(
            Object.fromEntries(new FormData(e.target))
        );

        delete data.photo;

        body.append('data', data);
        body.append('photo', photo);

        const registerData = await fetch(`${config.backend_url}/api/users/register`, {
            method: e.target.method,
            body: body
        })
        .then(result => result.json())
        .catch(err => console.error(err));

        if (registerData.ok) {
            document.cookie = `sessionToken=${registerData.token}`;
            document.cookie = `userID=${registerData.userID}`;

            createStreak(registerData.userID, registerData.token)

            router.push('/home');
        }

        setError(registerData.message);
    }

    useEffect(() => {
        let timeout;

        if (error && error != '') {
            timeout = setTimeout(() => {
                setError('');
            }, 5000);
        }

        return () => clearTimeout(timeout);
    }, [error])

    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Registrate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.container}>
                <section className={styles.wrapper}>
                    <h2 className={styles.title}>Crear cuenta</h2>
                    <form method="POST" className={styles.registerForm} onSubmit={handleSubmit}>
                        <div className={`${styles.formGroup} ${styles.nameGroup}`}>
                            <input required autoComplete="off" placeholder="Nombre" id="nameInp" onFocus={handleFocus} onInvalid={handleInvalid}
                                name="name" className={`${styles.inp} ${styles.name} ${nameError && styles.inpError}`} type="text"></input>
                            {nameError && <p className={styles.error}>{nameError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.surnamesGroup}`}>
                            <input required autoComplete="off" placeholder="Apellidos" id="surnamesInp" onFocus={handleFocus} onInvalid={handleInvalid}
                                name="surnames" className={`${styles.inp} ${styles.surnames} ${surnamesError && styles.inpError}`} type="text"></input>
                            {surnamesError && <p className={styles.error}>{surnamesError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.emailGroup}`}>
                            <input required autoComplete="off" placeholder="E-mail" onBlur={e => e.target.checkValidity()} onFocus={handleFocus} onInvalid={handleInvalid}
                                id="emailInp" name="email" className={`${styles.inp} ${styles.email} ${emailError && styles.inpError}`} type="email"></input>
                            {emailError && <p className={styles.error}>{emailError}</p>}    
                        </div>
                        <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
                            <input required autoComplete="off" placeholder="Contraseña" id="pwdInp" onFocus={handleFocus} onInvalid={handleInvalid}
                                name="password" className={`${styles.inp} ${styles.password} ${pwdError && styles.inpError}`} type="password"></input>
                            {pwdError && <p className={styles.error}>{pwdError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.ageGroup}`}>
                            <input required autoComplete="off" placeholder="Edad" id="ageInp" onFocus={handleFocus} onInvalid={handleInvalid}
                                name="age" className={`${styles.inp} ${styles.age} ${ageError && styles.inpError}`} type="number" max={99} min={10}></input>
                            {ageError && <p className={styles.error}>{ageError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.schoolGroup}`}>
                            <input autoComplete="off" placeholder="Escuela" id="schoolInp" name="school" className={`${styles.inp} ${styles.school}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.ccaaGroup}`}>
                            <input autoComplete="off" placeholder="CCAA" id="ccaaInp" name="ccaa" className={`${styles.inp} ${styles.ccaa}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.fileLabelGroup}`}>
                            <input autoComplete="off" onChange={e => setSelectedFile(e.target.files[0])} id="photoInp" name="photo" className={`${styles.inp} ${styles.photo}`} type="file" accept=".jpg, .png, .webp"></input>
                            <label htmlFor="photoInp" className={styles.fileLabel}>{selectedFile ? selectedFile.name : 'Sube una foto...'}</label>
                        </div>
                        <button className={styles.btn} type="submit">Registarse</button>
                        <div className={`${styles.formGroup} ${styles.linkGroup}`}>
                            <p className={styles.registerLink}>¿Ya tienes una cuenta? <Link className={styles.link} href='/login'>Inicia sesión</Link></p>
                        </div>
                    </form>
                </section>
                <ValidationPopup message={error}></ValidationPopup>
            </main>
        </>
    )
}