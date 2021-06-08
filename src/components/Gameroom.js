import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Header from './Header';
import Join from './Join';

const Gameroom = () => {
  const { roomid } = useParams();
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const roomsRef = db.collection('rooms');
  const [rooms, loadRooms] = useCollectionData(roomsRef, { idField: 'id' });
  const room = rooms && rooms.filter((room) => room.id === roomid)[0];

  return user ? (
    <div className='flex col center'>
      <Header roomid={roomid} />
      {loadRooms ? (
        <div className='loading'></div>
      ) : room ? (
        <div className='m5-y flex col center'>
          <h1>Room</h1>
          <div className='gr-roomname'>{roomid}</div>
          <h2 className='m5-y gr-game'>{room && room.game}</h2>
          <Join roomid={roomid} />
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  ) : (
    <Redirect to='/' />
  );
};

export default Gameroom;
