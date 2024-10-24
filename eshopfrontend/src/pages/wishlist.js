import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Wishlist() {
  const { isLoggedIn, userId } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log(localStorage);  
      try { 
        const response = await fetch(`http://localhost:8080/user/${userId}/favorites`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFavorites(data);  
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchFavorites();
    }
  }, [isLoggedIn, userId]);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (!favorites.length) {
    return <p>No favorite projects available.</p>;
  }

  return (
    <div className='card-space'>
      <h1>Your Favorites</h1>
      <div className="product-list">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="product-card">
            <h2>{favorite.product_name}</h2>
            <p>{favorite.product_description}</p>
            <p>Price: ${favorite.product_price}</p>
            <p>Sale Price: ${favorite.product_sale_price}</p>
            <p>Stock: {favorite.product_stock}</p>
            <p>Reviews: {favorite.product_reviews}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
