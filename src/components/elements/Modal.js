import React from 'react';

import Text from './Text';
import Button from './Button';

const Modal = ({ type, title, text }) => {
  const showButtons = () => {
    if (type === 'confirm') {
      return (
        <>
          <Button
            className='bg-white text-black font-normal mr-3 px-5 !shadow-none border border-gray-400 hover:text-black hover:bg-gray-100'
            text='Cancel'
          />
          <Button
            className='bg-red-600 px-6 !shadow-none border border-red-800 hover:text-white hover:bg-red-800'
            text='Confirm'
          />
        </>
      );
    } else if (type === 'alert') {
      return (
        <Button
          className='bg-blue-600 px-6 !shadow-none border border-blue-800 hover:text-white hover:bg-blue-800'
          text='Try Again'
        />
      );
    }
  };

  return (
    <div className='modal-bg w-full h-full bg-black bg-opacity-70 fixed top-0 left-0 z-10 flex justify-center items-center'>
      <div className='modal-content w-11/12 lg:w-6/12 flex flex-col justify-center items-start bg-gray-100 max-h-96 relative p-5 rounded-lg'>
        <div className='flex justify-between items-start'>
          <div className='svg mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mr-5 sm:mx-0 sm:h-10 sm:w-10'>
            <svg
              className='h-6 w-6 text-red-600'
              x-description='Heroicon name: outline/exclamation'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              ></path>
            </svg>
          </div>
          <div className='texts flex flex-col items-start lg:ml-3'>
            <Text
              className='!text-xl font-normal mb-3'
              type='h3'
              text='Deactivate account'
            />
            <Text
              className='!text-left mb-3 text-md text-gray-600'
              type='p'
              text='Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.'
            />
          </div>
        </div>
        <div className='self-end mt-5'>{showButtons()}</div>
      </div>
    </div>
  );
};

export default Modal;
