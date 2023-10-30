import { useState, useRef } from 'react';

const RoundResults = ({ round = 1 }) => {
  const [score, setScore] = useState(0);

  const buttonRef = useRef();

  const pointYes = (e) => {
    e.target.parentElement.removeChild(e.target);
    setScore(score + 1);
  };
  const dataStyles = 'px-5 py-2 border border-black text-center';

  return (
    <table className={`border-collapse`}>
      <thead>
        <tr className={``}>
          <th className={`${dataStyles}`} colSpan='2'>
            Round {round}
          </th>
          <th className={`${dataStyles}`} colSpan='1'>
            Score: {score}
          </th>
        </tr>
        <tr className={``}>
          <th className={`${dataStyles}`} colSpan='2'>
            Answer
          </th>
          <th className={`${dataStyles}`}>Point?</th>
        </tr>
      </thead>
      <tbody>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Hello
          </td>
          <td className={`${dataStyles}`}>
            <button id='1' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Hippo
          </td>
          <td className={`${dataStyles}`}>
            <button id='2' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Hola
          </td>
          <td className={`${dataStyles}`}>
            <button id='3' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Honda
          </td>
          <td className={`${dataStyles}`}>
            <button id='4' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Hungry
          </td>
          <td className={`${dataStyles}`}>
            <button id='5' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
        <tr className={``}>
          <td className={`${dataStyles}`} colSpan='2'>
            Hair
          </td>
          <td className={`${dataStyles}`}>
            <button id='6' ref={buttonRef} onClick={pointYes}>
              ✅
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RoundResults;
