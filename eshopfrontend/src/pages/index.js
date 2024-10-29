import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAuth } from './context/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';  

export default function Home() {
  const { isLoggedIn, userId } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [cartId, setCartId] = useState(null); 
  const [favorites, setFavorites] = useState([]);  
 
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/allProducts');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${userId}/favorites`);  
        const data = await response.json();
        setFavorites(data.map(fav => fav.id));  
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    const fetchCartId = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8080/cart/${userId}`);
          const data = await response.json();
          setCartId(data.id);
        } catch (error) {
          console.error('Error fetching cart ID:', error);
        }
      }
    };

    if (isLoggedIn) {
      fetchProducts();
      fetchFavorites();
      fetchCartId();
    }
  }, [isLoggedIn, userId]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (!products.length) {
    return <p>No products available.</p>;
  }
 
  const addToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${cartId}/addProduct/${productId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

 
  const toggleFavorite = async (productId) => {
    const isFavorite = favorites.includes(productId);
    try {
      const response = isFavorite
        ? await fetch(`http://localhost:8080/user/${userId}/favorite/delete/${productId}`, { method: 'DELETE' })
        : await fetch(`http://localhost:8080/user/${userId}/favorite/add/${productId}`, { method: 'POST' });

      if (response.ok) {
        if (isFavorite) {
          setFavorites(favorites.filter(id => id !== productId));  
        } else {
          setFavorites([...favorites, productId]);  
        }
      } else {
        alert(`Failed to ${isFavorite ? 'remove' : 'add'} product from favorites.`);
      }
    } catch (error) {
      console.error(`Error ${isFavorite ? 'removing' : 'adding'} product to favorites:`, error);
    }
  };
  return (
    <div className='card-space'>
      <h1>Available Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/singleProduct?productId=${product.id}`}>
              <h2>{product.product_name}</h2>
              <p>{product.product_description}</p>
              <p>Category: {product.product_category}</p>
              <p>Price: ${product.product_price}</p>
              <p>Sale Price: ${product.product_sale_price}</p>
              <p>Stock: {product.product_stock}</p>
              <p>Reviews: {product.product_reviews}</p>
            </Link>
            <div className="product-actions">  
              <button
                onClick={() => addToCart(product.id)}
                className="add-to-cart-button mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Add to Cart
              </button>
   
              <button
                onClick={() => toggleFavorite(product.id)}
                className="favorite-button mt-2 bg-transparent border-none cursor-pointer"
              >
                {favorites.includes(product.id) ? (
                  <FaHeart className="text-red-500 text-xl cursor-pointer hover:text-red-700" /> 
                ) : (
                  <FaRegHeart className="text-red-500 text-xl cursor-pointer hover:text-red-700" />  
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}