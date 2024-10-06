import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from '@/styles/Post.module.css'
import NavBar from '@/components/NavBar';

export default function Post({ frontMatter, content }) {
  return (
    <>
    <NavBar />
<div className={styles.postContainer}>
      <h1 className={styles.postTitle}>{frontMatter.title}</h1>
      <img className={styles.postImage} src={frontMatter.image} alt={frontMatter.title} />
      <p className={styles.postDescription}>{frontMatter.description}</p>
      <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    </>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      frontMatter: data,
      content,
    },
  };
}
