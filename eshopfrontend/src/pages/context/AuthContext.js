import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);  // Add userId state

  const login = (role, id) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(id);  // Store userId when user logs in
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);  // Clear userId on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
