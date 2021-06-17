import { useState, useEffect } from 'react';

import { useModal } from '../../../contexts/ModalContext/ModalContext';

const Card = ({ player, type }) => {
  const modal = useModal();

  const [side, setSide] = useState('back');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (side !== 'back') {
        setSide('back');
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [side]); // eslint-disable-line

  const role = (card) => {
    if (player && player.hasOwnProperty('cards')) {
      return card === 'party' ? player.cards.party : player.cards.secret;
    }
    return '';
  };

  const flip = (e) => {
    const card = e.target.id;

    if (card === 'party-card') {
      if (side === 'back') {
        setSide(role(card));
      }
    } else if (card === 'secret-card') {
      if (side === 'back') {
        modal({
          title: 'Reveal Secret Role?',
          text: 'ARE YOU SURE YOU WANT TO FLIP OVER YOUR SECRET ROLE?',
          type: 'confirm',
        }).then(() => {
          setSide(role(card));
        });
      }
    }
  };

  // const cardStyles =
  //   'card border border-solid border-gray-300 rounded-2xl flex justify-center items-center cursor-pointer text-center absolute relative h-full w-full';
  // const frontStyles = 'front items-end cursor-not-allowed';
  // const backStyles = 'back';

  return (
    <div className='card-flip-wrap w-60 h-72 m-6'>
      <div className={side === 'back' ? 'card-flip' : 'card-flip is-flipped'}>
        <div
          className={`card-face card ${type} back`}
          id={`${type}-card`}
          onClick={flip}
        />
        <div className={`card-face card ${type} front ${role(type)}`} />
      </div>
    </div>
  );
};

export default Card;
