import { useEffect, useRef, useState } from "react"
import useSearch from "@/hook/useSearch";
import styles from './searchBar.module.css'
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false); 
    const [fetchedData, setFetchedData] = useState(null);
    const formRef = useRef(null)

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function handleOutsideClick (e) {
        if (formRef.current && !formRef.current.contains(e.target)) setIsInputFocused(false);
    };
    
    async function fetchData() {
        if (search && search !== '') {
            try {
                const resolvedData = await useSearch(search);
                setFetchedData(resolvedData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, [search]);

    return (
        <form className={styles.form} ref={formRef}>
            <Image className={styles.icon} src="/index/lupa.png" width={500} height={500} alt="Icono de búsqueda"></Image>
            <input className={styles.input} value={search} onChange={handleChange} onFocus={() => setIsInputFocused(true)} type="text" placeholder="Busca por título de lección..."></input>
            {isInputFocused && fetchedData && search != '' && <section className={styles.results}>
                {
                    fetchedData.ok ? (
                        Object.keys(fetchedData.lessons).map(key => (
                            <Link href={`/lesson/${fetchedData.lessons[key].ID}`} key={key}>
                                <article className={styles.item}>
                                    <div className={styles.itemText}>
                                        <h4 className={styles.itemTitle}>{fetchedData.lessons[key].title}</h4>
                                        <p className={styles.details}>{fetchedData.lessons[key].courseTitle}</p>
                                    </div>
                                    <Image className={styles.image} src={`/lessons/${fetchedData.lessons[key].imagePath}`} alt="Logo de la lección" width={1000} height={700}></Image>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <article className={styles.noResults}>
                            <p className={styles.message}>{fetchedData.message}</p>
                        </article>
                    )
                }
            </section>
            }
        </form>
    )
}