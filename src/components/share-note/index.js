import styles from './ShareNote.module.css';
import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { appContext } from '../../context';
import cuid from 'cuid';

const ShareNote = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { db, user } = useContext(appContext);

  const shareNoteHandler = async () => {
    const id = cuid();
    try {
      const docRef = await setDoc(doc(db, `${email}`, `${id}`), {
        title: `${props.note.title}`,
        text: `${props.note.text}`,
        category: `${props.note.category}`,
        time: Math.floor(new Date().getTime() / 1000),
        id: id,
        sharedBy: user.name,
      });
      //   setIsLoading(false);
      props.cancelShareForm();
    } catch (err) {
      alert('Something went wrong, please try again!', err);
      //   setIsLoading(false);
      props.cancelShareForm();
    }
  };

  const shareNote = async (e) => {
    e.preventDefault();

    shareNoteHandler();

    setTimeout(() => {
      setError('');
    }, 5000);
  };

  return (
    <div className={styles.shareFormContainer}>
      <form onSubmit={shareNote} className={styles.newNoteForm}>
        <div>
          <label htmlFor='email'>Email Adress</label>
          <input
            id='email'
            required
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {error && email.length > 0 && (
          <span className={styles.errorText}>{error}</span>
        )}

        <div className={styles.editButtonsContainer}>
          <button type='submit' className={styles.submitButton}>
            Share
          </button>
          <button
            onClick={() => props.cancelShareForm()}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareNote;
