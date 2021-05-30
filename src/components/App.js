import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signin from './Signin';
import Header from './Header';
import Gameroom from './Gameroom';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Signin} />
      <Route
        path='/gameroom'
        render={() => (
          <>
            <Header />
            <Gameroom />
          </>
        )}
      />
    </Router>
  );
};

export default App;
