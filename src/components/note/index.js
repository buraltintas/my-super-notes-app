import styles from './Note.module.css';

const Note = (props) => {
  return <div>{props.note.name}</div>;
};

export default Note;
