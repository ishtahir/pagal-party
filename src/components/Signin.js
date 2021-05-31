import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import google from '../assets/google.svg';
import twitter from '../assets/twitter.svg';
import facebook from '../assets/facebook.svg';

const Signin = () => {
  const { googleSignIn, twitterSignIn, facebookSignIn } =
    useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div className='loading'></div>
      ) : !user ? (
        <div className='wrap col'>
          <h1 className='signin-title'>Welcome to Playper</h1>
          <div className='flex col center signin-img-wrap'>
            <div
              className='signin-btn flex center google-btn'
              onClick={googleSignIn}
            >
              <img
                className='signin-btn-img'
                src={google}
                alt='Google signin button'
              />
              <span className='signin-btn-text'>Sign in with Google</span>
            </div>
            <div
              className='signin-btn flex center twitter-btn'
              onClick={twitterSignIn}
            >
              <img
                className='signin-btn-img'
                src={twitter}
                alt='Twitter signin button'
              />
              <span className='signin-btn-text'>Sign in with Twitter</span>
            </div>
            <div
              className='signin-btn flex center facebook-btn'
              onClick={facebookSignIn}
            >
              <img
                className='signin-btn-img'
                src={facebook}
                alt='Facebook signin button'
              />
              <span className='signin-btn-text'>Sign in with Facebook</span>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to='/gameroom' />
      )}
    </>
  );
};

export default Signin;
