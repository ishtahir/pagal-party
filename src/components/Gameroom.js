import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import { createHitler } from '../utils/functions';

import Cards from './Cards';
import Vote from './Vote';
import VIPMenu from './VIPMenu';

const Gameroom = () => {
  const { db, updateSettings } = useContext(FirebaseContext);
  const { user, provider } = useContext(AuthContext);

  const playersRef = db.collection('players');
  const [players] = useCollectionData(playersRef.orderBy('createdAt'), {
    idField: 'id',
  });

  const vip = players && players.length ? players[0] : null;

  const settingsRef = db.collection('settings');
  const [gameSettings] = useCollectionData(settingsRef, { idField: 'id' });

  const gameStarted = gameSettings && gameSettings[0].gameStarted;
  const vote = gameSettings && gameSettings[0].voteTime;
  const prez = gameSettings && gameSettings[0].president;
  const chance = gameSettings && gameSettings[0].chancellor;

  const [showVIPmenu, setShowVIPmenu] = useState(false);

  const shortEmail = () =>
    provider === 'google' ? user.email.split('@')[0] : user.displayName;

  const addPlayer = async () => {
    const { uid, photoURL } = user;
    await playersRef.add({
      name: shortEmail(),
      uid,
      photoURL,
      createdAt: new Date().toISOString(),
    });
  };

  const startGame = async () => {
    if (players.length < 5 || players.length > 10)
      return alert(
        `There can only be between 5 and 10 players. Currently there are ${players.length} players.`
      );

    const envelopes = createHitler(players.length);

    for (let player of players) {
      playersRef
        .where('uid', '==', player.uid)
        .get()
        .then((snap) =>
          snap.forEach((doc) => doc.ref.update(envelopes.shift()))
        )
        .catch(console.error);
    }
    if (!gameStarted) {
      await updateSettings('gameStarted', true);
    }
  };

  return (
    <div className='wrap flex col center-y gr'>
      {!gameStarted ? (
        <div className='gr-join flex col center'>
          <p className='gr-text'>Players already joined:</p>
          {players &&
            players.length > 0 &&
            players.map((player) => (
              <p
                key={player.uid}
                className={
                  vip && player.uid === vip.uid
                    ? 'gr-player-name vip'
                    : 'gr-player-name'
                }
              >
                {player.name}
              </p>
            ))}
          {players &&
          players.length &&
          players.filter((player) => user && player.uid === user.uid).length ===
            0 ? (
            <button className='btn' onClick={addPlayer}>
              Join Game
            </button>
          ) : null}
          {vip && user && vip.uid === user.uid && !gameStarted && (
            <button className='btn start-btn' onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      ) : (
        <>
          {vip && vip.uid === user.uid && (
            <button
              className='btn gr-show-vip-btn'
              onClick={() => setShowVIPmenu(!showVIPmenu)}
            >
              {showVIPmenu ? 'Hide' : 'Show'} VIP Menu
            </button>
          )}
          {vote && prez && chance ? (
            <Vote
              vip={vip}
              prez={prez}
              chance={chance}
              shortEmail={shortEmail}
            />
          ) : (
            <>
              {vip && vip.uid === user.uid && showVIPmenu ? (
                <VIPMenu players={players} setShowVIPmenu={setShowVIPmenu} />
              ) : (
                <Cards
                  player={
                    players &&
                    players.length &&
                    players.filter((player) => player.uid === user.uid)[0]
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Gameroom;
