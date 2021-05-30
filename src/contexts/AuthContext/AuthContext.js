import { useState, useEffect, createContext } from 'react';
import app from 'firebase/app';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
