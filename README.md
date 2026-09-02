# 📊 Cortex-X

> A polished admin dashboard UI — **now fully wired up on the client side.**

Every button, form, tab, and toggle you see actually does something. There’s no backend here; all state lives in React (`useState`), which is what **“interactive”** means for a project at this stage.

Swapping in a real API later is just a matter of replacing the mock data and state setters.

---

## 📚 Table of Contents

* [Quick Start](#-quick-start)
* [Project Structure](#-project-structure)
* [What Was Missing](#-what-was-missing)
* [What’s Interactive Now](#-whats-interactive-now)

  * [Header](#-header)
  * [Sidebar](#-sidebar)
  * [Quick Actions](#-quick-actions)
  * [Revenue Chart](#-revenue-chart)
  * [Projects Table](#-projects-table)
  * [Task List](#-task-list)
  * [Team Members](#-team-members)
  * [Calendar](#-calendar-right-sidebar)
  * [Toasts](#-toasts)
* [Tech Stack](#-tech-stack)
* [Known Limitations](#-known-limitations)

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Then open the URL Vite prints in your terminal — usually:

```text
http://localhost:5173
```

### Available Scripts

| Command           | What it does                                |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Starts the local dev server with hot reload |
| `npm run build`   | Builds a production bundle into `dist/`     |
| `npm run preview` | Serves the production build locally         |

---

## 📁 Project Structure

```text
Cortex-X/
├── index.html                       # Vite entry HTML
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── index.jsx                    # React root
    ├── App.jsx                      # Layout owner: header, sidebar, routing, shared state
    │
    ├── data/
    │   └── mockData.js              # Sample data (projects, tasks, team, etc.)
    │
    ├── pages/
    │   ├── Dashboard.jsx            # Main dashboard page content
    │   ├── Dashboard.css
    │   ├── Placeholder.jsx           # Stub page for non-dashboard nav items
    │   └── Placeholder.css
    │
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

## ⚠️ What Was Missing

### `src/data/mockData.js`

`Dashboard.jsx` imported this file, but it was never included in the original upload — so the app couldn’t actually run before.

It’s now filled in with realistic sample data for:

* Projects
* Tasks
* Team members
* Meetings
* Notifications

---

# ⚡ What’s Interactive Now

## 🔍 Header

| Feature                | Behavior                                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Search**             | Live-filters projects, tasks, and people as you type. Results are grouped in a dropdown.                                                                                          |
| **Notifications bell** | Opens a dropdown of notifications. Shares state with the right sidebar panel, so marking one read (or **“Mark all read”**) updates both places, and the badge count updates live. |
| **User menu**          | Click the avatar for **Profile / Settings / Log out**. Log out actually navigates away and back.                                                                                  |

---

## 🧭 Sidebar

* Every nav item is clickable and highlights correctly.
* Non-dashboard pages (**Analytics, Projects, etc.**) render a clean stub page instead of doing nothing, so navigation never feels dead.

---

## ⚡ Quick Actions

| Button              | Behavior                                                            |
| ------------------- | ------------------------------------------------------------------- |
| **Create Project**  | Opens a form; new project appears at the top of the Projects table. |
| **Invite Member**   | Opens a form; new member appears in the Team list.                  |
| **Generate Report** | Downloads a real `.csv` snapshot of current stats and projects.     |

---

## 📈 Revenue Chart

* **Monthly / Weekly / Daily** tabs swap in real, different chart data — not just a style change.

---

## 📋 Projects Table

* Click a column header to sort:

  * Name
  * Status
  * Progress
  * Due date
* Click a row to open a detail modal, including a **delete action**.

---

## ✅ Task List

* Check off seeded tasks.
* Add your own new tasks.

---

## 👥 Team Members

* The message icon opens a mock chat modal.
* The chat includes a fake auto-reply after you send something.

---

## 📅 Calendar — Right Sidebar

* Click any day to see meetings scheduled for that day.
* The **Join** button toggles a **“joined”** state and fires a confirmation toast.

---

## 🔔 Toasts

A lightweight toast system (`Toast.jsx`) confirms actions across the app, including:

* Project created
* Invite sent
* Report generated
* And more

---

# 🛠️ Tech Stack

* **React 18** — UI and state management
* **Vite** — dev server and build tooling
* **react-icons** — icon set (Feather icons)
* **Plain CSS** *(no framework)* — kept 1:1 with the original design system

---

# ⚠️ Known Limitations

### 💾 No Persistence

Everything is in-memory; refreshing the page resets all state, since there’s no backend or storage layer.

### 🌐 No Real Backend

Forms, chat, and report generation are all simulated client-side — there’s nowhere for the data to actually go.

### 📄 Single Real Page

Only **Dashboard** has full content; other sidebar destinations are intentional stubs.

---

## 📝 Final Note

Component structure and CSS class names were kept as close to the original as possible, so this should feel like the same codebase — **just switched on.**
