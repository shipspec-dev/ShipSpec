# Complete agentic RAG production v1

## Intent

Complete agentic RAG production v1

## Problem

- `gsd context` already finds likely local files, but it does not yet show whether the retrieved context is good enough for an AI coding pass.
- The six Agentic RAG phases are not visible as one production-ready flow: local retrieval, quality scoring, connector signals, retrieval loop, learned memory, and operator next step.
- `gsd operate` should reference the Agentic Context artifact so the operator flow uses the same source of truth as `gsd context` and `gsd codex`.

## User Value

- Developers can see the next best files and whether the context is weak, usable, or strong before handing work to an AI agent.
- AI agents get a compact context receipt with confidence, gaps, and next retrieval steps instead of a long pasted prompt.
- ShipSpec stays fast and local for production use tomorrow: no external vector database, cloud index, or background service is required.

## Scope

- Add a context quality score to `generateAgenticContext` and `gsd context --json`.
- Add markdown sections for context quality, connector signals, retrieval loop, learning retrieval, and operator next step.
- Include the generated Agentic Context artifact in `gsd operate` reports.
- Cover strong/local and weak/empty retrieval cases with tests.

## Out Of Scope

- External Jira, logs, embeddings, or vector database connectors.
- Automatic code editing or deployment from the context command.
- Replacing the existing `gsd run`, `gsd codex`, or `gsd ship` flow.

## Acceptance Criteria

- [ ] `gsd context` produces quality, connector, loop, learning, and operator sections.
- [ ] `gsd context --json` exposes the context quality summary.
- [ ] Weak context is clearly marked when no useful local sources are found.
- [ ] `gsd operate` writes a report that links to `.gsd/context/<change>.md`.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
