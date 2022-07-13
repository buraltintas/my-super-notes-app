import styles from './NewNote.module.css';

const NewNote = () => {
  return (
    <div className={styles.newNoteContainer}>
      <form className={styles.newNoteForm}>
        <div>
          <label>Title</label>
          <input type='text' />
        </div>
        <div>
          <label>Note Text</label>
          <textarea cols='30' rows='10' type='text' />
        </div>
        <div>
          <label>Category</label>
          <select>
            <option value='todo' key='todo'>
              todo
            </option>
            <option value='bug' key='bug'>
              bug
            </option>
            <option value='private' key='private'>
              private
            </option>
            <option value='fun' key='fun'>
              just fun
            </option>
            <option value='education' key='education'>
              education
            </option>
            <option value='travel' key='travel'>
              travel notes
            </option>
            <option value='checklist' key='checklist'>
              checklist
            </option>
            <option value='planning' key='planning'>
              planning
            </option>
            <option value='meeting' key='meeting'>
              meeting notes
            </option>
          </select>
        </div>
        <button className={styles.submitButton}>Submit</button>
        <button className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default NewNote;
