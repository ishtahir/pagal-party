import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { useParams } from 'react-router-dom';

import { createHitler, getName } from '../../../utils/functions';

import Envelope from './Envelope';
import Vote from '../secret-hitler/Vote';
import VIPMenu from '../secret-hitler/VIPMenu';

import Button from '../../elements/Button';

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
        players && players.length && players.find((player) => player.id === uid)
    );

  const vip = gamePlayers && gamePlayers.length ? gamePlayers[0] : null;

  const gameStarted = roomData && roomData.gameStarted;
  const vote = roomData && roomData.voteTime;
  const prez = roomData && roomData.president;
  const chance = roomData && roomData.chancellor;

  const assignRoles = async () => {
    // if (gamePlayers.length < 5 || gamePlayers.length > 10)
    if (gamePlayers.length !== 3)
      return alert(
        // `There can only be between 5 and 10 players. Currently there are ${gamePlayers.length} players.`
        `TEST MODE: There can only be 3 players. Currently there are ${gamePlayers.length} players.` // delete this
      );

    const envelopes = createHitler(gamePlayers.length);

    for (let player of gamePlayers) {
      await db.collection('players').doc(player.id).update(envelopes.shift());
    }

    if (!gameStarted) {
      await updateDocument('rooms', roomid, 'gameStarted', true);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-10/12'>
      {!gameStarted ? (
        vip && user && vip.id === user.uid ? (
          <Button
            className='bg-green-400 hover:text-green-400'
            text='Start Game'
            handler={assignRoles}
          />
        ) : null
      ) : (
        <>
          {vip && user && vip.id === user.uid && !vote && (
            <Button
              className='my-5 bg-indigo-600 hover:bg-indigo-400 hover:!text-white'
              text={`${showVIPmenu ? 'Hide' : 'Show'} VIP Menu`}
              handler={() => setShowVIPmenu(!showVIPmenu)}
            />
          )}
          {vote && prez && chance ? (
            <Vote
              vip={vip}
              prez={prez}
              chance={chance}
              name={!loading && !loadPlayers && getName(players, user.uid)}
              isVip={vip && user && vip.id === user.uid}
              players={gamePlayers.length}
              roomid={roomid}
            />
          ) : (
            <>
              {vip && user && vip.id === user.uid && showVIPmenu ? (
                <VIPMenu
                  players={gamePlayers}
                  setShowVIPmenu={setShowVIPmenu}
                  roomData={roomData}
                  roomid={roomid}
                />
              ) : loadPlayers ? (
                <div className='loading'></div>
              ) : (
                <Envelope
                  player={
                    user &&
                    gamePlayers &&
                    gamePlayers.length &&
                    gamePlayers.filter((player) => player.id === user.uid)[0]
                  }
                  isVip={vip && user && vip.id === user.uid}
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
