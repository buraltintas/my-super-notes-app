import { useState } from 'react';
import styles from '../../components/notes/Notes.module.css';
import Header from '../../components/header';
import NewNote from '../../components/new-note';
import Notes from '../../components/notes';
import { useContext } from 'react';
import { appContext } from '../../context';
import LoadingSpinner from '../../components/loadingSpinner';
import SearchCategory from '../../components/search-category';

const Home = () => {
  const [showNotes, setShowNotes] = useState(true);
  const { notes } = useContext(appContext);

  const toggleNewNoteForm = () => {
    setShowNotes((prev) => !prev);
  };

  return (
    <>
      <Header toggleNewNoteForm={toggleNewNoteForm} showNotes={showNotes} />
      {showNotes && notes.length > 1 ? (
        <SearchCategory />
      ) : (
        <h2 className={styles.noNoteText}>
          You have no notes! Start adding a super one!
        </h2>
      )}
      {showNotes && notes.length === 0 && <LoadingSpinner />}
      {showNotes && notes.length > 1 && <Notes />}
      {!showNotes && notes && <NewNote toggleNewNoteForm={toggleNewNoteForm} />}
    </>
  );
};

export default Home;
