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
    firebase.auth().signInWithRedirect(provider);
  };

  twitterSignIn = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
}

export default Firebase;
