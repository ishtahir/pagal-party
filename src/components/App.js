import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Gameroom from './Gameroom';
import Games from './Games';
import Rooms from './Rooms';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path='/' component={Home} />
      <Route exact path='/rooms' component={Rooms} />
      <Route exact path='/rooms/:roomid/games' component={Games} />
      <Route
        exact
        path='/rooms/:roomid/games/:game'
        render={() => <Gameroom />}
      />
      <Footer />
    </Router>
  );
};

export default App;
