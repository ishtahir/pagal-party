import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

const Signout = ({ roomid }) => {
  const { user } = useContext(AuthContext);
  const { signOutFromApp, deleteDocumentFromCollection } =
    useContext(FirebaseContext);

  const handleClick = async () => {
    const { uid } = user;

    if (roomid) {
      await deleteDocumentFromCollection('rooms', 'vip', uid);
      await deleteDocumentFromCollection('players', 'room', roomid);
      await signOutFromApp();
    }

    localStorage.clear();
  };

  return user ? (
    <button className='btn signout-btn' onClick={handleClick}>
      Sign out
    </button>
  ) : (
    <Redirect to='/' />
  );
};

export default Signout;
