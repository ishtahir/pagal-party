import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

const Signout = () => {
  const { user } = useContext(AuthContext);
  const { signOut, deleteFromCollection } = useContext(FirebaseContext);

  return user ? (
    <button
      className='btn signout-btn'
      onClick={async () => {
        await deleteFromCollection('players', 'uid', user.uid);
        await signOut();
      }}
    >
      Sign out
    </button>
  ) : (
    <Redirect to='/' />
  );
};

export default Signout;
