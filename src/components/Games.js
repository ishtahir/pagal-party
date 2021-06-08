import { useContext } from 'react';

import { createRoomName } from '../utils/functions';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';
import { Redirect } from 'react-router';

const Games = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [games] = useCollectionData(
    db.collection('games').orderBy('createdAt'),
    { idField: 'id' }
  );
  const [rooms] = useCollectionData(
    db.collection('rooms').orderBy('createdAt'),
    { idField: 'id' }
  );

  const playerAssignedRoom =
    rooms &&
    rooms.length &&
    user &&
    rooms.filter((room) => room.vip === user.uid);

  const playerAssignedRoomExists =
    playerAssignedRoom && playerAssignedRoom.length > 0;

  const createRoom = (e) => {
    let newRoomName;
    let roomExists;

    do {
      newRoomName = createRoomName();
      roomExists =
        rooms && rooms.filter((room) => room.id === newRoomName).length > 0; //eslint-disable-line
    } while (roomExists);

    db.collection('rooms').doc(newRoomName).set({
      game: e.target.textContent,
      vip: user.uid,
      createdAt: new Date().toISOString(),
    });

    // db.collection('players').doc(user.uid).update({ room: newRoomName });
  };

  return (
    <div className='flex col center'>
      {console.log({ playerAssignedRoom, playerAssignedRoomExists })}
      {console.log(rooms && rooms[0])}
      {!playerAssignedRoomExists ? (
        <>
          <h1>Select game to play</h1>
          {games &&
            games.map((game) => (
              <button key={game.id} className='btn m2-t' onClick={createRoom}>
                {game.name}
              </button>
            ))}
        </>
      ) : (
        <Redirect push to={`/rooms/${playerAssignedRoom[0].id}`} />
      )}
      <Signout />
    </div>
  );
};

export default Games;
