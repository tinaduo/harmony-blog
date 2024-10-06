import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from '../styles/Blog.module.css';
import Footer from '@/components/Footer';

export default function Blog({ posts }) {


  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.mainHeader}>
            <h1 className={styles.header}>Blog</h1>
            <p className={styles.description}>Follow along our journey as we build your partner for care.</p>
        </div>
        <h1 className={styles.secHeader}>Explore our Blog!</h1>
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
