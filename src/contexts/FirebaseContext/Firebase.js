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

  signOut = () => {
    firebase.auth().signOut();
  };

  deleteFromCollection = async (collection, key, val) => {
    await this.db
      .collection(collection)
      .where(key, '==', val)
      .get()
      .then((snap) => snap.forEach((shot) => shot.ref.delete()));
  };
}

export default Firebase;
