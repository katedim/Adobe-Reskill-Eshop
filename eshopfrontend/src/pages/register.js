'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
        email,
        firstname,
        lastname,
        username,
        password,
        role: 'USER',
    };

    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User registered:', data);
            
            await createCartForUser(data.id);  
            router.push('/');
        } else {
            const errorData = await response.json(); 
            console.log('Error:', errorData.message); 
            alert(errorData.message || 'Registration failed. Please check your details.');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while trying to register.');
    }
};


  const createCartForUser = async (userId) => {
    try {
        const cartData = userId;
        const response = await fetch('http://localhost:8080/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        });

        if (!response.ok) {
            throw new Error('Failed to create cart');
        }

        console.log('Cart created successfully');
    } catch (error) {
        console.error('Error creating cart:', error);
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">First Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Last Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Username</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Register
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
