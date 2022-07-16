import styles from './Logo.module.css';
import { useContext } from 'react';
import { appContext } from '../../context/index';
import LoadingSpinner from '../loadingSpinner';
import Logo from '../logo';

const Login = () => {
  const { signInWithGoogle, isLoading, loggedIn } = useContext(appContext);

  return (
    <div className={styles.logoContainer}>
      <Logo />

      <div className={styles.welcomeText}>Welcome to your super notes!</div>

      {isLoading || loggedIn ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.loginButtonContainer}>
          <button
            onClick={() => signInWithGoogle()}
            className={styles.loginButton}
          >
            {loggedIn === false ? 'Login with Google' : <LoadingSpinner />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
