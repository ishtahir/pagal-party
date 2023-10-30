import React from 'react';

const Button = ({ className, text, handler, rest }) => {
  const styles =
    'px-6 py-2 rounded uppercase text-sm text-white font-bold inline-block btn hover:bg-gray-200 max-w-xs';
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
