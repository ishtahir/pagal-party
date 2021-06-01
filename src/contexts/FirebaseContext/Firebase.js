import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from './config';

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

  googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  twitterSignIn = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  facebookSignIn = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  // this will add a document to a collection where each key/value pair in the object is a field in the doc
  addDocumentToCollection = async (collection, obj) => {
    await this.db.collection(collection).add(obj);
  };

  // this will delete one document in the collection where the field is equal to the value given
  deleteDocumentFromCollection = async (collection, field, value) => {
    await this.db
      .collection(collection)
      .where(field, '==', value)
      .get()
      .then((snap) => snap.forEach((doc) => doc.ref.delete()));
  };

  // this will delete the field given from every document in the collection given
  deleteFieldFromDocument = async (collection, field) => {
    await this.db
      .collection(collection)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          doc.ref.update({
            [field]: this.app.firebase_.firestore.FieldValue.delete(),
          });
        });
      });
  };

  deleteEntireCollection = async (collection) => {
    await this.db
      .collection(collection)
      .get()
      .then((snap) => snap.forEach((doc) => doc.ref.delete()));
  };

  // this will update a single field with the given value
  updateSettings = async (field, value) => {
    await this.db
      .collection('settings')
      .doc('3Fd2IrMcifnJjBYJfcJc')
      .update({
        [field]: value,
      });
  };
}

export default Firebase;
