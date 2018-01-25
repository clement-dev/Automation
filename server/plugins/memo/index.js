const Plugin = require('../../models/plugin');
const FirebaseService = require('../../services/FirebaseService');

class NotePlugin extends Plugin {
  doRequest(id, data) {
    switch (id) {
      case 'note':
        FirebaseService.createNewNote(data[1]);
        return 'Note ajoutée';
      default:
        return null;
    }
  }
}

module.exports = new NotePlugin(__dirname);
