import { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Join = ({ roomid }) => {
  const { db, addDocumentToCollection } = useContext(FirebaseContext);

  const [rooms] = useCollectionData(
    db.collection('rooms').orderBy('createdAt'),
    { idField: 'id' }
  );
  const [players] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    { idField: 'id' }
  );
  const roomPlayers = () => {
    if (rooms && rooms.length) {
      const myRoom = rooms.filter((room) => room.id === roomid)[0];
      return myRoom.hasOwnProperty('players') ? myRoom.players : undefined;
    }
  };

  const [chosenName, setChosenName] = useState('');
  const [localName, setLocalName] = useState('');

  useEffect(() => {
    const nameChosen = localStorage.getItem('chosenName');
    const idRoom = localStorage.getItem('roomid');

    if (nameChosen && idRoom === roomid) {
      setLocalName(nameChosen);
    }
  }, []); // eslint-disable-line

  const checkNameInPlayers = (name) =>
    players &&
    players.length &&
    players.filter((player) => player.name === name).length > 0;

  const playerJoined = (name) => {
    const players = roomPlayers();
    if (players)
      return players.filter((player) => player === name).length === 1;
  };

  const addPlayerJoinRoom = async () => {
    if (checkNameInPlayers(chosenName)) {
      return alert(
        'This name is already taken, please choose a different name'
      );
    }
    const player = {
      name: chosenName,
      room: roomid,
      createdAt: new Date().toISOString(),
    };
    await addDocumentToCollection('players', player);
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayUnion(chosenName),
      });
    localStorage.setItem('chosenName', chosenName);
    localStorage.setItem('roomid', roomid);
    setChosenName('');
  };

  return (
    <div className='flex center col join-wrap'>
      {!playerJoined(localName) && (
        <>
          <p className='m2-y'>
            If you would like to choose a custom name, type below and press
            'Join Game'.
          </p>
          <input
            className='input m2-b'
            type='text'
            placeholder='Enter your name'
            value={chosenName}
            onChange={(e) => setChosenName(e.target.value)}
          />
        </>
      )}
      <p className='gr-text'>Players already joined:</p>
      {roomPlayers() &&
        roomPlayers().length &&
        roomPlayers().map((player, i) => (
          <p
            key={`player${i}`}
            className={i === 0 ? 'gr-player-name vip' : 'gr-player-name'}
          >
            {player}
          </p>
        ))}
      {playerJoined(localName) ? null : (
        <button className='btn' onClick={addPlayerJoinRoom}>
          Join Game
        </button>
      )}
      {roomPlayers() &&
        roomPlayers().length &&
        roomPlayers()[0] === localName && (
          <button className='btn start-btn'>Start Game</button>
        )}
    </div>
  );
};

export default Join;
