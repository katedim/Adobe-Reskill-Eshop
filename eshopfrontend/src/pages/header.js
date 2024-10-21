import React from "react";
import Image from "next/image"; // Import Image from Next.js
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"; // Using Font Awesome icons for demonstration
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Image
            src="/assets/logo.png" // Replace with your logo path
            alt="Logo"
            width={32} // Adjust width as needed
            height={32} // Adjust height as needed
            className="mr-4" // Margin to the right
          />
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
          <FaUser className="text-white text-xl cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </header>
  );
}
