import { useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import googleImg from '../assets/google_button.png';
import twitterImg from '../assets/twitter_button.png';

const Signin = () => {
  const firebase = useContext(FirebaseContext);
  const { googleSignIn, twitterSignIn } = firebase;

  return (
    <div className='signin-wrap col'>
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
  );
};

export default Signin;
