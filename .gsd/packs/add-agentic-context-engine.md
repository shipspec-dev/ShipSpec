# ShipSpec Context Pack

Use this as a compact, agent-neutral handoff for implementation, review, or follow-up planning.

## Active Change

- Title: Add agentic context engine
- Slug: add-agentic-context-engine
- Branch: codex/agentic-context-engine

## Spec Files

- Proposal: openspec/changes/add-agentic-context-engine/proposal.md
- Tasks: openspec/changes/add-agentic-context-engine/tasks.md
- Acceptance criteria: present
- Verification plan: present

## Validation

- Spec validation: pass
- Ready validation: fail
- Validation gaps:
  - Verification evidence is missing. Run `gsd verify` first.

## Changed Files

- .cursor/rules/gsd.mdc
- README.md
- src/gsd.mjs
- test/gsd.test.mjs

## Likely Files

- src/gsd.mjs
- test/gsd.test.mjs
- README.md
- src/adapters/index.ts
- src/adapters/github.ts
- src/adapters/openspec.ts
- src/adapters/project-scripts.ts
- src/adapters/superpowers.ts

## Evidence Summary

- Evidence file: missing
- No verification evidence summary available.

## Risk

- Level: medium
- Verification evidence missing
- ready validation failing
- next action pending: gsd operate

## Human Decisions

- No recorded human decisions.

## Next Action

- Command: gsd operate
- Reason: Operation report is missing for the active change.
- Also useful: gsd prompt
- Also useful: gsd verify --full
- Also useful: gsd ui

## Review Report

- .gsd/reports/add-agentic-context-engine.md

## AI Instructions

- Read the spec files before proposing changes.
- Use the changed files and evidence summary to focus review.
- Call out missing verification, skipped checks, and risky affected areas.
- Keep implementation scoped to the active change.
- Do not deploy or access secrets from this pack.
