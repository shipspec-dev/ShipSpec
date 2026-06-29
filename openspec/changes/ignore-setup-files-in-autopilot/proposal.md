# Ignore Setup Files In Autopilot

## Intent

Keep autopilot focused on real implementation changes after ShipSpec creates setup files.

## Problem

- In a fresh Git repository, `gsd "Feature"` creates agent setup files such as `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `.cursor/rules/gsd.mdc`.
- Plain `gsd` can mistake those generated setup files for implementation changes and route users to `gsd ship` too early.

## User Value

- New users get the expected next step, `gsd codex`, immediately after starting a mission.
- Real source changes still route to verification before review.

## Scope

- Filter known generated setup files out of autopilot's implementation-change decision.
- Preserve verification routing when real project files change.
- Add a regression test for the fresh Git repository flow.

## Out Of Scope

- Changing `gsd diff`, reports, or UI changed-file visibility.
- Ignoring arbitrary documentation files.
- Reworking generated agent instruction behavior.

## Acceptance Criteria

- [ ] After `gsd "Feature"` in a fresh Git repo, `gsd autopilot` recommends `gsd codex`.
- [ ] Generated setup files do not appear as changed implementation files in autopilot output.
- [ ] Real project file changes still recommend `gsd ship`.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
