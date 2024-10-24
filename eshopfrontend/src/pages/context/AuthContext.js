// context/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const router = useRouter();

  // Load authentication state from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
      setUserId(parsedUser.id);
      fetchCartId(parsedUser.id); // Fetch cart ID when user is logged in
    }
  }, []);

  const fetchCartId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${userId}`);
      if (response.ok) {
        const cart = await response.json();
        setCartId(cart.id); // Assuming cart object has an id field
      } else {
        console.error('Failed to fetch cart ID');
      }
    } catch (error) {
      console.error('Error fetching cart ID:', error);
    }
  };

 
  const login = (role, id) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(id);
    localStorage.setItem('auth', JSON.stringify({ role, id }));
    fetchCartId(id);  
  };
 
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setCartId(null);  
    localStorage.removeItem('auth');
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, cartId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
