import { useContext, useState } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import Input from '../../elements/Input';
import Button from '../../elements/Button';

const Pad = ({ round, player }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const arr = new Array(12).fill('');

  const [inputs, setInputs] = useState(arr);

  // const { answers } = player[0];

  const saveAnswers = async (e) => {
    db.collection('players')
      .doc(user.uid)
      .update({ [`round${round}`]: inputs });
  };

  // const disableSave = (ind) => {
  //   return answers[round][ind] !== '';
  // };

  return (
    <ol className='border border-gray-400 p-5 my-5 mb-10 rounded flex flex-col justify-center items-center'>
      {arr.map((_, i) => (
        <li key={`val${i}`}>
          <span className='font-bold w-8 inline-block'>{`${i + 1}`}</span>
          <Input
            className='my-2 bg-blue-50'
            onChange={(e) => {
              const newArr = [...inputs];
              newArr[i] = e.target.value;
              setInputs(newArr);
            }}
          />
        </li>
      ))}
      <Button
        className='mx-2 bg-blue-500 w-full hover:text-blue-500 mt-5'
        text='Save all'
        handler={saveAnswers}
      />
    </ol>
  );
};

export default Pad;
