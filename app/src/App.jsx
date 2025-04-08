import React, { useContext } from 'react';
import { FeedbackContext } from './context/FeedbackContext';
import { useFeedback } from './hooks/useFeedback';

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

  const tasks = [
    '15 min vocab review',
    'Passive listening exercise',
    '5-min grammar quiz',
  ];

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Flow Feedback</h1>
      {!submitted ? (
        <div>
          <label>How energized are you right now? {energy}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            style={{ width: '100%' }}
          />

          <h3>Pick a task:</h3>
          {tasks.map((task) => (
            <button
              key={task}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '0.5rem',
                background: selectedTask === task ? '#444' : '#eee',
                color: selectedTask === task ? '#fff' : '#000',
                padding: '0.5rem',
                textAlign: 'left',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedTask(task)}
            >
              {task}
            </button>
          ))}

          <label>What helped or didn’t work?</label>
          <textarea
            rows="3"
            style={{ width: '100%', marginBottom: '1rem' }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            onClick={() => handleSubmit({ actor: 'Miguel' })}
            disabled={!selectedTask}
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Submit Feedback
          </button>
        </div>
      ) : (
        <div style={{ color: 'green', marginTop: '2rem' }}>
          ✅ Thanks! Your feedback was recorded.
        </div>
      )}
    </div>
  );
};

export default App;
