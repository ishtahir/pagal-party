import React from 'react';

const Text = ({ className, type, text }) => {
  const stylesH1 = 'text-4xl font-bold text-center';
  const stylesH2 = 'text-2xl font-bold text-center';
  const stylesH3 = 'text-lg font-bold text-center';

  return (
    <>
      {type === 'h1' ? (
        <h1 className={className ? `${className} ${stylesH1}` : stylesH1}>
          {text}
        </h1>
      ) : type === 'h2' ? (
        <h2 className={className ? `${className} ${stylesH2}` : stylesH2}>
          {text}
        </h2>
      ) : (
        <h3 className={className ? `${className} ${stylesH3}` : stylesH3}>
          {text}
        </h3>
      )}
    </>
  );
};

export default Text;
