import { useContext, useState, useEffect } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useModal } from '../../../contexts/ModalContext/ModalContext';

import { useParams } from 'react-router-dom';

import Pad from './Pad';
import VIPMenu from './VIPMenu';

import Button from '../../elements/Button';
import Text from '../../elements/Text';
import { glassStyles } from '../../../utils/styles';

const Scattergories = ({ roomData }) => {
  const { db, updateDocument } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const modal = useModal();

  const { roomid } = useParams();
  const [players, loadPlayers] = useCollectionData(
    db.collection('players').orderBy('createdAt'),
    {
      idField: 'id',
    }
  );
  const [showVIPmenu, setShowVIPmenu] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState(null);

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
  const letter = roomData && roomData.letter;
  const list = roomData && roomData.list;
  const round = roomData && roomData.round;
  const time = roomData && roomData.time;
  const startRound = roomData && roomData.startRound;

  useEffect(() => {
    const timer = setInterval(async () => {
      if (startRound) {
        let newVal = timeDisplay - 1;
        setTimeDisplay(newVal);
        if (timeDisplay <= 1) {
          await updateDocument('rooms', roomid, 'startRound', false);
          clearInterval(timer);
        }
      } else {
        setTimeDisplay(time);
      }
    }, 1000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeDisplay, startRound]); //eslint-disable-line

  const startGame = async () => {
    const min = 2;
    const max = 6;
    if (gamePlayers.length < min || gamePlayers.length > max)
      return modal({
        text: `There can only be between ${min} and ${max} players. Currently there are ${gamePlayers.length} players.`,
        title: 'Invalid amount of players',
      });

    for (let player of gamePlayers) {
      await db.collection('players').doc(player.id).update({
        round1: [],
        round2: [],
        round3: [],
      });
    }

    if (!gameStarted) {
      await updateDocument('rooms', roomid, 'gameStarted', true);
    }
  };

  console.log({ startRound, timeDisplay, time });
  return (
    <div
      className={`scattergories flex flex-col justify-center items-center ${glassStyles} py-10 my-10`}
    >
      {!gameStarted ? (
        vip && user && vip.id === user.uid ? (
          <Button
            className='bg-green-400 !text-white hover:bg-green-600'
            text='Start Game'
            handler={startGame}
          />
        ) : null
      ) : (
        <>
          {vip && user && vip.id === user.uid && (
            <Button
              className='my-5 bg-indigo-500 hover:bg-indigo-600 !text-white'
              text={`${showVIPmenu ? 'Hide' : 'Show'} VIP Menu`}
              handler={() => setShowVIPmenu(!showVIPmenu)}
            />
          )}
          <>
            {vip && user && vip.id === user.uid && showVIPmenu ? (
              <VIPMenu
                players={gamePlayers}
                setShowVIPmenu={setShowVIPmenu}
                roomData={roomData}
                roomid={roomid}
                setTimeDisplay={setTimeDisplay}
              />
            ) : loadPlayers ? (
              <div className='loading'></div>
            ) : (
              <>
                <Text type='h2' text={`Round: ${round}`} />
                <Text type='h2' text={`List: ${list ? list : 0}`} />
                {startRound && (
                  <>
                    <Text
                      className='text-6xl text-green-500'
                      type='h2'
                      text={letter}
                    />
                    <Text
                      className='text-6xl text-gray-700'
                      type='h2'
                      text={`${timeDisplay} seconds left`}
                    />
                  </>
                )}
                <Pad round={round} roomData={roomData} vip={vip} />
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default Scattergories;
