import { useState, useContext } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useModal } from '../contexts/ModalContext/ModalContext';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Redirect } from 'react-router-dom';

import Text from './elements/Text';
import Button from './elements/Button';
import Input from './elements/Input';

const Rooms = () => {
  const { db } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);
  const modal = useModal();

  const roomsRef = db.collection('rooms');
  const [rooms, loadRooms] = useCollectionData(roomsRef, {
    idField: 'id',
  });

  const [roomToJoin, setRoomToJoin] = useState('');
  const [roomChoice, setRoomChoice] = useState('');

  const joinRoom = () => {
    if (roomToJoin.length < 4) {
      return modal({
        title: 'Incorrect Room Code',
        text: 'Room names must be 4 characters long, please enter correct room code.',
      });
    }

    const myRoom =
      rooms && rooms.length && rooms.filter((room) => room.id === roomToJoin);

    if (myRoom.length) {
      if (myRoom[0].gameStarted && !myRoom[0].players.includes(user.uid)) {
        setRoomToJoin('');
        return modal({
          title: 'Room Occupied',
          text: `Room ${roomToJoin} already has a game in progress, please wait for that game to finish, join another room or create a new room.`,
        });
      }
      setRoomChoice('join');
    } else {
      modal({
        title: 'Invalid Room',
        text: `Room ${roomToJoin} does not exist, please enter correct room name.`,
      });
    }
  };

  const handleRoomCreate = () => {
    setRoomChoice('create');
  };

  return (
    <div className='rooms flex flex-col justify-center items-center h-3/4'>
      {loadRooms || loading ? (
        <div className='loading' />
      ) : user ? (
        !roomChoice ? (
          <>
            <Text className='my-5' type='h2' text='Create a room' />
            <Button
              className='mb-10'
              text='Create Room'
              handler={handleRoomCreate}
            />
            <Text className='my-5' type='h2' text='Join a room' />
            <Input
              className='w-40 mb-2 text-center font-bold tracking-wide'
              placeholder='Enter code'
              value={roomToJoin}
              onChange={(e) => setRoomToJoin(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
              rest={{ maxLength: '4' }}
            />
            <Button className='mb-10' text='Join Room' handler={joinRoom} />
          </>
        ) : roomChoice === 'join' ? (
          <Redirect push to={`/rooms/${roomToJoin}/game`} />
        ) : (
          <Redirect push to='/games/selection' />
        )
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
};

export default Rooms;
