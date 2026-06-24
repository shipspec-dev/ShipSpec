# Simplify README

## Intent

Simplify README

## Problem

- The README is too long before users understand the basic value.
- It repeats setup and command guidance in multiple places.
- New users need a shorter path: install, run, hand off to AI, ship.

## User Value

- Developers can understand ShipSpec faster.
- The first-use flow feels lighter and less ceremonial.
- Advanced commands stay available without crowding the main pitch.

## Scope

- Shorten the README introduction and first-use instructions.
- Group the daily commands into one small flow.
- Keep the advanced command reference in collapsible docs.
- Preserve install, verification, UI, skill, and adapter information.

## Out Of Scope

- Do not change CLI behavior.
- Do not remove advanced command documentation.
- Do not change package metadata or release channels.

## Acceptance Criteria

- [ ] README explains ShipSpec in plain, short language.
- [ ] README shows one simple default flow before advanced commands.
- [ ] Advanced commands remain documented.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
