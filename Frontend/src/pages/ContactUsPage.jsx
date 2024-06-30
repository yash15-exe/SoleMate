import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUsPage = () => {
  const user = useSelector((state) => state.auth.user); // Assuming your user state is stored like this
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback) {
      alert('Please enter your feedback.');
      return;
    }

    const feedbackData = {
      user: user._id,
      username: user.username,
      feedback
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, feedbackData);
      toast.success(response.data.message);
      setFeedback('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="p-4 flex flex-col items-center bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 ">Contact Us</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-xl font-poppins text-gray-700">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            className="mt-1 block w-full border-gray-300 border-2 p-2 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
        >
          Submit Feedback
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactUsPage;
