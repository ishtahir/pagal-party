import { useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import { Redirect, useParams } from 'react-router-dom';

const Games = (props) => {
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
    await db.collection('rooms').doc(roomid).update({ game });
  };

  return (
    <div className='flex col center'>
      {!gameSelected ? (
        <>
          <h1>Select game to play</h1>
          {games &&
            games.map((game) => (
              <button
                key={game.id}
                className='btn m2-t'
                onClick={addGameToRoom}
              >
                {game.name}
              </button>
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
