import Signin from './Signin';

const Home = () => {
  return (
    <div className='home flex flex-col justify-center w-6/12 glass mx-auto my-10 rounded-xl py-10'>
      <h2 className='text-center text-xl font-bold my-5 text-pink-50'>
        Welcome to Playper!
      </h2>
      <Signin />
    </div>
  );
};

export default Home;
