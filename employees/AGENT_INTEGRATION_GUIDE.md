# 🚀 Vibe Pass OpenClaw Integration Guide

Now that the directory structure and core "identity" (SOUL) files are set up, we need to bridge the gap between these abstract agents and your *actual* web application and workflows.

Here is the step-by-step roadmap to make your OpenClaw team fully functional:

## 1. Connecting the "Dev Worker" to Your Codebase
The `dev-worker` needs direct access to your site's source code to write Next.js components and deploy them.

*   **Workspace Access:** Update the `dev-worker`'s capabilities (in its OpenClaw config or tools definition) to strictly operate within your VibePass project directory. It needs the absolute path: `/home/cncjosh/Desktop/VibePassAfrica`.
*   **Tooling Arsenal:** The `dev-worker` must be given access to the following tools to actually do its job:
    *   `read_file` & `write_file` (to edit `.tsx`, `package.json`, etc.)
    *   `run_terminal_command` (To run `npm install`, `npm run lint`, `npm run build`, and `git`)
*   **Testing Loop:** Since the dev worker has a strict rule to "verify all code", it must be able to spin up a background terminal with `npm run dev` and perhaps read the output, or build the project before committing.

## 2. Empowering the "Promo Worker"
The `promo-worker` generates hype. You must decide whether it directly publishes posts or just drafts them for you to approve.

*   **Social Access (Optional):** If you want it to post automatically, you'll need to provide it with secure access to API keys (e.g., Telegram Bot Tokens, Twitter API).
*   **Content Pipeline (Alternative):** If you prefer approval, give the worker access to a `marketing/` folder in your workspace where it writes scripts (e.g., `/home/cncjosh/Desktop/VibePassAfrica/marketing/drafts.md`). You can review them before manual posting.

## 3. Feeding the "Supervisor"
Your Supervisor acts as the brain. Right now, it knows to break requests into JSON inside `TASKS.md`, but *how do you talk to it?*

*   **The Input Source:** You need an input mechanism. This could be:
    *   You running a direct OpenClaw chat session with the Supervisor.
    *   A Telegram bot hooked up to the Supervisor, where you can voice-note or text your ideas (e.g., *"Make a new page for the upcoming Nairobi concert"*).
    *   A GitHub Issues or Trello webhook that the Supervisor polls constantly.

## 4. Setting up the Persistent JSON Contract
The `shared/TASKS.md` file is the heartbeat. To prevent the agents from breaking it, define a strict JSON schema that they all must explicitly follow. 

For example, all tasks in `TASKS.md` should eventually look exactly like this:
```json
[
  {
    "id": "TASK-001",
    "tag": "Marketing",
    "description": "Draft a Telegram blast for the weekend party.",
    "status": "in-progress",
    "assignedTo": "promo-worker"
  },
  {
    "id": "TASK-002",
    "tag": "Dev",
    "description": "Fix the Paystack invalid parameters bug on checkout.",
    "status": "pending",
    "assignedTo": "dev-worker"
  }
]
```
Ensure that *every* update to `TASKS.md` involves pulling this array, modifying the specific object, and rewriting the array accurately.

## 5. The Execution Loop (Cron or Orchestrator Engine)
Finally, agents need to "wake up" to check for work.
*   **Polling:** You'll likely need a python script, Node.js script, or a built-in OpenClaw orchestrator hook that runs continuously.
*   **Loop Logistics:**
    1.  Supervisor receives prompt -> Updates `TASKS.md`.
    2.  Worker wakes up on an interval (e.g., every 5 mins), parses `TASKS.md`.
    3.  If a task matches their tag (`"Dev"` or `"Marketing"`) and is `"pending"`, they change the status to `"in-progress"`.
    4.  They execute their tools.
    5.  They update `TASKS.md` changing status to `"done"`.

### Next Immediate Step
If you want to move from "setup" to "doing", the very next step is to define the exact **Tools/Skills** each agent is allowed to execute inside OpenClaw so they have digital hands! Let me know if you want to set those tools up now.
