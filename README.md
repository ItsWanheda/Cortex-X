# 📊 Nexus-Dashboard

A polished admin dashboard UI — **now fully wired up on the client side.**
Every button, form, tab, and toggle you see actually does something. There's
no backend here; all state lives in React (`useState`), which is what
"interactive" means for a project at this stage. Swapping in a real API
later is just a matter of replacing the mock data and state setters.

---

## Table of contents

- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [What was missing](#what-was-missing)
- [What's interactive now](#whats-interactive-now)
- [Tech stack](#tech-stack)
- [Known limitations](#known-limitations)

---

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints in your terminal — usually:

```
http://localhost:5173
```

Other available scripts:

| Command           | What it does                              |
|-------------------|--------------------------------------------|
| `npm run dev`     | Starts the local dev server with hot reload |
| `npm run build`   | Builds a production bundle into `dist/`    |
| `npm run preview` | Serves the production build locally        |

---

## Project structure

```
Nexus-Dashboard/
├── index.html                  # Vite entry HTML
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── index.jsx                # React root
    ├── App.jsx                  # Layout owner: header, sidebar, routing, shared state
    ├── data/
    │   └── mockData.js          # Sample data (projects, tasks, team, etc.)
    ├── pages/
    │   ├── Dashboard.jsx        # Main dashboard page content
    │   ├── Dashboard.css
    │   ├── Placeholder.jsx      # Stub page for non-dashboard nav items
    │   └── Placeholder.css
    └── components/
        ├── Header.jsx / .css        # Search, notifications, user menu
        ├── Sidebar.jsx / .css       # Left nav
        ├── RightSidebar.jsx / .css  # Calendar, meetings, notifications panel
        ├── StatCard.jsx / .css      # Top KPI cards
        ├── Activity.jsx / .css      # Recent activity timeline
        ├── ProjectsTable.jsx / .css # Sortable projects table
        ├── TaskList.jsx / .css      # Today's tasks checklist
        ├── TeamMembers.jsx / .css   # Team list + mock chat
        ├── Modal.jsx / .css         # Reusable modal + form styles
        └── Toast.jsx / .css         # Reusable toast notifications
```

---

## What was missing

**`src/data/mockData.js`**

`Dashboard.jsx` imported this file, but it was never included in the
original upload — so the app couldn't actually run before. It's now filled
in with realistic sample data for projects, tasks, team members, meetings,
and notifications.

---

## What's interactive now

### 🔍 Header
| Feature | Behavior |
|---|---|
| **Search** | Live-filters projects, tasks, and people as you type. Results are grouped in a dropdown. |
| **Notifications bell** | Opens a dropdown of notifications. Shares state with the right sidebar panel, so marking one read (or "Mark all read") updates both places, and the badge count updates live. |
| **User menu** | Click the avatar for Profile / Settings / Log out. Log out actually navigates away and back. |

### 🧭 Sidebar
- Every nav item is clickable and highlights correctly.
- Non-dashboard pages (Analytics, Projects, etc.) render a clean stub page instead of doing nothing, so navigation never feels dead.

### ⚡ Quick actions
| Button | Behavior |
|---|---|
| **Create Project** | Opens a form; new project appears at the top of the Projects table. |
| **Invite Member** | Opens a form; new member appears in the Team list. |
| **Generate Report** | Downloads a real `.csv` snapshot of current stats and projects. |

### 📈 Revenue chart
- Monthly / Weekly / Daily tabs swap in real, different chart data — not just a style change.

### 📋 Projects table
- Click a column header to sort (name, status, progress, due date).
- Click a row to open a detail modal, including a delete action.

### ✅ Task list
- Check off seeded tasks, and add your own new ones.

### 👥 Team members
- The message icon opens a mock chat modal, complete with a fake auto-reply after you send something.

### 📅 Calendar (right sidebar)
- Click any day to see meetings scheduled for that day.
- The **Join** button toggles a "joined" state and fires a confirmation toast.

### 🔔 Toasts
- A lightweight toast system (`Toast.jsx`) confirms actions across the app — project created, invite sent, report generated, and more.

---

## Tech stack

- **React 18** — UI and state management
- **Vite** — dev server and build tooling
- **react-icons** — icon set (Feather icons)
- Plain CSS (no framework) — kept 1:1 with the original design system

---

## Known limitations

- **No persistence.** Everything is in-memory; refreshing the page resets all state, since there's no backend or storage layer.
- **No real backend.** Forms, chat, and report generation are all simulated client-side — there's nowhere for the data to actually go.
- **Single real page.** Only "Dashboard" has full content; other sidebar destinations are intentional stubs.

Component structure and CSS class names were kept as close to the original
as possible, so this should feel like the same codebase — just switched on.