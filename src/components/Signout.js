import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

const Signout = () => {
  const { user } = useContext(AuthContext);
  const {
    db,
    signOutFromApp,
    deleteDocumentFromCollection,
    // deleteFieldFromDocument,
    // gameOver,
  } = useContext(FirebaseContext);

  const settingsRef = db.collection('settings');
  const [gameSettings] = useCollectionData(settingsRef, { idField: 'id' });

  const gameStarted = gameSettings && gameSettings[0].gameStarted;

  const handleClick = () => {
    const { uid } = user;

    if (gameStarted) {
      // const approved = window.confirm(
      //   '⛔️WARNING⛔️: By signing out, the current game will end for all players! Do you still want to proceed?'
      // );
      // console.log({ approved });
      // if (approved) {
      //   console.log('inside approved block');
      //   gameOver();
      //   deleteFieldFromDocument('players', 'cards');
      //   deleteDocumentFromCollection('players', 'uid', uid);
      //   signOutFromApp();
      // }
      alert('PLEASE NOTIFY THE VIP TO END THE GAME SO YOU CAN SIGN OUT!');
    } else {
      deleteDocumentFromCollection('players', 'uid', uid);
      signOutFromApp();
    }
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
