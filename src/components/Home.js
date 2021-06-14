import Signin from './Signin';

const Home = () => {
  return (
    <div className='flex flex-col justify-center'>
      <h2 className='text-center text-xl font-bold my-5'>
        Welcome to Playper!
      </h2>
      <Signin />
    </div>
  );
};

export default Home;
