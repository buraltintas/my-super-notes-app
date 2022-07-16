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

const ShareNote = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailRegistered, setEmailRegistered] = useState(false);
  const { db, user } = useContext(appContext);

  const shareNoteHandler = async () => {
    try {
      const docRef = await setDoc(doc(db, `${email}`, `${props.note.id}`), {
        title: `${props.note.title}`,
        text: `${props.note.text}`,
        category: `${props.note.category}`,
        time: Math.floor(new Date().getTime() / 1000),
        id: props.note.id,
        shareBy: user,
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
    onSnapshot(collection(db, `${email}`), (snapshot) => {
      if (snapshot.docs.length > 0) {
        shareNoteHandler();
      } else {
        setError(
          "We can't find that email. Maybe your friend is not using 'My Super Notes'!"
        );

        setTimeout(() => {
          setError('');
        }, 5000);
      }
    });
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
