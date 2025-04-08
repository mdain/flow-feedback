import React, { createContext, useState } from 'react';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [energy, setEnergy] = useState(50);
    const [selectedTask, setSelectedTask] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [actor, setActor] = useState('Miguel');

    return (
        <FeedbackContext.Provider
            value={{
                energy,
                setEnergy,
                selectedTask,
                setSelectedTask,
                feedback,
                setFeedback,
                submitted,
                setSubmitted,
                actor,
                setActor,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};