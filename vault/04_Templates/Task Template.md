<%*
let description = await tp.system.prompt("Brief description of the task");
let title = tp.file.title;
let goalId = Math.floor(Math.random() * 1000000).toString();
-%>

# 📝 <%- title %>

**Status:** not started  
**Created:** <% tp.date.now("YYYY-MM-DD") %>  
**Owner:** [[Unassigned]]  
**Goal ID:** `<%- goalId %>`  
**Task ID:** `<%- title.toLowerCase().replaceAll(" ", "-") %>`  
**Tags:** #task

---

## 🔍 Description
<%- description %>

---

## 📈 Confidence (System-computed)
**Confidence:** _computed from engagement_  

---

## 🧠 System Feedback (Auto-generated)
- **Energy logs:** pending  
- **Recent engagement:** none  
- **Parent Task (if subtask):**  
- **Notes:** Synthesized from logs and strategist view.
