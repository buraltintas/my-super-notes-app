import { useState } from 'react';
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
      {showNotes && notes.length > 0 && <SearchCategory />}
      {showNotes && notes.length === 0 && <LoadingSpinner />}
      {showNotes && notes.length > 0 && <Notes />}
      {!showNotes && notes && <NewNote toggleNewNoteForm={toggleNewNoteForm} />}
    </>
  );
};

export default Home;
