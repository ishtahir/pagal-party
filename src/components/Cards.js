import { useState, useEffect } from 'react';

const Cards = ({ player }) => {
  const [party, setParty] = useState('back');
  const [secret, setSecret] = useState('back');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (party !== 'back') {
        setParty('back');
      } else if (secret !== 'back') {
        setSecret('back');
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [party, secret]);

  const role = (card) => {
    return card === 'party-card' ? player.cards.party : player.cards.secret;
  };

  const flip = (e) => {
    const card = e.target.id;

    if (card === 'party-card') {
      if (party === 'back') {
        setParty(`front ${role(card)}`);
      }
    } else if (card === 'secret-card') {
      if (secret === 'back') {
        const approve = window.confirm(
          'ARE YOU SURE YOU WANT TO FLIP OVER YOUR SECRET ROLE?'
        );
        if (approve) {
          setSecret(`front ${role(card)}`);
        }
      }
    }
  };

  return (
    <div className='cards-board flex'>
      <div className={`card party ${party}`} id='party-card' onClick={flip} />
      <div
        className={`card secret ${secret}`}
        id='secret-card'
        onClick={flip}
      />
    </div>
  );
};

export default Cards;
