# Add React Mission Control app

## Intent

Add a richer local Mission Control app command while keeping `gsd ui` as the fast static fallback.

## Problem

- The static `gsd ui` dashboard is useful, but complex workflow state becomes hard to scan once evidence, files, agents, memory, and readiness are all visible.
- Developers need a more app-like surface with navigation, focused panels, copyable commands, file search, and readiness context.
- The richer UI should not make the default CLI heavier or require a dev server for basic use.

## User Value

- Developers get a professional Mission Control screen for active ShipSpec work.
- New users can understand the active mission, next command, likely files, evidence, agents, and memory without reading a long generated report page.
- Teams keep the reliable static dashboard while gaining a better local app experience when they want it.

## Scope

- Add `gsd app` as a CLI command.
- Generate a local app bundle under `.gsd/app/` from the same ShipSpec model used by `gsd ui`.
- Include an app-shell layout with sidebar navigation, a next-action command bar, current mission status, file search/filter UI, evidence, agents, memory, and readiness panels.
- Keep the bundle self-contained and fast: no network calls and no runtime dependency install required.
- Add tests and README docs for the new command.

## Out Of Scope

- Replacing `gsd ui`.
- Starting a persistent server.
- Adding remote telemetry, login, cloud sync, deployment, or live file watching.
- Requiring React/Vite as an installed user dependency for the generated app.

## Acceptance Criteria

- [ ] `gsd app` generates `.gsd/app/index.html` and prints open instructions.
- [ ] The generated app includes sidebar tabs for Mission, Files, Evidence, Agents, and Memory.
- [ ] The app includes a next-action command bar and copyable command buttons.
- [ ] The app includes likely-file search/filter UI.
- [ ] The app includes readiness, evidence, agent inbox, and memory summaries.
- [ ] `gsd ui` behavior remains available and unchanged.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
