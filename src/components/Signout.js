import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import app from 'firebase/app';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

const Signout = () => {
  const { user, loading } = useContext(AuthContext);

  return loading ? (
    <div className='loading'></div>
  ) : user ? (
    <button
      className='btn signout-btn'
      onClick={async () => await app.auth().signOut()}
    >
      Sign out
    </button>
  ) : (
    <Redirect to='/' />
  );
};

export default Signout;
