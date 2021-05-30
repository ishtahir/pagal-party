import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import googleImg from '../assets/google_button.png';
import twitterImg from '../assets/twitter_button.png';

const Signin = () => {
  const { googleSignIn, twitterSignIn } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div className='loading'></div>
      ) : !user ? (
        <div className='wrap col'>
          <h1 className='signin-title'>Welcome to Playper</h1>
          <div className='flex col center signin-img-wrap'>
            <img
              onClick={googleSignIn}
              src={googleImg}
              className='signin-img'
              alt='Google'
            />
            <img
              onClick={twitterSignIn}
              src={twitterImg}
              className='signin-img'
              alt='Twitter'
            />
          </div>
        </div>
      ) : (
        <Redirect to='/gameroom' />
      )}
    </>
  );
};

export default Signin;
