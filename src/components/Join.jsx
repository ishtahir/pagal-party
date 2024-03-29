import { useContext, useState } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useModal } from '../contexts/ModalContext/ModalContext';

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

const Join = ({ roomid, roomData }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const modal = useModal();

  const uid = user ? user.uid : '';

  const [players] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    { idField: 'id' },
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
      return modal({
        text: 'Please enter your name, then join the game.',
        title: 'No Name Provided',
      });
    }
    const player = {
      name: chosenName,
      room: roomid,
      uid,
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
    if (uid && playerJoined(uid)) {
      await db
        .collection('players')
        .doc(user.uid)
        .update({ room: null, name: '' });

      await db
        .collection('rooms')
        .doc(roomid)
        .update({
          players: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    }

    if (room.players.length <= 1) {
      await db
        .collection('rooms')
        .doc(roomid)
        .delete()
        .then(() => console.log(`Room ${roomid} deleted successfully`))
        .catch((err) => console.error(err));
    }

    setLeaveRoom(true);
  };

  return (
    <div className='join flex flex-col justify-center items-center my-10 p-5'>
      {uid && !playerJoined(uid) ? (
        <>
          <Text type='p' text='Please enter your name then join the game' />
          <Input
            className='my-2 '
            placeholder='Enter your name'
            value={chosenName}
            onChange={(e) => setChosenName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayerJoinRoom()}
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
                className={`border border-black py-2 min-w-full mb-1 rounded bg-gray-50 text-black ${
                  i === 0 ? 'vip' : ''
                } ${user.uid === player.id ? 'text-red-500 font-bold' : ''}`}
                type='p'
                text={
                  user.uid === player.id ? (
                    <span className='you'>{player.name}</span>
                  ) : (
                    player.name
                  )
                }
              />
            ))
        : 'NONE'}
      {uid && !playerJoined(uid) ? (
        <Button
          className='my-5 bg-pp-blue'
          text='Join Game'
          handler={addPlayerJoinRoom}
        />
      ) : null}
      {leaveRoom && (
        <Redirect to='/rooms' />
      )}
      {roomData.players.includes(uid) && <Button
          className='my-5 bg-pp-pink hover:!bg-gray-300'
          text='Leave Room'
          handler={leaveThisRoom}
        />}
    </div>
  );
};

export default Join;
