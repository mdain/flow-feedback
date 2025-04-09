import React, { useContext, useState } from 'react';
import { FeedbackContext } from './context/FeedbackContext';
import { useFeedback } from './hooks/useFeedback';
import './style.css';

const App = () => {
  const {
    energy,
    setEnergy,
    selectedTask,
    setSelectedTask,
    feedback,
    setFeedback,
    submitted,
    setSubmitted,
    actor,
  } = useContext(FeedbackContext);
  const { handleSubmit } = useFeedback();
  
  // removed activeTask for simplification

  const tasks = [
    '15 min vocab review',
    'Passive listening exercise',
    '5-min grammar quiz',
  ];

  return (
    <section className="app-container">
      <h2 className="greeting">
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {actor}!
      </h2>
      <p className="plate-prompt">What’s on your plate right now?</p>
      <label htmlFor="taskSelect">Choose a task:</label>
      <select
        id="taskSelect"
        className="task-select"
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="">-- Select a task --</option>
        {tasks.map((task, index) => (
          <option key={index} value={task}>
            {task}
          </option>
        ))}
      </select>
      <h1>Flow Feedback</h1>
      {!submitted ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
          }, 4000); // Reset after 4 seconds
          handleSubmit({ actor });
          setEnergy(50);
          setFeedback('');
          setSelectedTask('');
        }}>
          <label>How energized are you right now? {energy}%</label>
          <input
            type="range"
            className="slider"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
          />

          <label>What helped or didn’t work?</label>
          <textarea
            className="feedback-textarea"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            className="submit-button"
            type="submit"
            disabled={!selectedTask}
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className="feedback-confirmation" role="status">
          ✅ Thanks! Your feedback was recorded.
        </div>
      )}
    </section>
  );
};

export default App;
