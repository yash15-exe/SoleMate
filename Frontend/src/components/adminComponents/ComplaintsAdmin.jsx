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
        const response = await axios.post(`/api/getFeedback`);
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/deleteFeedback`, { id });
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      toast.success('Feedback deleted successfully');
    } catch (err) {
      console.error('Error deleting feedback:', err);
      toast.error('Failed to delete feedback');
    }
  };

  return (
    <div className="p-4 font-poppins">
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
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
}

export default Feedback;
