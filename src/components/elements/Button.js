import React from 'react';

const Button = ({ className, text, handler, rest }) => {
  const styles =
    'bg-pink-500 px-10 py-2 rounded uppercase text-sm text-white font-bold inline-block btn hover:bg-white hover:text-pink-500';
  return (
    <button
      className={className ? `${className} ${styles}` : styles}
      onClick={handler}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
