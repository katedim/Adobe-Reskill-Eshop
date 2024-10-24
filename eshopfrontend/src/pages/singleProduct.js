// pages/singleProduct.js
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SingleProduct() {
    const { isLoggedIn, userId } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { productId } = router.query;
    const [cartId, setCartId] = useState(null); // To hold the user's cart ID

    useEffect(() => {
        if (!isLoggedIn) {
          router.push('/login');
        }
      }, [isLoggedIn, router]);

    // Fetch user's cart ID when logged in
    useEffect(() => {
      const fetchCartId = async () => {
        if (isLoggedIn) {
          try {
            const response = await fetch(`http://localhost:8080/cart/${userId}`); // Get user's cart
            const data = await response.json();
            setCartId(data.id); // Assuming the cart ID is in data.id
          } catch (error) {
            console.error('Error fetching cart ID:', error);
          }
        }
      };

      fetchCartId();
    }, [isLoggedIn, userId]);

    useEffect(() => {
        const fetchProduct = async () => {
          if (!productId) return;  

          try {
            const response = await fetch(`http://localhost:8080/products/${productId}`);  // Fetch product by ID
            const data = await response.json();
            setProduct(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
          }
        };

        if (isLoggedIn && productId) {
            fetchProduct();
        }
      }, [isLoggedIn, productId]);

      const addToCart = async () => {
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

    if (loading) {
        return <div>Loading product...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="text-2xl font-bold">Product</h1>
            <div className="card bg-gray-100 shadow-md p-6 rounded-lg">
                <div>
                    <p><strong>Name:</strong> {product.product_name}</p>
                    <p><strong>Category:</strong> {product.product_category}</p>
                    <p><strong>Price:</strong> ${product.product_price}</p>
                    <button
                      onClick={addToCart}
                      className="mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                      Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
