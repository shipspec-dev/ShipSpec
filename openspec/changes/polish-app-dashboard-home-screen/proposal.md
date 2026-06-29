# Polish app dashboard home screen

## Intent

Polish the `gsd app` home screen into a denser, more useful dashboard.

## Problem

- The first `gsd app` version has a good shell, but the home screen has too much unused center space.
- Commands are trapped in the left sidebar instead of being immediately actionable in the main workflow area.
- Files and activity are hidden behind tabs even though they are useful for understanding the current mission.
- The right readiness panel is tall and repetitive.

## User Value

- Developers can open `gsd app` and immediately see what to run, what files matter, what happened recently, and what blocks readiness.
- The app feels more like a professional product dashboard and less like a generated terminal panel.
- The richer view still stays local, lightweight, and compatible with the static `gsd ui` fallback.

## Scope

- Change the `gsd app` generated home layout.
- Add a top command bar with copyable primary commands.
- Make the sidebar thinner and navigation-focused.
- Show likely files and activity/timeline on the Mission home screen.
- Add a next-actions panel with the primary recommendation plus verification/review commands.
- Compact the readiness/right panel and reduce repeated checklist weight.
- Keep existing tabs, file search, command copy, and static `gsd ui` behavior.

## Out Of Scope

- No server process, live reload, cloud sync, telemetry, or real React/Vite dependency.
- No changes to ShipSpec workflow semantics or readiness scoring.
- No replacement of `gsd ui`.

## Acceptance Criteria

- [x] `gsd app` home uses a compact app shell with a thin sidebar.
- [x] Main content includes a top command bar with `gsd operate`, `gsd codex`, `gsd verify --full`, and `gsd ship` when applicable.
- [x] Mission home shows next actions, likely files, and activity without switching tabs.
- [x] Right readiness panel is compact and uses shorter checklist rows.
- [x] Existing Files tab still has search/filter.
- [x] Existing copy-to-clipboard behavior remains.
- [x] `gsd ui` behavior is preserved.
- [x] Existing behavior that should not change is preserved.
- [x] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
