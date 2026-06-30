# Add agentic context engine

## Intent

Add a lightweight Agentic Context Engine to ShipSpec.

## Problem

- `gsd run` prepares prompts and packs, but the context is still mostly static.
- Developers want the current trend: Agentic RAG-style context gathering without adding a vector DB, cloud service, or slow setup.
- Codex handoffs should include stronger local evidence: relevant files, prior ShipSpec memory, project signals, and verification hints.

## User Value

- Developers get a better AI handoff before coding, especially for large repos or vague feature requests.
- ShipSpec feels more like an agentic delivery system: it gathers context, ranks likely sources, surfaces risks, and records what the AI should inspect.
- The feature stays fast, local, private, and dependency-light.

## Scope

- Add a `gsd context` command that writes `.gsd/context/<change>.md`.
- Generate the same Agentic Context Pack during `gsd run`.
- The pack should include mission summary, retrieval strategy, top local files, source signals, memory signals, risk/evaluation hints, and next AI handoff steps.
- Use only local repo files and existing ShipSpec artifacts.
- Keep `gsd codex`, `gsd pack`, `gsd ui`, and existing verification behavior compatible.

## Out Of Scope

- No vector database.
- No remote embeddings or cloud calls.
- No autonomous code edits from the context command.
- No deployment, Jira writes, or GitHub writes.

## Acceptance Criteria

- [x] `gsd context` writes `.gsd/context/<change>.md` for the active change.
- [x] `gsd context --json` returns the context path and ranked local sources.
- [x] `gsd run "<feature>"` generates the Agentic Context Pack and prints the context command/path.
- [x] The generated context includes local retrieval strategy, ranked sources, memory signals, risks, and evaluation hints.
- [x] Existing `gsd codex`, `gsd pack`, `gsd ui`, and verification behavior is preserved.
- [x] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
