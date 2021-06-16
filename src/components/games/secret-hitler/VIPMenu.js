import { useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';

import Government from './Government';

import Button from '../../elements/Button';

const VIPMenu = ({ players, setShowVIPmenu, roomData, roomid }) => {
  const { updateDocument, deleteFieldFromDocument } =
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
      // await gameOver('rooms', roomid, 'Secret Hitler');
      await updateDocument('rooms', roomid, 'gameStarted', false);
      await updateDocument('rooms', roomid, 'voteTime', false);
      await updateDocument('rooms', roomid, 'president', null);
      await updateDocument('rooms', roomid, 'chancellor', null);
      players &&
        players.forEach(
          async (player) =>
            await deleteFieldFromDocument('players', player.id, 'cards')
        );
      setShowVIPmenu(false);
    }
  };

  return (
    <div className='vip-menu flex flex-col justify-center items-center w-8/12'>
      <Government players={players} roomid={roomid} />
      <Button
        className={`my-5 ${
          !prez || !chance
            ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-black hover:text-black'
            : 'bg-yellow-300 text-gray-500 hover:bg-yellow-400 hover:text-gray-500'
        }`}
        text='Open Voting'
        handler={voteTime}
      />
      <Button
        className='bg-red-400 text-red-50 mt-32 mb-20 hover:text-red-50 hover:bg-red-600'
        text='End Game'
        handler={endGame}
      />
    </div>
  );
};

export default VIPMenu;
