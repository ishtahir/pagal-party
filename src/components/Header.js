import { useContext } from 'react';
import Signout from './Signout';

import { AuthContext } from '../contexts/AuthContext/AuthContext';

const Header = ({ name }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className='header flex center'>
      <h1 className='header-logo'>Playper</h1>
      {user && <p className='header-name'>Welcome, {name ? name : 'user'}</p>}
      <Signout />
    </header>
  );
};

export default Header;
