import { useContext } from 'react';
import Signout from './Signout';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex center'>
      <h1 className='header-logo'>Playper</h1>
      {user && (
        <p className='header-name'>Welcome, {user.email.split('@')[0]}</p>
      )}
      <Signout />
    </header>
  );
};

export default Header;
