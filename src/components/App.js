import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Gameroom from './Gameroom';
import Games from './Games';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/games' component={Games} />
      <Route path='/rooms/:roomid' render={() => <Gameroom />} />
    </Router>
  );
};

export default App;
