import styles from './Logo.module.css';
import { useContext } from 'react';
import { appContext } from '../../context/index';
import LoadingSpinner from '../loadingSpinner';
import Logo from '../logo';

const Login = () => {
  const { signInWithGoogle, isLoading } = useContext(appContext);

  return (
    <div className={styles.logoContainer}>
      <Logo />

      <div className={styles.welcomeText}>Welcome to your super notes!</div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.loginButtonContainer}>
          <button
            onClick={() => signInWithGoogle()}
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
