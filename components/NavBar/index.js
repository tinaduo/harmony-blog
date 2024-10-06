import styles from './NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Link href="/"className={styles.logo}>logo here.</Link>
      <div className={styles.links}>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/blog" className={styles.link}>Blog</Link>
        <Link href="/team" className={styles.link}>Meet the Team</Link>
      </div>
    </div>
  );
}
