# Add Release Handoff Verification Evidence

Mode: full
Generated: 2026-06-19T08:47:30.679Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.644292ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.308917ms)
✔ startChange writes a richer OpenSpec proposal template (1.935708ms)
✔ runCli dispatches init, start, and status commands (2.000792ms)
✔ runCli supports help and version for an installable CLI (0.321875ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.821292ms)
✔ runSelfTest summarizes command health using an injectable runner (0.291708ms)
✔ runCli examples and self-test print summary output (1.783708ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.834041ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.453708ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.594541ms)
✔ doctorWorkspace reports repo readiness checks (31.975958ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.973875ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.42875ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.959333ms)
✔ runCli detect and configure print project detection output (1.853917ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.845125ms)
✔ runCli ci prints generated GitHub Actions path (1.445959ms)
✔ getSpecStatus reports active change files and required proposal sections (1.940875ms)
✔ validateChange passes for a generated spec (1.8055ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.904833ms)
✔ validateChange --ready requires verification evidence (1.996875ms)
✔ validateChange --ready passes after verification evidence exists (53.347333ms)
✔ runCli spec and validate print spec gate output (4.996042ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (200.935042ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (68.63075ms)
✔ runCli diff prints review-oriented Git and change status (70.202875ms)
✔ verifyChange runs fast checks by default and writes evidence (53.3955ms)
✔ verifyChange --full includes full-only checks (108.004958ms)
✔ completeChange blocks until verification evidence exists (2.326292ms)
✔ completeChange writes done report after verification evidence exists (79.569ms)
✔ completeChange includes changed files in done report when Git is available (97.31725ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (120.464666ms)
✔ runCli report prints the report path (132.5605ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (184.589958ms)
✔ runCli release prints release handoff path (164.521208ms)
ℹ tests 36
ℹ suites 0
ℹ pass 36
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1507.714375
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.728708ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.381375ms)
✔ startChange writes a richer OpenSpec proposal template (2.189333ms)
✔ runCli dispatches init, start, and status commands (2.124917ms)
✔ runCli supports help and version for an installable CLI (0.198833ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.37925ms)
✔ runSelfTest summarizes command health using an injectable runner (0.245ms)
✔ runCli examples and self-test print summary output (1.648833ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.590791ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.537292ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.438792ms)
✔ doctorWorkspace reports repo readiness checks (34.301708ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.730333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.463625ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.760875ms)
✔ runCli detect and configure print project detection output (2.172333ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.898875ms)
✔ runCli ci prints generated GitHub Actions path (1.754875ms)
✔ getSpecStatus reports active change files and required proposal sections (2.009375ms)
✔ validateChange passes for a generated spec (2.211333ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.210792ms)
✔ validateChange --ready requires verification evidence (2.07175ms)
✔ validateChange --ready passes after verification evidence exists (52.793792ms)
✔ runCli spec and validate print spec gate output (3.080084ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (193.146292ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (69.190833ms)
✔ runCli diff prints review-oriented Git and change status (80.248084ms)
✔ verifyChange runs fast checks by default and writes evidence (53.177416ms)
✔ verifyChange --full includes full-only checks (104.132083ms)
✔ completeChange blocks until verification evidence exists (3.077792ms)
✔ completeChange writes done report after verification evidence exists (82.039583ms)
✔ completeChange includes changed files in done report when Git is available (100.454ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (124.116291ms)
✔ runCli report prints the report path (127.932542ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (193.508334ms)
✔ runCli release prints release handoff path (167.614416ms)
ℹ tests 36
ℹ suites 0
ℹ pass 36
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1527.930166
```

