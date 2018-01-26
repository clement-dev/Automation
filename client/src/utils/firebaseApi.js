import Firebase from 'firebase';
import fbConfig from './firebaseConfig';
import { denormalizeNote } from './noteHelper';

const fb = Firebase.initializeApp(fbConfig);

const getAllNotes = (addNote, updateNote, removeNote) => {
  const noteRef = fb.database().ref('notes');

  noteRef.on('child_added', snapshot => {
    addNote(denormalizeNote(snapshot.key, snapshot.val()));
  });
  noteRef.on('child_changed', snapshot => {
    updateNote(snapshot.key, snapshot.val().isPinned);
  });
  noteRef.on('child_removed', snapshot => {
    removeNote(snapshot.key);
  });
};

const updateNote = note =>
  fb
    .database()
    .ref()
    .update(note);

const removeNote = noteId =>
  fb
    .database()
    .ref('/notes/')
    .child(noteId)
    .remove();

export { getAllNotes, updateNote, removeNote };
