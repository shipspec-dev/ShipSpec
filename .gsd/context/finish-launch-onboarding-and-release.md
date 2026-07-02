# Agentic Context Pack

Local Agentic RAG-style context for an AI coding pass. Generated from repo files and ShipSpec artifacts only.

## Mission

- Title: Finish launch onboarding and release
- Slug: finish-launch-onboarding-and-release
- Branch: main
- Next command: gsd operate
- Next reason: Operation report is missing for the active change.

## Retrieval Strategy

- Decompose the request into intent tokens from the title and slug.
- Rank local files using likely-file inference, Git changes, project memory, and path/token matches.
- Read top ranked sources first, then inspect adjacent code only when needed.
- Use ShipSpec evidence and validation gaps as the evaluation loop.

## Context Quality

- Score: 75%
- Level: strong
- PASS Ranked local sources: 10 local source files ranked.
- PASS Spec gate: Spec validation passes.
- PASS Project memory: Prior ShipSpec memory is available.
- PASS Test signals: A likely test source is ranked.
- WARN Verification evidence: Verification evidence is not ready yet.
- WARN Risk posture: High-risk change needs explicit review.
- PASS Operator next step: Next command is gsd operate.

## Connector Signals

- Local repo: active - 10 ranked local source files.
- ShipSpec memory: active - Learned project signals are available.
- Verification evidence: missing - Run `gsd verify --full` after implementation.
- External connectors: not configured - Jira, logs, docs, and design connectors can be added later without changing the local context contract.

## Retrieval Loop

- Round 1: derive intent from "Finish launch onboarding and release" and finish-launch-onboarding-and-release.
- Round 2: rank likely files from local project structure, Git state, and ShipSpec memory.
- Round 3: read top sources, then inspect adjacent files only when the quality score is weak or the task is unclear.
- Next refinement: use ranked sources directly, then refresh context after code changes.

## Learning Retrieval

- Common files: src/gsd.mjs, test/gsd.test.mjs, .cursor/rules/gsd.mdc, README.md, skills/shipspec/SKILL.md
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Operator Next Step

- Command: gsd operate
- Reason: Operation report is missing for the active change.
- Verification evidence is not ready yet.
- High-risk change needs explicit review.

## Full Agentic RAG

- No full RAG report yet. Run `gsd rag "your question"` for cited local retrieval.

## Ranked Local Sources

### 1. src/gsd.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
90: "- Run `gsd verify --full` before release or review.",
451: otherCommands: ["gsd review", "gsd release", "gsd ui"],
459: otherCommands: ["gsd status", "gsd report", "gsd release"],
```

### 2. test/gsd.test.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
20: generateRelease,
```

### 3. README.md

- Score: 255
- Signals: likely-file, changed-file, project-memory

```text
282: | `gsd release` | Write a release handoff under `.gsd/releases/`. |
313: - GitHub: generated CI, review reports, and release handoffs.
```

### 4. skills/shipspec/SKILL.md

- Score: 255
- Signals: likely-file, changed-file, project-memory

```text
17: - coordinate planner, builder, tester, reviewer, or release roles
19: - prepare a review, release, or done handoff
123: - `release.md` for final handoff notes
```

### 5. CHANGELOG.md

- Score: 210
- Signals: likely-file, changed-file

```text
3: ## Unreleased
39: - Added OpenSpec-style changes, validation gates, verification evidence, reports, releases, and agent handoffs.
```

### 6. examples/jira-codex-login/README.md

- Score: 210
- Signals: likely-file, changed-file

```text
1: # Jira to Codex ShipSpec Demo
2: 
3: This example shows the public ShipSpec story: start from a Jira item, let Agentic RAG find context, hand the mission to Codex, then verify and ship.
```

### 7. examples/jira-codex-login/src/auth/login.js

- Score: 210
- Signals: likely-file, changed-file

```text
1: export function renderLoginPage() {
2: return '<form>Login</form>';
3: }
```

### 8. examples/node-basic/package.json

- Score: 210
- Signals: likely-file, changed-file

```text
1: {
2: "name": "gsd-node-basic-example",
3: "version": "0.4.0",
```

### 9. src/adapters/index.ts

- Score: 10
- Signals: intent-match

```text
1: export type AdapterCapability =
2: | "spec"
3: | "discipline"
```

### 10. src/adapters/github.ts

- Score: 6
- Signals: intent-match

```text
5: summary: "Connects reports, releases, and generated CI to GitHub review workflows.",
6: paths: [".github/workflows", ".gsd/reports", ".gsd/releases"],
```


## Memory Signals

- Common files: src/gsd.mjs, test/gsd.test.mjs, .cursor/rules/gsd.mdc, README.md, skills/shipspec/SKILL.md
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Evidence Signals

- No verification evidence summary available yet.

## Risk Signals

- Level: high
- Verification evidence missing
- ready validation failing
- Sensitive area changed: examples/jira-codex-login/src/auth/login.js
- UI changed; consider screenshot or E2E proof
- next action pending: gsd operate

## Evaluation Hints

- Spec validation currently passes.
- Ready validation has gaps; implementation should refresh verification evidence.
- High risk: require explicit human review before ship.
- After coding, run `gsd verify --full`, `gsd review`, and `gsd validate --ready`.

## AI Handoff

- Read the active proposal and tasks before coding.
- Start from the ranked sources above.
- Keep edits scoped to the active change.
- If retrieved context is weak, inspect neighboring files before editing.
- Do not deploy or access secrets from this context pack.
