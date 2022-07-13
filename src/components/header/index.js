import styles from './Header.module.css';
import { useContext } from 'react';
import { appContext } from '../../context';
import MiniLogo from '../mini-logo';

const Header = (props) => {
  const { handleLogout, user } = useContext(appContext);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.welcomeUserText}>
        Welcome, <span>{user.name}</span>
      </div>
      <MiniLogo />
      <div className={styles.headerButtonsContainer}>
        <button onClick={() => props.toggleNewNoteForm()}>
          {props.showNotes ? (
            <svg
              className={styles.icon}
              xmlns='http://www.w3.org/2000/svg'
              fill='#555'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4v16m8-8H4'
              />
            </svg>
          ) : (
            <svg
              className={styles.icon}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
              />
            </svg>
          )}
          {props.showNotes ? <span>New Note</span> : <span>Show Notes</span>}
        </button>
        <button className={styles.logoutButton} onClick={() => handleLogout()}>
          <svg
            className={styles.icon}
            xmlns='http://www.w3.org/2000/svg'
            fill=' #555'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
