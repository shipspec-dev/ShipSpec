# Add Project Detection Configure Verification Evidence

Mode: full
Generated: 2026-06-19T07:29:45.974Z

## Checks

### lint

Command: `npm run lint`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 lint
> node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### unit

Command: `npm test`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 test
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (6.352042ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.628ms)
✔ startChange writes a richer OpenSpec proposal template (2.130917ms)
✔ runCli dispatches init, start, and status commands (2.043625ms)
✔ runCli supports help and version for an installable CLI (0.282ms)
✔ doctorWorkspace reports repo readiness checks (38.293542ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.830958ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.997208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.098875ms)
✔ runCli detect and configure print project detection output (2.122875ms)
✔ getSpecStatus reports active change files and required proposal sections (2.191792ms)
✔ validateChange passes for a generated spec (2.160875ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.938041ms)
✔ validateChange --ready requires verification evidence (3.670625ms)
✔ validateChange --ready passes after verification evidence exists (57.440625ms)
✔ runCli spec and validate print spec gate output (4.130542ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (206.525667ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (67.427542ms)
✔ runCli diff prints review-oriented Git and change status (68.424792ms)
✔ verifyChange runs fast checks by default and writes evidence (51.437833ms)
✔ verifyChange --full includes full-only checks (99.08375ms)
✔ completeChange blocks until verification evidence exists (2.441875ms)
✔ completeChange writes done report after verification evidence exists (74.676916ms)
✔ completeChange includes changed files in done report when Git is available (94.280917ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (119.313ms)
✔ runCli report prints the report path (118.672291ms)
ℹ tests 26
ℹ suites 0
ℹ pass 26
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1118.992084
```

### typecheck

Command: `npm run typecheck`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 typecheck
> node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### e2e

Command: `npm run test:e2e`
Result: pass
Required: no

```text
> gsd-agent-delivery-kit@0.1.0 test:e2e
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (5.988667ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.029208ms)
✔ startChange writes a richer OpenSpec proposal template (2.645917ms)
✔ runCli dispatches init, start, and status commands (2.330792ms)
✔ runCli supports help and version for an installable CLI (0.167833ms)
✔ doctorWorkspace reports repo readiness checks (33.673167ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.751833ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.888291ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.943083ms)
✔ runCli detect and configure print project detection output (2.167583ms)
✔ getSpecStatus reports active change files and required proposal sections (2.118792ms)
✔ validateChange passes for a generated spec (2.359833ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.11075ms)
✔ validateChange --ready requires verification evidence (1.985875ms)
✔ validateChange --ready passes after verification evidence exists (52.042542ms)
✔ runCli spec and validate print spec gate output (3.350625ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (195.6035ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (67.016666ms)
✔ runCli diff prints review-oriented Git and change status (72.536ms)
✔ verifyChange runs fast checks by default and writes evidence (53.479334ms)
✔ verifyChange --full includes full-only checks (102.335ms)
✔ completeChange blocks until verification evidence exists (2.539625ms)
✔ completeChange writes done report after verification evidence exists (76.866416ms)
✔ completeChange includes changed files in done report when Git is available (100.75175ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (129.891041ms)
✔ runCli report prints the report path (205.30525ms)
ℹ tests 26
ℹ suites 0
ℹ pass 26
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1205.241958
```

