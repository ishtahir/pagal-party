import Card from './Card';

const Envelope = ({ player }) => {
  return (
    <div className={`envelope flex flex-col md:flex-row justify-between`}>
      <Card player={player} type='party' />
      <Card player={player} type='secret' />
    </div>
  );
};

export default Envelope;
