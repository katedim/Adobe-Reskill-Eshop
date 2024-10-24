// pages/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { isLoggedIn, userId } = useAuth(); // Use userId to fetch cart
  const router = useRouter();
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state to show spinner while fetching
  const [cartId, setCartId] = useState(null); // To hold the user's cart ID

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/allProducts'); // Update the URL to match your backend endpoint
        const data = await response.json();
        setProducts(data); // Set the fetched products to state
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    const fetchCartId = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8080/cart/${userId}`); // Get user's cart
          const data = await response.json();
          setCartId(data.id); // Assuming the cart ID is in data.id
        } catch (error) {
          console.error('Error fetching cart ID:', error);
        }
      }
    };

    if (isLoggedIn) {
      fetchProducts();
      fetchCartId();
    }
  }, [isLoggedIn, userId]);

  // Show loading spinner if products are still being fetched
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Show message if no products were found
  if (!products.length) {
    return <p>No products available.</p>;
  }

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${cartId}/addProduct/${productId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log('Product added to cart:', productId);
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
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
            <button
              onClick={() => addToCart(product.id)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
