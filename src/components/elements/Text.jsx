import React from 'react';

const Text = ({ className, type, text, rest }) => {
  const stylesH1 = 'font-bold text-center';
  const stylesH2 = 'text-2xl font-bold text-center';
  const stylesH3 = 'text-lg font-bold text-center';
  const stylesP = 'text-md text-center';

  return (
    <>
      {type === 'h1' ? (
        <h1
          className={className ? `${className} ${stylesH1}` : stylesH1}
          {...rest}
        >
          {text}
        </h1>
      ) : type === 'h2' ? (
        <h2
          className={className ? `${className} ${stylesH2}` : stylesH2}
          {...rest}
        >
          {text}
        </h2>
      ) : type === 'h3' ? (
        <h3
          className={className ? `${className} ${stylesH3}` : stylesH3}
          {...rest}
        >
          {text}
        </h3>
      ) : (
        <p
          className={className ? `${className} ${stylesP}` : stylesP}
          {...rest}
        >
          {text}
        </p>
      )}
    </>
  );
};

export default Text;
