import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";

export default function Header() {
  const { logout, userRole } = useAuth();  
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/products/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-4"
            />
          </Link>
          <nav className="flex space-x-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/${category.toLowerCase()}`} className="text-white font-semibold hover:underline">
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/wishlist">
            <FaHeart className="text-white text-xl cursor-pointer hover:text-red-500" />
          </Link>
          <Link href="/cart">
            <FaShoppingCart className="text-white text-xl cursor-pointer hover:text-green-500" />
          </Link>

          <div className="dropdown">
            <button className="dropbtn">
              <FaUser className="text-white text-xl cursor-pointer hover:text-blue-500" />
            </button>
            <div className="dropdown-content">
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
            </div>
          </div>

          {/* Conditionally render the Admin button based on user role */}
          {userRole?.includes("ADMIN") && (
            <Link href="/admin">
              <button className="text-white text-xl cursor-pointer hover:text-yellow-500">
                Admin
              </button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-white text-xl cursor-pointer hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
