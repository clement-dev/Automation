const firebase = require('firebase-admin');

class FirebaseService {
  constructor(databaseURL) {
    try {
      const serviceAccount = require('../key.json');
      firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: databaseURL
      });
    } catch (e) {
      console.log('key.json is missing');
    }
  }

  createNewNote(text) {
    const note = {
      text: text
    };
    const key = firebase
      .database()
      .ref()
      .child('notes')
      .push().key;
    const updates = {};
    updates['/notes/' + key] = note;

    return firebase
      .database()
      .ref()
      .update(updates);
  }
}

module.exports = new FirebaseService(process.env.DATABASE_URL);
