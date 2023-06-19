import Head from "next/head";
import Header from "@/components/Header";
import config from "@/config/config";
import styles from '@/styles/profile/profile.module.css';
import { useEffect, useState } from "react";
import getSessionToken from "@/utils/getSessionToken";
import router from 'next/router';
import updateUser from "@/services/updateUser";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import ValidationPopup from "@/components/ValidationPopup";

export default function Profile(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');

    function handleInvalid(e) {
        e.preventDefault();
        
        if (e.target.value === '') {
            setEmailError('Este campo es obligatorio');
        } else {
            setEmailError('Formato incorrecto (nombre@dominio.com)');
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault();

        const token = getSessionToken(document.cookie.split('; '));
        if (!token) router.push('/login');

        const body = new FormData();
        const photo = e.target.photo.files[0];
        const data = JSON.stringify(
            Object.keys(
                Object.fromEntries(new FormData(e.target))
            ).reduce((lastObj, key) => {
                const value = e.target[key].value;
                if (!value || value === "" || key === 'photo') return { ...lastObj };
                return {
                  ...lastObj,
                  [key]: value,
                };
            }, {})
        );

        delete data.photo;

        body.append('data', data);
        body.append('photo', photo);

        const updateData = await updateUser(props.user.ID, token, body)
            .then(response => response);

        if(updateData.ok) {
            router.reload();
            console.log('ok');
        } else {
            if (updateData.redirect) router.push('/login');
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
            setError(updateData.message);
        }
    }

    function handleFocus() {
        setEmailError('')
    } 

    useEffect(() => {
        let timeout;

        setTimeout(() => {
            setError('');
        }, 5000);

        return () => clearTimeout(timeout);
    })

    return (
        <>
            <Head>
                <title>Perfil de usuario</title>
                <meta name="description" content="Perfil de usuario" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header userName={props.user.name} userSurnames={props.user.surnames} userEmail={props.user.email} userImagePath={props.user.imagePath}></Header>
            <main className={styles.contentWrapper}>
                <section className={styles.container}>
                    <h2 className={styles.title}>Actualizar información personal</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={`${styles.formGroup} ${styles.nameGroup}`}>
                            <input defaultValue={capitalizeFirstLetter(props.user.name)} autoComplete="off" placeholder="Nombre" id="nameInp" name="name" className={`${styles.inp} ${styles.name}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.surnamesGroup}`}>
                            <input defaultValue={capitalizeFirstLetter(props.user.surnames)} autoComplete="off" placeholder="Apellidos" id="surnamesInp" name="surnames" className={`${styles.inp} ${styles.surnames}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.emailGroup}`}>
                            <input defaultValue={props.user.email} 
                                onInvalid={handleInvalid}
                                onFocus={handleFocus} 
                                onBlur={e => e.target.checkValidity()}
                                required
                                autoComplete="off" placeholder="E-mail" id="emailInp" name="email" className={`${styles.inp} ${styles.email}`} type="email"></input>
                            {emailError && <p className={styles.error}>{emailError}</p>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
                            <input autoComplete="off" placeholder="Contraseña" id="pwdInp" name="password" className={`${styles.inp} ${styles.password}`} type="password"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.ageGroup}`}>
                            <input defaultValue={props.user.age} autoComplete="off" placeholder="Edad" id="ageInp" name="age" className={`${styles.inp} ${styles.age}`} type="number" max={99} min={10}></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.schoolGroup}`}>
                            <input defaultValue={capitalizeFirstLetter(props.user.school)} autoComplete="off" placeholder="Escuela" id="schoolInp" name="school" className={`${styles.inp} ${styles.school}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.ccaaGroup}`}>
                            <input defaultValue={capitalizeFirstLetter(props.user.ccaa)} autoComplete="off" placeholder="CCAA" id="ccaaInp" name="ccaa" className={`${styles.inp} ${styles.ccaa}`} type="text"></input>
                        </div>
                        <div className={`${styles.formGroup} ${styles.fileLabelGroup}`}>
                            <input autoComplete="off" onChange={e => setSelectedFile(e.target.files[0])} id="photoInp" name="photo" className={`${styles.inp} ${styles.photo}`} type="file" accept=".jpg, .png, .webp"></input>
                            <label htmlFor="photoInp" className={styles.fileLabel}>{selectedFile ? selectedFile.name : 'Sube una foto...'}</label>
                        </div>
                        <button className={styles.btn} type="submit">Actualizar</button>
                    </form>
                </section>
                <ValidationPopup message={error} changeColors={true}></ValidationPopup>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.sessionToken;
    const userID = context.req.cookies.userID;
    const fetchInfo = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    if (!token) {
        return {
            redirect: {
              destination: '/login',
              permanent: false
            }
        };
    }

    const userResponse = await fetch(`${config.backend_url}/api/users/${userID}`, fetchInfo)
        .then(response => response.json());

    if (!userResponse.ok) {
        return {
            redirect: {
              destination: '/login',
              permanent: false
            }
        };
    }

    return {
        props: {
            user: userResponse.userInfo
        }
    }
}