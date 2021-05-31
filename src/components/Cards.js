import { useState, useEffect } from 'react';

const Cards = ({ player }) => {
  const [party, setParty] = useState('back');
  const [secret, setSecret] = useState('back');
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
    };
  });

  const role = (card) => {
    return card === 'party-card' ? player.cards.party : player.cards.secret;
  };

  const flip = (e) => {
    const card = e.target.id;

    if (card === 'party-card') {
      if (party === 'back') {
        setParty(`front ${role(card)}`);
        autoFlip('party');
      } else {
        setParty('back');
      }
    } else if (card === 'secret-card') {
      if (secret === 'back') {
        const approve = window.confirm(
          'ARE YOU SURE YOU WANT TO FLIP OVER YOUR SECRET ROLE?'
        );
        if (approve) {
          setSecret(`front ${role(card)}`);
          autoFlip('secret');
        }
      } else {
        setSecret('back');
      }
    }
  };

  const autoFlip = (card) => {
    const id = setTimeout(() => {
      setTimerId(id);
      if (card === 'party') {
        setParty('back');
      } else {
        setSecret('back');
      }
    }, 3000);
  };

  return (
    <div className='cards-board'>
      <div className='row'>
        <div className={`card party ${party}`} id='party-card' onClick={flip} />
        <div
          className={`card secret ${secret}`}
          id='secret-card'
          onClick={flip}
        />
      </div>
    </div>
  );
};

export default Cards;
