# Full Agentic RAG

Change: full-local-agentic-rag
Query: generate local rag index
Quality: strong (100%)

## Quality Checks

- PASS Citations: 8 citations ranked.
- PASS Source coverage: Source file evidence found.
- PASS Test coverage: Test file evidence found.
- PASS Learning signals: Project memory is available.
- PASS Safe local mode: No remote retrieval or secret indexing is used.

## Ranked Citations

### 1. .agent/evidence/full-local-agentic-rag.md

- Kind: agent
- Score: 474
- Reasons: path-intent-match, content:generate, content:local, path:local, content:rag, path:rag, content:index, content:full, path:full, content:agentic, path:agentic

```text
1: # Full local agentic RAG Verification Evidence
3: Mode: full
4: Generated: 2026-06-30T09:29:30.169Z
43: ✔ initWorkspace creates repo-local delivery folders and default workflow (8.974541ms)
```

### 2. src/gsd.mjs

- Kind: source
- Score: 466
- Reasons: path-intent-match, git-change, learned-memory, source-file, content:generate, content:local, content:rag, content:index, content:full, content:agentic, implementation-evidence

```text
17: { name: "e2e", command: "npm run test:e2e", required: false, fullOnly: true },
90: "- Run `gsd verify --full` before release or review.",
174: action: "Add an E2E script when user flows need browser coverage.",
249: fullOnly: true,
```

### 3. .gsd/releases/full-local-agentic-rag.md

- Kind: shipspec
- Score: 434
- Reasons: path-intent-match, shipspec-artifact, content:local, path:local, content:rag, path:rag, content:full, path:full, content:agentic, path:agentic

```text
1: # Release: Full local agentic RAG
5: Release handoff for `full-local-agentic-rag`.
9: openspec/changes/full-local-agentic-rag
18: .agent/evidence/full-local-agentic-rag.md
```

### 4. .gsd/reports/full-local-agentic-rag.md

- Kind: shipspec
- Score: 434
- Reasons: path-intent-match, shipspec-artifact, content:local, path:local, content:rag, path:rag, content:full, path:full, content:agentic, path:agentic

```text
1: # Full local agentic RAG PR Report
5: Prepared review report for `full-local-agentic-rag`.
9: openspec/changes/full-local-agentic-rag
13: - Evidence: .agent/evidence/full-local-agentic-rag.md
```

### 5. .gsd/reviews/full-local-agentic-rag.md

- Kind: shipspec
- Score: 410
- Reasons: path-intent-match, shipspec-artifact, content:generate, content:local, path:local, content:rag, path:rag, content:full, path:full, content:agentic, path:agentic

```text
1: # Review: Full local agentic RAG
3: Change: full-local-agentic-rag
4: Generated: 2026-06-30T09:29:30.295Z
27: - No deterministic risk warnings from local changed files.
```

### 6. openspec/changes/full-local-agentic-rag/proposal.md

- Kind: spec
- Score: 406
- Reasons: path-intent-match, shipspec-artifact, content:generate, content:local, path:local, content:rag, path:rag, content:index, content:full, path:full, content:agentic, path:agentic

```text
1: # Full local agentic RAG
5: Full local agentic RAG
10: - Developers need cited answers from local repo files and ShipSpec memory without copying long context into an AI chat.
11: - Full Agentic RAG must stay fast and safe: no cloud dependency, no vector database, and no secret-file indexing by default.
```

### 7. .gsd/done/full-local-agentic-rag.md

- Kind: shipspec
- Score: 402
- Reasons: path-intent-match, shipspec-artifact, content:local, path:local, content:rag, path:rag, content:full, path:full, content:agentic, path:agentic

```text
1: # Full local agentic RAG Done Report
5: openspec/changes/full-local-agentic-rag
9: .agent/evidence/full-local-agentic-rag.md
```

### 8. test/gsd.test.mjs

- Kind: test
- Score: 384
- Reasons: path-intent-match, git-change, learned-memory, test-file, content:generate, content:local, content:index, content:full, content:agentic, test-evidence

```text
14: generateExamples,
15: generateDesktopApp,
16: generateAppDashboard,
17: generateUiDashboard,
```


## Learning Signals

- Common files: src/gsd.mjs, test/gsd.test.mjs
- Common checks: e2e, lint, typecheck, unit
- Recent risks: None recorded.
- Ship pattern: verify -> review -> report -> done

## Refinement Steps

- Use the top citations first, inspect adjacent files second, then refresh with `gsd context`.

## Safety Exclusions

- .git: excluded noisy path: .git
- node_modules: excluded noisy directory: node_modules
- node_modules/.bin/tsc: excluded noisy directory: node_modules
- node_modules/.bin/tsserver: excluded noisy directory: node_modules
- node_modules/.package-lock.json: excluded noisy directory: node_modules
- node_modules/typescript/LICENSE.txt: excluded noisy directory: node_modules
- node_modules/typescript/README.md: excluded noisy directory: node_modules
- node_modules/typescript/SECURITY.md: excluded noisy directory: node_modules
- node_modules/typescript/ThirdPartyNoticeText.txt: excluded noisy directory: node_modules
- node_modules/typescript/bin/tsc: excluded noisy directory: node_modules
- node_modules/typescript/bin/tsserver: excluded noisy directory: node_modules
- node_modules/typescript/package.json: excluded noisy directory: node_modules
