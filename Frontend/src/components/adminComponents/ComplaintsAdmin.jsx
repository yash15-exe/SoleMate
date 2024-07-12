import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/getFeedback`);
        setFeedbacks(response.data);
        toast.success('Feedback fetched successfully');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch feedback');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/deleteFeedback`, { id });
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      toast.success('Feedback deleted successfully');
    } catch (err) {
      console.error('Error deleting feedback:', err);
      toast.error('Failed to delete feedback');
    }
  };

  return (
    <div className="p-4 font-poppins">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="mb-4 p-4 border rounded shadow-sm">
              <p className="text-gray-700">
                <strong>{feedback.username}:</strong> {feedback.feedback}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(feedback._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feedback;
