// pages/singleProduct.js
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function SingleProduct() {
    const { isLoggedIn, userId } = useAuth();
    const router = useRouter();
    const { productId } = router.query; // productId from query parameters
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [cartId, setCartId] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Convert productId to a number at the top level
    const numericProductId = productId ? Number(productId) : null;

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
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

        const fetchFavorites = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:8080/user/${userId}/favorites`);
                    const data = await response.json();
                    console.log('Fetched favorites:', data);
                    setFavorites(data.map(fav => fav.id)); // Extract IDs correctly
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        if (isLoggedIn) {
            fetchCartId();
            fetchFavorites();
        }
    }, [isLoggedIn, userId]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            try {
                const response = await fetch(`http://localhost:8080/products/${productId}`);
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
            const response = await fetch(`http://localhost:8080/cart/${cartId}/addProduct/${numericProductId}`, {
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

    const toggleFavorite = async () => {
        const isFavorite = favorites.includes(numericProductId);
        
        try {
            const response = isFavorite
                ? await fetch(`http://localhost:8080/user/${userId}/favorite/delete/${numericProductId}`, { method: 'DELETE' })
                : await fetch(`http://localhost:8080/user/${userId}/favorite/add/${numericProductId}`, { method: 'POST' });

            if (response.ok) {
                setFavorites(isFavorite
                    ? favorites.filter(id => id !== numericProductId)
                    : [...favorites, numericProductId]
                );
            } else {
                alert(`Failed to ${isFavorite ? 'remove' : 'add'} product from favorites.`);
            }
        } catch (error) {
            console.error(`Error ${isFavorite ? 'removing' : 'adding'} product to favorites:`, error);
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
                    <button
                        onClick={toggleFavorite}
                        className="favorite-button mt-2 bg-transparent border-none cursor-pointer"
                    >
                        {favorites.includes(numericProductId) ? (  // Check against numericProductId
                            <FaHeart className="text-red-500 text-xl cursor-pointer hover:text-red-700" />
                        ) : (
                            <FaRegHeart className="text-red-500 text-xl cursor-pointer hover:text-red-700" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
