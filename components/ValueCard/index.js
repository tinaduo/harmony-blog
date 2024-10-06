import styles from './ValueCard.module.css';

const ValueCard = ({ number, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <p className={styles.number}>{number}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ValueCard;