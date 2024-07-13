import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const user = useSelector((state) => state.auth.user);
  const [CartProducts, setCartProducts] = useState([]);
  const username = user.username;

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/getCartItems`, {
        username,
      })
      .then((res) => res.data)
      .then((data) => {
        setCartProducts(data.cartItems);
        console.log(data.cartItems);
      })
      .catch((error) => {
        toast.error("Failed to fetch cart items. Please try again.");
        console.error("Error fetching cart items:", error);
      });
  }, [username]);

  // Calculate subtotal, total tax, and total price
  const subtotal = CartProducts.reduce((total, item) => total + item.price, 0);
  const totalTax = CartProducts.reduce(
    (total, item) => total + item.price * item.taxRate,
    0
  );
  const totalPrice = subtotal + totalTax;
  const navigate = useNavigate();
  
  const handleDeletion = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/deleteCartItems`,
        { username, productId }
      );
      if (response.data.status === 200) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((item) => item._id !== productId)
        );
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart. Please try again.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    }
  };

  const handleCheckout = () => {
    if (CartProducts.length === 0) {
      toast.error("Your cart is empty. Add some items before checkout.");
      return;
    }
    navigate("/checkout", { state: { CartProducts } });
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      {CartProducts.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          Your cart is empty
        </div>
      ) : (
        <>
          {CartProducts.map((item, index) => (
            <div key={index} className="flex items-center border-b py-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover mr-4 filter grayscale hover:grayscale-0 transition duration-300"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">Brand: {item.productBrand}</p>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-bold">Price: ₹{item.price}</p>
                <p className="text-gray-600">Tax Rate: {item.taxRate * 100}%</p>
                <p className="text-gray-600">
                  Tax: ₹{(item.price * item.taxRate).toFixed(2)}
                </p>
              </div>
              <button onClick={() => handleDeletion(item._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          ))}
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <div className="text-right text-lg mb-2">
              <p className="text-gray-700">Subtotal:</p>
              <ul className="text-gray-600 list-disc list-inside">
                {CartProducts.map((item, index) => (
                  <li key={index}>
                    {item.name}: ₹{item.price.toFixed(2)}
                    <br />
                    Tax: ₹{(item.price * item.taxRate).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right text-lg">
              <p className="text-gray-700">Total Tax: ₹{totalTax.toFixed(2)}</p>
              <p className="text-xl font-bold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right mt-4">
              <button
                onClick={handleCheckout}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default Cart;
