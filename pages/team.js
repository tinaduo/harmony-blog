import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from '../styles/Team.module.css';
import teamData from '../data/teamdata';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function Team() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Harmony - Meet the Team</title>
                <meta name="description" content="Harmony. Your Partner in Care." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className={`${styles.main} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.headerContainer}>
                    <div className={styles.textHeader}>
                        <h1 className={styles.teamHeader}>Our Team!</h1>
                    </div>
                    <img
                        className={styles.teamImage}
                        src="https://media.discordapp.net/attachments/1204277940465176609/1286097175620620449/IMG_4774.jpg?ex=6703bd15&is=67026b95&hm=d64352f694056c2ccb257401f918b06930999fc5868399f998860a4f4ceea8a1&=&format=webp&width=811&height=1081"
                        alt="Team Group Photo"
                    />
                    <p className={styles.imageDescription}>Silly Group Photo + Description of Team</p>

                    <div className={styles.teammemberContainer}>
                        {teamData.map((member, index) => (
                            <div className={styles.teammemberCard} key={index}>
                                <img className={styles.teammemberImage} src={member.image} alt={member.name} />
                                <div className={styles.teammemberText}>
                                    <div className={styles.teammemberNameheader}>
                                        <h2 className={styles.teammemberName}>{member.name}</h2>
                                        <h3 className={styles.teammemberRole}>{member.role}</h3>
                                    </div>
                                    <p className={styles.teammemberDescription}>{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
