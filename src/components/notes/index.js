import Note from '../note';
import { useContext } from 'react';
import { appContext } from '../../context';
import styles from './Notes.module.css';
import LoadingSpinner from '../loadingSpinner';

const Notes = () => {
  const { notes } = useContext(appContext);

  return (
    <>
      {!notes && <LoadingSpinner />}
      {notes && notes.length > 1 ? (
        <div className={styles.notesContainer}>
          {notes
            .sort(function (x, y) {
              return y.time - x.time;
            })
            .map((note, index) => {
              if (note.id) {
                return <Note note={note} key={`${note.id}+${index}`} />;
              }
            })}
        </div>
      ) : (
        <h2 className={styles.noNoteText}>
          You have no notes! Start adding a super one!
        </h2>
      )}
    </>
  );
};

export default Notes;
