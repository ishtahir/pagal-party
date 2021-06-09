import { useState, useContext } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';

const Government = ({ players, roomid }) => {
  const { updateDocument } = useContext(FirebaseContext);
  const [prez, setPrez] = useState(null);

  return (
    <div className='gov flex col center m5-b'>
      <h2 className='gov-text'>
        Choose the president and chancellor for this round
      </h2>
      President:
      <select
        name='president'
        className='gov-select'
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
          <option key={player.id} value={player.name} id={player.uid}>
            {player.name}
          </option>
        ))}
      </select>
      <br />
      Chancellor:
      <select
        name='chancellor'
        className='gov-select'
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
            .filter((player) => prez.uid !== player.uid)
            .map((player) => (
              <option key={player.id} value={player.name} id={player.uid}>
                {player.name}
              </option>
            ))
        ) : (
          <option disabled>Please select President first</option>
        )}
      </select>
    </div>
  );
};

export default Government;
