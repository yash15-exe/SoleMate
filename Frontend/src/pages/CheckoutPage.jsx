import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../components/Checkout'; // Adjust the import according to your file structure
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default CheckoutPage;
