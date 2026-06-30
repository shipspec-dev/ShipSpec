# Agentic Context Pack

Local Agentic RAG-style context for an AI coding pass. Generated from repo files and ShipSpec artifacts only.

## Mission

- Title: Complete agentic RAG production v1
- Slug: complete-agentic-rag-production-v1
- Branch: codex/agentic-rag-complete-v1
- Next command: gsd reason
- Next reason: Adaptive reasoning is missing for the active change.

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
- PASS Operator next step: Next command is gsd reason.

## Connector Signals

- Local repo: active - 10 ranked local source files.
- ShipSpec memory: active - Learned project signals are available.
- Verification evidence: missing - Run `gsd verify --full` after implementation.
- External connectors: not configured - Jira, logs, docs, and design connectors can be added later without changing the local context contract.

## Retrieval Loop

- Round 1: derive intent from "Complete agentic RAG production v1" and complete-agentic-rag-production-v1.
- Round 2: rank likely files from local project structure, Git state, and ShipSpec memory.
- Round 3: read top sources, then inspect adjacent files only when the quality score is weak or the task is unclear.
- Next refinement: use ranked sources directly, then refresh context after code changes.

## Learning Retrieval

- Common files: src/gsd.mjs, test/gsd.test.mjs
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Operator Next Step

- Command: gsd reason
- Reason: Adaptive reasoning is missing for the active change.
- Verification evidence is not ready yet.

## Ranked Local Sources

### 1. src/gsd.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
174: action: "Add an E2E script when user flows need browser coverage.",
187: action: "Reinstall the package or run from a complete ShipSpec checkout.",
```

### 2. test/gsd.test.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
11: completeChange,
26: generateAgenticContext,
```

### 3. README.md

- Score: 210
- Signals: likely-file, changed-file

```text
86: gsd context  # build local Agentic Context Pack for the AI pass
114: For Agentic RAG-style local retrieval:
182: | `gsd context` | Build a local Agentic Context Pack with ranked files, quality score, connector signals, memory, risks, and next step. |
```

### 4. src/adapters/index.ts

- Score: 130
- Signals: likely-file, intent-match

```text
1: export type AdapterCapability =
2: | "spec"
3: | "discipline"
```

### 5. src/adapters/github.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const githubAdapter: ShipSpecAdapter = {
```

### 6. src/adapters/openspec.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const openspecAdapter: ShipSpecAdapter = {
```

### 7. src/adapters/project-scripts.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const projectScriptsAdapter: ShipSpecAdapter = {
```

### 8. src/adapters/superpowers.ts

- Score: 126
- Signals: likely-file, intent-match

```text
1: import type { ShipSpecAdapter } from "./index.js";
2: 
3: export const superpowersAdapter: ShipSpecAdapter = {
```

### 9. apps/desktop/main.js

- Score: 4
- Signals: intent-match

```text
1: "use strict";
2: 
3: const { app, BrowserWindow, dialog, ipcMain } = require('electron');
```

### 10. apps/desktop/renderer/app.js

- Score: 4
- Signals: intent-match

```text
1: const stages = ['Spec', 'Validate', 'Verify', 'Report', 'Release', 'Ready'];
2: const output = document.querySelector('#output');
3: const inbox = document.querySelector('#inbox');
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
- next action pending: gsd reason

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
