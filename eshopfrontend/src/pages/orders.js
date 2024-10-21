// src/pages/orders.js
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Orders() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoading(false); // Set loading to false if logged in
    }
  }, [isLoggedIn, router]);

  // Show loading message
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner if you like
  }

  // Check user role
  if (userRole.includes('ROLE_ADMIN')) {
    return (
      <div>
        Admin
        <button onClick={() => router.push('/cart')}>Go to Cart</button>
      </div>
    );
  } else if (userRole.includes('ROLE_USER')) {
    return (
      <div>
        User
        <button onClick={() => router.push('/cart')}>Go to Cart</button>
      </div>
    );
  }

  return <div>Unauthorized access</div>; // You can customize this message
}
