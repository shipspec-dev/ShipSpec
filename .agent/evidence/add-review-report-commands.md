# Add Review Report Commands Verification Evidence

Mode: full
Generated: 2026-06-19T06:58:01.806Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.758292ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.632209ms)
✔ startChange writes a richer OpenSpec proposal template (2.498333ms)
✔ runCli dispatches init, start, and status commands (1.985291ms)
✔ runCli supports help and version for an installable CLI (0.199625ms)
✔ doctorWorkspace reports repo readiness checks (34.549375ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (185.85775ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (67.690167ms)
✔ runCli diff prints review-oriented Git and change status (67.721708ms)
✔ verifyChange runs fast checks by default and writes evidence (52.625125ms)
✔ verifyChange --full includes full-only checks (102.638625ms)
✔ completeChange blocks until verification evidence exists (2.396084ms)
✔ completeChange writes done report after verification evidence exists (76.310875ms)
✔ completeChange includes changed files in done report when Git is available (98.040167ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (122.548667ms)
✔ runCli report prints the report path (123.166875ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1026.966334
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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.38625ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.153042ms)
✔ startChange writes a richer OpenSpec proposal template (2.545709ms)
✔ runCli dispatches init, start, and status commands (2.114792ms)
✔ runCli supports help and version for an installable CLI (0.189ms)
✔ doctorWorkspace reports repo readiness checks (31.51025ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (183.57025ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (64.719292ms)
✔ runCli diff prints review-oriented Git and change status (63.23475ms)
✔ verifyChange runs fast checks by default and writes evidence (51.065875ms)
✔ verifyChange --full includes full-only checks (99.737959ms)
✔ completeChange blocks until verification evidence exists (2.460916ms)
✔ completeChange writes done report after verification evidence exists (74.840792ms)
✔ completeChange includes changed files in done report when Git is available (90.80225ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (115.397041ms)
✔ runCli report prints the report path (117.359042ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 985.675625
```

