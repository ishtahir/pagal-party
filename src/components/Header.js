import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex justify-between sm:justify-center sm:items-center sm:flex-col py-5 mb-5'>
      <h1 className='header-logo ml-0 md:ml-5 mb-5 text-3xl cursor-pointer'>
        Playper
      </h1>
      {user && <Signout />}
    </header>
  );
};

export default Header;
