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
    if (
      searchText === '' &&
      filterCategory === 'all' &&
      filterStatus === 'all'
    ) {
      setNotesData(notes);
    }

    if (searchText !== '') {
      setNotesData(
        notesData.filter(
          (note) =>
            note?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            note?.text?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, filterCategory, notes, filterStatus]);

  return (
    <>
      {!notes && <LoadingSpinner />}
      {notesData && notesData.length > 0 ? (
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
