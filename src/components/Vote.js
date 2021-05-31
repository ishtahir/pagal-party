import { useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../contexts/FirebaseContext/FirebaseContext';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const Vote = ({ vip, prez, chance, shortEmail }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState('Yes');
  const [entered, setEntered] = useState(false);

  const votesRef = db.collection('votes');
  const [votes] = useCollectionData(votesRef.orderBy('createdAt'), {
    idField: 'id',
  });

  const settingsRef = db.collection('settings');

  const enterVote = async () => {
    const { uid } = user;
    await db.collection('votes').add({
      uid,
      name: shortEmail(),
      vote: selected,
      createdAt: new Date().toISOString(),
    });

    setEntered(true);
  };

  const countVotes = (arr, val) => {
    let count = 0;
    for (let item of arr) {
      if (item.vote === val) count++;
    }

    return count;
  };

  const closeVote = async () => {
    await settingsRef.doc('3Fd2IrMcifnJjBYJfcJc').update({
      voteTime: false,
      president: null,
      chancellor: null,
    });

    votesRef.get().then((snap) => snap.forEach((shot) => shot.ref.delete()));
  };

  return (
    <div className='flex col center container vote'>
      <p>
        You are voting for:
        <br />
        President: <span className='vote-gov vote-prez'>{prez.name}</span>
        <br />
        Chancellor: <span className='vote-gov vote-chance'>{chance.name}</span>
      </p>
      <div className='flex'>
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
      <h2 className='vote-selected'>
        You {entered ? 'voted' : 'have selected'}: {selected}!
      </h2>
      {!entered && (
        <button className='btn vote-enter-btn' onClick={enterVote}>
          Submit my Vote
        </button>
      )}
      {vip.uid === user.uid && (
        <button className='btn vote-end-btn' onClick={closeVote}>
          Close Voting
        </button>
      )}
      {entered && (
        <table className='vote-results'>
          <thead>
            <tr>
              <th>JA!</th>
              <th>NEIN!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{countVotes(votes, 'Yes')}</td>
              <td>{countVotes(votes, 'No')}</td>
            </tr>
          </tbody>
        </table>
      )}
      {entered && (
        <table className='vote-details'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {votes &&
              votes.map((vote) => (
                <tr>
                  <td>{vote.name}</td>
                  <td>{vote.vote}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vote;
