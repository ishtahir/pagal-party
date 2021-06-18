import Text from './elements/Text';

const Footer = () => {
  const sectionStyles = 'md:w-3/12 md:p-5';
  const titleStyles = 'mb-5';

  return (
    <footer className='mt-16 bg-pink-400 px-10 py-20 text-center text-gray-800 text-sm md:flex md:flex-col md:justify-around'>
      {/* <div className='md:flex md:justify-around'>
        <Text
          className='header-logo mb-5 self-center'
          type='h2'
          text='Playper'
        />
        <section className={`${sectionStyles}`}>
          <Text className={`${titleStyles}`} type='h3' text='Our goal' />
          <Text
            className='!text-left'
            type='p'
            text='This website was created because of our love for board games. Please
        keep in mind that this website does not replace an entire game, rather
        it was created to enhance the experience of the board game. If you do
        not already own a game that we support, please check the Puchase
        section. Thank you for your support and Playper on!'
          />
        </section>
        <section className={`${sectionStyles}`}>
          <Text className={`${titleStyles}`} type='h3' text='Purchase' />
          <button>
            <Text className='font-bold mt-3' type='p' text='Secret Hitler' />
          </button>
          <button>
            <Text className='font-bold' type='p' text='Scattergories' />
          </button>
          <Text
            className='!text-left mt-5'
            type='p'
            text='We love every one of the games we support. We think you should support them as well! Please purchase the games we support and lets all Playper on together.'
          />
        </section>
        <section className={`${sectionStyles}`}>
          <Text className={`${titleStyles}`} type='h3' text='Contact' />
          <Text type='p' text={`123 Playper Way Austin, TX 78753`} />
          <Text type='p' text={`512-317-4949`} />
          <Text type='p' text={`support@playper.com`} />
        </section>
      </div>
      <Text
        className='font-semibold text-lg mt-5'
        type='p'
        text='&copy; 2021 Playper Inc. All Rights Reserved.'
      /> */}
    </footer>
  );
};

export default Footer;
