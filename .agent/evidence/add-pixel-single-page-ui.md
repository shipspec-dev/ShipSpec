# Add Pixel Single Page UI Verification Evidence

Mode: full
Generated: 2026-06-19T09:10:06.356Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.486541ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.462166ms)
✔ startChange writes a richer OpenSpec proposal template (1.922459ms)
✔ runCli dispatches init, start, and status commands (2.104209ms)
✔ runCli supports help and version for an installable CLI (0.215584ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.591125ms)
✔ runSelfTest summarizes command health using an injectable runner (0.251292ms)
✔ runCli examples and self-test print summary output (1.26525ms)
✔ generateUiDashboard writes a single-page pixel dashboard (244.793875ms)
✔ runCli ui prints generated dashboard path (59.596875ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (4.9735ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.016625ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.59275ms)
✔ doctorWorkspace reports repo readiness checks (34.037583ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.839458ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.521125ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.284958ms)
✔ runCli detect and configure print project detection output (1.919667ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.536125ms)
✔ runCli ci prints generated GitHub Actions path (1.60025ms)
✔ getSpecStatus reports active change files and required proposal sections (2.029666ms)
✔ validateChange passes for a generated spec (1.989291ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.022667ms)
✔ validateChange --ready requires verification evidence (1.890292ms)
✔ validateChange --ready passes after verification evidence exists (56.459416ms)
✔ runCli spec and validate print spec gate output (3.897958ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (213.01975ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (75.72775ms)
✔ runCli diff prints review-oriented Git and change status (72.253708ms)
✔ verifyChange runs fast checks by default and writes evidence (56.690958ms)
✔ verifyChange --full includes full-only checks (103.885792ms)
✔ completeChange blocks until verification evidence exists (2.267916ms)
✔ completeChange writes done report after verification evidence exists (83.437917ms)
✔ completeChange includes changed files in done report when Git is available (104.58775ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (126.827792ms)
✔ runCli report prints the report path (129.577417ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (187.297042ms)
✔ runCli release prints release handoff path (159.360375ms)
ℹ tests 38
ℹ suites 0
ℹ pass 38
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1849.407417
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.249583ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.968208ms)
✔ startChange writes a richer OpenSpec proposal template (2.242959ms)
✔ runCli dispatches init, start, and status commands (2.203958ms)
✔ runCli supports help and version for an installable CLI (0.203875ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.635916ms)
✔ runSelfTest summarizes command health using an injectable runner (0.72525ms)
✔ runCli examples and self-test print summary output (1.463875ms)
✔ generateUiDashboard writes a single-page pixel dashboard (243.485291ms)
✔ runCli ui prints generated dashboard path (54.204916ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.159458ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.097875ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.762125ms)
✔ doctorWorkspace reports repo readiness checks (33.488584ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.73925ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.488834ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.615375ms)
✔ runCli detect and configure print project detection output (2.24525ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (4.89075ms)
✔ runCli ci prints generated GitHub Actions path (3.182458ms)
✔ getSpecStatus reports active change files and required proposal sections (3.107917ms)
✔ validateChange passes for a generated spec (2.600083ms)
✔ validateChange fails when proposal is missing acceptance criteria (6.056666ms)
✔ validateChange --ready requires verification evidence (6.108209ms)
✔ validateChange --ready passes after verification evidence exists (56.134666ms)
✔ runCli spec and validate print spec gate output (2.499084ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (201.78725ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (69.564958ms)
✔ runCli diff prints review-oriented Git and change status (69.771792ms)
✔ verifyChange runs fast checks by default and writes evidence (54.547833ms)
✔ verifyChange --full includes full-only checks (103.886292ms)
✔ completeChange blocks until verification evidence exists (2.877584ms)
✔ completeChange writes done report after verification evidence exists (79.781959ms)
✔ completeChange includes changed files in done report when Git is available (96.540209ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (130.21075ms)
✔ runCli report prints the report path (129.007208ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (178.940042ms)
✔ runCli release prints release handoff path (156.557667ms)
ℹ tests 38
ℹ suites 0
ℹ pass 38
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1823.47625
```

