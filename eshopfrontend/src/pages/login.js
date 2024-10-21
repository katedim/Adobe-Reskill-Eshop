import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);
      const response = await fetch('http://localhost:8080/rest/auth/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.role; 
        console.log(role);
        
        login(role); 
        router.push('/cart'); 
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while trying to log in.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
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
          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
