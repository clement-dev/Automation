const Plugin = require('../../models/plugin');
const FirebaseService = require('../../services/FirebaseService');

class NotePlugin extends Plugin {
  doRequest(id, data) {
    switch (id) {
      case 'note':
        this.getService.setIsListeningToMemo(true);
        return 'Je vous écoute';
      case 'write':
        FirebaseService.createNewNote(data);
        return 'Note ajoutée';
      default:
        return null;
    }
  }
}

module.exports = new NotePlugin(__dirname);
