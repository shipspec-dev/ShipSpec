# Autopilot Apply Loop v1

## Intent

Add a safe `gsd autopilot` command that guides the current ShipSpec mission from prepared handoff to implementation, verification, and review without editing code or deploying.

## Problem

- `gsd run` now prepares a mission, but users still ask "what next?" after mission creation, after code changes, and after verification.
- Existing commands are powerful, but users can forget which one belongs to the current state.
- ShipSpec needs a small controller command that explains the next safe move without adding another risky automation layer.

## User Value

- Developers get one command to ask ShipSpec what to do next.
- AI agents get a clearer loop: handoff, implement, verify, review.
- Teams keep safety boundaries because v1 does not edit app code, deploy, call networks, or run destructive commands.

## Scope

- Add `gsd autopilot`.
- If no active mission exists, print a short instruction to run `gsd run "Feature"`.
- If a mission exists but there are no project code changes and no verification evidence, recommend `gsd codex`.
- If project code changed but verification evidence is missing, recommend `gsd ship`.
- If verification/report artifacts are ready, recommend review/report handoff.
- Refresh `.gsd/ui/index.html` on each successful autopilot run.
- Write a local `.gsd/autopilot/<change>.md` state report.
- Expose the command in beginner help, advanced help, and README.

## Out Of Scope

- No code editing.
- No deployment.
- No network calls.
- No automatic commit, push, or PR creation.
- No recursive self-fixing loop.

## Acceptance Criteria

- [ ] `gsd autopilot` with no active mission tells the user to run `gsd run "Feature"`.
- [ ] `gsd autopilot` with a prepared mission and no project code changes recommends `gsd codex`.
- [ ] `gsd autopilot` with project code changes and no evidence recommends `gsd ship`.
- [ ] `gsd autopilot` with evidence/report ready recommends review handoff.
- [ ] `gsd autopilot` refreshes `.gsd/ui/index.html` when an active mission exists.
- [ ] `gsd autopilot` writes `.gsd/autopilot/<change>.md`.
- [ ] Help and README mention the command.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Add focused tests for each autopilot state.
- Run focused tests during development.
- Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
