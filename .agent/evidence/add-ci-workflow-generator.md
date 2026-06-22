# Add CI Workflow Generator Verification Evidence

Mode: full
Generated: 2026-06-19T08:04:31.991Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.027291ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.457708ms)
✔ startChange writes a richer OpenSpec proposal template (2.065916ms)
✔ runCli dispatches init, start, and status commands (1.977292ms)
✔ runCli supports help and version for an installable CLI (0.185708ms)
✔ doctorWorkspace reports repo readiness checks (33.1305ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.035083ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.524667ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.754375ms)
✔ runCli detect and configure print project detection output (1.929542ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.875916ms)
✔ runCli ci prints generated GitHub Actions path (1.575458ms)
✔ getSpecStatus reports active change files and required proposal sections (2.139375ms)
✔ validateChange passes for a generated spec (3.739125ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.2115ms)
✔ validateChange --ready requires verification evidence (2.831875ms)
✔ validateChange --ready passes after verification evidence exists (57.952375ms)
✔ runCli spec and validate print spec gate output (2.808083ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (200.815291ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (78.835459ms)
✔ runCli diff prints review-oriented Git and change status (73.753542ms)
✔ verifyChange runs fast checks by default and writes evidence (58.239708ms)
✔ verifyChange --full includes full-only checks (103.172042ms)
✔ completeChange blocks until verification evidence exists (3.827458ms)
✔ completeChange writes done report after verification evidence exists (76.208667ms)
✔ completeChange includes changed files in done report when Git is available (93.740292ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (121.469583ms)
✔ runCli report prints the report path (133.561792ms)
ℹ tests 28
ℹ suites 0
ℹ pass 28
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1151.414291
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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.865625ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.194917ms)
✔ startChange writes a richer OpenSpec proposal template (1.940958ms)
✔ runCli dispatches init, start, and status commands (1.919125ms)
✔ runCli supports help and version for an installable CLI (0.170708ms)
✔ doctorWorkspace reports repo readiness checks (34.189208ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.066333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.519041ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.926708ms)
✔ runCli detect and configure print project detection output (1.973667ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.942875ms)
✔ runCli ci prints generated GitHub Actions path (1.67075ms)
✔ getSpecStatus reports active change files and required proposal sections (2.171542ms)
✔ validateChange passes for a generated spec (2.145791ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.108625ms)
✔ validateChange --ready requires verification evidence (2.766459ms)
✔ validateChange --ready passes after verification evidence exists (52.367167ms)
✔ runCli spec and validate print spec gate output (2.837416ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (199.929917ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (69.928416ms)
✔ runCli diff prints review-oriented Git and change status (67.645375ms)
✔ verifyChange runs fast checks by default and writes evidence (52.445334ms)
✔ verifyChange --full includes full-only checks (108.807916ms)
✔ completeChange blocks until verification evidence exists (2.482958ms)
✔ completeChange writes done report after verification evidence exists (76.484292ms)
✔ completeChange includes changed files in done report when Git is available (90.278709ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (119.497167ms)
✔ runCli report prints the report path (155.313292ms)
ℹ tests 28
ℹ suites 0
ℹ pass 28
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1146.701958
```

