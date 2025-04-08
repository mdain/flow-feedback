# Flow Feedback System

This project is an experimental prototype that blends semantic reflection, cognitive rhythm tracking, and feedback-driven learning via a structured local environment.

## Project Structure

```
flow-feedback/
├── app/              # Vite + React frontend (feedback form)
├── server/           # Express backend for receiving and logging feedback
├── vault/            # Obsidian vault containing goals, tasks, and session logs
├── package.json      # Root-level Node config (if initialized here)
├── README.md         # This file
```

## How it Works

1. **User opens the frontend** at http://localhost:5173  
2. **Feedback form submits data** to Express server at http://localhost:3001  
3. **Server writes data** into `vault/06_Logs/` as a `.md` file  
4. **Obsidian reflects the data** for strategist review and pattern insight

## Data Format

Feedback logs are saved as `.md` files with [YAML frontmatter](https://help.obsidian.md/Advanced+topics/YAML+front+matter) to support Obsidian's Dataview plugin.

Example entry:
\`\`\`markdown
---
energy: 62
task: Passive listening exercise
tags: [session, auto-logged]
---

# 2025-04-08 Feedback

**Notes:**  
> It felt easier to focus after a short walk.
\`\`\`

This allows for querying feedback patterns over time directly within Obsidian.

## Usage

- To start the Vite app:
  ```bash
  cd app
  npm install
  npm run dev
  ```

- To start the feedback server:
  ```bash
  cd server
  node server.js
  ```

## Goals

- Encourage cognitive flow states through self-awareness  
- Allow strategists to visualize momentum and resistance patterns  
- Maintain simplicity, auditability, and local control  
