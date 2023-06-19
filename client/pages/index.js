import InfoFact from '@/components/InfoFact'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/index/index.module.css';
import AdvantageSection from '@/components/AdvantageSection';
import InteractiveCourse from '@/components/InteractiveCourse';

export default function Index() {
  return (
    <>
      <Head>
        <title>Página principal</title>
        <meta name="description" content="Página principal de la web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <section className={styles.headerContainer}>
          <Image className={styles.image} src={'/logo/logo.png'} alt='Logo' width={500} height={500}></Image>
          <Link className={styles.link} href={'/login'}>Log in</Link>
        </section>
      </header>
      <main className={styles.contentWrapper}>
        <section className={styles.container}>
          <section className={styles.section}>
            <InfoFact title={"La forma más rápida y eficiente para aprender"} 
              content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam risus tellus, pulvinar a fringilla nec, hendrerit quis purus. Duis sem mauris, volutpat sed dolor vitae, sagittis aliquet arcu."} 
              bigSize={true}
              inverse={false}/>
            <InfoFact title={"Aprende con teoría bien explicada y ejercicios prácticos"} 
              content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam risus tellus, pulvinar a fringilla nec, hendrerit quis purus. Duis sem mauris, volutpat sed dolor vitae, sagittis aliquet arcu."} 
              bigSize={false}
              inverse={false}/>
            <InfoFact title={"Encuentra un enfoque diferente al estudio"} 
              content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam risus tellus, pulvinar a fringilla nec, hendrerit quis purus. Duis sem mauris, volutpat sed dolor vitae, sagittis aliquet arcu."} 
              bigSize={false}
              inverse={true}/>
          </section>
          <section className={styles.section}>
            <h2 className={`${styles.title} ${styles.center}`}><span className={styles.span}>Ventajas</span> de usar nuestra web para aprender</h2>
            <AdvantageSection></AdvantageSection>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Ejemplos interactivos de <span className={styles.span}>cursos</span></h2>
            <InteractiveCourse></InteractiveCourse>
          </section>
        </section>
      </main>
    </>
  )
}
