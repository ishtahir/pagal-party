import React from 'react';

import Header from './Header';
import Signin from './Signin';

const Rooms = () => {
  return (
    <div className='flex col center'>
      <Header />
      <h2 className='rooms-title m5-t'>Create a new room</h2>
      <Signin />
      <h2 className='rooms-title'>Join an existing room</h2>
      <input
        type='text'
        className='input'
        placeholder='Enter room name'
        maxLength='4'
      />
      <button className='btn'>Join</button>
    </div>
  );
};

export default Rooms;
