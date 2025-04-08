const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ← NEW
const fs = require('fs'); // ← NEW
const path = require('path'); // ← NEW

const app = express();
const PORT = 3001;

app.use(cors()); // ← NEW
app.use(bodyParser.json());

const saveFeedback = ({ energy, selectedTask, feedback, actor }) => {
  const timestamp = new Date();
  const timeStr = timestamp.toISOString().slice(11, 16).replace(':', '');
  const dateStr = timestamp.toISOString().slice(0, 10);
  const actorSlug = (actor || 'unknown').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  const taskSlug = (selectedTask || 'untitled').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  const fileId = `fdbk-${dateStr}-${timeStr}-${actorSlug}-${taskSlug}`;
  const fileName = `${fileId}.md`;

  const content = `---
actor: ${actor || 'Unknown'}
task: ${selectedTask || 'Untitled'}
energy: ${energy || 0}
created: ${timestamp.toISOString()}
tags: [auto-logged]
---

# Feedback – ${actor || 'Unknown'} – ${selectedTask || 'Untitled'} (${timeStr})

> ${feedback || 'No feedback provided.'}
`;

  const logDir = path.join(__dirname, '../vault/06_Logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  fs.writeFileSync(path.join(logDir, fileName), content, 'utf8');
  return fileName;
};

app.post('/submit-feedback', (req, res) => {
  try {
    const { energy, selectedTask, feedback, actor } = req.body;

    // Validate and sanitize inputs
    const safeActor = typeof actor === 'string' ? actor : 'Unknown Actor';
    const safeTask = typeof selectedTask === 'string' ? selectedTask : 'Unknown Task';

    const fileName = saveFeedback({
      energy,
      selectedTask: safeTask,
      feedback,
      actor: safeActor,
    });

    res.json({ status: '✅ success', savedTo: `vault/06_Logs/${fileName}` });
  } catch (error) {
    console.error('❌ Failed to save feedback:', error);
    res.status(500).json({ status: '❌ error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Feedback server running at http://localhost:${PORT}`);
});