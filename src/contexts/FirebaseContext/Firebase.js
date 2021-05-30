import app from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from './config';

class Firebase {
  constructor() {
    this.app = app.initializeApp(firebaseConfig);
  }

  googleSignIn = async () => {
    const provider = new app.auth.GoogleAuthProvider();
    app.auth().signInWithRedirect(provider);
  };

  twitterSignIn = async () => {
    const provider = new app.auth.TwitterAuthProvider();
    app.auth().signInWithRedirect(provider);
  };
}

export default Firebase;
