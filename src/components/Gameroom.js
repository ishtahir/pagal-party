import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import { createHitler } from '../utils/functions';

import Header from './Header';
import Cards from './Cards';
import Vote from './Vote';
import VIPMenu from './VIPMenu';

const Gameroom = () => {
  const { db, updateSettings, addDocumentToCollection } =
    useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

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
  const [chosenName, setChosenName] = useState('');

  const getName = () => {
    if (user && players && players.length) {
      const person = players.filter((player) => player.uid === user.uid)[0];
      return person && person.name;
    }
    return '';
  };

  const addPlayer = () => {
    const { uid } = user;
    const name = chosenName ? chosenName : user.displayName;
    const player = {
      name,
      uid,
      createdAt: new Date().toISOString(),
    };

    addDocumentToCollection('players', player);
  };

  const playerJoined = (uid) => {
    if (players)
      return players.filter((player) => player.uid === uid).length === 1;
  };

  const startGame = () => {
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
      updateSettings('gameStarted', true);
    }
  };

  return (
    <>
      <Header name={getName()} />
      <div className='wrap flex col center-y gr'>
        {!gameStarted ? (
          <div className='gr-join flex col center'>
            {user && !playerJoined(user.uid) && (
              <div className='flex center col input-wrap'>
                <p>
                  If you would like to choose your own name, type below and
                  press 'Join Game'. Otherwise, the default name from your login
                  will be used.
                </p>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter your name'
                  value={chosenName}
                  onChange={(e) => setChosenName(e.target.value)}
                />
              </div>
            )}
            <p className='gr-text'>Players already joined:</p>
            {players &&
              players.length &&
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
            {players && user && playerJoined(user.uid) ? null : (
              <button className='btn' onClick={addPlayer}>
                Join Game
              </button>
            )}
            {vip && user && vip.uid === user.uid && !gameStarted && (
              <button className='btn start-btn' onClick={startGame}>
                Start Game
              </button>
            )}
          </div>
        ) : (
          <>
            {vip && vip.uid === user.uid && !vote && (
              <button
                className='btn gr-show-vip-btn m5-y'
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
                name={getName()}
                isVip={vip && user && vip.uid === user.uid}
                players={players.length}
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
                    isVip={vip && user && vip.uid === user.uid}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Gameroom;
