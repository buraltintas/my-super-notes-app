import styles from './MiniLogo.module.css';

const MiniLogo = (props) => {
  return (
    <div className={styles.appNameContainer}>
      <span>My</span>
      <span className={styles.superText}>Super</span>
      <div className={styles.mobileHeading}>
        <span className={styles.superTextUserName}>
          {props.user.name.split(' ')[0]}
        </span>
        <span>Notes</span>
      </div>
      <span>Notes</span>
    </div>
  );
};

export default MiniLogo;
