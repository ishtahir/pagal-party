import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';

import pagalParty from '../assets/pagal-party.svg';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex justify-between items-center bg-purple-600 w-full py-3 mb-12 px-6'>
      <img src={pagalParty} alt="Pagal Party logo" className='w-20' />
      {user && <Signout />}
    </header>
  );
};

export default Header;
