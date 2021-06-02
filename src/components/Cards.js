import { useState, useEffect } from 'react';

const Cards = ({ player, isVip }) => {
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
    if (player && player.hasOwnProperty('cards')) {
      return card === 'party' ? player.cards.party : player.cards.secret;
    }
    return '';
  };

  const flip = (e) => {
    const card = e.target.id;

    if (card === 'party-card') {
      if (party === 'back') {
        setParty(role(card));
      }
    } else if (card === 'secret-card') {
      if (secret === 'back') {
        const approve = window.confirm(
          'ARE YOU SURE YOU WANT TO FLIP OVER YOUR SECRET ROLE?'
        );
        if (approve) {
          setSecret(role(card));
        }
      }
    }
  };

  return (
    <div
      className={
        !isVip ? 'cards-board flex center m5-y' : 'cards-board flex center'
      }
    >
      <div className='card-flip-wrap'>
        <div
          className={party === 'back' ? 'card-flip' : 'card-flip is-flipped'}
        >
          <div
            className='card-face card party back'
            id='party-card'
            onClick={flip}
          />
          <div className={`card-face card party front ${role('party')}`} />
        </div>
      </div>
      <div className='card-flip-wrap'>
        <div
          className={secret === 'back' ? 'card-flip' : 'card-flip is-flipped'}
        >
          <div
            className='card-face card secret back'
            id='secret-card'
            onClick={flip}
          />
          <div className={`card-face card secret front ${role('secret')}`} />
        </div>
      </div>
    </div>
  );
};

export default Cards;
