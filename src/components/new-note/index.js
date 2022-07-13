import { useState } from 'react';
import styles from './NewNote.module.css';
import { useContext } from 'react';
import { appContext } from '../../context';
import { setDoc, doc } from 'firebase/firestore';
import LoadingSpinner from '../loadingSpinner';
import cuid from 'cuid';

const NewNote = (props) => {
  const [form, setForm] = useState({
    title: '',
    text: '',
    category: 'todo',
  });

  const { user, db, setIsLoading, isLoading } = useContext(appContext);

  const toggleNewNoteFormHandler = (e) => {
    e.preventDefault();
    props.toggleNewNoteForm();
  };

  const addNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = cuid();

    try {
      const docRef = await setDoc(doc(db, `${user.email}`, `${id}`), {
        title: `${form.title}`,
        text: `${form.text}`,
        category: `${form.category}`,
        time: Math.floor(new Date().getTime() / 1000),
        id: id,
      });
      setIsLoading(false);
      props.toggleNewNoteForm();
    } catch (err) {
      alert('Something went wrong, please try again!', err);
      setIsLoading(false);
      props.toggleNewNoteForm();
    }
  };

  return (
    <div className={styles.newNoteContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={addNote} className={styles.newNoteForm}>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              required
              type='text'
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form.title}
            />
          </div>
          <div>
            <label htmlFor='notetext'>Note Text</label>
            <textarea
              id='notetext'
              required
              cols='30'
              rows='10'
              type='text'
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              value={form.text}
            />
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              required
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form.category}
            >
              <option value='todo' key='todo'>
                todo
              </option>
              <option value='bug' key='bug'>
                bug
              </option>
              <option value='private' key='private'>
                private
              </option>
              <option value='just for fun' key='just for fun'>
                just for fun
              </option>
              <option value='education' key='education'>
                education
              </option>
              <option value='travel notes' key='travel notes'>
                travel notes
              </option>
              <option value='checklist' key='checklist'>
                checklist
              </option>
              <option value='planning' key='planning'>
                planning
              </option>
              <option value='meeting notes' key='meeting notes'>
                meeting notes
              </option>
              <option value='other' key='other'>
                other
              </option>
            </select>
          </div>
          <button type='submit' className={styles.submitButton}>
            Submit
          </button>
          <button
            onClick={toggleNewNoteFormHandler}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default NewNote;
