# Add Multi Agent Coordination Verification Evidence

Mode: full
Generated: 2026-06-19T08:24:06.158Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.134334ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.400208ms)
✔ startChange writes a richer OpenSpec proposal template (1.894708ms)
✔ runCli dispatches init, start, and status commands (1.994958ms)
✔ runCli supports help and version for an installable CLI (0.184916ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.772542ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.808208ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.565041ms)
✔ doctorWorkspace reports repo readiness checks (37.35175ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.986084ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.69275ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.302625ms)
✔ runCli detect and configure print project detection output (2.6325ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.81375ms)
✔ runCli ci prints generated GitHub Actions path (1.427458ms)
✔ getSpecStatus reports active change files and required proposal sections (1.937292ms)
✔ validateChange passes for a generated spec (1.876917ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.804167ms)
✔ validateChange --ready requires verification evidence (1.77025ms)
✔ validateChange --ready passes after verification evidence exists (53.649ms)
✔ runCli spec and validate print spec gate output (4.070083ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (191.610375ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (60.860459ms)
✔ runCli diff prints review-oriented Git and change status (61.498458ms)
✔ verifyChange runs fast checks by default and writes evidence (51.1105ms)
✔ verifyChange --full includes full-only checks (102.326167ms)
✔ completeChange blocks until verification evidence exists (2.491167ms)
✔ completeChange writes done report after verification evidence exists (72.897958ms)
✔ completeChange includes changed files in done report when Git is available (87.055333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (114.664666ms)
✔ runCli report prints the report path (108.999959ms)
ℹ tests 31
ℹ suites 0
ℹ pass 31
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1080.136
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.885291ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.509292ms)
✔ startChange writes a richer OpenSpec proposal template (2.279167ms)
✔ runCli dispatches init, start, and status commands (2.107042ms)
✔ runCli supports help and version for an installable CLI (0.240875ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.978125ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.827666ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.516584ms)
✔ doctorWorkspace reports repo readiness checks (31.546125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.833666ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.645209ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.987667ms)
✔ runCli detect and configure print project detection output (2.517708ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.005542ms)
✔ runCli ci prints generated GitHub Actions path (1.480916ms)
✔ getSpecStatus reports active change files and required proposal sections (1.929209ms)
✔ validateChange passes for a generated spec (1.870667ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.870334ms)
✔ validateChange --ready requires verification evidence (1.897958ms)
✔ validateChange --ready passes after verification evidence exists (51.874042ms)
✔ runCli spec and validate print spec gate output (2.659333ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (193.016125ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (62.484584ms)
✔ runCli diff prints review-oriented Git and change status (60.200583ms)
✔ verifyChange runs fast checks by default and writes evidence (49.90625ms)
✔ verifyChange --full includes full-only checks (95.431583ms)
✔ completeChange blocks until verification evidence exists (2.08375ms)
✔ completeChange writes done report after verification evidence exists (80.496791ms)
✔ completeChange includes changed files in done report when Git is available (95.029458ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (110.332583ms)
✔ runCli report prints the report path (110.074333ms)
ℹ tests 31
ℹ suites 0
ℹ pass 31
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1087.415709
```

