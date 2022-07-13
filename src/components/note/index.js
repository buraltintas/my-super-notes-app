import styles from './Note.module.css';

const Note = (props) => {
  const renderDate = (noteDate) => {
    const date = new Date(noteDate * 1000);
    const day = '0' + date.getDate();
    const month = '0' + (date.getMonth() + 1);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();

    return (
      <span>
        <p className={styles.dateAndTime}>{`${day.slice(-2)}/${month.slice(
          -2
        )}/${date.getFullYear()}`}</p>
        <p className={styles.dateAndTime}>{`${hours.slice(-2)}:${minutes.slice(
          -2
        )}`}</p>
      </span>
    );
  };

  return (
    <div className={styles.noteContainer}>
      <h1>{props.note.title}</h1>
      <p>{props.note.text}</p>
      <div className={styles.noteButtonsContainer}>
        <div>
          <svg
            className={styles.icon}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
          </svg>
        </div>
        <div>
          <svg
            className={styles.icon}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
      {renderDate(props.note.time)}
    </div>
  );
};

export default Note;
