// context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState([]); // Change from null to empty array

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role ? role.split(',') : []); 
};

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole([]); // Set userRole back to an empty array
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
