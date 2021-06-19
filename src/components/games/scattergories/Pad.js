import { useContext, useState } from 'react';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import Input from '../../elements/Input';
import Button from '../../elements/Button';

import { disabledStyles } from '../../../utils/styles';

const Pad = ({ round, vip, roomData }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [playerDoc, loadDoc] = useDocumentData(
    db.collection('players').doc(user.uid),
    {
      idField: 'id',
    }
  );

  const arr = new Array(12).fill('');

  const [inputs, setInputs] = useState(arr);

  const startRound = roomData && roomData.startRound;

  const saveAnswers = async () => {
    const key = `round${round}`;
    if (!loadDoc) {
      const dbArr = playerDoc[key];
      for (let i = 0; i < inputs.length; i++) {
        if (dbArr[i] !== inputs[i]) {
          await db
            .collection('players')
            .doc(user.uid)
            .update({ [key]: inputs });
          break;
        }
      }
    }
  };

  const clearInput = (ind) => {
    if (inputs[ind]) {
      const arr = [...inputs];
      arr[ind] = '';
      setInputs(arr);
    }
  };

  const clearAnswers = () => setInputs(arr);

  const params = { disabled: !startRound };

  return (
    <ol className='pad py-5 my-5 mb-10 rounded flex flex-col justify-center items-center'>
      <Button
        className={`mx-2 bg-red-400 !text-white w-full hover:bg-red-500 my-5 ${disabledStyles}`}
        text='Clear all'
        handler={clearAnswers}
        rest={params}
      />
      {arr.map((_, i) => (
        <li key={`val${i}`} className='flex justify-center items-center'>
          <span className='font-bold w-8 inline-block'>{`${i + 1}`}</span>
          <Input
            className={`my-2 bg-blue-50 md:w-96 ${disabledStyles}`}
            onChange={(e) => {
              const newArr = [...inputs];
              newArr[i] = e.target.value;
              setInputs(newArr);
            }}
            value={inputs[i]}
            rest={params}
          />
          <Button
            className={`!p-2 rounded-full h-8 w-8 flex justify-center items-center ml-2 ${disabledStyles}`}
            text={
              <span className='block transform rotate-45 text-3xl text-center'>
                &nbsp;+&nbsp;
              </span>
            }
            handler={() => clearInput(i)}
            rest={params}
          />
        </li>
      ))}
      <Button
        className='mx-2 bg-blue-400 !text-white w-full hover:bg-blue-500 mt-5'
        text='Save all'
        handler={saveAnswers}
      />
    </ol>
  );
};

export default Pad;
