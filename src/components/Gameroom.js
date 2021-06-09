import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Join from './Join';
import SecretHitler from './games/secret-hitler/SecretHitler';
import GameOfThings from './games/game-of-things/GameOfThings';

const Gameroom = () => {
  const { roomid } = useParams();
  const { db } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);

  const roomRef = db.doc(`rooms/${roomid}`);
  const [room, loadRoom] = useDocumentData(roomRef, {
    idField: 'id',
  });

  const game = room && room.game;
  const gameStarted = room && room.gameStarted;

  const showGame = (game) => {
    if (game === 'Secret Hitler') {
      return <SecretHitler roomData={room} />;
    } else if (game === 'The Game of Things') {
      return <GameOfThings roomData={room} />;
    }
  };

  return loading ? (
    <div className='loading'></div>
  ) : user ? (
    <div className='flex col center'>
      {loadRoom ? (
        <div className='loading'></div>
      ) : room ? (
        <div className='m5-y flex col center'>
          <h1>Room</h1>
          <div className='gr-roomname'>{roomid}</div>
          <h2 className='m5-y gr-game'>{room && room.game}</h2>
          {!gameStarted ? <Join roomid={roomid} /> : null}
          {showGame(game)}
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
