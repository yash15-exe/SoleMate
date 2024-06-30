import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/getAllAdminOrders`); // Adjust the endpoint URL according to your setup
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders');
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/updateOrderStatus`, { newStatus, orderId });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status', error);
      toast.error('Failed to update order status');
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (confirmed) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/cancelOrder`, { orderId });
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, orderStatus: 'cancelled' } : order
          )
        );
        toast.success('Order cancelled successfully');
      } catch (error) {
        console.error('Failed to cancel order', error);
        toast.error('Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <div>No orders found</div>
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
              <div className="mb-2">
                <strong>Change Status:</strong>{' '}
                <select
                  value={order.orderStatus}
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="processing">Processing</option>
                  <option value="processed">Processed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mb-2">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Order
                </button>
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

export default AllOrders;
