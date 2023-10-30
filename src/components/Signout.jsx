import { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import firebase from 'firebase/app';
import {
  useDocumentData,
  // useCollectionData,
} from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useModal } from '../contexts/ModalContext/ModalContext';

import Button from './elements/Button';

const Signout = () => {
  const { db, signOutFromApp, deleteDocumentFromCollection } =
    useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const modal = useModal();

  // const [players, loadPlayers] = useCollectionData(db.collection('players'), {
  //   idField: 'id',
  // });

  // const currentPlayer =
  //   !loading &&
  //   !loadPlayers &&
  //   players.filter((player) => player.id === user.uid);

  // const name =
  //   !loading && currentPlayer.length ? currentPlayer[0].name : user.displayName;
  const name = user.displayName;

  const roomid = useLocation().pathname.split('/')[2];

  const [room] = useDocumentData(db.doc(`rooms/${roomid}`), { idField: 'id' });

  const owner = user && room && room.owner === user.uid;
  const gameStarted = room && room.gameStarted;
 
  const { uid } = user;


  const leaveThisRoom = async () => {
    await db
      .collection('players')
      .doc(user.uid)
      .update({ room: null, name: '' });
    await db
      .collection('rooms')
      .doc(roomid)
      .update({
        players: firebase.firestore.FieldValue.arrayRemove(uid),
      });
    }

  const handleClick = async () => {

    if (gameStarted)
      return modal({
        title: 'Sign Out',
        text: 'Please notify the VIP to end the game so you can sign out.',
      });

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
    leaveThisRoom();
    await signOutFromApp();
  };

  return user ? (
    <Button
      className='mr-0 md:mr-5 bg-pp-pink'
      text={name ? `Sign out, ${name}` : 'Sign out'}
      handler={handleClick}
    />
  ) : (
    <Redirect push to='/' />
  );
};

export default Signout;
