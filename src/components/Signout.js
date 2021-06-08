import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const Signout = ({ roomid }) => {
  const { db, signOutFromApp, deleteDocumentFromCollection } =
    useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [rooms] = useCollectionData(db.collection('rooms'), { idField: 'id' });
  const roomExists =
    rooms && rooms.length && rooms.filter((room) => room.id === roomid);
  const owner =
    user && roomExists && roomExists.length && roomExists[0].owner === user.uid;

  const handleClick = async () => {
    const { uid } = user;

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
      await signOutFromApp();
    }
  };

  return user ? (
    <button className='btn signout-btn' onClick={handleClick}>
      Sign out
    </button>
  ) : (
    <Redirect push to='/' />
  );
};

export default Signout;
