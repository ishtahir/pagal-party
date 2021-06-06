import { useState } from 'react';

const Join = () => {
  const [chosenName, setChosenName] = useState('');

  return (
    <div className='flex center col input-wrap'>
      <p>
        If you would like to choose your own name, type below and press 'Join
        Game'. Otherwise, the default name from your login will be used.
      </p>
      <input
        className='input'
        type='text'
        placeholder='Enter your name'
        value={chosenName}
        onChange={(e) => setChosenName(e.target.value)}
      />
      <p className='gr-text'>Players already joined:</p>
      {/* {players &&
        players.length &&
        players.map((player) => (
          <p
            key={player.uid}
            className={
              vip && player.uid === vip.uid
                ? 'gr-player-name vip'
                : 'gr-player-name'
            }
          >
            {player.name}
          </p>
        ))}
      {players && user && playerJoined(user.uid) ? null : (
        <button className='btn' onClick={addPlayer}>
          Join Game
        </button>
      )}
      {vip && user && vip.uid === user.uid && !gameStarted && (
        <button className='btn start-btn' onClick={startGame}>
          Start Game
        </button>
      )} */}
    </div>
  );
};

export default Join;
