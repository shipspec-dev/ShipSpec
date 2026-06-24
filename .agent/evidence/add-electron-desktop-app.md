# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T11:09:37.962Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.2735ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.335958ms)
✔ startChange writes a richer OpenSpec proposal template (2.3145ms)
✔ runCli dispatches init, start, and status commands (2.192583ms)
✔ runCli supports help and version for an installable CLI (0.218916ms)
✔ runCli skill path prints source and default install target (0.246375ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.718375ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.565333ms)
✔ runSelfTest summarizes command health using an injectable runner (0.4405ms)
✔ runCli examples and self-test print summary output (1.682833ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.223333ms)
✔ runCli desktop prints generated desktop app path (1.068209ms)
✔ package is ready for TypeScript core and npm publishing (0.333ms)
✔ TypeScript adapters describe ShipSpec integration points (1.051959ms)
✔ runCli adapters lists integration points (0.163666ms)
✔ intake creates a ShipSpec request intake record (1.610584ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.74125ms)
✔ room creates role files for the active ShipSpec change (2.959ms)
✔ audit reports ShipSpec delivery trail readiness (4.834125ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.362584ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.070916ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (474.747292ms)
✔ learnFromChange stores governed lessons and project patterns (96.198083ms)
✔ runCli reflect and learn expose self-improving loop commands (192.420625ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (197.972208ms)
✔ runLoop learns when verification and reflection are ready (476.51875ms)
✔ runCli loop exposes the one-pass self-improvement loop (155.746625ms)
✔ runOperation orchestrates safe delivery control loop (259.192041ms)
✔ runCli operate exposes safe operator command with json output (474.333042ms)
✔ recordDecision stores human decisions for the active change (3.079083ms)
✔ runCli decision records decisions and validates input (3.138209ms)
✔ generateReview writes a decision-aware review checklist (184.518791ms)
✔ runCli review exposes decision-aware review checklist (240.495875ms)
✔ getNextRecommendation guides users with no active change (1.755541ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.617667ms)
✔ runCli next prints recommendation and supports json output (4.055334ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (237.177666ms)
✔ generatePlanPrompt includes recorded human decisions (3.980084ms)
✔ runCli prompt prints Plan mode prompt and supports json output (5.44875ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (242.376875ms)
✔ runCli memory prints memory summary and supports json output (88.014042ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (92.912875ms)
✔ runCli reason prints reasoning path and supports json output (4.651084ms)
✔ generateUiDashboard writes a single-page pixel dashboard (361.979625ms)
✔ generateUiDashboard shows committed files when working tree is clean (439.487709ms)
✔ generateUiDashboard shows ShipSpec audit trail (94.301ms)
✔ generateUiDashboard shows self-improving loop state (259.267167ms)
✔ generateUiDashboard shows adaptive reasoning state (103.226041ms)
✔ generateUiDashboard shows operator state (342.268917ms)
✔ generateUiDashboard shows human decisions and review state (243.320083ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (6.636083ms)
✔ runCli ui prints generated dashboard path (86.08625ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (4.120292ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (8.251459ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.389042ms)
✔ doctorWorkspace reports repo readiness checks (33.915667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.837ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.682208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.173916ms)
✔ runCli detect and configure print project detection output (2.212541ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.489333ms)
✔ runCli ci prints generated GitHub Actions path (1.974959ms)
✔ getSpecStatus reports active change files and required proposal sections (2.006333ms)
✔ validateChange passes for a generated spec (2.05025ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.18125ms)
✔ validateChange --ready requires verification evidence (2.382917ms)
✔ validateChange --ready passes after verification evidence exists (61.357833ms)
✔ runCli spec and validate print spec gate output (3.108542ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (245.975667ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (101.575958ms)
✔ runCli diff prints review-oriented Git and change status (104.45275ms)
✔ verifyChange runs fast checks by default and writes evidence (62.181084ms)
✔ verifyChange --full includes full-only checks (116.539458ms)
✔ completeChange blocks until verification evidence exists (2.97075ms)
✔ completeChange writes done report after verification evidence exists (85.823084ms)
✔ completeChange includes changed files in done report when Git is available (183.343333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (157.509209ms)
✔ runCli report prints the report path (156.70425ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.487667ms)
✔ runCli release prints release handoff path (213.557083ms)
ℹ tests 80
ℹ suites 0
ℹ pass 80
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7356.075417
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.480542ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.488667ms)
✔ startChange writes a richer OpenSpec proposal template (2.410958ms)
✔ runCli dispatches init, start, and status commands (2.75425ms)
✔ runCli supports help and version for an installable CLI (0.256792ms)
✔ runCli skill path prints source and default install target (0.268125ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.662292ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.110708ms)
✔ runSelfTest summarizes command health using an injectable runner (0.296708ms)
✔ runCli examples and self-test print summary output (1.698708ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (3.239584ms)
✔ runCli desktop prints generated desktop app path (1.453333ms)
✔ package is ready for TypeScript core and npm publishing (0.400875ms)
✔ TypeScript adapters describe ShipSpec integration points (0.449958ms)
✔ runCli adapters lists integration points (0.248417ms)
✔ intake creates a ShipSpec request intake record (1.524875ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.838041ms)
✔ room creates role files for the active ShipSpec change (4.541834ms)
✔ audit reports ShipSpec delivery trail readiness (5.379833ms)
✔ deliver prepares intake, spec, contract, room, and validation (6.443667ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (11.292334ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (453.384584ms)
✔ learnFromChange stores governed lessons and project patterns (80.070958ms)
✔ runCli reflect and learn expose self-improving loop commands (180.217208ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (215.475167ms)
✔ runLoop learns when verification and reflection are ready (512.32ms)
✔ runCli loop exposes the one-pass self-improvement loop (126.79075ms)
✔ runOperation orchestrates safe delivery control loop (200.942208ms)
✔ runCli operate exposes safe operator command with json output (459.550916ms)
✔ recordDecision stores human decisions for the active change (3.081209ms)
✔ runCli decision records decisions and validates input (2.300625ms)
✔ generateReview writes a decision-aware review checklist (153.931417ms)
✔ runCli review exposes decision-aware review checklist (146.820875ms)
✔ getNextRecommendation guides users with no active change (1.914542ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.36325ms)
✔ runCli next prints recommendation and supports json output (3.103709ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (201.549834ms)
✔ generatePlanPrompt includes recorded human decisions (7.219459ms)
✔ runCli prompt prints Plan mode prompt and supports json output (8.982ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (193.657041ms)
✔ runCli memory prints memory summary and supports json output (72.53575ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (72.733333ms)
✔ runCli reason prints reasoning path and supports json output (3.798667ms)
✔ generateUiDashboard writes a single-page pixel dashboard (348.717667ms)
✔ generateUiDashboard shows committed files when working tree is clean (750.867166ms)
✔ generateUiDashboard shows ShipSpec audit trail (128.844667ms)
✔ generateUiDashboard shows self-improving loop state (343.8785ms)
✔ generateUiDashboard shows adaptive reasoning state (105.369708ms)
✔ generateUiDashboard shows operator state (335.681583ms)
✔ generateUiDashboard shows human decisions and review state (230.70925ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.60225ms)
✔ runCli ui prints generated dashboard path (80.155792ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.645ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.886792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.833542ms)
✔ doctorWorkspace reports repo readiness checks (33.797125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.555208ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.421583ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.689708ms)
✔ runCli detect and configure print project detection output (1.875542ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.786958ms)
✔ runCli ci prints generated GitHub Actions path (1.496834ms)
✔ getSpecStatus reports active change files and required proposal sections (1.985833ms)
✔ validateChange passes for a generated spec (2.160041ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.13275ms)
✔ validateChange --ready requires verification evidence (1.909ms)
✔ validateChange --ready passes after verification evidence exists (58.738209ms)
✔ runCli spec and validate print spec gate output (2.60425ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (336.29975ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (101.891542ms)
✔ runCli diff prints review-oriented Git and change status (94.054584ms)
✔ verifyChange runs fast checks by default and writes evidence (57.819333ms)
✔ verifyChange --full includes full-only checks (113.781333ms)
✔ completeChange blocks until verification evidence exists (2.752584ms)
✔ completeChange writes done report after verification evidence exists (80.814833ms)
✔ completeChange includes changed files in done report when Git is available (100.355583ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (140.0735ms)
✔ runCli report prints the report path (142.582041ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (224.914333ms)
✔ runCli release prints release handoff path (199.820459ms)
ℹ tests 80
ℹ suites 0
ℹ pass 80
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7330.965542
```

