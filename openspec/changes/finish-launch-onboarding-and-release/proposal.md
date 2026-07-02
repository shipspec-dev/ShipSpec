# Finish launch onboarding and release

## Intent

Finish the launch-readiness polish around the current ShipSpec developer experience.

## Problem

- ShipSpec already has the core command story, Agentic RAG, skill routing, and UI work, but launch users still need a fast way to understand the product without reading the whole README.
- Release packaging should include the demo assets so npm and downstream installs carry the onboarding material.

## User Value

- New users can understand the main flow in two minutes: Jira/request -> `gsd run` -> `gsd codex` -> implementation -> `gsd ship`.
- Maintainers get a clearer release checklist and package tests that guard against shipping without onboarding assets.

## Scope

- Add a compact demo markdown page and visual SVG walkthrough under `docs/`.
- Include only the public demo docs in npm package files.
- Link the demo and real Jira-to-Codex example from the README.
- Update changelog with launch-readiness work.
- Add package-readiness test coverage for the demo docs.
- Stabilize agent inbox ordering discovered during full verification.

## Out Of Scope

- Publishing npm or Homebrew artifacts from an unauthenticated shell.
- Recording a real demo video.
- Changing the CLI command surface.

## Acceptance Criteria

- [ ] README links to the two-minute demo and real Jira-to-Codex example.
- [ ] `docs/demo.md` and `docs/demo.svg` exist and are included in package files without packaging internal planning notes.
- [ ] Changelog mentions the launch demo packaging.
- [ ] Package-readiness tests cover the demo docs.
- [ ] Agent inbox message ordering remains newest-first even for rapid messages.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run focused package-readiness tests during development.
- Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Should the demo stay as a lightweight SVG now, with a recorded GIF/video later?
