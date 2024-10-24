import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SingleProduct() {
    const { isLoggedIn, userId } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productId } = router.query;
    

 
    useEffect(() => {
        if (!isLoggedIn) {
          router.push('/login');
        }
      }, [isLoggedIn, router]);
    
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
                    <p><strong>Price:</strong> {product.product_price}</p>
                </div>
            </div>
        </div>
    );
}
