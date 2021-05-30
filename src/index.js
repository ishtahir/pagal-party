import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { FirebaseContextProvider } from './contexts/FirebaseContext/FirebaseContext';

ReactDOM.render(
  <FirebaseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContextProvider>,
  document.getElementById('root')
);
