import styles from './DeleteNote.module.css';

const DeleteNote = (props) => {
  return (
    <div className={styles.deleteFormContainer}>
      <h1>Are you sure you want to delete?</h1>
      <h3>"{props.title}"</h3>
      <div className={styles.deleteButtonsContainer}>
        <button onClick={props.deleteNote} className={styles.submitButton}>
          Delete
        </button>
        <button
          onClick={props.cancelDeleteForm}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteNote;
