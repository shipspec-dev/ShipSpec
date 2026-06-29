# Next Gen Control Layer

## Intent

Make ShipSpec feel like an AI delivery control layer instead of a bag of commands.

## Problem

- Developers can forget which ShipSpec command to run next.
- Basic environment problems are discovered too late.
- AI implementation handoffs can ignore project memory and recent failure patterns.
- The UI can show too much text at once.

## User Value

- New users can run one diagnosis command and receive clear next actions.
- Returning users can rely on plain `gsd` to route them to the safest next step.
- AI agents receive stronger local context without long manual copy/paste.
- Reviewers see risk/security/test gaps before shipping.
- The dashboard starts calm and keeps details available on demand.

## Scope

- Upgrade `gsd doctor` into an operator-grade health report with severity, next fixes, and install/workflow/skill checks.
- Teach autopilot to route through doctor, Codex handoff, verification, review, and report based on local state.
- Include smart memory and learned project patterns in routing, handoff, review, and UI summaries.
- Strengthen `gsd ship` with pre-ship review/risk warnings while keeping verification and ready validation as hard gates.
- Simplify the generated UI default view so detailed workflow evidence is collapsed behind progressive disclosure.
- Update README and help text for the next-generation command model.

## Out Of Scope

- Calling external AI services directly.
- Deploying, merging, or pushing code from ShipSpec.
- Replacing Codex, Claude Code, Cursor, GitHub Copilot, or other agents.
- Adding network-based marketplace discovery.

## Acceptance Criteria

- [ ] `gsd doctor` reports pass/warn/fail checks with actionable next commands.
- [ ] Plain `gsd` uses doctor/setup, active mission state, changed files, evidence, review, and memory to choose the next command.
- [ ] `gsd codex` includes smart memory and likely files without requiring pasted long context.
- [ ] `gsd ship` records review/risk guidance before the report handoff.
- [ ] `gsd ui` defaults to a concise mission control view with advanced evidence collapsed.
- [ ] README/help explain the short flow and the control-layer commands.
- [ ] Existing core commands remain compatible.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
