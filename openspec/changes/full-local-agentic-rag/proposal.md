# Full local agentic RAG

## Intent

Full local agentic RAG

## Problem

- `gsd context` gives a strong one-shot context pack, but ShipSpec still needs a direct retrieval command developers can query repeatedly.
- Developers need cited answers from local repo files and ShipSpec memory without copying long context into an AI chat.
- Full Agentic RAG must stay fast and safe: no cloud dependency, no vector database, and no secret-file indexing by default.

## User Value

- Developers can ask ShipSpec where to work and get ranked, cited local evidence before implementation.
- AI agents can use a compact RAG report with file paths, snippets, scores, exclusions, and refinement steps.
- Teams get a production-safe local RAG layer that learns from shipped work without sending source code anywhere.

## Scope

- Add `gsd rag "<query>"` and `gsd rag "<query>" --json`.
- Build a local retrieval index at `.gsd/rag/index.json` from safe project files, ShipSpec artifacts, memory, evidence, and recent reports.
- Write query reports to `.gsd/rag/<active-change>.md`.
- Return ranked citations with path, score, reasons, and bounded snippets.
- Exclude secrets, env files, dependency folders, build output, binary files, huge files, and generated package artifacts.
- Include quality, refinement steps, and learning signals in the RAG response.
- Teach `gsd context` to reference the full RAG report when available.

## Out Of Scope

- Cloud embeddings, vector databases, background daemons, or remote API calls.
- Automatic code edits, deployments, or production system access.
- Replacing `gsd context`, `gsd codex`, or `gsd operate`.
- Perfect semantic search. This v1 uses deterministic local lexical ranking.

## Acceptance Criteria

- [ ] `gsd rag "<query>"` creates `.gsd/rag/index.json` and `.gsd/rag/<change>.md`.
- [ ] `gsd rag "<query>" --json` returns ranked citations, quality, exclusions, refinement steps, and report path.
- [ ] Safe files are indexed; secrets, env files, dependency folders, build outputs, binary files, and huge files are excluded.
- [ ] Ranking uses query tokens, active change context, path matches, source snippets, Git changes, and learned memory.
- [ ] `gsd context` includes the RAG report as a full retrieval companion when present.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
