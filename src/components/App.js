import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signin from './Signin';
import Gameroom from './Gameroom';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Signin} />
      <Route path='/gameroom' component={Gameroom} />
    </Router>
  );
};

export default App;
