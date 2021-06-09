import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { useParams } from 'react-router-dom';

import { createHitler } from '../../../utils/functions';

import Cards from '../secret-hitler/Cards';
import Vote from '../secret-hitler/Vote';
import VIPMenu from '../secret-hitler/VIPMenu';

const SecretHitler = ({ roomData }) => {
  const { db, updateDocument } = useContext(FirebaseContext);
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
        players &&
        players.length &&
        players.find((player) => player.uid === uid)
    );

  const vip = gamePlayers && gamePlayers.length ? gamePlayers[0] : null;
  const gameStarted = roomData && roomData.gameStarted;
  const getName = () => {
    if (user && gamePlayers && gamePlayers.length && loading) {
      const player = gamePlayers.filter((player) => player.uid === user.uid)[0];
      return player && player.hasOwnProperty('name') ? player.name : '';
    }
    return '';
  };
  const vote = roomData && roomData.voteTime;
  const prez = roomData && roomData.president;
  const chance = roomData && roomData.chancellor;

  const assignRoles = () => {
    // if (gamePlayers.length < 5 || gamePlayers.length > 10)
    if (gamePlayers.length !== 3)
      return alert(
        // `There can only be between 5 and 10 players. Currently there are ${gamePlayers.length} players.`
        `TEST MODE: There can only be 3 players. Currently there are ${gamePlayers.length} players.` // delete this
      );

    const envelopes = createHitler(gamePlayers.length);

    for (let player of gamePlayers) {
      db.collection('players')
        .where('uid', '==', player.uid)
        .get()
        .then((snap) =>
          snap.forEach((doc) => doc.ref.update(envelopes.shift()))
        )
        .catch(console.error);
    }
    if (!gameStarted) {
      updateDocument('rooms', roomid, 'gameStarted', true);
    }
  };

  return (
    <div className='flex col center'>
      {!gameStarted ? (
        vip && user && vip.uid === user.uid ? (
          <button className='btn start-btn' onClick={assignRoles}>
            Start Game
          </button>
        ) : null
      ) : (
        <>
          {vip && user && vip.uid === user.uid && !vote && (
            <button
              className='btn gr-show-vip-btn m5-y'
              onClick={() => setShowVIPmenu(!showVIPmenu)}
            >
              {showVIPmenu ? 'Hide' : 'Show'} VIP Menu
            </button>
          )}
          {vote && prez && chance ? (
            <Vote
              vip={vip}
              prez={prez}
              chance={chance}
              name={getName()}
              isVip={vip && user && vip.uid === user.uid}
              players={gamePlayers.length}
              roomid={roomid}
            />
          ) : (
            <>
              {vip && user && vip.uid === user.uid && showVIPmenu ? (
                <VIPMenu
                  players={gamePlayers}
                  setShowVIPmenu={setShowVIPmenu}
                  roomData={roomData}
                  roomid={roomid}
                />
              ) : loadPlayers ? (
                <div className='loading'></div>
              ) : (
                <Cards
                  player={
                    user &&
                    gamePlayers &&
                    gamePlayers.length &&
                    gamePlayers.filter((player) => player.uid === user.uid)[0]
                  }
                  isVip={vip && user && vip.uid === user.uid}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SecretHitler;
