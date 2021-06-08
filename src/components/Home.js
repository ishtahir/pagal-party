import { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import Header from './Header';
import Signin from './Signin';

const Home = () => {
  const { db } = useContext(FirebaseContext);
  const roomsRef = db.collection('rooms');
  const [rooms] = useCollectionData(roomsRef, {
    idField: 'id',
  });
  const [roomToJoin, setRoomToJoin] = useState('');
  const [connectToRoom, setConnectToRoom] = useState(false);

  const joinRoom = () => {
    if (roomToJoin.length < 4)
      return alert(
        'Room names must be 4 characters long, please enter correct room name.'
      );
    console.log({ rooms });
    const myRoom =
      rooms && rooms.length && rooms.filter((room) => room.id === roomToJoin);
    console.log({ myRoom });
    if (myRoom.length) {
      setConnectToRoom(true);
    } else {
      alert(
        `Room ${roomToJoin} does not exist, please enter correct room name.`
      );
    }
  };

  return (
    <div className='flex col center'>
      <Header />
      {!connectToRoom ? (
        <>
          <h2 className='rooms-title m5-t'>Create a new room</h2>
          <Signin />
          <h2 className='rooms-title m5-t'>Join an existing room</h2>
          <input
            type='text'
            className='input m2-b'
            placeholder='Enter room name'
            maxLength='4'
            value={roomToJoin}
            onChange={(e) => setRoomToJoin(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
          />
          <button className='btn' onClick={joinRoom}>
            Join
          </button>
        </>
      ) : (
        <Redirect push to={`/rooms/${roomToJoin}`} />
      )}
    </div>
  );
};

export default Home;
