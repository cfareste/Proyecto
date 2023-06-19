import Image from "next/image"
import Link from "next/link"
import styles from './header.module.css'
import SearchBar from "./SearchBar";
import ProfileBox from "./ProfileBox";

export default function Header({ userName, userSurnames, userEmail, userImagePath }) {
    return (
        <header className={styles.header}>
            <section className={styles.headerContainer}>
                <Image className={styles.image} src={'/logo/logo.png'} alt='Logo' width={500} height={500}></Image>
                <nav className={styles.navbar}>
                    <Link className={styles.link} href='/home'>Home</Link>
                    <SearchBar></SearchBar>
                    <ProfileBox userName={userName} surnames={userSurnames} email={userEmail} imagePath={userImagePath}></ProfileBox>
                </nav>
            </section>
        </header>
    )
}