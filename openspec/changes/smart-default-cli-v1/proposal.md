# Smart Default CLI v1

## Intent

Make the beginner CLI feel like one smart command: `gsd "Feature"` starts a mission, plain `gsd` guides the active mission with autopilot, and advanced commands remain available.

## Problem

- ShipSpec has become powerful, but the command set can still feel large.
- Users should not need to remember `gsd run`, `gsd autopilot`, `gsd next`, and `gsd codex` before getting value.
- The simplest loop should be memorable: `gsd "Feature"`, `gsd`, `gsd ship`.

## User Value

- New users get a smaller mental model.
- Existing users keep all advanced commands.
- AI handoff and mission guidance stay safe because the default command reuses Mission Autopilot and Autopilot Apply Loop.

## Scope

- Plain `gsd` should behave like a smart default:
  - no active mission: show a concise start hint.
  - active mission: run the same safe logic as `gsd autopilot`.
- Plain text intent, such as `gsd "Add login page"`, should use `runMission` instead of the older quickstart output.
- Beginner help and README should emphasize:
  - `gsd "Feature"`
  - `gsd`
  - `gsd ship`
  - `gsd ui --open`
- Advanced help should keep all commands.

## Out Of Scope

- Do not remove existing commands.
- Do not change `gsd ship` semantics.
- Do not make plain `gsd` edit code, deploy, or call networks.
- Do not add automatic fixing loops.

## Acceptance Criteria

- [ ] `gsd` with no active mission prints a concise start hint for `gsd "Feature"`.
- [ ] `gsd` with an active mission prints autopilot guidance.
- [ ] `gsd "Feature"` creates a Mission Autopilot mission and prints `Mission ready`.
- [ ] Existing `gsd run "Feature"` behavior remains available.
- [ ] Beginner help and README describe the simplified command loop.
- [ ] Advanced help still lists the full command set.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Add focused tests for plain `gsd`, plain text intent, help, and existing `gsd run`.
- Run focused tests during development.
- Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
