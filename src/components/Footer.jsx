import Text from './elements/Text';

const Footer = () => {
  return (
    <footer className='footer flex flex-col justify-center items-center bg-blue-600 w-full py-2 text-white '>
      <Text
        className='font-semibold text-sm'
        type='p'
        text="Made with 🩷 by Ish Tahir"
      />
      <Text
        className='font-semibold text-xs mt-2'
        type='p'
        text={`© ${new Date().getFullYear()} Pagal Party Inc. All Rights Reserved.`}
      />
    </footer>
  );
};

export default Footer;
