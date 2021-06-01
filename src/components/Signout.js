import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

const Signout = () => {
  const { user } = useContext(AuthContext);
  const {
    db,
    signOut,
    deleteDocumentFromCollection,
    updateSettings,
    deleteFieldFromDocument,
  } = useContext(FirebaseContext);

  const settingsRef = db.collection('settings');
  const [gameSettings] = useCollectionData(settingsRef, { idField: 'id' });

  const gameStarted = gameSettings && gameSettings[0].gameStarted;
  const vote = gameSettings && gameSettings[0].voteTime;
  const prez = gameSettings && gameSettings[0].president;
  const chance = gameSettings && gameSettings[0].chancellor;

  const handleClick = () => {
    const { uid } = user;
    deleteDocumentFromCollection('players', 'uid', uid);

    if (gameStarted) {
      const approved = window.confirm(
        '⛔️WARNING⛔️: By signing out, the current game will end for all players! Do you still want to proceed?'
      );

      if (approved) {
        updateSettings('gameStarted', false);
        if (vote) updateSettings('voteTime', false);
        if (prez) updateSettings('president', null);
        if (chance) updateSettings('chancellor', null);
        deleteFieldFromDocument('players', 'cards');
      }
    }

    signOut();
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
