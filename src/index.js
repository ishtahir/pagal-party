import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { FirebaseContextProvider } from './contexts/FirebaseContext/FirebaseContext';
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';
import { ModalContextProvider } from './contexts/ModalContext/ModalContext';

ReactDOM.render(
  <FirebaseContextProvider>
    <AuthContextProvider>
      <ModalContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ModalContextProvider>
    </AuthContextProvider>
  </FirebaseContextProvider>,
  document.getElementById('root')
);
