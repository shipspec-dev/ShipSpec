# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-23T12:22:48.271Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.190542ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.184042ms)
✔ startChange writes a richer OpenSpec proposal template (2.006459ms)
✔ runCli dispatches init, start, and status commands (2.21375ms)
✔ runCli supports help and version for an installable CLI (0.189417ms)
✔ runCli skill path prints source and default install target (0.219916ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.632375ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.654625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.341667ms)
✔ runCli examples and self-test print summary output (1.71375ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.505167ms)
✔ runCli desktop prints generated desktop app path (1.011125ms)
✔ package is ready for TypeScript core and npm publishing (0.308917ms)
✔ TypeScript adapters describe ShipSpec integration points (1.156375ms)
✔ runCli adapters lists integration points (0.232125ms)
✔ intake creates a ShipSpec request intake record (1.609625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.496375ms)
✔ room creates role files for the active ShipSpec change (2.765375ms)
✔ audit reports ShipSpec delivery trail readiness (3.852375ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.49275ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (389.775791ms)
✔ learnFromChange stores governed lessons and project patterns (81.106791ms)
✔ runCli reflect and learn expose self-improving loop commands (153.888083ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (135.586708ms)
✔ runLoop learns when verification and reflection are ready (432.768291ms)
✔ runCli loop exposes the one-pass self-improvement loop (131.723334ms)
✔ generateUiDashboard writes a single-page pixel dashboard (295.127917ms)
✔ generateUiDashboard shows committed files when working tree is clean (364.467792ms)
✔ generateUiDashboard shows ShipSpec audit trail (75.236458ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.563042ms)
✔ runCli ui prints generated dashboard path (71.246375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.77325ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.371166ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.422417ms)
✔ doctorWorkspace reports repo readiness checks (31.712125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.677792ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.577791ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.044291ms)
✔ runCli detect and configure print project detection output (1.808625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.818125ms)
✔ runCli ci prints generated GitHub Actions path (1.40975ms)
✔ getSpecStatus reports active change files and required proposal sections (2.0325ms)
✔ validateChange passes for a generated spec (1.9225ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.916459ms)
✔ validateChange --ready requires verification evidence (2.109792ms)
✔ validateChange --ready passes after verification evidence exists (56.636ms)
✔ runCli spec and validate print spec gate output (2.778167ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (223.08675ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (90.409791ms)
✔ runCli diff prints review-oriented Git and change status (88.329084ms)
✔ verifyChange runs fast checks by default and writes evidence (58.089292ms)
✔ verifyChange --full includes full-only checks (110.819042ms)
✔ completeChange blocks until verification evidence exists (2.4915ms)
✔ completeChange writes done report after verification evidence exists (82.050459ms)
✔ completeChange includes changed files in done report when Git is available (97.217542ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (146.355042ms)
✔ runCli report prints the report path (144.548541ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (220.87875ms)
✔ runCli release prints release handoff path (190.88225ms)
ℹ tests 59
ℹ suites 0
ℹ pass 59
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3840.94125
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.4885ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.290209ms)
✔ startChange writes a richer OpenSpec proposal template (3.011542ms)
✔ runCli dispatches init, start, and status commands (3.415083ms)
✔ runCli supports help and version for an installable CLI (0.236583ms)
✔ runCli skill path prints source and default install target (0.320458ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.572417ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.087292ms)
✔ runSelfTest summarizes command health using an injectable runner (0.251667ms)
✔ runCli examples and self-test print summary output (1.808791ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.745083ms)
✔ runCli desktop prints generated desktop app path (1.307042ms)
✔ package is ready for TypeScript core and npm publishing (0.359875ms)
✔ TypeScript adapters describe ShipSpec integration points (1.16ms)
✔ runCli adapters lists integration points (0.180625ms)
✔ intake creates a ShipSpec request intake record (1.52725ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.378167ms)
✔ room creates role files for the active ShipSpec change (3.0335ms)
✔ audit reports ShipSpec delivery trail readiness (3.672375ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.535ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (272.987458ms)
✔ learnFromChange stores governed lessons and project patterns (78.38825ms)
✔ runCli reflect and learn expose self-improving loop commands (141.775833ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (127.720833ms)
✔ runLoop learns when verification and reflection are ready (414.54425ms)
✔ runCli loop exposes the one-pass self-improvement loop (126.079333ms)
✔ generateUiDashboard writes a single-page pixel dashboard (289.4205ms)
✔ generateUiDashboard shows committed files when working tree is clean (377.03225ms)
✔ generateUiDashboard shows ShipSpec audit trail (74.241125ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.1735ms)
✔ runCli ui prints generated dashboard path (69.494209ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.750958ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.363958ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.819667ms)
✔ doctorWorkspace reports repo readiness checks (32.581667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.796625ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.432416ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.376083ms)
✔ runCli detect and configure print project detection output (1.723708ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.069792ms)
✔ runCli ci prints generated GitHub Actions path (1.660083ms)
✔ getSpecStatus reports active change files and required proposal sections (1.885334ms)
✔ validateChange passes for a generated spec (2.008333ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.933917ms)
✔ validateChange --ready requires verification evidence (2.010833ms)
✔ validateChange --ready passes after verification evidence exists (56.874375ms)
✔ runCli spec and validate print spec gate output (2.632292ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (222.973625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (90.665125ms)
✔ runCli diff prints review-oriented Git and change status (87.004791ms)
✔ verifyChange runs fast checks by default and writes evidence (57.11575ms)
✔ verifyChange --full includes full-only checks (109.755792ms)
✔ completeChange blocks until verification evidence exists (3.396041ms)
✔ completeChange writes done report after verification evidence exists (82.957084ms)
✔ completeChange includes changed files in done report when Git is available (98.274334ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (144.967334ms)
✔ runCli report prints the report path (144.795375ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (229.908875ms)
✔ runCli release prints release handoff path (208.117208ms)
ℹ tests 59
ℹ suites 0
ℹ pass 59
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3710.242083
```

