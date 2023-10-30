import { useContext, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useModal } from '../../../contexts/ModalContext/ModalContext';

import { useParams } from 'react-router-dom';

import { createHitler, getName } from '../../../utils/functions';

import Envelope from './Envelope';
import Vote from './Vote';
import VIPMenu from './VIPMenu';

import Button from '../../elements/Button';

const SecretHitler = ({ roomData, gamePlayers, vip }) => {
  const { db, updateDocument } = useContext(FirebaseContext);
  const { user, loading } = useContext(AuthContext);
  const modal = useModal();

  const { roomid } = useParams();
  const [players, loadPlayers] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    {
      idField: 'id',
    }
  );
  const [showVIPmenu, setShowVIPmenu] = useState(false);

  const gameStarted = roomData && roomData.gameStarted;
  const vote = roomData && roomData.voteTime;
  const prez = roomData && roomData.president;
  const chance = roomData && roomData.chancellor;

  const assignRoles = async () => {
    const min = 2;
    const max = 10;
    if (gamePlayers.length < min || gamePlayers.length > max)
      return modal({
        text: `There must be between ${min} and ${max} players. Currently there ${gamePlayers.length === 1 ? "is" : "are"} ${gamePlayers.length} ${gamePlayers.length === 1 ? "player" : "players"}.`,
        title: 'Invalid number of players',
      });

    const envelopes = createHitler(gamePlayers.length);

    for (let player of gamePlayers) {
      await db.collection('players').doc(player.id).update(envelopes.pop());
    }

    if (!gameStarted) {
      await updateDocument('rooms', roomid, 'gameStarted', true);
    }
  };

  return (
    <div
      className={`secret-hitler flex flex-col justify-center items-center`}
    >
      {!gameStarted ? (
        vip && user && vip.id === user.uid ? (
          <Button
            className='bg-pp-blue hover:bg-blue-600 mb-32'
            text='Start Game'
            handler={assignRoles}
          />
        ) : null
      ) : (
        <>
          {vip && user && vip.id === user.uid && !vote && (
            <Button
              className='my-5 bg-indigo-500 hover:bg-indigo-600 !text-white'
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
                    gamePlayers.find((player) => player.id === user.uid)
                  }
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
