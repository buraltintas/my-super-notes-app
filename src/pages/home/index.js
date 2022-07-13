import { useState } from 'react';
import Header from '../../components/header';
import NewNote from '../../components/new-note';
import Notes from '../../components/notes';

const Home = () => {
  const [showNotes, setShowNotes] = useState(true);

  const toggleNewNoteForm = () => {
    setShowNotes((prev) => !prev);
  };

  return (
    <>
      <Header toggleNewNoteForm={toggleNewNoteForm} showNotes={showNotes} />
      {showNotes ? (
        <Notes />
      ) : (
        <NewNote toggleNewNoteForm={toggleNewNoteForm} />
      )}
    </>
  );
};

export default Home;
