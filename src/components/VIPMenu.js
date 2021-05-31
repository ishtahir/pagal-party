import { useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import Government from './Government';

const VIPMenu = ({ players, setShowVIPmenu }) => {
  const { db, updateSettings, deleteFieldFromDocument } =
    useContext(FirebaseContext);

  const settingsRef = db.collection('settings');
  const [gameSettings] = useCollectionData(settingsRef, { idField: 'id' });

  const vote = gameSettings && gameSettings[0].voteTime;
  const prez = gameSettings && gameSettings[0].president;
  const chance = gameSettings && gameSettings[0].chancellor;

  const voteTime = async () => {
    if (prez && chance) {
      await updateSettings('voteTime', true);
    } else {
      alert(
        'You need to select a president and chancellor before you can vote.'
      );
    }
  };

  const endGame = async () => {
    const approved = window.confirm(
      '⛔️ Are you sure you want to end this game for all players? ⛔️'
    );

    if (approved) {
      await updateSettings('gameStarted', false);
      if (vote) await updateSettings('voteTime', false);
      if (prez) await updateSettings('president', null);
      if (chance) await updateSettings('chancellor', null);

      deleteFieldFromDocument('players', 'cards');

      setShowVIPmenu(false);
    }
  };

  return (
    <div className='vip-menu flex col center'>
      <Government players={players} />
      <button
        className={
          !prez || !chance ? 'btn vote-btn disabled-btn' : 'btn vote-btn'
        }
        onClick={voteTime}
      >
        Open Voting
      </button>
      <button className='btn end-btn' onClick={endGame}>
        End Game
      </button>
    </div>
  );
};

export default VIPMenu;