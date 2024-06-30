// FailurePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="text-red-500 w-24 h-24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <h1 className="text-2xl font-semibold mt-4">Payment Failed!</h1>
      <p className="mt-2 text-gray-600">Please try again later.</p>
      <button onClick={()=>navigate("/")}>Redirect to home</button>
    </div>
  );
};

export default FailurePage;
