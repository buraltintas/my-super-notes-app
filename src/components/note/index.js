import styles from './Note.module.css';
import { useContext, useState } from 'react';
import { appContext } from '../../context';
import { doc, deleteDoc } from 'firebase/firestore';
import EditNote from '../edit-note';
import ShareNote from '../share-note';

const Note = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { db, user } = useContext(appContext);

  const renderDate = (noteDate) => {
    const date = new Date(noteDate * 1000);
    const day = '0' + date.getDate();
    const month = '0' + (date.getMonth() + 1);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();

    return (
      <div className={styles.dateContainer}>
        <p>{`${day.slice(-2)}/${month.slice(-2)}/${date.getFullYear()}`}</p>
        <p>{`${hours.slice(-2)}:${minutes.slice(-2)}`}</p>
      </div>
    );
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, `${user.email}`, id));
  };

  const showEditForm = () => {
    setShowEdit(true);
  };

  const cancelEditForm = () => {
    setShowEdit(false);
  };

  // const showShareForm = () => {
  //   setShowShare(true);
  // };

  const cancelShareForm = () => {
    setShowShare(false);
  };

  return (
    <>
      <div className={styles.noteContainer}>
        {showShare && !showEdit && (
          <ShareNote cancelShareForm={cancelShareForm} note={props.note} />
        )}
        {showEdit && !showShare && (
          <EditNote note={props.note} cancelEditForm={cancelEditForm} />
        )}

        {!showEdit && !showShare && (
          <>
            <h1>{props.note.title}</h1>
            <p className={styles.text}>{props.note.text}</p>
            <div className={styles.noteButtonsContainer}>
              {/* <div>
                <svg
                  onClick={showShareForm}
                  className={styles.icon}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
                </svg>
              </div> */}
              <div>
                <svg
                  onClick={showEditForm}
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
                  onClick={() => deleteNote(props.note.id)}
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
            <div className={styles.categoryContainer}>
              {props.note.category}
            </div>
            {/* {props.note.sharedBy && <div>{props.note.sharedBy.name}</div>} */}
          </>
        )}
      </div>
    </>
  );
};

export default Note;
