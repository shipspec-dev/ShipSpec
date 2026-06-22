# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-19T10:27:37.694Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.377125ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.84875ms)
✔ startChange writes a richer OpenSpec proposal template (2.173708ms)
✔ runCli dispatches init, start, and status commands (2.103708ms)
✔ runCli supports help and version for an installable CLI (0.269084ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.420625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.348917ms)
✔ runCli examples and self-test print summary output (1.432875ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.353292ms)
✔ runCli desktop prints generated desktop app path (1.152667ms)
✔ generateUiDashboard writes a single-page pixel dashboard (230.435084ms)
✔ runCli ui prints generated dashboard path (46.4375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.378917ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.674917ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.516209ms)
✔ doctorWorkspace reports repo readiness checks (29.387125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.84ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.596292ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.634791ms)
✔ runCli detect and configure print project detection output (2.0175ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.8ms)
✔ runCli ci prints generated GitHub Actions path (1.393917ms)
✔ getSpecStatus reports active change files and required proposal sections (2.123875ms)
✔ validateChange passes for a generated spec (1.9545ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.038417ms)
✔ validateChange --ready requires verification evidence (1.726625ms)
✔ validateChange --ready passes after verification evidence exists (60.257042ms)
✔ runCli spec and validate print spec gate output (6.934958ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (241.212ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (76.861708ms)
✔ runCli diff prints review-oriented Git and change status (69.4865ms)
✔ verifyChange runs fast checks by default and writes evidence (51.561417ms)
✔ verifyChange --full includes full-only checks (100.621166ms)
✔ completeChange blocks until verification evidence exists (2.23525ms)
✔ completeChange writes done report after verification evidence exists (74.876291ms)
✔ completeChange includes changed files in done report when Git is available (93.099084ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (119.579334ms)
✔ runCli report prints the report path (118.484166ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (174.052333ms)
✔ runCli release prints release handoff path (147.501125ms)
ℹ tests 40
ℹ suites 0
ℹ pass 40
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1777.550291
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.801041ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.143375ms)
✔ startChange writes a richer OpenSpec proposal template (1.9625ms)
✔ runCli dispatches init, start, and status commands (2.025083ms)
✔ runCli supports help and version for an installable CLI (0.272834ms)
✔ generateExamples creates a node-basic example project with GSD artifacts (1.3655ms)
✔ runSelfTest summarizes command health using an injectable runner (0.261125ms)
✔ runCli examples and self-test print summary output (1.242375ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.422458ms)
✔ runCli desktop prints generated desktop app path (1.523834ms)
✔ generateUiDashboard writes a single-page pixel dashboard (221.52125ms)
✔ runCli ui prints generated dashboard path (46.227625ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.810625ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.7455ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.947459ms)
✔ doctorWorkspace reports repo readiness checks (31.027ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.693458ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.583208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.516166ms)
✔ runCli detect and configure print project detection output (1.828625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.68025ms)
✔ runCli ci prints generated GitHub Actions path (1.534209ms)
✔ getSpecStatus reports active change files and required proposal sections (2.074167ms)
✔ validateChange passes for a generated spec (3.076333ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.94625ms)
✔ validateChange --ready requires verification evidence (1.765125ms)
✔ validateChange --ready passes after verification evidence exists (51.665875ms)
✔ runCli spec and validate print spec gate output (2.94925ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (213.756792ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (65.562791ms)
✔ runCli diff prints review-oriented Git and change status (63.829375ms)
✔ verifyChange runs fast checks by default and writes evidence (51.945458ms)
✔ verifyChange --full includes full-only checks (106.58625ms)
✔ completeChange blocks until verification evidence exists (2.7405ms)
✔ completeChange writes done report after verification evidence exists (81.25ms)
✔ completeChange includes changed files in done report when Git is available (91.265ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (113.062625ms)
✔ runCli report prints the report path (113.864458ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (161.110333ms)
✔ runCli release prints release handoff path (145.493292ms)
ℹ tests 40
ℹ suites 0
ℹ pass 40
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1700.450458
```

