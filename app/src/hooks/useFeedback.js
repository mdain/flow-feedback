import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';
import { submitFeedback } from '../services/feedbackService';

export const useFeedback = () => {
  const {
    energy,
    selectedTask,
    feedback,
    setSubmitted,
  } = useContext(FeedbackContext);

  const handleSubmit = async ({ actor }) => {
    const payload = { energy, selectedTask, feedback, actor }; // Ensure actor is included
    console.log('Submitting payload:', payload); // Debugging: Log the payload
    try {
      const data = await submitFeedback(payload);
      console.log('✅ Feedback submitted:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('❌ Error submitting feedback:', error);
    }
  };

  return { handleSubmit };
};