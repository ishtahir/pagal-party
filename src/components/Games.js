import { useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import { Redirect, useParams } from 'react-router-dom';

import {
  secretHitlerSettings,
  scattergoriesSettings,
} from '../utils/functions';

import Button from './elements/Button';
import Text from './elements/Text';

const Games = () => {
  const { db } = useContext(FirebaseContext);
  const { roomid } = useParams();

  const [games] = useCollectionData(
    db.collection('games').orderBy('createdAt'),
    { idField: 'id' }
  );

  const [rooms] = useCollectionData(
    db.collection('rooms').orderBy('createdAt'),
    { idField: 'id' }
  );
  const gameSelected =
    rooms && rooms.length && rooms.filter((room) => room.id === roomid)[0].game;

  const addGameToRoom = async (e) => {
    const game = e.target.textContent;
    if (game === 'Secret Hitler') {
      await db.collection('rooms').doc(roomid).update(secretHitlerSettings());
    } else if (game === 'Scattergories') {
      await db.collection('rooms').doc(roomid).update(scattergoriesSettings());
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {!gameSelected ? (
        <>
          <Text className='my-5' type='h2' text='Select game to play' />
          {games &&
            games.map((game) => (
              <Button
                key={game.id}
                className='my-5'
                text={game.name}
                handler={addGameToRoom}
              />
            ))}
        </>
      ) : (
        <Redirect
          push
          to={`/rooms/${roomid}/games/${gameSelected
            .toLowerCase()
            .split(' ')
            .join('-')}`}
        />
      )}
    </div>
  );
};

export default Games;
