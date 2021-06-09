import { useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';

import Government from './Government';

const VIPMenu = ({ players, setShowVIPmenu, roomData, roomid }) => {
  const { updateDocument, deleteFieldFromDocument, gameOver } =
    useContext(FirebaseContext);

  const prez = roomData && roomData.president;
  const chance = roomData && roomData.chancellor;

  const voteTime = async () => {
    if (prez && chance) {
      await updateDocument('rooms', roomid, 'voteTime', true);
    } else {
      alert(
        'You need to select a president and chancellor before you can vote.'
      );
    }
  };

  const endGame = async () => {
    const approved = window.confirm(
      '⛔️ Are you sure you want to end this game for all players? ⛔️'
    );

    if (approved) {
      await gameOver('rooms', roomid);
      players &&
        players.forEach(
          async (player) =>
            await deleteFieldFromDocument('players', player.id, 'cards')
        );
      setShowVIPmenu(false);
    }
  };

  return (
    <div className='vip-menu flex col center'>
      <Government players={players} roomid={roomid} />
      <button
        className={
          !prez || !chance ? 'btn vote-btn disabled-btn' : 'btn vote-btn'
        }
        onClick={voteTime}
      >
        Open Voting
      </button>
      <button className='btn end-btn m5-y' onClick={endGame}>
        End Game
      </button>
    </div>
  );
};

export default VIPMenu;
