# Add OpenSpec Validation Gates Verification Evidence

Mode: full
Generated: 2026-06-19T07:12:05.058Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.965125ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.506667ms)
✔ startChange writes a richer OpenSpec proposal template (2.054625ms)
✔ runCli dispatches init, start, and status commands (1.950625ms)
✔ runCli supports help and version for an installable CLI (0.211167ms)
✔ doctorWorkspace reports repo readiness checks (35.879958ms)
✔ getSpecStatus reports active change files and required proposal sections (4.39125ms)
✔ validateChange passes for a generated spec (2.278959ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.090917ms)
✔ validateChange --ready requires verification evidence (2.129833ms)
✔ validateChange --ready passes after verification evidence exists (52.97775ms)
✔ runCli spec and validate print spec gate output (3.015291ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (209.35ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (76.181375ms)
✔ runCli diff prints review-oriented Git and change status (73.7875ms)
✔ verifyChange runs fast checks by default and writes evidence (52.241208ms)
✔ verifyChange --full includes full-only checks (111.272ms)
✔ completeChange blocks until verification evidence exists (2.7635ms)
✔ completeChange writes done report after verification evidence exists (78.282709ms)
✔ completeChange includes changed files in done report when Git is available (94.09575ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (119.050417ms)
✔ runCli report prints the report path (125.510917ms)
ℹ tests 22
ℹ suites 0
ℹ pass 22
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1137.62225
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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.892583ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.712958ms)
✔ startChange writes a richer OpenSpec proposal template (1.965291ms)
✔ runCli dispatches init, start, and status commands (1.969917ms)
✔ runCli supports help and version for an installable CLI (0.401458ms)
✔ doctorWorkspace reports repo readiness checks (36.563625ms)
✔ getSpecStatus reports active change files and required proposal sections (3.419708ms)
✔ validateChange passes for a generated spec (2.055ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.194ms)
✔ validateChange --ready requires verification evidence (2.157416ms)
✔ validateChange --ready passes after verification evidence exists (53.114458ms)
✔ runCli spec and validate print spec gate output (2.789875ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (208.204959ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (72.611459ms)
✔ runCli diff prints review-oriented Git and change status (72.175792ms)
✔ verifyChange runs fast checks by default and writes evidence (53.55475ms)
✔ verifyChange --full includes full-only checks (101.480458ms)
✔ completeChange blocks until verification evidence exists (2.709416ms)
✔ completeChange writes done report after verification evidence exists (79.896417ms)
✔ completeChange includes changed files in done report when Git is available (96.398375ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (122.723542ms)
✔ runCli report prints the report path (120.491458ms)
ℹ tests 22
ℹ suites 0
ℹ pass 22
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1126.225666
```

