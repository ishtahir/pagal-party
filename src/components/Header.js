import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

import Signout from './Signout';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex center'>
      <h1 className='header-logo'>Playper</h1>
      {user && <Signout />}
    </header>
  );
};

export default Header;
