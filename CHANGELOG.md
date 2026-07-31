# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nothing yet — this is where new unreleased changes go.

## [1.0.0] - 2026-07-31

### Added
- Initial interactive version of the dashboard.
- `src/data/mockData.js` with sample projects, tasks, team members, meetings,
  and notifications (previously missing/imported but undefined).
- Live search in the header across projects, tasks, and people.
- Shared notifications state between the header bell and right sidebar,
  with read/unread tracking and a "clear all" action.
- User menu with Profile / Settings / Log out.
- Working sidebar navigation with stub pages for non-dashboard destinations.
- "Create Project" and "Invite Member" forms that update app state.
- "Generate Report" action that downloads a CSV snapshot.
- Switchable Monthly / Weekly / Daily revenue chart data.
- Sortable Projects table columns and a project detail modal with delete.
- Ability to add new tasks to the task list.
- Mock chat modal on team member messaging.
- Interactive calendar in the right sidebar: click a day to see that day's
  meetings, and a toggleable "Join" state per meeting.
- Toast notification system for confirming actions across the app.
- Project tooling: `package.json`, `vite.config.js`, `index.html`,
  `.gitignore`.
- Documentation: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, GitHub issue/PR templates.

[Unreleased]: https://github.com/your-org/your-repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/your-repo/releases/tag/v1.0.0
