import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from '@/styles/Post.module.css';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function Post({ frontMatter, content }) {
  return (
    <>
      <Head>
        <title>Harmony - {frontMatter.title}</title>
        <meta name="description" content="Harmony. Your Partner in Care." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.postContainer}>
        <h1 className={styles.postTitle}>{frontMatter.title}</h1>
        <p className={styles.postDescription}>{frontMatter.description}</p>
        {frontMatter.image && (
          <Image
            className={styles.postImage}
            src={frontMatter.image}
            alt={frontMatter.title}
            width={800} // Adjust the width as per your layout
            height={400} // Adjust based on your image aspect ratio
            priority={true} // Optimize for fast loading
          />
        )}
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const postsDirectory = path.resolve(process.cwd(), 'posts');
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
  } catch (error) {
    console.error('Error reading post files:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const postsDirectory = path.resolve(process.cwd(), 'posts');
    const filePath = path.resolve(postsDirectory, `${params.slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Convert markdown content to HTML using remark
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        frontMatter: data,
        content: contentHtml, // Pass the converted HTML
      },
    };
  } catch (error) {
    console.error(`Error fetching post data for slug: ${params.slug}`, error);
    return {
      notFound: true,
    };
  }
}
