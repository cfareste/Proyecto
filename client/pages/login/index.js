import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from '@/styles/form/form.module.css';
import router from "next/router";
import ValidationPopup from "@/components/ValidationPopup";

export default function Login() {
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwdError, setPwdError] = useState('');

    function handleInvalid(e) {
        e.preventDefault();

        switch (e.target.id) {
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

        }
    }

    function handleFocus(e) {
        switch (e.target.id) {
            case 'emailInp':
                setEmailError('');
                break;
            case 'pwdInp':
                setPwdError('');
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = JSON.stringify(Object.fromEntries(
            new FormData(e.target)
        ));
        
        const loginData = await fetch('/api/login', {
            method: e.target.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(result => result.json())
        .catch(err => console.log(err));

        if (loginData.ok) {
            document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            document.cookie = `sessionToken=${loginData.token}`;
            document.cookie = `userID=${loginData.userID}`;

            router.push('/home');
        }

        setError(loginData.message);
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
                <title>Login</title>
                <meta name="description" content="Inicia sesión" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.container}>
                <section className={styles.wrapper}>
                    <h2 className={styles.title}>Login</h2>
                    <form method="POST" className={styles.loginForm} onSubmit={handleSubmit}>
                        <div className={`${styles.formGroup} ${styles.emailGroup}`}>
                            <input onInvalid={handleInvalid} 
                                    onFocus={handleFocus}
                                    onBlur={e => e.target.checkValidity()}
                                    required 
                                    autoComplete="off" 
                                    placeholder="E-mail (nombre@dominio.com) *" 
                                    id="emailInp" 
                                    name="email" 
                                    className={`${styles.inp} ${styles.email} ${emailError && styles.inpError}`} 
                                    type="email"></input>
                            {emailError && <p className={styles.error}>{emailError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
                            <input onInvalid={handleInvalid} 
                                    onFocus={handleFocus}
                                    required 
                                    autoComplete="off" 
                                    placeholder="Contraseña (1234xxxx_) *" 
                                    id="pwdInp" 
                                    name="password" 
                                    className={`${styles.inp} ${styles.password} ${pwdError && styles.inpError}`} 
                                    type="password"></input>
                            {pwdError && <p className={styles.error}>{pwdError}</p>}
                        </div>
                        <button className={styles.btn} type="submit">Iniciar sesión</button>
                        <p className={styles.registerLink}>¿No tienes cuenta? <Link className={styles.link} href='/register'>Registrate</Link></p>
                    </form>
                </section>
                <ValidationPopup message={error}/>
            </main>
        </>
    )
}