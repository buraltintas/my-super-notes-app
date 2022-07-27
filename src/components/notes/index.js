import Note from '../note';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../context';
import styles from './Notes.module.css';
import LoadingSpinner from '../loadingSpinner';

const Notes = () => {
  const { notes, searchText, filterCategory, filterStatus } =
    useContext(appContext);
  const [notesData, setNotesData] = useState(notes);

  useEffect(() => {
    const filteredData = () => {
      return notes.filter(
        (note) =>
          (filterCategory ? filterCategory === note.category : note) &&
          (filterStatus === 'true'
            ? note.isDone === true
            : filterStatus === 'false'
            ? note.isDone === false
            : note) &&
          (searchText
            ? note?.text?.toLowerCase().includes(searchText?.toLowerCase())
            : note)
      );
    };

    setNotesData(filteredData());
  }, [searchText, filterCategory, notes, filterStatus]);

  return (
    <>
      {!notes && <LoadingSpinner />}
      {notesData && notes.length > 1 ? (
        <div className={styles.notesContainer}>
          {notesData
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
