# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-23T14:14:56.464Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.817667ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.141667ms)
✔ startChange writes a richer OpenSpec proposal template (2.241917ms)
✔ runCli dispatches init, start, and status commands (2.152834ms)
✔ runCli supports help and version for an installable CLI (0.244625ms)
✔ runCli skill path prints source and default install target (0.2485ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.88275ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.3895ms)
✔ runSelfTest summarizes command health using an injectable runner (0.281584ms)
✔ runCli examples and self-test print summary output (1.386833ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.364125ms)
✔ runCli desktop prints generated desktop app path (0.912166ms)
✔ package is ready for TypeScript core and npm publishing (1.022ms)
✔ TypeScript adapters describe ShipSpec integration points (0.3905ms)
✔ runCli adapters lists integration points (0.390042ms)
✔ intake creates a ShipSpec request intake record (1.234583ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.040708ms)
✔ room creates role files for the active ShipSpec change (2.491625ms)
✔ audit reports ShipSpec delivery trail readiness (3.5455ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.453125ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (383.941709ms)
✔ learnFromChange stores governed lessons and project patterns (75.457208ms)
✔ runCli reflect and learn expose self-improving loop commands (131.892708ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (118.028375ms)
✔ runLoop learns when verification and reflection are ready (472.080375ms)
✔ runCli loop exposes the one-pass self-improvement loop (125.883083ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (183.897792ms)
✔ runCli memory prints memory summary and supports json output (70.407209ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (70.585375ms)
✔ runCli reason prints reasoning path and supports json output (3.395709ms)
✔ generateUiDashboard writes a single-page pixel dashboard (294.550625ms)
✔ generateUiDashboard shows committed files when working tree is clean (333.163083ms)
✔ generateUiDashboard shows ShipSpec audit trail (68.748084ms)
✔ generateUiDashboard shows self-improving loop state (178.399084ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.255208ms)
✔ runCli ui prints generated dashboard path (67.096209ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.85425ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.558125ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.391ms)
✔ doctorWorkspace reports repo readiness checks (31.192083ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.622375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.451875ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.930958ms)
✔ runCli detect and configure print project detection output (2.042583ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.645125ms)
✔ runCli ci prints generated GitHub Actions path (1.632667ms)
✔ getSpecStatus reports active change files and required proposal sections (2.024208ms)
✔ validateChange passes for a generated spec (1.826375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.08125ms)
✔ validateChange --ready requires verification evidence (1.781ms)
✔ validateChange --ready passes after verification evidence exists (50.354333ms)
✔ runCli spec and validate print spec gate output (2.284791ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (203.202541ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (81.136542ms)
✔ runCli diff prints review-oriented Git and change status (82.583375ms)
✔ verifyChange runs fast checks by default and writes evidence (53.736375ms)
✔ verifyChange --full includes full-only checks (102.66975ms)
✔ completeChange blocks until verification evidence exists (2.373125ms)
✔ completeChange writes done report after verification evidence exists (74.507958ms)
✔ completeChange includes changed files in done report when Git is available (91.235333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (134.064625ms)
✔ runCli report prints the report path (132.273333ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (211.464833ms)
✔ runCli release prints release handoff path (204.363625ms)
ℹ tests 64
ℹ suites 0
ℹ pass 64
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 4189.258208
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.49575ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.846875ms)
✔ startChange writes a richer OpenSpec proposal template (1.958291ms)
✔ runCli dispatches init, start, and status commands (2.001416ms)
✔ runCli supports help and version for an installable CLI (0.203833ms)
✔ runCli skill path prints source and default install target (0.234208ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.446375ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.5095ms)
✔ runSelfTest summarizes command health using an injectable runner (0.283333ms)
✔ runCli examples and self-test print summary output (1.258959ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.451375ms)
✔ runCli desktop prints generated desktop app path (1.146125ms)
✔ package is ready for TypeScript core and npm publishing (1.20875ms)
✔ TypeScript adapters describe ShipSpec integration points (0.467ms)
✔ runCli adapters lists integration points (0.252667ms)
✔ intake creates a ShipSpec request intake record (1.333167ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.904958ms)
✔ room creates role files for the active ShipSpec change (2.666417ms)
✔ audit reports ShipSpec delivery trail readiness (4.504ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.855083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (279.046833ms)
✔ learnFromChange stores governed lessons and project patterns (71.684ms)
✔ runCli reflect and learn expose self-improving loop commands (134.760292ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (120.711625ms)
✔ runLoop learns when verification and reflection are ready (395.088208ms)
✔ runCli loop exposes the one-pass self-improvement loop (121.941375ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (184.025958ms)
✔ runCli memory prints memory summary and supports json output (67.688292ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (72.958ms)
✔ runCli reason prints reasoning path and supports json output (3.524875ms)
✔ generateUiDashboard writes a single-page pixel dashboard (271.651459ms)
✔ generateUiDashboard shows committed files when working tree is clean (335.131709ms)
✔ generateUiDashboard shows ShipSpec audit trail (70.423583ms)
✔ generateUiDashboard shows self-improving loop state (186.042916ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.268333ms)
✔ runCli ui prints generated dashboard path (68.542541ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.18575ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.188084ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.12775ms)
✔ doctorWorkspace reports repo readiness checks (29.294083ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.575708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.443583ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.010167ms)
✔ runCli detect and configure print project detection output (1.784042ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.688959ms)
✔ runCli ci prints generated GitHub Actions path (2.291209ms)
✔ getSpecStatus reports active change files and required proposal sections (1.868167ms)
✔ validateChange passes for a generated spec (1.675208ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.85225ms)
✔ validateChange --ready requires verification evidence (1.650167ms)
✔ validateChange --ready passes after verification evidence exists (53.997708ms)
✔ runCli spec and validate print spec gate output (2.44975ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (207.400292ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (83.659458ms)
✔ runCli diff prints review-oriented Git and change status (84.0115ms)
✔ verifyChange runs fast checks by default and writes evidence (52.253541ms)
✔ verifyChange --full includes full-only checks (102.618583ms)
✔ completeChange blocks until verification evidence exists (2.396667ms)
✔ completeChange writes done report after verification evidence exists (77.101667ms)
✔ completeChange includes changed files in done report when Git is available (105.88825ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (136.563208ms)
✔ runCli report prints the report path (136.509917ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (203.606208ms)
✔ runCli release prints release handoff path (182.228ms)
ℹ tests 64
ℹ suites 0
ℹ pass 64
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3998.069292
```

