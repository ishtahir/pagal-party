import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { FirebaseContextProvider } from './contexts/FirebaseContext/FirebaseContext';
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';

ReactDOM.render(
  <FirebaseContextProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </FirebaseContextProvider>,
  document.getElementById('root')
);
