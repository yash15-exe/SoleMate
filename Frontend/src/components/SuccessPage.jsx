// SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const SuccessPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="text-green-500 w-24 h-24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h1 className="text-2xl font-semibold mt-4">Payment Successful!</h1>
      <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
      <button onClick={()=>navigate("/")}>Redirect to home</button>
    </div>
  );
};

export default SuccessPage;
