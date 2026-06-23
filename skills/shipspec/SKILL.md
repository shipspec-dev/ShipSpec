---
name: shipspec
description: Use when implementing a feature, working from a Jira/task/request link, preparing or validating a spec, coordinating AI agents, collecting verification evidence, or preparing a review/ship handoff with ShipSpec or gsd.
---

# ShipSpec

ShipSpec is the delivery protocol for turning a request into an implementation-ready spec, agent room, verification evidence, audit trail, and handoff.

## When to Use

Use this skill when the user asks to:

- implement a feature or bugfix with ShipSpec/gsd
- start from a Jira, Linear, GitHub issue, task, or plain request
- create or validate a spec before coding
- coordinate planner, builder, tester, reviewer, or release roles
- prove work is ready with verification evidence
- prepare a review, release, or done handoff

Do not use ShipSpec for quick one-off answers that do not edit code or produce a delivery artifact.

## Workflow

From the project root, check the current state before editing:

```bash
gsd status
gsd spec
gsd validate
```

If there is no active change, create the ShipSpec package from the user's request:

```bash
gsd deliver --adaptive "<user request or ticket title>"
```

If a change already exists but needs missing artifacts:

```bash
gsd intake "<user request or ticket title>"
gsd contract
gsd room
gsd reason
gsd validate
```

Before claiming implementation is done:

```bash
gsd verify --full
gsd loop
gsd audit
gsd validate --ready
```

For UI visibility:

```bash
gsd ui
```

## Agent Room

Use `.agent/room/<change>/` as the shared working area:

- `planner.md` for scope, acceptance criteria, and unresolved questions
- `builder.md` for implementation notes
- `tester.md` for verification and evidence notes
- `reviewer.md` for risks and review findings
- `release.md` for final handoff notes
- `handoff.md` for compact cross-agent status

Use `.agent/messages/` for short agent-to-agent handoff notes.

## Handoff

When handing work back, include:

- active change name
- verification commands and results
- `.gsd/reports/<change>.md`
- `.agent/evidence/<change>.md` when present
- any audit gaps from `gsd audit`

Never say the work is ready unless `gsd verify --full` and `gsd validate --ready` have passed, or clearly state what could not be run.
