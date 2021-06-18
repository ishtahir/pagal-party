import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Join from './Join';
import SecretHitler from './games/secret-hitler/SecretHitler';

import Text from './elements/Text';
import Scattergories from './games/scattergories/Scattergories';

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
    } else if (game === 'Scattergories') {
      return <Scattergories roomData={room} />;
    }
  };

  return loading ? (
    <div className='loading'></div>
  ) : user ? (
    <>
      {loadRoom ? (
        <div className='loading'></div>
      ) : room ? (
        <div className='gameroom flex flex-col justify-center items-center my-10'>
          <div className='glass rounded-xl p-10 text-gray-50'>
            <Text type='h2' text='ROOM' />
            <Text
              className='gr-roomname !text-7xl my-5'
              type='h1'
              text={roomid}
            />
            <Text type='h3' text='is playing' />
            <Text
              className='gr-game my-5 !text-4xl text-purple-800 border-4 border-purple-800 border-solid p-4 rounded-md text-shadow'
              type='h2'
              text={room && room.game}
            />
          </div>
          {!gameStarted ? <Join roomid={roomid} /> : null}
          {showGame(game)}
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default Gameroom;
