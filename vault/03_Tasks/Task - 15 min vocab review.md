const time = new Date().toISOString().slice(11, 16).replace(':', '');
const taskSlug = selectedTask.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
const fileName = `fdbk-${date}-${time}-miguel-${taskSlug}.md`;
const filePath = path.join(logFolder, fileName);

const content = `---
id: ${fileName.replace('.md', '')}
created: ${new Date().toISOString()}
actor: Miguel
task: Task - ${selectedTask}
task_ref: [[Task - ${selectedTask}]]
tags: [session, auto-logged]
---

# Feedback – Miguel – ${selectedTask} (${time}, ${date})

**Notes:**  
> ${feedback}
`;
