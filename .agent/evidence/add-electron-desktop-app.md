# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-23T12:15:26.705Z

## Checks

### lint

Command: `npm run lint`
Result: pass
Required: yes

```text
> shipspec@0.4.0 lint
> node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### unit

Command: `npm test`
Result: pass
Required: yes

```text
> shipspec@0.4.0 test
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (6.306417ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.966125ms)
✔ startChange writes a richer OpenSpec proposal template (2.058625ms)
✔ runCli dispatches init, start, and status commands (2.046417ms)
✔ runCli supports help and version for an installable CLI (0.17675ms)
✔ runCli skill path prints source and default install target (0.199084ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.572916ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.385833ms)
✔ runSelfTest summarizes command health using an injectable runner (0.251041ms)
✔ runCli examples and self-test print summary output (1.394709ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.264458ms)
✔ runCli desktop prints generated desktop app path (0.966667ms)
✔ package is ready for TypeScript core and npm publishing (0.305375ms)
✔ TypeScript adapters describe ShipSpec integration points (1.085791ms)
✔ runCli adapters lists integration points (0.1705ms)
✔ intake creates a ShipSpec request intake record (1.269375ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.191375ms)
✔ room creates role files for the active ShipSpec change (2.8685ms)
✔ audit reports ShipSpec delivery trail readiness (3.803292ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.364958ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (352.677167ms)
✔ learnFromChange stores governed lessons and project patterns (72.111125ms)
✔ runCli reflect and learn expose self-improving loop commands (132.935875ms)
✔ generateUiDashboard writes a single-page pixel dashboard (273.424833ms)
✔ generateUiDashboard shows committed files when working tree is clean (348.552166ms)
✔ generateUiDashboard shows ShipSpec audit trail (75.986583ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.382292ms)
✔ runCli ui prints generated dashboard path (75.321208ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.53575ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.149875ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.727833ms)
✔ doctorWorkspace reports repo readiness checks (31.117083ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.028583ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.594042ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.142167ms)
✔ runCli detect and configure print project detection output (2.552834ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.786625ms)
✔ runCli ci prints generated GitHub Actions path (1.488417ms)
✔ getSpecStatus reports active change files and required proposal sections (2.033542ms)
✔ validateChange passes for a generated spec (1.865417ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.168917ms)
✔ validateChange --ready requires verification evidence (2.182041ms)
✔ validateChange --ready passes after verification evidence exists (54.794875ms)
✔ runCli spec and validate print spec gate output (2.598458ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (223.306333ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (92.483042ms)
✔ runCli diff prints review-oriented Git and change status (94.148958ms)
✔ verifyChange runs fast checks by default and writes evidence (56.89025ms)
✔ verifyChange --full includes full-only checks (106.405ms)
✔ completeChange blocks until verification evidence exists (2.451375ms)
✔ completeChange writes done report after verification evidence exists (80.225667ms)
✔ completeChange includes changed files in done report when Git is available (92.415708ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (137.916958ms)
✔ runCli report prints the report path (138.787791ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (206.8965ms)
✔ runCli release prints release handoff path (186.789ms)
ℹ tests 56
ℹ suites 0
ℹ pass 56
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2994.394875
```

### typecheck

Command: `npm run typecheck`
Result: pass
Required: yes

```text
> shipspec@0.4.0 typecheck
> tsc --noEmit && node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### e2e

Command: `npm run test:e2e`
Result: pass
Required: no

```text
> shipspec@0.4.0 test:e2e
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (6.507208ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.827166ms)
✔ startChange writes a richer OpenSpec proposal template (2.125459ms)
✔ runCli dispatches init, start, and status commands (2.01025ms)
✔ runCli supports help and version for an installable CLI (0.215708ms)
✔ runCli skill path prints source and default install target (0.210167ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.305792ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.494458ms)
✔ runSelfTest summarizes command health using an injectable runner (0.238958ms)
✔ runCli examples and self-test print summary output (1.334209ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.374333ms)
✔ runCli desktop prints generated desktop app path (0.963334ms)
✔ package is ready for TypeScript core and npm publishing (0.334375ms)
✔ TypeScript adapters describe ShipSpec integration points (1.055792ms)
✔ runCli adapters lists integration points (0.170291ms)
✔ intake creates a ShipSpec request intake record (1.336125ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.359417ms)
✔ room creates role files for the active ShipSpec change (3.249166ms)
✔ audit reports ShipSpec delivery trail readiness (3.929667ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.459125ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (251.170959ms)
✔ learnFromChange stores governed lessons and project patterns (69.998833ms)
✔ runCli reflect and learn expose self-improving loop commands (133.926958ms)
✔ generateUiDashboard writes a single-page pixel dashboard (275.648ms)
✔ generateUiDashboard shows committed files when working tree is clean (343.325791ms)
✔ generateUiDashboard shows ShipSpec audit trail (72.017417ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.215334ms)
✔ runCli ui prints generated dashboard path (70.027334ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.055709ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.801958ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.694083ms)
✔ doctorWorkspace reports repo readiness checks (29.629042ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.633833ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.438208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.472333ms)
✔ runCli detect and configure print project detection output (1.738625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.799417ms)
✔ runCli ci prints generated GitHub Actions path (1.574375ms)
✔ getSpecStatus reports active change files and required proposal sections (2.027125ms)
✔ validateChange passes for a generated spec (1.746125ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.95875ms)
✔ validateChange --ready requires verification evidence (1.890333ms)
✔ validateChange --ready passes after verification evidence exists (54.979292ms)
✔ runCli spec and validate print spec gate output (3.0575ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (219.689833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (92.879416ms)
✔ runCli diff prints review-oriented Git and change status (92.470417ms)
✔ verifyChange runs fast checks by default and writes evidence (55.509625ms)
✔ verifyChange --full includes full-only checks (109.220375ms)
✔ completeChange blocks until verification evidence exists (2.531083ms)
✔ completeChange writes done report after verification evidence exists (82.956375ms)
✔ completeChange includes changed files in done report when Git is available (101.276958ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (146.108583ms)
✔ runCli report prints the report path (137.20975ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (205.94975ms)
✔ runCli release prints release handoff path (185.927167ms)
ℹ tests 56
ℹ suites 0
ℹ pass 56
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2887.022875
```

