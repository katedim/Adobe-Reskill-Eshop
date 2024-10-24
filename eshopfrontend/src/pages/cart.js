import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Cart() {
  const { isLoggedIn, userId } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);  // Initialize as null for an object
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, userId, router]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cart/${userId}`);  
        const data = await response.json();
        setCart(data); 
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${cart.id}/removeProduct/${productId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      // Fetch the updated cart after removal
      const updatedCartResponse = await fetch(`http://localhost:8080/cart/${userId}`);
      const updatedCart = await updatedCartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!cart || !cart.productItems || !cart.productItems.length) {
    return <p>No cart available.</p>;
  }

  return (
    <div className='card-space'>
      <h1>Available Cart</h1>
      <div className="product-list">
        {cart.productItems.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p>Category: {product.product_category}</p>
            <p>Price: ${product.product_price.toFixed(2)}</p>
            <p>Sale Price: ${product.product_sale_price.toFixed(2)}</p>
            <p>Stock: {product.product_stock}</p>
            <p>Reviews: {product.product_reviews}</p>
            {/* Remove button */}
            <button className='remove-button' onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
