import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Gameroom from './Gameroom';
import Games from './Games';
import Rooms from './Rooms';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/rooms' component={Rooms} />
      <Route exact path='/rooms/:roomid/games' component={Games} />
      <Route
        exact
        path='/rooms/:roomid/games/:game'
        render={() => <Gameroom />}
      />
    </Router>
  );
};

export default App;
