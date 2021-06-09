import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Signin = () => {
  const { user, loading } = useContext(AuthContext);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <>
      {loading ? (
        <div className='loading'></div>
      ) : !user ? (
        <div className='wrap col'>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <Redirect push to='/rooms' />
      )}
    </>
  );
};

export default Signin;
