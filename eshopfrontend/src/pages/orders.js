import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Orders() {
  const { isLoggedIn, userId } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log(localStorage); 
      try { 
        const response = await fetch(`http://localhost:8080/order/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn, userId]);  

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!orders.length) {
    return <p>No orders available.</p>;
  }

  return (
    <div className='card-space'>
      <h1>Available Orders</h1>
      <div className="product-list">
        {orders.map((order) => (
          <div key={order.id} className="product-card">
            <h2>{order.state}</h2>
            <p>{new Date(order.createdDate).toISOString().slice(0, 10)}</p>
            <div>
              {order.productItems.map((product) => (
                <div key={product.id}>
                  <div>{product.product_name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
