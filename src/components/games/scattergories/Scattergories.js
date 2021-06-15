import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { useParams } from 'react-router-dom';

// import { createHitler } from '../../../utils/functions';

// import Button from '../../elements/Button';

const Scattergories = ({ roomData }) => {
  const { db } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);
  const { roomid } = useParams();
  const [players, loadPlayers] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    {
      idField: 'id',
    }
  );
  const [showVIPmenu, setShowVIPmenu] = useState(false);

  const gamePlayers =
    roomData &&
    roomData.players &&
    roomData.players.length &&
    roomData.players.map(
      (uid) =>
        players && players.length && players.find((player) => player.id === uid)
    );

  const vip = gamePlayers && gamePlayers.length ? gamePlayers[0] : null;

  const gameStarted = roomData && roomData.gameStarted;

  return <div></div>;
};

export default Scattergories;
