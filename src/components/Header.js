import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex flex-col justify-center items-center py-5 mx-5 mt-5 mb-10 md:flex-row md:justify-between glass rounded-xl'>
      <h1 className='header-logo ml-0 mb-5 md:mb-0 md:ml-5 text-3xl text-white cursor-pointer'>
        Playper
      </h1>
      {user && <Signout />}
    </header>
  );
};

export default Header;
