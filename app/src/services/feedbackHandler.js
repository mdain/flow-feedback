const saveFeedback = ({ energy, selectedTask, feedback, actor }) => {
  const timestamp = new Date();
  const timeStr = timestamp.toISOString().slice(11, 16).replace(':', '');
  const dateStr = timestamp.toISOString().slice(0, 10);

  // Validate and sanitize actor and selectedTask
  const safeActor = typeof actor === 'string' ? actor : 'Unknown Actor';
  const safeTask = typeof selectedTask === 'string' ? selectedTask : 'Unknown Task';

  const actorSlug = safeActor.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  const taskSlug = safeTask.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  const fileId = `fdbk-${dateStr}-${timeStr}-${actorSlug}-${taskSlug}`;
  const fileName = `${fileId}.md`;

  const content = `---
id: ${fileId}
created: ${timestamp.toISOString()}
actor: ${safeActor}
task: Task - ${safeTask}
task_ref: [[Task - ${safeTask}]]
energy: ${energy || 'N/A'}
tags: [session, auto-logged]
---

# Feedback – ${safeActor} – ${safeTask} (${timeStr}, ${dateStr})

**Notes:**  
> ${feedback || 'No feedback provided'}
`;

  return { fileName, content };
};

export default saveFeedback;
