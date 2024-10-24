import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/AuthContext';

export default function Orders() {
  const { isLoggedIn } = useAuth();
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
      try {
        const response = await fetch('http://localhost:8080/allOrders');  
        const data = await response.json();
        setOrders(data); 
        setLoading(false);  
        console.log(data);
        console.log(localStorage)
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };


    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  
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
{/* 
{order.productItems.map((product) => (
  <div key={product.id}>
  <div>product</div>
  </div>
))} */}
<div>
  {order.productItems.map((product) => (
    <div key={product.id}>
      {/* <div>{productItems}</div> */}
      <div>{product.product_name}</div>
    </div>
  ))}
</div>

            {/* <p>{product.product_description}</p>
            <p>Category: {product.product_category}</p>
            <p>Price: ${product.product_price}</p>
            <p>Sale Price: ${product.product_sale_price}</p>
            <p>Stock: {product.product_stock}</p>
            <p>Reviews: {product.product_reviews}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
