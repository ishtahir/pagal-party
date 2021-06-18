import React from 'react';

const Button = ({ className, text, handler, rest }) => {
  const styles =
    'bg-white px-10 py-2 rounded uppercase text-sm text-pink-500 font-bold inline-block btn hover:bg-pink-100';
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
