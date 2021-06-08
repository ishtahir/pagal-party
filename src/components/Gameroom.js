import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';
import Join from './Join';

const Gameroom = () => {
  const { roomid } = useParams();
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const roomsRef = db.collection('rooms');
  const [rooms, loadRooms] = useCollectionData(roomsRef, { idField: 'id' });
  const room = rooms && rooms.filter((room) => room.id === roomid)[0];

  return (
    <div className='flex col center'>
      {user ? <Signout roomid={roomid} /> : null}
      {loadRooms ? (
        <div className='loading'></div>
      ) : room ? (
        <>
          <h1>
            Room: <span className='gr-roomname'>{roomid}</span>
          </h1>
          <h2>{room && room.game}</h2>
          <Join roomid={roomid} />
        </>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
};

export default Gameroom;
