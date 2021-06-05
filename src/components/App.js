import { BrowserRouter as Router, Route } from 'react-router-dom';

import Rooms from './Rooms';
import Gameroom from './Gameroom';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Rooms} />
      <Route path='/gameroom' component={Gameroom} />
    </Router>
  );
};

export default App;
