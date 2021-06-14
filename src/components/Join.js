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

import Button from './elements/Button';
import Input from './elements/Input';
import Text from './elements/Text';

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
    console.log({ room });

    await db.collection('players').doc(user.uid).update({ room: null });
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayRemove(uid),
      });

    setLeaveRoom(true);

    if (room.players.length <= 1) {
      await db
        .collection('rooms')
        .doc(roomid)
        .delete()
        .then(() => console.log(`Room ${roomid} deleted successfully`))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {uid && !playerJoined(uid) ? (
        <>
          <Text type='p' text='Please enter your name then join the game' />
          <Input
            className='my-2'
            placeholder='Enter your name'
            value={chosenName}
            onChange={(e) => setChosenName(e.target.value)}
          />
        </>
      ) : null}
      <Text className='my-5' type='h2' text='Players already joined:' />
      {players && players.length
        ? players
            .filter((player) => player.room === roomid)
            .map((player, i) => (
              <Text
                key={player.id}
                className={`border border-black py-2 min-w-full mb-1 rounded ${
                  i === 0 ? 'vip' : ''
                }`}
                type='p'
                text={player.name}
              />
            ))
        : 'NONE'}
      {uid && !playerJoined(uid) ? (
        <Button className='my-5' text='Join Game' handler={addPlayerJoinRoom} />
      ) : null}
      {leaveRoom ? (
        <Redirect to='/rooms' />
      ) : (
        <Button className='my-5' text='Leave Room' handler={leaveThisRoom} />
      )}
    </div>
  );
};

export default Join;
