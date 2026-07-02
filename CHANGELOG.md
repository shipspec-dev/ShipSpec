# Changelog

## Unreleased

- Added packaged launch demo docs under `docs/` with a short Jira-to-Codex-to-ship walkthrough.
- Stabilized agent inbox message ordering when multiple messages are written in the same millisecond.
- Added `gsd route` to recommend relevant AI skills from mission text, Agentic RAG, likely files, and local project evidence.
- Updated `gsd codex` to include Agentic RAG-first skill routing automatically.
- Added a Jira-to-Codex login demo under `examples/jira-codex-login`.
- Surfaced skill routing in the richer `gsd app` Mission Control shell.

## 0.4.0

- Added `gsd reflect` for lightweight local readiness critique.
- Added `gsd learn` for governed self-improvement lessons and project patterns.
- Added `gsd loop` for a safe one-pass verify, reflect, and learn cycle.
- Added `gsd memory` for read-only memory, pattern, lesson, reflection, and loop inspection.
- Added `gsd reason` for deterministic local reasoning from spec, workflow, project signals, and memory.
- Added `gsd deliver --adaptive` to include reasoning during initial package creation.
- Added `gsd operate` for a safe delivery control loop that writes operation reports without editing code.
- Added `gsd prompt` to generate Codex Plan mode prompts from active ShipSpec context.
- Added `gsd decision` to record human approvals and include them in generated prompts.
- Added `gsd review` to generate decision-aware review checklists from local ShipSpec state.
- Added `gsd next` to recommend the next command from current ShipSpec state.
- Kept reflection local-only, bounded, and free of raw verification log copying.

## 0.3.1

- Updated package metadata and public links for the `shipspec-dev` GitHub organization.

## 0.3.0

- Added ShipSpec intake, contract, room, audit, and deliver commands.
- Added ShipSpec audit trail to the pixel dashboard.
- Kept the workflow ShipSpec-branded while preparing agent-friendly implementation packages.
- Added bundled Codex skill packaging and `gsd skill path/install` commands.

## 0.1.0

- Added repo-local ShipSpec workflow initialization.
- Added OpenSpec-style changes, validation gates, verification evidence, reports, releases, and agent handoffs.
- Added project detection, workflow configuration, GitHub Actions generation, examples, and self-test support.
- Added TypeScript adapter foundation, `gsd adapters`, desktop command serialization, and npm publishing metadata.
