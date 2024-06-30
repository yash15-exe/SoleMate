import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../components/Checkout'; // Adjust the import according to your file structure
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default CheckoutPage;
