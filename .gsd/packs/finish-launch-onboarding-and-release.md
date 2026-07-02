# ShipSpec Context Pack

Use this as a compact, agent-neutral handoff for implementation, review, or follow-up planning.

## Active Change

- Title: Finish launch onboarding and release
- Slug: finish-launch-onboarding-and-release
- Branch: main

## Spec Files

- Proposal: openspec/changes/finish-launch-onboarding-and-release/proposal.md
- Tasks: openspec/changes/finish-launch-onboarding-and-release/tasks.md
- Acceptance criteria: present
- Verification plan: present

## Validation

- Spec validation: pass
- Ready validation: fail
- Validation gaps:
  - Verification evidence is missing. Run `gsd verify` first.

## Changed Files

- .cursor/rules/gsd.mdc
- CHANGELOG.md
- README.md
- examples/jira-codex-login/.gsd/current.json
- examples/jira-codex-login/.gsd/rag/add-login-page.md
- examples/jira-codex-login/.gsd/routes/add-login-page.md
- examples/jira-codex-login/README.md
- examples/jira-codex-login/openspec/changes/add-login-page/proposal.md
- examples/jira-codex-login/openspec/changes/add-login-page/tasks.md
- examples/jira-codex-login/src/auth/login.js
- examples/node-basic/.gsd/current.json
- examples/node-basic/package.json
- skills/shipspec/SKILL.md
- src/gsd.mjs
- test/gsd.test.mjs

## Likely Files

- src/gsd.mjs
- test/gsd.test.mjs
- README.md
- skills/shipspec/SKILL.md
- CHANGELOG.md
- examples/jira-codex-login/README.md
- examples/jira-codex-login/src/auth/login.js
- examples/node-basic/package.json

## Evidence Summary

- Evidence file: missing
- No verification evidence summary available.

## Risk

- Level: high
- Verification evidence missing
- ready validation failing
- Sensitive area changed: examples/jira-codex-login/src/auth/login.js
- UI changed; consider screenshot or E2E proof
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

- .gsd/reports/finish-launch-onboarding-and-release.md

## AI Instructions

- Read the spec files before proposing changes.
- Use the changed files and evidence summary to focus review.
- Call out missing verification, skipped checks, and risky affected areas.
- Keep implementation scoped to the active change.
- Do not deploy or access secrets from this pack.
