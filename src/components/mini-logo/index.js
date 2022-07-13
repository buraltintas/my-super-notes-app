import styles from './MiniLogo.module.css';

const MiniLogo = () => {
  return (
    <div className={styles.appNameContainer}>
      <span>My</span>
      <span className={styles.superText}>Super</span>
      <span>Notes</span>
    </div>
  );
};

export default MiniLogo;
