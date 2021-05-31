import { useState, useEffect, createContext } from 'react';
import app from 'firebase/app';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      setLoading(false);
      setProvider(userInfo.providerData[0].providerId.split('.')[0]);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, provider }}>
      {props.children}
    </AuthContext.Provider>
  );
};
