import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancelledOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/getAllAdminOrders`, { status: "cancelled" });
        setOrders(response.data.orders || []);
        toast.success('Cancelled orders fetched successfully');
      } catch (err) {
        setError('Failed to fetch cancelled orders');
        toast.error('Failed to fetch cancelled orders');
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Cancelled Orders</h1>
      {orders.length === 0 ? (
        <div>No cancelled orders found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{order.customerName}</h2>
              <div className="mb-2">
                <strong>Products:</strong>{' '}
                {order.products.map(product => (
                  <span key={product._id}>{product.name}, </span>
                ))}
              </div>
              <div className="mb-2">
                <strong>Address:</strong> {order.orderAddress.address}, {order.orderAddress.city}, {order.orderAddress.state}, {order.orderAddress.country} - {order.orderAddress.pincode}
              </div>
              <div className="mb-2">
                <strong>Current Status:</strong> <span className="font-semibold">{order.orderStatus}</span>
              </div>
              <div>
                <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CancelledOrders;
