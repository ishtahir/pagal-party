import { useState, useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';

const Government = ({ players, roomid }) => {
  const { updateDocument } = useContext(FirebaseContext);
  const [prez, setPrez] = useState(null);

  const selectStyles = 'py-2 px-5 rounded text-black';

  return (
    <div className='gov flex flex-col justify-center items-center w-full bg-gray-600 py-5 my-5 rounded-xl text-white'>
      <h2 className='text-xl pb-5'>
        Choose the president and chancellor for this round
      </h2>
      <span className='py-2 text-red-400 font-bold'>President:</span>
      <select
        name='president'
        className={`${selectStyles}`}
        onChange={(e) => {
          const options = Array.from(e.target.options);
          const option = options.find((opt) => opt.selected);

          if (option.value === 'PICK A PRESIDENT') {
            updateDocument('rooms', roomid, 'president', null);
            updateDocument('rooms', roomid, 'chancellor', null);
            setPrez(null);
          } else {
            const obj = { name: option.value, uid: option.id };
            updateDocument('rooms', roomid, 'president', obj);
            setPrez(obj);
          }
        }}
      >
        <option>PICK A PRESIDENT</option>
        {players.map((player) => (
          <option key={player.id} value={player.name} id={player.id}>
            {player.name}
          </option>
        ))}
      </select>
      <br />
      <span className='py-2 text-blue-400 font-bold'>Chancellor:</span>
      <select
        name='chancellor'
        className={`${selectStyles}`}
        onChange={(e) => {
          const options = Array.from(e.target.options);
          const option = options.find((opt) => opt.selected);

          if (option.value === 'PICK A CHANCELLOR') {
            updateDocument('rooms', roomid, 'chancellor', null);
          } else {
            updateDocument('rooms', roomid, 'chancellor', {
              name: option.value,
              uid: option.id,
            });
          }
        }}
      >
        <option>PICK A CHANCELLOR</option>
        {prez ? (
          players
            .filter((player) => prez.uid !== player.id)
            .map((player) => (
              <option key={player.id} value={player.name} id={player.id}>
                {player.name}
              </option>
            ))
        ) : (
          <option disabled>Select President first</option>
        )}
      </select>
    </div>
  );
};

export default Government;
