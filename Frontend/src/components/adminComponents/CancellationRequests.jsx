import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancellationRequests() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders with cancellation requests
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`/api/order/getOrdersForCancellationRequests`);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const approveCancellation = async (orderId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/cancelOrder`, { orderId });
      // Update the UI to reflect the cancellation
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      toast.success(response.data.message);
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error('Error cancelling order');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-black font-poppins ">No Requests found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Cancellation Requests</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders with cancellation requests found</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order._id} className="py-4 px-4 shadow-gray-300 shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-lg font-bold">Order ID: {order._id}</div>
                  <div className="mt-2">User ID: {order.user._id}</div>
                  <div className="mt-2">Username: {order.user.username}</div>
                  <div className="mt-1">Status: {order.orderStatus}</div>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => approveCancellation(order._id)}
                >
                  Approve Cancellation
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CancellationRequests;
