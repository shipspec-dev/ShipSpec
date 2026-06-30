# Agentic Context Pack

Local Agentic RAG-style context for an AI coding pass. Generated from repo files and ShipSpec artifacts only.

## Mission

- Title: Add agentic context engine
- Slug: add-agentic-context-engine
- Branch: codex/agentic-context-engine
- Next command: gsd operate
- Next reason: Operation report is missing for the active change.

## Retrieval Strategy

- Decompose the request into intent tokens from the title and slug.
- Rank local files using likely-file inference, Git changes, project memory, and path/token matches.
- Read top ranked sources first, then inspect adjacent code only when needed.
- Use ShipSpec evidence and validation gaps as the evaluation loop.

## Ranked Local Sources

### 1. src/gsd.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
1: import { execFile } from "node:child_process";
2: import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
3: import { homedir } from "node:os";
```

### 2. test/gsd.test.mjs

- Score: 261
- Signals: likely-file, changed-file, project-memory, intent-match

```text
23: generateContextPack,
26: generateAgenticContext,
206: assert.match(result.message, /Context: gsd context/);
```

### 3. README.md

- Score: 210
- Signals: likely-file, changed-file

```text
51: `gsd "Feature"` is Mission Autopilot. It prepares the mission, prompt, context pack, reasoning, likely files, risk level, and dashboard in one step. Plain `gsd` then guides the nex
86: gsd context  # build local Agentic Context Pack for the AI pass
117: request -> doctor -> AI context + memory -> implementation -> verification -> risk review -> report
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
21: contextIsolation: true,
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

- Verified: lint passed
- Verified: unit passed
- Verified: typecheck passed
- Verified: e2e passed
- Skipped: None
- Risk: No verification risks detected from configured checks.

## Risk Signals

- Level: medium
- verification skipped checks
- next action pending: gsd operate

## Evaluation Hints

- Spec validation currently passes.
- Ready validation passes; focus on review/release evidence.
- Risk level: medium.
- After coding, run `gsd verify --full`, `gsd review`, and `gsd validate --ready`.

## AI Handoff

- Read the active proposal and tasks before coding.
- Start from the ranked sources above.
- Keep edits scoped to the active change.
- If retrieved context is weak, inspect neighboring files before editing.
- Do not deploy or access secrets from this context pack.
