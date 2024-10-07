import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css';
import ValueCard from '@/components/ValueCard';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function Home({ posts }) {
  const [containerVisible, setContainerVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(`.${styles.container}`);
      const valuesContainer = document.querySelector(`.${styles.ValueCardContainer}`);

      if (container) {
        const containerTop = container.getBoundingClientRect().top;
        if (containerTop < window.innerHeight * 0.8) {
          setContainerVisible(true);
        }
      }

      if (valuesContainer) {
        const valuesTop = valuesContainer.getBoundingClientRect().top;
        if (valuesTop < window.innerHeight * 0.8) {
          setValuesVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Harmony</title>
        <meta name="description" content="Harmony. Your Partner in Care." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.main}>
        <div className={`${styles.container} ${containerVisible ? styles.visible : ''}`}>
          <div className={styles.title}>Harmony</div>
          <div className={styles.subtitle}>Your partner in care!</div>
          <div className={styles.description}>
            Harmony empowers caregivers with AI-driven tools that ease daily burdens, foster connection, <br /> and support underrepresented communities. Simple, compassionate care at your fingertips.
          </div>
          <Link className={styles.learnMoreText} href='/about'>Learn More!</Link>
        </div>
        <div className={styles.valuesContainer}>
          <h1 className={styles.header}>What we Value</h1>
          <div className={`${styles.ValueCardContainer} ${valuesVisible ? styles.visible : ''}`}>
            <ValueCard
              number="01"
              title="COMMUNITY"
              description="Harmony unites caregivers and families, creating a compassionate supportive space that strengthens bonds and lifts up underrepresented voices."
            />
            <ValueCard
              number="02"
              title="CONNECTION"
              description="Harmony bridges the emotional gap between caregivers and loved ones, ensuring every moment of care is a shared connected experience."
            />
            <ValueCard
              number="03"
              title="CARE"
              description="At its heart, Harmony empowers caregivers to deliver care with confidence, easing burdens so they can focus on what truly matters—nurturing others."
            />
          </div>
        </div>
        <h1 className={styles.header}>Explore our Blog!</h1>
        <div className={styles.postContainer}>
          {posts.length > 0 ? (
            posts.map(({ slug, frontMatter }) => (
              <Link key={slug} href={`/posts/${slug}`} style={{ textDecoration: 'none' }}>
                <div className={styles.postItem}>
                  <div
                    className={styles.postImage}
                    style={{ backgroundImage: `url(${frontMatter.image})` }}
                  />
                  <div className={styles.postTitle}>{frontMatter.title}</div>
                  <div className={styles.postDescription}>{frontMatter.description}</div>
                </div>
              </Link>
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = filename.replace(/\.md$/, '');

    return { slug, frontMatter: data };
  });

  return {
    props: {
      posts,
    },
  };
}
