import React from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    router.push("/login");
  };

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
            <a href="#" className="text-white font-semibold hover:underline">
              Category 1
            </a>
            <a href="#" className="text-white font-semibold hover:underline">
              Category 2
            </a>
            <a href="#" className="text-white font-semibold hover:underline">
              Category 3
            </a>
            <a href="#" className="text-white font-semibold hover:underline">
              Category 4
            </a>
            <a href="#" className="text-white font-semibold hover:underline">
              Category 5
            </a>
            <a href="#" className="text-white font-semibold hover:underline">
              Category 6
            </a>
          </nav>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/wishlist">
            <FaHeart className="text-white text-xl cursor-pointer hover:text-red-500" />
          </Link>
          <Link href="/cart">
            <FaShoppingCart className="text-white text-xl cursor-pointer hover:text-green-500" />
          </Link>
          {/* <Link href="/profile">
            <FaUser className="text-white text-xl cursor-pointer hover:text-blue-500" />
          </Link> */}

          <div class="dropdown">
            <button class="dropbtn">
            <FaUser className="text-white text-xl cursor-pointer hover:text-blue-500" />
            </button>
            <div class="dropdown-content">
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
              {/* <Link href="#">Link 3</Link> */}
            </div>
          </div>

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
