import { useState } from 'react';
// import Login from '../components/Login'; 
import Login from './login';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Render different content based on the user role
  // router.push('/cart')
  // return <h1>Welcome to the Homepage</h1>;
}
