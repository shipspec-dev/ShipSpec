# Add Examples Self Test Packaging Verification Evidence

Mode: full
Generated: 2026-06-19T08:47:50.327Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.994375ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.575ms)
✔ startChange writes a richer OpenSpec proposal template (2.542375ms)
✔ runCli dispatches init, start, and status commands (2.151875ms)
✔ runCli supports help and version for an installable CLI (0.222084ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.443792ms)
✔ runSelfTest summarizes command health using an injectable runner (0.263625ms)
✔ runCli examples and self-test print summary output (2.260083ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.89875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.347ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (6.934667ms)
✔ doctorWorkspace reports repo readiness checks (41.925042ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.976ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.628417ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.258834ms)
✔ runCli detect and configure print project detection output (2.338625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.102666ms)
✔ runCli ci prints generated GitHub Actions path (1.686167ms)
✔ getSpecStatus reports active change files and required proposal sections (2.289666ms)
✔ validateChange passes for a generated spec (2.306959ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.284583ms)
✔ validateChange --ready requires verification evidence (1.921083ms)
✔ validateChange --ready passes after verification evidence exists (57.479375ms)
✔ runCli spec and validate print spec gate output (2.669292ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (202.067166ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (69.129666ms)
✔ runCli diff prints review-oriented Git and change status (67.445833ms)
✔ verifyChange runs fast checks by default and writes evidence (52.297583ms)
✔ verifyChange --full includes full-only checks (100.667541ms)
✔ completeChange blocks until verification evidence exists (2.422709ms)
✔ completeChange writes done report after verification evidence exists (79.654084ms)
✔ completeChange includes changed files in done report when Git is available (103.931917ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (123.483583ms)
✔ runCli report prints the report path (130.642792ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (171.564667ms)
✔ runCli release prints release handoff path (189.812208ms)
ℹ tests 36
ℹ suites 0
ℹ pass 36
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1540.109
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.339917ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.461459ms)
✔ startChange writes a richer OpenSpec proposal template (2.046125ms)
✔ runCli dispatches init, start, and status commands (2.326792ms)
✔ runCli supports help and version for an installable CLI (0.210625ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.373584ms)
✔ runSelfTest summarizes command health using an injectable runner (0.216917ms)
✔ runCli examples and self-test print summary output (1.521459ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.698042ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.023125ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.8645ms)
✔ doctorWorkspace reports repo readiness checks (33.676542ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.86ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.368083ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.107375ms)
✔ runCli detect and configure print project detection output (1.7065ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.65525ms)
✔ runCli ci prints generated GitHub Actions path (1.559333ms)
✔ getSpecStatus reports active change files and required proposal sections (1.876125ms)
✔ validateChange passes for a generated spec (1.795083ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.89375ms)
✔ validateChange --ready requires verification evidence (1.867208ms)
✔ validateChange --ready passes after verification evidence exists (53.094584ms)
✔ runCli spec and validate print spec gate output (2.709291ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (196.997166ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (86.748541ms)
✔ runCli diff prints review-oriented Git and change status (70.111417ms)
✔ verifyChange runs fast checks by default and writes evidence (52.896709ms)
✔ verifyChange --full includes full-only checks (109.830625ms)
✔ completeChange blocks until verification evidence exists (2.710792ms)
✔ completeChange writes done report after verification evidence exists (104.866125ms)
✔ completeChange includes changed files in done report when Git is available (132.47975ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (160.469542ms)
✔ runCli report prints the report path (132.962042ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (228.666958ms)
✔ runCli release prints release handoff path (189.384208ms)
ℹ tests 36
ℹ suites 0
ℹ pass 36
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1688.40325
```

