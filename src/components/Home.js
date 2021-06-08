import Signin from './Signin';

const Home = () => {
  return (
    <div className='flex col center'>
      <h2 className='rooms-title m5-t'>To start playing, please sign in</h2>
      <Signin />
    </div>
  );
};

export default Home;
