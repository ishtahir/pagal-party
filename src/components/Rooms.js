import { useState, useContext } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { createRoomName, getDate } from '../utils/functions';
import { Redirect } from 'react-router-dom';

const Rooms = () => {
  const { db } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);

  const roomsRef = db.collection('rooms');
  const [rooms, loadRooms] = useCollectionData(roomsRef, {
    idField: 'id',
  });

  const [roomToJoin, setRoomToJoin] = useState('');
  const [roomCreated, setRoomCreated] = useState('');
  const [connectToRoom, setConnectToRoom] = useState(false);

  const joinRoom = () => {
    if (roomToJoin.length < 4)
      return alert(
        'Room names must be 4 characters long, please enter correct room name.'
      );

    const myRoom =
      rooms && rooms.length && rooms.filter((room) => room.id === roomToJoin);

    if (myRoom.length) {
      if (myRoom[0].gameStarted && !myRoom[0].players.includes(user.uid)) {
        return alert(
          `Room ${roomToJoin} already has a game in progress, please join or create another room.`
        );
      }
      setConnectToRoom(true);
    } else {
      alert(
        `Room ${roomToJoin} does not exist, please enter correct room name.`
      );
    }
  };

  const createRoom = async () => {
    let newRoomName;
    let roomExists;

    do {
      newRoomName = createRoomName();
      roomExists =
        rooms && rooms.filter((room) => room.id === newRoomName).length > 0; //eslint-disable-line
    } while (roomExists);

    setRoomCreated(newRoomName);

    await db.collection('rooms').doc(newRoomName).set({
      owner: user.uid,
      game: null,
      players: [],
      createdAt: getDate(),
    });

    setConnectToRoom(true);
  };

  return (
    <div className='flex col center'>
      {loadRooms || loading ? (
        <div className='loading' />
      ) : user ? (
        !connectToRoom ? (
          <>
            <h1 className='m5-t m2-b'>Create a room</h1>
            <button className='btn' onClick={createRoom}>
              Create Room
            </button>
            <h1 className='m5-y m2-b'>Join a room</h1>
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
              Join Room
            </button>
          </>
        ) : (
          <Redirect
            push
            to={`/rooms/${roomToJoin ? roomToJoin : roomCreated}/games`}
          />
        )
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
};

export default Rooms;
