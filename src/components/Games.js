import { useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import { Redirect } from 'react-router-dom';

import {
  createRoomName,
  getDate,
  secretHitlerSettings,
  scattergoriesSettings,
} from '../utils/functions';

import Button from './elements/Button';
import Text from './elements/Text';

const Games = () => {
  const { db } = useContext(FirebaseContext);

  const [games] = useCollectionData(
    db.collection('games').orderBy('createdAt'),
    { idField: 'id' }
  );

  const [rooms] = useCollectionData(
    db.collection('rooms').orderBy('createdAt'),
    { idField: 'id' }
  );

  const [roomCreated, setRoomCreated] = useState('');
  const [gameSelected, setGameSelected] = useState('');
  const [connectToRoom, setConnectToRoom] = useState(false);

  const createRoom = async (e) => {
    const game = e.target.textContent;
    setGameSelected(game);

    let newRoomName;
    let roomExists;

    do {
      newRoomName = createRoomName();
      roomExists =
        rooms && rooms.filter((room) => room.id === newRoomName).length > 0; //eslint-disable-line
    } while (roomExists);

    setRoomCreated(newRoomName);

    await db.collection('rooms').doc(newRoomName).set({
      game,
      players: [],
      createdAt: getDate(),
    });

    if (gameSelected === 'Secret Hitler') {
      await db
        .collection('rooms')
        .doc(newRoomName)
        .update(secretHitlerSettings());
    } else if (gameSelected === 'Scattergories') {
      await db
        .collection('rooms')
        .doc(newRoomName)
        .update(scattergoriesSettings());
    }

    setConnectToRoom(true);
  };

  return (
    <div className='games flex flex-col justify-center items-center h-2/4'>
      {!connectToRoom ? (
        <>
          <Text className='my-5' type='h2' text='Select game to play' />
          {games &&
            games.map((game) => (
              <Button
                key={game.id}
                className='my-5'
                text={game.name}
                handler={createRoom}
              />
            ))}
        </>
      ) : (
        <Redirect
          push
          to={`/rooms/${roomCreated}/${gameSelected
            .toLowerCase()
            .split(' ')
            .join('-')}`}
        />
      )}
    </div>
  );
};

export default Games;
