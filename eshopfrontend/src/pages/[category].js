import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./context/AuthContext";  
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function CategoryPage() {
  const { isLoggedIn, userId } = useAuth();  
  const router = useRouter();
  const { category } = router.query; 
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
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
          setFavorites(data.map(fav => fav.id));
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
    if (!category || !isLoggedIn) return;

    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/category/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [category, isLoggedIn]);

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
        setFavorites(isFavorite
          ? favorites.filter(id => id !== productId)
          : [...favorites, productId]
        );
      } else {
        alert(`Failed to ${isFavorite ? 'remove' : 'add'} product from favorites.`);
      }
    } catch (error) {
      console.error(`Error ${isFavorite ? 'removing' : 'adding'} product to favorites:`, error);
    }
  };

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Products in {category}</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p className="text-green-500 font-bold">${product.product_price}</p>

            <div className="flex items-center mt-4">
              <button
                onClick={() => addToCart(product.id)}
                className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded mr-4"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="favorite-button bg-transparent border-none cursor-pointer"
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
