import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Load authentication state from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
      setUserId(parsedUser.id);
    }
  }, []);

  // Save authentication state to localStorage when user logs in
  const login = (role, id) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(id);
    localStorage.setItem('auth', JSON.stringify({ role, id }));
  };

  // Clear authentication state when user logs out
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    localStorage.removeItem('auth');
    router.push('/login');  // Redirect to login on logout
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
