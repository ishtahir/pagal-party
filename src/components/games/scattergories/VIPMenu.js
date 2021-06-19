import { useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { useModal } from '../../../contexts/ModalContext/ModalContext';

import Button from '../../elements/Button';
import Text from '../../elements/Text';

import { scattergoriesLetterGenerator } from '../../../utils/functions';

const VIPMenu = ({
  players,
  setShowVIPmenu,
  roomData,
  roomid,
  setTimeDisplay,
}) => {
  const { updateDocument, deleteFieldFromDocument } =
    useContext(FirebaseContext);
  const modal = useModal();

  const lists = new Array(16).fill(1).map((val, i) => val * i + 1);

  const times = ['3:00', '2:30', '2:00', '1:30', '1:00', '0:30'];

  const timesToSecs = (ind) => {
    let secs = 180;
    secs = secs - ind * 30;
    return secs;
  };

  const round = roomData && roomData.round;
  const time = roomData && roomData.time;
  const list = roomData && roomData.list;

  const updateRound = async () => {
    console.log({ round, time, list });
    if (!time || !list) {
      return modal({
        title: 'Invalid entries',
        text: 'You cannot start the next round without picking a list or time.',
      });
    }
    if (round < 3) {
      await updateDocument('rooms', roomid, 'round', round + 1);
      await updateDocument('rooms', roomid, 'startRound', true);
      await updateDocument(
        'rooms',
        roomid,
        'letter',
        scattergoriesLetterGenerator()
      );
      setTimeDisplay(time);
      setShowVIPmenu(false);
    } else {
      return modal({
        text: 'You have played 3 rounds and the game is now over',
        title: 'Game over',
      });
    }
  };

  const endGame = async () => {
    modal({
      text: 'Are you sure you want to end this game for all players?',
      title: 'End Game?',
      type: 'confirm',
    }).then(async () => {
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
    });
  };

  const selectStyles = 'py-2 px-5 rounded text-black';

  return (
    <div className='vip-menu flex flex-col justify-center items-center w-10/12'>
      <div className='flex flex-col justify-center items-center w-full bg-gray-600 py-5 my-5 rounded-xl text-white'>
        <Text
          className='text-xl pb-5'
          type='h2'
          text='Choose options for this round'
        />
        <select
          name='list'
          className={`${selectStyles} my-5`}
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
        <select
          name='time'
          className={`${selectStyles} my-5`}
          onChange={(e) => {
            const options = Array.from(e.target.options);
            const option = options.find((opt) => opt.selected);
            if (option.value === 'SELECT A TIME') {
              updateDocument('rooms', roomid, 'time', 0);
            } else {
              updateDocument(
                'rooms',
                roomid,
                'time',
                timesToSecs(Number(option.value))
              );
            }
          }}
        >
          <option>SELECT A TIME</option>
          {times.map((time, i) => (
            <option key={`time${time}`} value={i}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <Button className='my-5' text='Start next round' handler={updateRound} />
      <Button
        className='bg-red-400 text-red-50 mt-32 mb-20 hover:text-red-50 hover:bg-red-600'
        text='End Game'
        handler={endGame}
      />
    </div>
  );
};

export default VIPMenu;
