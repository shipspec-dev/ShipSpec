# ShipSpec Context Pack

Use this as a compact, agent-neutral handoff for implementation, review, or follow-up planning.

## Active Change

- Title: Add Agentic RAG skill router
- Slug: add-agentic-rag-skill-router
- Branch: main

## Spec Files

- Proposal: openspec/changes/add-agentic-rag-skill-router/proposal.md
- Tasks: openspec/changes/add-agentic-rag-skill-router/tasks.md
- Acceptance criteria: present
- Verification plan: present

## Validation

- Spec validation: pass
- Ready validation: fail
- Validation gaps:
  - Verification evidence is missing. Run `gsd verify` first.

## Changed Files

- .cursor/rules/gsd.mdc
- skills/shipspec/SKILL.md

## Likely Files

- skills/shipspec/SKILL.md
- src/gsd.mjs
- test/gsd.test.mjs
- skills/shipspec/agents/openai.yaml
- src/adapters/index.ts
- src/adapters/github.ts
- src/adapters/openspec.ts
- src/adapters/project-scripts.ts

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

- .gsd/reports/add-agentic-rag-skill-router.md

## AI Instructions

- Read the spec files before proposing changes.
- Use the changed files and evidence summary to focus review.
- Call out missing verification, skipped checks, and risky affected areas.
- Keep implementation scoped to the active change.
- Do not deploy or access secrets from this pack.
