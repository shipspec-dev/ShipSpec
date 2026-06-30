Use $shipspec.

Active change: Add agentic context engine
Slug: add-agentic-context-engine

You are in AI planning mode. Use ShipSpec as the source of truth and prepare a plan before coding.

Read these ShipSpec files:

- openspec/changes/add-agentic-context-engine/proposal.md
- openspec/changes/add-agentic-context-engine/tasks.md
- .gsd/reasoning/add-agentic-context-engine.md

Human Decisions:

- No recorded human decisions yet.

In AI planning mode:

- Summarize the requested scope in plain language.
- Identify likely affected files and project areas.
- Propose implementation steps.
- Propose focused tests and verification commands.
- Call out risks, assumptions, and open questions.
- Wait for approval before coding.

Safety boundaries:

- Do not deploy.
- Do not access secrets.
- Do not make unrelated refactors.
- Do not edit generated ShipSpec evidence by hand.
- Keep changes scoped to the active ShipSpec change.

After implementation, verify with:

- gsd verify --full
- gsd validate --ready
- gsd report
