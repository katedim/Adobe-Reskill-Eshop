import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Cart() {
  const { isLoggedIn, userId } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cart/${userId}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
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
  }, [isLoggedIn, userId]); 

  const handleRemoveProduct = async (productId, productName) => {
    const userConfirmed = window.confirm(`Are you sure you want to remove the ${productName} from your cart?`);
    
    if (!userConfirmed) {
      return;  
    }

    try {
      const response = await fetch(`http://localhost:8080/cart/${cart.id}/removeProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      const updatedCartResponse = await fetch(`http://localhost:8080/cart/${userId}`);
      if (!updatedCartResponse.ok) {
        throw new Error('Failed to fetch updated cart');
      }
      const updatedCart = await updatedCartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await fetch(`http://localhost:8080/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { id: userId },
          productItems: cart.productItems,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      alert(`Order created successfully! Order ID: ${order.id}`);

      const emptyCartResponse = await fetch(`http://localhost:8080/cart/${cart.id}/emptyCart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!emptyCartResponse.ok) {
        throw new Error('Failed to empty the cart');
      }

      const updatedCart = await emptyCartResponse.json();
      setCart(updatedCart);
     
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
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
            <button className='remove-button' onClick={() => handleRemoveProduct(product.id, product.product_name)}>Remove</button>
          </div>
        ))}
      </div>
      {/* Centered Buy Now Button */}
      <div className="buy-now-container">
        <button className='buy-now-button' onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
  
}
