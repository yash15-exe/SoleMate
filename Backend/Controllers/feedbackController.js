import Feedback from '../Models/feedbackModel.js';

// Handle creating a new feedback
export const createFeedback = async (req, res) => {
  const { user, username, feedback } = req.body;

  try {
    const newFeedback = await Feedback.create({
      user,
      username,
      feedback
    });

    res.status(201).json({ message: 'Feedback submitted successfully!', feedback: newFeedback });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback. Please try again.' });
  }
};




export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'username');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.body;
  try {
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
