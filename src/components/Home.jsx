import Signin from './Signin.jsx';

import pagalParty from '../assets/pagal-party.svg';

const Home = () => {
  return (
    <div className='home flex flex-col justify-center items-center h-full'>
      <img src={pagalParty} alt='Pagal Party logo' className='w-2/3 max-w-2xl mb-20' />
      <Signin />
    </div>
  );
};

export default Home;
