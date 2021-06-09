import { useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../../../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { getDate } from '../../../utils/functions';

const Vote = ({ vip, prez, chance, name, isVip, players, roomid }) => {
  const {
    db,
    addDocumentToCollection,
    updateDocument,
    deleteDocumentFromCollection,
  } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

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
      alert(
        `You can't close voting until everyone has voted. ${
          players - votes.length
        } people still have to vote.`
      );
    } else {
      updateDocument('rooms', roomid, 'voteTime', false);
      updateDocument('rooms', roomid, 'president', null);
      updateDocument('rooms', roomid, 'chancellor', null);
      deleteDocumentFromCollection('votes', 'room', roomid);
    }
  };

  return (
    <div className='flex col center vote'>
      {vip && user && vip.uid === user.uid && (
        <button className='btn vote-end-btn m5-y' onClick={closeVote}>
          Close Voting
        </button>
      )}
      <p className={isVip ? 'vote-govt m5-b' : 'vote-govt m5-y'}>
        President: <span className='vote-gov vote-prez'>{prez.name}</span>
        <br />
        Chancellor: <span className='vote-gov vote-chance'>{chance.name}</span>
      </p>
      <div className='flex vote-cards'>
        <div
          className={`card yes front ${selected === 'Yes' ? 'selected' : ''}`}
          id='yes-card'
          onClick={() => {
            if (!entered) setSelected('Yes');
          }}
        />
        <div
          className={`card no front ${selected === 'No' ? 'selected' : ''}`}
          id='no-card'
          onClick={() => {
            if (!entered) setSelected('No');
          }}
        />
      </div>
      <h2 className='vote-selected m5-y'>
        You {entered ? 'voted' : 'have selected'}: {selected}!
      </h2>
      {!entered && (
        <button className='btn vote-enter-btn' onClick={enterVote}>
          Submit my Vote
        </button>
      )}
      {entered ? (
        <table className='vote-results'>
          <thead>
            <tr>
              <th>JA!</th>
              <th>NEIN!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {countVotes(
                  votes.filter((vote) => vote.room === roomid),
                  'Yes'
                )}
              </td>
              <td>
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
        <table className='vote-details m5-b'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {votes &&
              votes
                .filter((vote) => vote.room === roomid)
                .map((vote) => (
                  <tr key={vote.id}>
                    <td>{vote.name}</td>
                    <td>{vote.vote}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Vote;