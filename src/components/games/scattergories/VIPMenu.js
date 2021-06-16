import { useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';

import Button from '../../elements/Button';
import Text from '../../elements/Text';

import { scattergoriesLetterGenerator } from '../../../utils/functions';

const VIPMenu = ({ players, setShowVIPmenu, roomData, roomid }) => {
  const { updateDocument, deleteFieldFromDocument } =
    useContext(FirebaseContext);

  const lists = new Array(16).fill(1).map((val, i) => val * i + 1);

  const round = roomData && roomData.round;

  const updateLetter = async () => {
    await updateDocument(
      'rooms',
      roomid,
      'letter',
      scattergoriesLetterGenerator()
    );
  };

  const updateRound = async () => {
    if (round < 3) {
      await updateDocument('rooms', roomid, 'round', round + 1);
    } else {
      return alert('You have played 3 rounds and the game is now over');
    }
  };

  const endGame = async () => {
    const approved = window.confirm(
      '⛔️ Are you sure you want to end this game for all players? ⛔️'
    );

    if (approved) {
      // await gameOver('rooms', roomid, 'Scattergories');
      await updateDocument('rooms', roomid, 'gameStarted', false);
      await updateDocument('rooms', roomid, 'round', 1);
      await updateDocument('rooms', roomid, 'letter', null);
      await updateDocument('rooms', roomid, 'list', null);
      players &&
        players.forEach(async (player) => {
          await deleteFieldFromDocument('players', player.id, 'round1');
          await deleteFieldFromDocument('players', player.id, 'round2');
          await deleteFieldFromDocument('players', player.id, 'round3');
        });
      setShowVIPmenu(false);
    }
  };

  const selectStyles = 'py-2 px-5 rounded text-black';

  return (
    <div className='vip-menu flex flex-col justify-center items-center w-8/12'>
      <Button className='' text='Generate New Letter' handler={updateLetter} />

      <div className='flex flex-col justify-center items-center w-full bg-gray-600 py-5 my-5 rounded-xl text-white'>
        <Text
          className='text-xl pb-5'
          type='h2'
          text='Choose a list to play with'
        />
        <select
          name='list'
          className={selectStyles}
          onChange={(e) => {
            const options = Array.from(e.target.options);
            const option = options.find((opt) => opt.selected);

            if (option.value === 'SELECT A LIST') {
              updateDocument('rooms', roomid, 'list', 0);
            } else {
              updateDocument('rooms', roomid, 'list', Number(e.target.value));
            }
          }}
        >
          <option>SELECT A LIST</option>
          {lists.map((list) => (
            <option key={`list${list}`} value={list}>
              {`List ${list}`}
            </option>
          ))}
        </select>
      </div>
      <Button className='' text='Go to next round' handler={updateRound} />
      <Button
        className='bg-red-400 text-red-50 mt-32 mb-20 hover:text-red-50 hover:bg-red-600'
        text='End Game'
        handler={endGame}
      />
    </div>
  );
};

export default VIPMenu;
