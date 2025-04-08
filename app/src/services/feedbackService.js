export const submitFeedback = async (payload) => {
  const response = await fetch('http://localhost:3001/submit-feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
  return response.json();
};