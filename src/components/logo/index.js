import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.appNameContainer}>
      <span>My</span>
      <span className={styles.superText}>Super</span>
      <span>Notes</span>
    </div>
  );
};

export default Logo;
