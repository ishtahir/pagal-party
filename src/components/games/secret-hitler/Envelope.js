import Card from './Card';

const Envelope = ({ player }) => {
  return (
    <div>
      <Card player={player} type='party' />
      <Card player={player} type='secret' />
    </div>
  );
};

export default Envelope;
