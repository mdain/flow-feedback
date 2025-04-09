# Flow Feedback System

Flow Feedback is an experimental system for capturing human rhythms, modeling learning momentum, and interpreting evolving confidence toward personal or team goals. It blends structured task logging, semantic context, and temporal awareness—mapped into an Obsidian vault and surfaced through a lightweight local web interface.

This project explores a dual-view model:
- **Participant View** – For those doing the work: selects a goal, logs energy behind specific tasks, and reflects in natural language.
- **Strategist View** – For those shaping the system: interprets momentum trends, surfacing patterns of resistance, stalling, or strategic misalignment.

It treats **confidence** as an emergent metric—computed from engagement patterns, momentum, and energy—not self-reported.

## Project Structure

```
flow-feedback/
├── app/              # Frontend for collecting participant input (React + Vite)
├── server/           # Express backend to log and timestamp structured feedback
├── vault/            # Obsidian vault storing semantic goals, tasks, and logs
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
This system builds on foundational insights from cognitive science and decision theory, particularly the work of Daniel Kahneman (_Thinking, Fast and Slow_) and Philip Tetlock (_Superforecasting_). By treating confidence as a probabilistic signal rather than a self-assessed state, Flow Feedback aligns with research showing that human intuition is often overconfident, poorly calibrated, and resistant to updating. Instead, this system favors lightweight, dynamic models that reward consistency, awareness of uncertainty, and interpretive feedback loops—hallmarks of effective reasoning in complex, evolving environments.

## Design Philosophy

This system is not just a data logger or habit tracker—it is an evolving framework for supporting intentional learning and meaningful reflection.

Key principles guiding its development:

- **Confidence is computed, not declared**  
  Human participants express energy and emotion, but confidence is modeled based on trends, decay, and momentum—representing the evolving likelihood that a goal is achievable.

- **Goals are flexible, not checklists**  
  Tasks serve goals, but goals may shift as insight is gained. Confidence in a goal reflects more than just completion of steps—it tracks alignment between effort, timing, and engagement.

- **Two views, two truths**  
  Participants log their experience (energy, feedback, intention), while strategists interpret broader patterns (momentum, resistance, misalignment) to guide adaptation.

- **Simplicity enables sustainability**  
  The architecture is deliberately local, inspectable, and modular—favoring human-readable logs and semantic tooling over opaque automation.

- **Rhythm-aware design**  
  Attention ebbs and flows. The system honors temporal patterns (daily, weekly) and avoids penalizing natural fluctuations—favoring insight over urgency.

- **Narrative feedback over boolean completion**  
  LLMs play a crucial role in interpreting task logs not as binary events but as evolving narratives. These stories capture natural ebbs and flows in engagement, energy, and focus—offering a more nuanced and human-aligned understanding of progress. Performance is contextual, and narrative analysis may reveal more about achievement than checkboxes ever could.

- **Confidence intervals as decision tools**  
  While statistical confidence intervals are common in science and engineering, they're rarely applied to human motivation or goal systems. This project uses confidence intervals not to predict outcomes with certainty, but to offer probabilistic guidance—helping both participants and strategists make better-timed decisions, recognize meaningful variance, and surface signals of change that typical dashboards might miss.

## Computational Models

This system does not aim to compute truth, but to surface signal. To that end, we incorporate lightweight, interpretable models to inform decision-making and pattern recognition.

A core model for goal-level confidence might be expressed as:

```js
confidence = clamp(
  (recentEnergyAverage * 0.7)
  - (hoursSinceLastLog * 0.05)
  + (momentumScore * 0.3),
  0, 1
)
```

This model acknowledges that confidence is not a static state, but a shifting signal shaped by engagement patterns, time decay, and directional momentum. While simple, it introduces structure without rigidity and opens space for iterative refinement.