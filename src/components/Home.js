import Signin from './Signin';

const Home = () => {
  return (
    <div className='flex col center'>
      <h2 className='home-title m5-t'>Welcome to Playper!</h2>
      <Signin />
    </div>
  );
};

export default Home;
