import React, { useContext, useEffect, useState } from 'react';
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

  // Reintroduce goal state
  const goals = [
    {
      id: 'improve-spanish-reading',
      title: 'Improve Spanish Reading Fluency',
      description: 'Read articles and short stories with better comprehension.',
    },
    {
      id: 'retain-new-vocabulary',
      title: 'Retain New Vocabulary',
      description: 'Practice techniques to make new words stick.',
    },
    {
      id: 'boost-grammar-confidence',
      title: 'Boost Grammar Confidence',
      description: 'Lightweight grammar drills to improve structure awareness.',
    },
  ];

  const [selectedGoal, setSelectedGoal] = useState(() => {
    return localStorage.getItem('selectedGoal') || '';
  });

  useEffect(() => {
    if (selectedGoal) {
      localStorage.setItem('selectedGoal', selectedGoal);
    }
  }, [selectedGoal]);

  const tasksByGoal = {
    'improve-spanish-reading': [
      'Read short article + summarize',
      'Practice with story excerpt',
    ],
    'retain-new-vocabulary': [
      'Flashcard cycle',
      'Context sentence creation',
    ],
    'boost-grammar-confidence': [
      '5-min grammar quiz',
      'Correct 3 old mistakes',
    ],
  };

  return (
    <section className="app-container">
      <h2 className="greeting">
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {actor}!
      </h2>
      <p className="plate-prompt">What’s on your plate right now?</p>

      <div className="goal-tabs">
        {goals.map((goal) => (
          <button
            key={goal.id}
            className={`goal-tab${selectedGoal === goal.id ? ' selected' : ''}`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <strong>{goal.title}</strong>
            <div className="goal-desc">{goal.description}</div>
          </button>
        ))}
      </div>

      {selectedGoal && (
        <>
          <p className="task-prompt">Choose a task for this goal:</p>
          <div className="task-buttons">
            {(tasksByGoal[selectedGoal] || []).map((task, index) => (
              <button
                key={index}
                className={`task-button ${selectedTask === task ? 'selected' : ''}`}
                onClick={() => setSelectedTask(task)}
              >
                {task}
              </button>
            ))}
          </div>
        </>
      )}

      <h1>Flow Feedback</h1>
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 4000);
            handleSubmit({
              actor,
              goal: selectedGoal, // Correctly pass selectedGoal as goal
              selectedTask,
              energy,
              feedback,
            });
            setEnergy(50);
            setFeedback('');
            setSelectedTask('');
          }}
        >
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

          <button className="submit-button" type="submit" disabled={!selectedTask || !selectedGoal}>
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
