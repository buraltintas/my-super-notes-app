import Note from '../note';
import { useContext } from 'react';
import { appContext } from '../../context';
import styles from './Notes.module.css';

const Notes = () => {
  const { notes } = useContext(appContext);

  console.log(notes);

  return (
    <>
      {notes.map((note, index) => {
        if (note.id) {
          return <Note note={note} key={`${note.id}+${index}`} />;
        }
      })}
    </>
  );
};

export default Notes;
