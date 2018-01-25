const denormalizeNote = (key, note) => {
  note.id = key;

  return note;
};

const normalizeNote = note => ({
  [`/notes/${note.id}`]: {
    text: note.text,
    isPinned: note.isPinned,
  },
});

export { denormalizeNote, normalizeNote };
