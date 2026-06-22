# ShipSpec Agent Instructions

Use ShipSpec as the shared delivery protocol for humans and AI agents.

## Required Workflow

- Always check active ShipSpec change before editing.
- Run `gsd spec` before implementation.
- Run `gsd validate` before coding.
- Run `gsd verify --full` before claiming done.
- Run `gsd validate --ready` before review or ship.
- Include `.gsd/reports/<change>.md` in review handoff.
- Use `.agent/messages/` for agent-to-agent handoff notes.

## Collaboration Rules

- Planner owns spec clarity.
- Builder owns scoped implementation.
- Tester owns verification evidence.
- Reviewer owns risk and diff review.
- Release owns final handoff.
