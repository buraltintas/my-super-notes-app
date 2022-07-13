import styles from './Logo.module.css';
import { useContext } from 'react';
import { appContext } from '../../context/index';
import LoadingSpinner from '../loadingSpinner';

const Login = () => {
  const { signInWithFirebase, isLoading } = useContext(appContext);

  return (
    <div className={styles.logoContainer}>
      <div className={styles.appNameContainer}>
        <span>My</span>
        <span className={styles.superText}>Super</span>
        <span>Notes</span>
      </div>

      <div className={styles.welcomeText}>Welcome to your super notes!</div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.loginButtonContainer}>
          <button
            onClick={() => signInWithFirebase()}
            className={styles.loginButton}
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
