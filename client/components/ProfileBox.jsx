import Image from "next/image"
import styles from './profileBox.module.css';
import { useEffect, useRef, useState } from "react"
import config from "@/config/config";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

export default function ProfileBox({ userName, surnames, email, imagePath }) {
    const defaultImage = `/user/DEFAULT.webp`;
    const [isOpened, setIsOpened] = useState(false);
    const [noImage, setNoImage] = useState(false);
    const menuRef = useRef(null);

    function handleCloseSession() {
        document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    function handleOutsideClick (e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpened(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={menuRef}>
            <Image className={styles.user} src={!noImage ? `${config.backend_url}/public/users/${imagePath}` : defaultImage} 
                    width={500} height={500} onClick={() => setIsOpened(!isOpened)} onError={() => setNoImage(true)} alt="Foto de perfil"></Image> 
            {isOpened && (
                <div className={styles.menu}>
                    <div className={styles.infoContainer}>
                        <h4 className={styles.name}>{capitalizeFirstLetter(userName)} {capitalizeFirstLetter(surnames)}</h4>
                        <p className={styles.email}>{email}</p>
                    </div>
                    <Link className={styles.link} href={'/profile'}>Perfil de usuario</Link>
                    <Link className={styles.closeSession} onClick={handleCloseSession} href={'/'}>Cerrar sesión</Link>
                </div>
            )}
        </div>
    )
}