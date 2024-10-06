import NavBar from '../components/NavBar';
import styles from '../styles/About.module.css';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function About() {

    return (
        <>
            <Head>
                <title>Harmony - About</title>
                <meta name="description" content="Harmony. Your Partner in Care." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className={styles.main}>
                <div className={styles.headerContainer}>
                    <img
                        className={styles.aboutImage}
                        src="https://media.discordapp.net/attachments/1204277940465176609/1286097175620620449/IMG_4774.jpg?ex=6703bd15&is=67026b95&hm=d64352f694056c2ccb257401f918b06930999fc5868399f998860a4f4ceea8a1&=&format=webp&width=811&height=1081"
                        alt="Team Group Photo"
                    />
                    <h1 className={styles.aboutHeader}>What is Harmony?</h1>
                    <p className={styles.description}>Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}
