import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import Join from './Join';

const Gameroom = () => {
  const { roomid } = useParams();
  const { db } = useContext(FirebaseContext);

  const roomsRef = db.collection('rooms');
  const [rooms, loading] = useCollectionData(roomsRef, { idField: 'id' });
  const room = rooms && rooms.filter((room) => room.id === roomid)[0];

  return (
    <div className='flex col center'>
      {loading ? (
        <div className='loading'></div>
      ) : room ? (
        <>
          <h1>Gameroom {roomid}</h1>
          <h2>{room && room.gameSelected}</h2>
          <Join />
        </>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
};

export default Gameroom;
