import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`/api/order/getAllUserOrders`, { userId });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders. Please try again later.');
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(`/api/order/requestOrderForCancellation`, { orderId });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, cancellationRequest: true } : order
      ));
      toast.success('Order cancellation request sent successfully.');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Error cancelling order. Please try again later.');
    }
  };

  const handleRateProduct = async (productId, rating) => {
    try {
      const response = await axios.post(`/api/products/rateProduct`, { productId, rating });
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order._id === response.data.orderId) {
            return {
              ...order,
              products: order.products.map(product =>
                product._id === productId ? { ...product, rating: response.data.product.rating } : product
              )
            };
          } else {
            return order;
          }
        })
      );
      toast.success('Product rated successfully.');
    } catch (error) {
      console.error('Error rating product:', error);
      toast.error('Error rating product. Please try again later.');
    }
  };

  const RateProduct = ({ productId }) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
      const product = orders.find(order => order.products.some(product => product._id === productId));
      if (product) {
        const selectedProduct = product.products.find(product => product._id === productId);
        if (selectedProduct) {
          setRating(selectedProduct.rating?.averageRating || 0);
        }
      }
    }, [productId, orders]);

    const handleClick = (value) => {
      if (value === rating) {
        setRating(0);
        handleRateProduct(productId, 0);
      } else {
        setRating(value);
        handleRateProduct(productId, value);
      }
    };

    return (
      <div className="flex items-center">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <FontAwesomeIcon
              key={ratingValue}
              icon={faStar}
              className={`cursor-pointer ${ratingValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => handleClick(ratingValue)}
              style={{ marginRight: '2px', fontSize: '1.5rem' }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 font-poppins">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <ToastContainer />
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-4 p-4 border rounded shadow">
              <div className="flex justify-between items-start h-full">
                <div className="flex-1">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Customer Name:</strong> {order.customerName}</p>
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {order.orderStatus}</p>
                  {order.orderAddress && (
                    <p><strong>Address:</strong> {`${order.orderAddress.address}, ${order.orderAddress.city}, ${order.orderAddress.state}, ${order.orderAddress.country}, ${order.orderAddress.pincode}`}</p>
                  )}
                  <p><strong>Products:</strong></p>
                  <ul className="pl-5">
                    {order.products && order.products.length > 0 ? (
                      order.products.map(product => (
                        <li key={product._id} className="mb-2">
                          <div className="flex justify-between items-center">
                            <div>
                              {product.name} - {product.productBrand}
                            </div>
                            <div className="flex items-center">
                              <div className="mr-2">Rating: {product.rating && product.rating.averageRating ? product.rating.averageRating.toFixed(1) : 'Not rated'}</div>
                              <RateProduct productId={product._id} />
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No products found.</li>
                    )}
                  </ul>
                  {order.cancellationRequest && (
                    <p className="text-red-500">Requested for Cancellation</p>
                  )}
                  {!order.cancellationRequest && order.orderStatus !== 'cancelled' && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Request for Cancellation
                    </button>
                  )}
                </div>
                <div className="ml-4 flex items-center justify-center h-full">
                  {order.products && order.products.length > 0 && order.products.map(product => (
                    product.imageUrl && (
                      <img key={product._id} className="h-32 object-cover" src={product.imageUrl} alt="Product" />
                    )
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default UserOrders;
