import { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import firebase from 'firebase/app';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Button from './elements/Button';

const Signout = () => {
  const { db, signOutFromApp, deleteDocumentFromCollection } =
    useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const roomid = useLocation().pathname.split('/')[2];

  const [room] = useDocumentData(db.doc(`rooms/${roomid}`), { idField: 'id' });

  const owner = user && room && room.owner === user.uid;
  const gameStarted = room && room.gameStarted;

  const handleClick = async () => {
    const { uid } = user;

    if (gameStarted)
      return alert(
        '❌ Please notify the VIP to end the game so you can log out! ❌'
      );

    if (roomid) {
      if (owner) {
        await deleteDocumentFromCollection('rooms', 'owner', uid);
        await deleteDocumentFromCollection('players', 'room', roomid);
      } else {
        await deleteDocumentFromCollection('players', 'uid', uid);
        await db
          .collection('rooms')
          .doc(roomid)
          .update({
            players: firebase.firestore.FieldValue.arrayRemove(uid),
          });
      }
    }
    await signOutFromApp();
  };

  return user ? (
    <Button
      className='mr-5 !bg-blue-600 hover:!bg-white hover:!text-blue-600'
      text='Sign out'
      handler={handleClick}
    />
  ) : (
    <Redirect push to='/' />
  );
};

export default Signout;
