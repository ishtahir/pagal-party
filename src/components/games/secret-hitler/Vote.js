import { useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useModal } from '../../../contexts/ModalContext/ModalContext';

import { getDate } from '../../../utils/functions';

import Button from '../../elements/Button';

const Vote = ({ vip, prez, chance, name, isVip, players, roomid }) => {
  const {
    db,
    addDocumentToCollection,
    updateDocument,
    deleteDocumentFromCollection,
  } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const modal = useModal();

  const [selected, setSelected] = useState('Yes');

  const votesRef = db.collection('votes');
  const [votes] = useCollectionData(votesRef.orderBy('createdAt'), {
    idField: 'id',
  });

  const entered =
    votes &&
    votes.length &&
    votes.filter((vote) => vote.uid === user.uid).length > 0;

  const enterVote = () => {
    const { uid } = user;
    const voteToAdd = {
      uid,
      name,
      room: roomid,
      vote: selected,
      createdAt: getDate(),
    };
    addDocumentToCollection('votes', voteToAdd);
  };

  const countVotes = (arr, val) => {
    let count = 0;
    for (let item of arr) {
      if (item.vote === val) count++;
    }

    return count;
  };

  const closeVote = () => {
    if (votes.length < players) {
      modal({
        title: 'Voting still open',
        text: `You can't close voting until everyone has voted. ${
          players - votes.length
        } people still have to vote.`,
      });
    } else {
      updateDocument('rooms', roomid, 'voteTime', false);
      updateDocument('rooms', roomid, 'president', null);
      updateDocument('rooms', roomid, 'chancellor', null);
      deleteDocumentFromCollection('votes', 'room', roomid);
    }
  };

  const yesNoCardStyles = 'w-56 h-40 card text-7xl m-5';
  const thStyles =
    'px-5 py-2 text-center w-28 first:rounded-tl last:rounded-tr';
  const tdStyles =
    'py-3 text-center font-bold text-white first:rounded-bl last:rounded-br';
  const govDivStyles = 'px-20 py-2 text-xl rounded';
  const govRoleStyles = 'font-bold';

  return (
    <div className='flex flex-col justify-center items-center my-5 vote'>
      {vip && user && vip.id === user.uid && (
        <Button
          className='bg-yellow-300 text-gray-500 hover:bg-yellow-400 hover:text-gray-500'
          text='Close Voting'
          handler={closeVote}
        />
      )}
      <div className='my-5 flex flex-col'>
        <div className={`${govDivStyles} bg-red-200`}>
          President:{' '}
          <span className={`${govRoleStyles} text-red-700`}>{prez.name}</span>
        </div>
        <div className={`${govDivStyles} bg-blue-200`}>
          Chancellor:{' '}
          <span className={`${govRoleStyles} text-blue-700`}>
            {chance.name}
          </span>
        </div>
      </div>
      <div className='flex'>
        <div
          className={`${yesNoCardStyles} yes ${
            selected === 'Yes' ? 'selected' : ''
          }`}
          id='yes-card'
          onClick={() => {
            if (!entered) setSelected('Yes');
          }}
        />
        <div
          className={`${yesNoCardStyles} no ${
            selected === 'No' ? 'selected' : ''
          }`}
          id='no-card'
          onClick={() => {
            if (!entered) setSelected('No');
          }}
        />
      </div>
      <h2
        className={`vote-selected my-5 text-xl font-bold ${
          entered
            ? 'text-gray-500'
            : selected === 'Yes'
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        You {entered ? 'voted' : 'have selected'}: {selected}!
      </h2>
      {!entered && (
        <Button
          className='my-5 bg-green-500 hover:bg-gray-200 hover:text-green-500'
          text='Submit my Vote'
          handler={enterVote}
        />
      )}
      {entered ? (
        <table className='vote-results text-4xl my-5 border-collapse'>
          <thead>
            <tr className=''>
              <th className={`${thStyles} bg-green-200`}>Yes</th>
              <th className={`${thStyles} bg-red-200`}>No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${tdStyles} bg-green-400`}>
                {countVotes(
                  votes.filter((vote) => vote.room === roomid),
                  'Yes'
                )}
              </td>
              <td className={`${tdStyles} bg-red-400`}>
                {countVotes(
                  votes.filter((vote) => vote.room === roomid),
                  'No'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      {entered ? (
        <table className='vote-details my-5 mb-10 border-collapse'>
          <thead>
            <tr>
              <th className={`${thStyles} bg-blue-700 text-white`}>Name</th>
              <th className={`${thStyles} bg-blue-700 text-white`}>Vote</th>
            </tr>
          </thead>
          <tbody>
            {votes &&
              votes
                .filter((vote) => vote.room === roomid)
                .map((vote) => (
                  <tr
                    key={vote.id}
                    className='border-b border-blue-300 last:border-b-0'
                  >
                    <td
                      className={`${tdStyles} ${
                        vote.vote === 'Yes' ? 'bg-green-200' : 'bg-red-200'
                      } text-black`}
                    >
                      {vote.name}
                    </td>
                    <td
                      className={`${tdStyles} ${
                        vote.vote === 'Yes' ? 'bg-green-200' : 'bg-red-200'
                      } bg-gray-200 text-black`}
                    >
                      {vote.vote}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Vote;
