import React, { useState} from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token: any) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const loginHandler = (token: any) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const contextValue: any = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;