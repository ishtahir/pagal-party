import { BrowserRouter as Router, Route } from 'react-router-dom';

import Wrapper from './Wrapper';
import Home from './Home';
import Gameroom from './Gameroom';
import Games from './Games';
import Rooms from './Rooms';

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Route exact path='/' component={Home} />
        <Route exact path='/rooms' component={Rooms} />
        <Route exact path='/games/selection' component={Games} />
        <Route
          exact
          path='/rooms/:roomid/:gameid'
          render={() => <Gameroom />}
        />
      </Wrapper>
    </Router>
  );
};

export default App;
