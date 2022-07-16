import { useState } from 'react';
import styles from './EditNote.module.css';
import { useContext } from 'react';
import { appContext } from '../../context';
import { updateDoc, doc } from 'firebase/firestore';
import LoadingSpinner from '../loadingSpinner';

const EditNote = (props) => {
  const [form, setForm] = useState({
    title: props.note.title,
    text: props.note.text,
    category: props.note.category,
    time: props.note.time,
    id: props.note.id,
  });

  const { db, user, setIsLoading, isLoading } = useContext(appContext);

  const updateNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const noteRef = doc(db, `${user.email}`, form.id);

    try {
      await updateDoc(noteRef, {
        title: form.title,
        text: form.text,
        category: form.category,
        time: Math.floor(new Date().getTime() / 1000),
        id: form.id,
      });

      setIsLoading(false);
      props.cancelEditForm();
    } catch (err) {
      alert(err);
      setIsLoading(false);
      props.cancelEditForm();
    }
  };

  return (
    <div className={styles.editFormContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={updateNote} className={styles.newNoteForm}>
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
          <div className={styles.editButtonsContainer}>
            <button type='submit' className={styles.submitButton}>
              Update
            </button>
            <button
              onClick={() => props.cancelEditForm()}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditNote;
