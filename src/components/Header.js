import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex flex-col justify-center items-center py-5 mb-5 md:flex-row md:justify-between'>
      <h1 className='header-logo ml-0 mb-5 md:mb-0 md:ml-5 text-3xl cursor-pointer'>
        Playper
      </h1>
      {user && <Signout />}
    </header>
  );
};

export default Header;
