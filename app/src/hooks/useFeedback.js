import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';
import { submitFeedback } from '../services/feedbackService';

export const useFeedback = () => {
  const {
    energy,
    selectedTask,
    feedback,
    setEnergy,
    setSelectedTask,
    setFeedback,
    setSubmitted,
  } = useContext(FeedbackContext);

  const handleSubmit = async () => {
    const payload = { energy, selectedTask, feedback }; 
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