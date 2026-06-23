# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-23T12:29:28.660Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.977792ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.920209ms)
✔ startChange writes a richer OpenSpec proposal template (2.511208ms)
✔ runCli dispatches init, start, and status commands (4.563167ms)
✔ runCli supports help and version for an installable CLI (0.184708ms)
✔ runCli skill path prints source and default install target (0.307959ms)
✔ runCli skill install copies the bundled ShipSpec skill (4.828209ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.823458ms)
✔ runSelfTest summarizes command health using an injectable runner (0.347542ms)
✔ runCli examples and self-test print summary output (3.352708ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.672541ms)
✔ runCli desktop prints generated desktop app path (1.285167ms)
✔ package is ready for TypeScript core and npm publishing (0.331875ms)
✔ TypeScript adapters describe ShipSpec integration points (1.858209ms)
✔ runCli adapters lists integration points (0.17375ms)
✔ intake creates a ShipSpec request intake record (1.370583ms)
✔ contract creates a delivery contract for the active ShipSpec change (3.350959ms)
✔ room creates role files for the active ShipSpec change (3.490084ms)
✔ audit reports ShipSpec delivery trail readiness (5.719666ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.419083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (397.263584ms)
✔ learnFromChange stores governed lessons and project patterns (74.668458ms)
✔ runCli reflect and learn expose self-improving loop commands (146.626792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (125.858833ms)
✔ runLoop learns when verification and reflection are ready (416.470125ms)
✔ runCli loop exposes the one-pass self-improvement loop (128.206334ms)
✔ generateUiDashboard writes a single-page pixel dashboard (293.990542ms)
✔ generateUiDashboard shows committed files when working tree is clean (370.715625ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.6935ms)
✔ generateUiDashboard shows self-improving loop state (224.524041ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (2.210083ms)
✔ runCli ui prints generated dashboard path (122.121375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (4.032584ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.336209ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.628ms)
✔ doctorWorkspace reports repo readiness checks (35.804958ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.902375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.577125ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.98775ms)
✔ runCli detect and configure print project detection output (2.766458ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.904459ms)
✔ runCli ci prints generated GitHub Actions path (1.696291ms)
✔ getSpecStatus reports active change files and required proposal sections (1.676167ms)
✔ validateChange passes for a generated spec (1.77875ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.851375ms)
✔ validateChange --ready requires verification evidence (1.973167ms)
✔ validateChange --ready passes after verification evidence exists (78.185458ms)
✔ runCli spec and validate print spec gate output (2.857458ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (228.826708ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (92.311792ms)
✔ runCli diff prints review-oriented Git and change status (87.161041ms)
✔ verifyChange runs fast checks by default and writes evidence (55.462042ms)
✔ verifyChange --full includes full-only checks (110.064083ms)
✔ completeChange blocks until verification evidence exists (2.287875ms)
✔ completeChange writes done report after verification evidence exists (77.910833ms)
✔ completeChange includes changed files in done report when Git is available (96.986041ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (142.089125ms)
✔ runCli report prints the report path (147.297666ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (216.7435ms)
✔ runCli release prints release handoff path (197.13125ms)
ℹ tests 60
ℹ suites 0
ℹ pass 60
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 4128.741416
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.055375ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.117625ms)
✔ startChange writes a richer OpenSpec proposal template (2.374833ms)
✔ runCli dispatches init, start, and status commands (1.962167ms)
✔ runCli supports help and version for an installable CLI (0.19225ms)
✔ runCli skill path prints source and default install target (0.21875ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.49975ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.363542ms)
✔ runSelfTest summarizes command health using an injectable runner (0.249625ms)
✔ runCli examples and self-test print summary output (1.376958ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.261167ms)
✔ runCli desktop prints generated desktop app path (0.878541ms)
✔ package is ready for TypeScript core and npm publishing (0.424584ms)
✔ TypeScript adapters describe ShipSpec integration points (1.069708ms)
✔ runCli adapters lists integration points (0.163583ms)
✔ intake creates a ShipSpec request intake record (1.405167ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.149875ms)
✔ room creates role files for the active ShipSpec change (2.644833ms)
✔ audit reports ShipSpec delivery trail readiness (3.582ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.423834ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (267.717ms)
✔ learnFromChange stores governed lessons and project patterns (74.392708ms)
✔ runCli reflect and learn expose self-improving loop commands (140.582166ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (127.093208ms)
✔ runLoop learns when verification and reflection are ready (429.915166ms)
✔ runCli loop exposes the one-pass self-improvement loop (138.331125ms)
✔ generateUiDashboard writes a single-page pixel dashboard (322.088833ms)
✔ generateUiDashboard shows committed files when working tree is clean (386.134542ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.262291ms)
✔ generateUiDashboard shows self-improving loop state (201.098541ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.279042ms)
✔ runCli ui prints generated dashboard path (73.17125ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.614875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.34675ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.813041ms)
✔ doctorWorkspace reports repo readiness checks (30.744292ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.930959ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.517917ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.0835ms)
✔ runCli detect and configure print project detection output (1.711334ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.365917ms)
✔ runCli ci prints generated GitHub Actions path (1.431667ms)
✔ getSpecStatus reports active change files and required proposal sections (2.020375ms)
✔ validateChange passes for a generated spec (1.918042ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.408042ms)
✔ validateChange --ready requires verification evidence (1.720875ms)
✔ validateChange --ready passes after verification evidence exists (57.769541ms)
✔ runCli spec and validate print spec gate output (2.786208ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (215.796709ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (91.691375ms)
✔ runCli diff prints review-oriented Git and change status (90.946291ms)
✔ verifyChange runs fast checks by default and writes evidence (55.808459ms)
✔ verifyChange --full includes full-only checks (109.295542ms)
✔ completeChange blocks until verification evidence exists (2.381958ms)
✔ completeChange writes done report after verification evidence exists (80.001958ms)
✔ completeChange includes changed files in done report when Git is available (96.794916ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (148.9885ms)
✔ runCli report prints the report path (140.401625ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (217.172291ms)
✔ runCli release prints release handoff path (190.935042ms)
ℹ tests 60
ℹ suites 0
ℹ pass 60
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3928.46325
```

