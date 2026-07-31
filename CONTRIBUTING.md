# Contributing

Thanks for taking a look at this project! It's a demo-scale React dashboard,
so contributing is intentionally lightweight.

## Getting set up

```bash
git clone <your-fork-url>
cd dashboard-project
npm install
npm run dev
```

## Project conventions

- **Components** live in `src/components/`, one `.jsx` + matching `.css`
  file per component, same base name (e.g. `TaskList.jsx` /
  `TaskList.css`).
- **Pages** live in `src/pages/` and represent a full nav destination.
- **Shared state** (search data, notifications, toasts, active page) is
  owned by `src/App.jsx` and passed down as props — there's no global store,
  so keep new shared state there too rather than reaching for context or a
  state library unless the prop chain genuinely gets unwieldy.
- **Styling** is plain CSS, no framework, no CSS modules — class names are
  global, so keep them specific enough not to collide (e.g. `.task-item`,
  not `.item`).
- **Mock data** lives in `src/data/mockData.js`. If you add a new data shape,
  add realistic sample data there rather than hardcoding it in a component.

## Before opening a PR

1. Run `npm run build` and confirm it completes with no errors.
2. Click through the change in `npm run dev` — this project has no test
   suite yet, so manual verification is the main safety net.
3. Keep PRs focused. Prefer several small PRs over one large one.

## Commit messages

This repo loosely follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add sortable columns to projects table
fix: correct unread count after clearing notifications
style: adjust spacing on stat cards
docs: update README with new script
chore: bump vite version
```

## Reporting bugs / suggesting features

Open an issue using the templates under `.github/ISSUE_TEMPLATE/`. Include
steps to reproduce for bugs, and the "why" (not just the "what") for feature
requests.
