import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from './config';

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

  googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  // twitterSignIn = () => {
  //   const provider = new firebase.auth.TwitterAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // };

  // facebookSignIn = () => {
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // };

  anonymousSignIn = () => {
    firebase.auth().signInAnonymously();
  }

  signOutFromApp = () => {
    firebase.auth().signOut();
  };

  // this will add a document to a collection where each key/value pair in the object is a field in the doc
  addDocumentToCollection = (collection, obj) => {
    this.db.collection(collection).add(obj);
  };

  // this will delete one document in the collection where the field is equal to the value given
  deleteDocumentFromCollection = (collection, field, value) => {
    this.db
      .collection(collection)
      .where(field, '==', value)
      .get()
      .then((snap) => snap.forEach((doc) => doc.ref.delete()));
  };

  // this will delete the field given from every document in the collection given
  deleteFieldFromDocument = (collection, docId, field) => {
    this.db
      .collection(collection)
      .doc(docId)
      .update({
        [field]: firebase.firestore.FieldValue.delete(),
      });
  };

  deleteEntireCollection = (collection) => {
    this.db
      .collection(collection)
      .get()
      .then((snap) => snap.forEach((doc) => doc.ref.delete()));
  };

  // this will update a single field with the given value
  updateDocument = (collection, docId, field, value) => {
    this.db
      .collection(collection)
      .doc(docId)
      .update({
        [field]: value,
      });
  };
}

export default Firebase;
