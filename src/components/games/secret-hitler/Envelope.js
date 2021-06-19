import Card from './Card';
import { glassStyles } from '../../../utils/styles';

const Envelope = ({ player }) => {
  return (
    <div className={`envelope flex flex-col md:flex-row justify-between`}>
      <Card player={player} type='party' />
      <Card player={player} type='secret' />
    </div>
  );
};

export default Envelope;
