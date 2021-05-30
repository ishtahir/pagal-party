import { createContext } from 'react';

import Firebase from './Firebase';

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider = (props) => (
  <FirebaseContext.Provider value={new Firebase()}>
    {props.children}
  </FirebaseContext.Provider>
);
