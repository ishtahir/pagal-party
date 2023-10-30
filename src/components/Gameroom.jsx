import { useContext } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import {
  useDocumentData,
  useCollectionData,
} from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Join from './Join';
import Text from './elements/Text';
import SecretHitler from './games/secret-hitler/SecretHitler';

const Gameroom = () => {
  const { roomid } = useParams();
  const { db } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);

  const roomRef = db.doc(`rooms/${roomid}`);
  const [room, loadRoom] = useDocumentData(roomRef, {
    idField: 'id',
  });
  const [players, loadPlayers] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    {
      idField: 'id',
    }
  );

  const gamePlayers =
    !loadPlayers &&
    !loadRoom &&
    players.filter((player) => player.room === room.id);

  const vip = gamePlayers.length ? gamePlayers[0] : null;

  const game = room && room.game;
  const gameStarted = room && room.gameStarted;

  const showGame = (game) => {
    if (game === 'Secret Hitler') {
      return (
        <SecretHitler roomData={room} vip={vip} gamePlayers={gamePlayers} />
      );
    } 
    // else if (game === 'Scattergories') {
    //   return <Scattergories roomData={room} />;
    // }
  };

  return loading ? (
    <div className='loading'></div>
  ) : user ? (
    <>
      {loadRoom ? (
        <div className='loading'></div>
      ) : room ? (
        <div className={`gameroom flex flex-col justify-center items-center h-5/6`}>
          <div>
            <Text className='text-pp-green text-4xl' type='h3' text='ROOM' />
            <Text
              className='gr-roomname text-8xl text-center my-5 text-pp-yellow'
              type='h1'
              text={roomid}
            />
            <Text className='text-pp-green text-4xl' type='h3' text='is playing' />
            <Text
              className='gr-game my-5 !text-4xl text-pp-orange border-4 border-pp-orange border-solid p-4 rounded-md text-shadow'
              type='h2'
              text={room && room.game}
            />
          </div>
          {!gameStarted ? <Join roomid={roomid} roomData={room} /> : null}
          {!gameStarted && !loading && vip && vip.id === user.uid
            ? showGame(game)
            : null}
          {gameStarted ? showGame(game) : null}
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
