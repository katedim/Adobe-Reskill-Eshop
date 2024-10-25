import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";

const Admin = () => {
  const { userRole } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});

  useEffect(() => {
    if (!userRole || !userRole.includes("ADMIN")) {
      router.push("/login");
    }

    const fetchData = async () => {
        console.log(localStorage)
      try {
        const usersResponse = await fetch("http://localhost:8080/allUsers");
        const productsResponse = await fetch("http://localhost:8080/allProducts");

        if (!usersResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersResponse.json();
        const productsData = await productsResponse.json();

        setUsers(usersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userRole, router]);

  const handleDeleteUser = async (username, userId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the ${username} user?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleDeleteProduct = async (productName, productId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the ${productName} product?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/admin/products/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(product.id);
    setEditedProductData(product);
  };

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setEditedProductData({
      ...editedProductData,
      [name]: value
    });
  };

  const handleSaveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProductData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setProducts(products.map(product => (product.id === productId ? editedProductData : product)));
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedProductData({});
  };

  return (
    <div className="admin-container p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="users-section mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="user-card p-4 border rounded shadow">
              <h3 className="font-bold">{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>First Name: {user.firstname}</p>
              <p>Last Name: {user.lastname}</p>
              <button
                onClick={() => handleDeleteUser(user.username, user.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="products-section">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card p-4 border rounded shadow">
              {isEditing === product.id ? (
                <>
                  <input
                    type="text"
                    name="product_name"
                    value={editedProductData.product_name}
                    onChange={handleChangeProduct}
                    className="border border-gray-300 p-1 rounded mb-2"
                  />
                  <input
                    type="number"
                    name="product_price"
                    value={editedProductData.product_price}
                    onChange={handleChangeProduct}
                    className="border border-gray-300 p-1 rounded mb-2"
                  />
                  <textarea
                    name="product_description"
                    value={editedProductData.product_description}
                    onChange={handleChangeProduct}
                    className="border border-gray-300 p-1 rounded mb-2"
                  />
                  <button
                    onClick={() => handleSaveProduct(product.id)}
                    className="mt-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="mt-2 bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{product.product_name}</h3>
                  <p>Price: ${product.product_price}</p>
                  <p>Description: {product.product_description}</p>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.product_name, product.id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
