# Agentic Context Pack

Local Agentic RAG-style context for an AI coding pass. Generated from repo files and ShipSpec artifacts only.

## Mission

- Title: Add Agentic RAG skill router
- Slug: add-agentic-rag-skill-router
- Branch: main
- Next command: gsd operate
- Next reason: Operation report is missing for the active change.

## Retrieval Strategy

- Decompose the request into intent tokens from the title and slug.
- Rank local files using likely-file inference, Git changes, project memory, and path/token matches.
- Read top ranked sources first, then inspect adjacent code only when needed.
- Use ShipSpec evidence and validation gaps as the evaluation loop.

## Context Quality

- Score: 85%
- Level: strong
- PASS Ranked local sources: 10 local source files ranked.
- PASS Spec gate: Spec validation passes.
- PASS Project memory: Prior ShipSpec memory is available.
- PASS Test signals: A likely test source is ranked.
- WARN Verification evidence: Verification evidence is not ready yet.
- PASS Risk posture: Risk level is medium.
- PASS Operator next step: Next command is gsd operate.

## Connector Signals

- Local repo: active - 10 ranked local source files.
- ShipSpec memory: active - Learned project signals are available.
- Verification evidence: missing - Run `gsd verify --full` after implementation.
- External connectors: not configured - Jira, logs, docs, and design connectors can be added later without changing the local context contract.

## Retrieval Loop

- Round 1: derive intent from "Add Agentic RAG skill router" and add-agentic-rag-skill-router.
- Round 2: rank likely files from local project structure, Git state, and ShipSpec memory.
- Round 3: read top sources, then inspect adjacent files only when the quality score is weak or the task is unclear.
- Next refinement: use ranked sources directly, then refresh context after code changes.

## Learning Retrieval

- Common files: src/gsd.mjs, test/gsd.test.mjs
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Operator Next Step

- Command: gsd operate
- Reason: Operation report is missing for the active change.
- Verification evidence is not ready yet.

## Full Agentic RAG

- No full RAG report yet. Run `gsd rag "your question"` for cited local retrieval.

## Ranked Local Sources

### 1. skills/shipspec/SKILL.md

- Score: 250
- Signals: likely-file, changed-file, intent-match

```text
12: Use this skill when the user asks to:
50: For full local Agentic RAG before implementation or review, use:
53: gsd rag "<question or feature area>"
```

### 2. src/gsd.mjs

- Score: 171
- Signals: likely-file, project-memory, intent-match

```text
174: action: "Add an E2E script when user flows need browser coverage.",
184: name: "ShipSpec skill",
185: ok: await exists(getShipSpecSkillPath()),
```

### 3. test/gsd.test.mjs

- Score: 171
- Signals: likely-file, project-memory, intent-match

```text
26: generateAgenticContext,
```

### 4. skills/shipspec/agents/openai.yaml

- Score: 145
- Signals: likely-file, intent-match

```text
2: display_name: "ShipSpec"
3: short_description: "Spec, verify, and hand off agent work"
4: brand_color: "#58F07A"
```

### 5. src/adapters/index.ts

- Score: 130
- Signals: likely-file, intent-match

```text
1: export type AdapterCapability =
2: | "spec"
3: | "discipline"
```

### 6. src/adapters/github.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const githubAdapter: ShipSpecAdapter = {
```

### 7. src/adapters/openspec.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const openspecAdapter: ShipSpecAdapter = {
```

### 8. src/adapters/project-scripts.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const projectScriptsAdapter: ShipSpecAdapter = {
```

### 9. src/adapters/superpowers.ts

- Score: 6
- Signals: intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const superpowersAdapter: ShipSpecAdapter = {
```

### 10. apps/desktop/main.js

- Score: 4
- Signals: intent-match

```text
1: "use strict";
2: 
3: const { app, BrowserWindow, dialog, ipcMain } = require('electron');
```


## Memory Signals

- Common files: src/gsd.mjs, test/gsd.test.mjs
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Evidence Signals

- No verification evidence summary available yet.

## Risk Signals

- Level: medium
- Verification evidence missing
- ready validation failing
- next action pending: gsd operate

## Evaluation Hints

- Spec validation currently passes.
- Ready validation has gaps; implementation should refresh verification evidence.
- Risk level: medium.
- After coding, run `gsd verify --full`, `gsd review`, and `gsd validate --ready`.

## AI Handoff

- Read the active proposal and tasks before coding.
- Start from the ranked sources above.
- Keep edits scoped to the active change.
- If retrieved context is weak, inspect neighboring files before editing.
- Do not deploy or access secrets from this context pack.
