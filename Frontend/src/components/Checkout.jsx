import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
  iconStyle: "solid",
};

function CheckoutForm() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const { CartProducts } = location.state;
  const [clientSecret, setClientSecret] = useState();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const totalAmount = CartProducts.reduce(
      (sum, cartProduct) => sum + cartProduct.price,
      0
    );
    setAmount(totalAmount);
  }, [CartProducts]);

  const createOrder = async () => {
    const userId = user._id;
    const customerName = shippingDetails.name;
    const orderAddress = {
      address: shippingDetails.address,
      city: shippingDetails.city,
      pincode: shippingDetails.postalCode,
      state: shippingDetails.state,
      country: shippingDetails.country,
    };
    const products = CartProducts.map((product) => product._id);

    try {
      const paymentIntentId = await fetchPaymentIntent(amount);
      const { data } = await axios.post(
        "http://localhost:8000/api/order/createOrder",
        {
          products,
          orderAddress,
          userId,
          customerName,
          paymentIntentId, // Include paymentIntentId in the request body
        }
      );

      return data.orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const deleteOrder = async (orderId) => {
    await axios.post(`http://localhost:8000/api/order/deleteOrder`, { orderId });
  };

  const fetchPaymentIntent = async (totalAmount) => {
    const { data } = await axios.post("http://localhost:8000/api/payment", {
      amount: totalAmount * 100, // Amount in smallest currency unit (e.g., cents)
    });
    setClientSecret(data.paymentIntent.client_secret);

    return data.paymentIntent.id;
  };

  useEffect(() => {
    fetchPaymentIntent(amount);
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const newOrderId = await createOrder();
      setOrderId(newOrderId);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: shippingDetails.name,
            address: {
              line1: shippingDetails.address,
              city: shippingDetails.city,
              state: shippingDetails.state,
              postal_code: shippingDetails.postalCode,
              country: shippingDetails.country,
            },
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        toast.error(result.error.message);
        await deleteOrder(newOrderId);
        navigate("/orders/success");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful!");
          toast.success("Payment successful!");
          navigate("/orders/success");
        }
      }
    } catch (error) {
      console.error("Error during payment or order creation:", error);
      toast.error("Error during payment or order creation.");
      if (orderId) {
        await deleteOrder(orderId);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };
  const navigate = useNavigate();

  return (
    <div className="mt-10 md:mt-0 flex flex-col items-center font-poppins">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="w-full max-w-4xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <form className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={shippingDetails.state}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-4">Payment</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <CardNumberElement options={CARD_OPTIONS} />
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Expiry Date
                </label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <CardExpiryElement options={CARD_OPTIONS} />
                </div>
              </div>
              <div className="w-1/2 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  CVC
                </label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <CardCvcElement options={CARD_OPTIONS} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
                disabled={!stripe}
              >
                Pay ₹{amount.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
