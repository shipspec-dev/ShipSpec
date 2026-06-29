# Reasoning: Polish app dashboard home screen

Change: polish-app-dashboard-home-screen
Generated: 2026-06-29T15:55:55.515Z

## What Matters

- Deliver `Polish app dashboard home screen` against the active ShipSpec contract.
- Keep acceptance criteria aligned with implementation evidence.
- Use the recorded verification plan as the minimum bar.

## Project Signals

- Runtime: node
- Package manager: npm
- Framework: unknown
- Test runner: node:test
- E2E: none

## Likely Affected Areas

- Frontend/UI surface

## Risks

- No deterministic risks detected from local ShipSpec state.

## Recommended Workflow

- gsd validate
- gsd verify --full
- gsd reflect
- gsd loop
- gsd memory

## Required Verification

- npm run lint
- npm test
- npm run typecheck
- npm run test:e2e
- gsd verify --full
- gsd validate --ready

## Questions

- Which project conventions should guide implementation?

## Safety

- Reasoning is local-only and deterministic.
- No network calls are made.
- No shell commands are executed.
- No code edits or workflow mutations are performed.
- File reads are bounded to small ShipSpec memory artifacts.
