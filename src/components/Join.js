import { useState, useContext } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getDate } from '../utils/functions';

const Join = ({ roomid }) => {
  const { db, addDocumentToCollection } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  let uid;
  if (user) {
    uid = user.uid;
  } else {
    uid = '';
  }

  const [rooms] = useCollectionData(
    db.collection('rooms').orderBy('createdAt'),
    { idField: 'id' }
  );
  const [players] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    { idField: 'id' }
  );
  const roomPlayers = () => {
    if (rooms && rooms.length) {
      const myRoom = rooms.filter((room) => room.id === roomid)[0];
      return myRoom.players;
    }
    return [];
  };

  const [chosenName, setChosenName] = useState('');

  const playerJoined = (uid) => {
    if (players && players.length) {
      const playersInRoom = players.filter((player) => player.uid === uid);
      return playersInRoom.length > 0;
    }
    return false;
  };

  const addPlayerJoinRoom = async () => {
    let confirm;
    if (chosenName.length === 0) {
      confirm = window.confirm(
        `You didn't enter a name, would you like to go with ${user.displayName}?`
      );
    }
    const player = {
      name: confirm ? user.displayName : chosenName,
      room: roomid,
      uid,
      createdAt: getDate(),
    };
    await addDocumentToCollection('players', player);
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayUnion(uid),
      });

    setChosenName('');
  };

  return (
    <div className='flex center col join-wrap'>
      {uid && !playerJoined(uid) ? (
        <>
          <p className='m2-y'>
            If you would like to choose a custom name, type below and press
            'Join Game'.
          </p>
          <input
            className='input m2-b'
            type='text'
            placeholder='Enter your name'
            value={chosenName}
            onChange={(e) => setChosenName(e.target.value)}
          />
        </>
      ) : null}
      <p className='gr-text'>Players already joined:</p>
      {players && players.length
        ? players
            .filter((player) => player.room === roomid)
            .map((player, i) => (
              <p
                key={player.uid}
                className={i === 0 ? 'gr-player-name vip' : 'gr-player-name'}
              >
                {player.name}
              </p>
            ))
        : null}
      {uid && !playerJoined(uid) ? (
        <button className='btn' onClick={addPlayerJoinRoom}>
          Join Game
        </button>
      ) : null}
      {uid &&
      roomPlayers() &&
      roomPlayers().length &&
      roomPlayers()[0] === uid ? (
        <button className='btn start-btn'>Start Game</button>
      ) : null}
    </div>
  );
};

export default Join;
