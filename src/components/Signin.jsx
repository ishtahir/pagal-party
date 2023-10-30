import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Button from '../components/elements/Button';

const Signin = () => {
  const { user, loading } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <>
      {loading ? (
        <div className='loading'></div>
      ) : !user ? (
          <div className='signin flex flex-col justify-center items-center'>
            <Button className=" bg-pp-orange w-10/12" text="Sign in anonymously" handler={() => firebase.auth().signInAnonymously()} />
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
