import { useState, useContext } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import firebase from 'firebase/app';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

import { getDate } from '../utils/functions';
import { Redirect } from 'react-router';

const Join = ({ roomid }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  let uid;
  if (user) {
    uid = user.uid;
  } else {
    uid = '';
  }

  const [players] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    { idField: 'id' }
  );

  const [room, loadRoom] = useDocumentData(db.collection('rooms').doc(roomid), {
    idField: 'id',
  });

  const [chosenName, setChosenName] = useState('');
  const [leaveRoom, setLeaveRoom] = useState(false);

  const playerJoined = (uid) => {
    if (!loadRoom) {
      return room.players.includes(uid);
    }
  };

  const addPlayerJoinRoom = async () => {
    if (chosenName.length === 0) {
      return alert('Please enter your name, then join the game.');
    }
    const player = {
      name: chosenName,
      room: roomid,
      createdAt: getDate(),
    };
    await db.collection('players').doc(uid).set(player);
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayUnion(uid),
      });

    setChosenName('');
  };

  const leaveThisRoom = async () => {
    await db.collection('players').doc(user.uid).update({ room: null });
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayRemove(uid),
      });

    setLeaveRoom(true);
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
      {leaveRoom ? (
        <Redirect to='/rooms' />
      ) : (
        <button className='btn m5-t' onClick={leaveThisRoom}>
          Leave Room
        </button>
      )}
    </div>
  );
};

export default Join;
