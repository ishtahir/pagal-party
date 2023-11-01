import Card from './Card';

const Envelope = ({ player }) => {
  return (
    <div className="envelope flex justify-around mb-12">
      <Card player={player} type='party' />
      <Card player={player} type='secret' />
    </div>
  );
};

export default Envelope;
