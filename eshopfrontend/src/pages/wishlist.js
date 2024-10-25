import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Wishlist() {
    const { isLoggedIn, userId } = useAuth();
    const router = useRouter();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    // Fetch user's favorites and cart ID
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/favorites`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFavorites(data);  
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };

        const fetchCartId = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cart/${userId}`);
                const data = await response.json();
                setCartId(data.id);
            } catch (error) {
                console.error('Error fetching cart ID:', error);
            }
        };

        if (isLoggedIn) {
            fetchFavorites();
            fetchCartId();
        }
    }, [isLoggedIn, userId]);

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

    if (loading) {
        return <p>Loading favorites...</p>;
    }

    if (!favorites.length) {
        return <p>No favorite products available.</p>;
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
                        <button
                            onClick={() => addToCart(favorite.id)}
                            className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
