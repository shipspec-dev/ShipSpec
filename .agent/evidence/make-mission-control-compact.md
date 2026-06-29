# Make Mission Control Compact Verification Evidence

Mode: full
Generated: 2026-06-29T10:15:48.608Z

## Summary

Verified:
- lint passed
- unit passed
- typecheck passed
- e2e passed

Skipped:
- None

Risk:
- No verification risks detected from configured checks.

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.4475ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.798167ms)
✔ startChange writes a richer OpenSpec proposal template (1.899ms)
✔ runCli dispatches init, start, and status commands (2.141542ms)
✔ runCli quickstart prepares the low-ceremony project path (87.08125ms)
✔ runCli quickstart --light avoids agent ceremony (79.775042ms)
✔ runMission prepares an AGI-style mission for a new request (382.751667ms)
✔ runMission does not suggest generated setup files as likely files (369.27575ms)
✔ runMission continues an active change and prepares review when evidence passes (428.125083ms)
✔ runCli with no args asks for a mission when none exists (12.72325ms)
✔ runCli with no args runs autopilot for an active mission (459.103708ms)
✔ runCli routes plain text to Mission Autopilot (321.982959ms)
✔ runCli share aliases pack (67.611792ms)
✔ runCli ask aliases share (64.047459ms)
✔ runCli fix aliases light quickstart (65.5105ms)
✔ runCli ship runs ready verification, validation, and report (173.739583ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (193.276583ms)
✔ runCli supports help and version for an installable CLI (0.286542ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (15.47625ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.191875ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.073208ms)
✔ runCli supports the AGI-style run command (322.239458ms)
✔ runCli skill path prints source and default install target (0.271583ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.726833ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.31925ms)
✔ runSelfTest summarizes command health using an injectable runner (0.239208ms)
✔ runCli examples and self-test print summary output (1.177709ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.243458ms)
✔ runCli desktop prints generated desktop app path (0.854667ms)
✔ package is ready for TypeScript core and npm publishing (0.2665ms)
✔ TypeScript adapters describe ShipSpec integration points (0.442917ms)
✔ runCli adapters lists integration points (0.142292ms)
✔ intake creates a ShipSpec request intake record (1.256625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.058875ms)
✔ room creates role files for the active ShipSpec change (3.88375ms)
✔ audit reports ShipSpec delivery trail readiness (3.491666ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.094833ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.833666ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (352.276333ms)
✔ learnFromChange stores governed lessons and project patterns (127.313083ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (395.092334ms)
✔ runCli reflect and learn expose self-improving loop commands (189.94725ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (112.889333ms)
✔ runLoop learns when verification and reflection are ready (429.034958ms)
✔ runCli loop exposes the one-pass self-improvement loop (113.045166ms)
✔ runOperation orchestrates safe delivery control loop (182.66175ms)
✔ runCli operate exposes safe operator command with json output (365.174167ms)
✔ runCli autopilot asks for a mission when none is active (12.811333ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (456.862083ms)
✔ runCli autopilot ignores generated setup files before implementation (483.79825ms)
✔ runCli autopilot includes smart memory when routing to AI (792.099541ms)
✔ runCli autopilot guides changed code to ship verification (500.846584ms)
✔ runCli autopilot reports review-ready missions (251.986333ms)
✔ recordDecision stores human decisions for the active change (2.263125ms)
✔ runCli decision records decisions and validates input (2.109583ms)
✔ generateReview writes a decision-aware review checklist (132.719375ms)
✔ runCli review exposes decision-aware review checklist (124.552333ms)
✔ getNextRecommendation guides users with no active change (1.561666ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.168125ms)
✔ runCli next prints recommendation and supports json output (3.29525ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (182.505791ms)
✔ generatePlanPrompt includes recorded human decisions (2.785708ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.569292ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (405.517375ms)
✔ runCli codex prints no-copy handoff and appears in help (371.734959ms)
✔ generateContextPack writes a portable AI handoff pack (141.743625ms)
✔ generateContextPack flags high-risk auth changes without full proof (94.881292ms)
✔ runCli pack writes and prints the context pack path (63.858459ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (237.396083ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (324.727375ms)
✔ generateCodexHandoff includes smart memory for the next feature (799.6545ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (124.750958ms)
✔ runCli reason prints reasoning path and supports json output (3.308917ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (263.05325ms)
✔ generateUiDashboard keeps the first screen compact (85.153833ms)
✔ generateUiDashboard moves full likely files into advanced details (82.62425ms)
✔ generateUiDashboard shows committed files when working tree is clean (424.892791ms)
✔ generateUiDashboard shows ShipSpec audit trail (89.083625ms)
✔ generateUiDashboard shows self-improving loop state (193.089ms)
✔ generateUiDashboard shows adaptive reasoning state (97.079334ms)
✔ generateUiDashboard shows operator state (275.438166ms)
✔ generateUiDashboard shows human decisions and review state (200.818917ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.394959ms)
✔ runCli ui prints generated dashboard path (69.295959ms)
✔ runCli ui --open opens the generated dashboard (69.213333ms)
✔ runCli run --open starts a mission and opens the dashboard (326.450333ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.750666ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.6995ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.558125ms)
✔ doctorWorkspace reports repo readiness checks (31.803167ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (12.262541ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.431542ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.41125ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.588458ms)
✔ runCli detect and configure print project detection output (1.614916ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.676334ms)
✔ runCli ci prints generated GitHub Actions path (1.435208ms)
✔ getSpecStatus reports active change files and required proposal sections (1.748958ms)
✔ validateChange passes for a generated spec (1.690584ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.956333ms)
✔ validateChange --ready requires verification evidence (1.598875ms)
✔ validateChange --ready passes after verification evidence exists (66.056875ms)
✔ runCli spec and validate print spec gate output (2.508959ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (245.77925ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (118.50975ms)
✔ runCli diff prints review-oriented Git and change status (159.185333ms)
✔ verifyChange runs fast checks by default and writes evidence (69.400125ms)
✔ verifyChange --full includes full-only checks (146.360708ms)
✔ completeChange blocks until verification evidence exists (2.252875ms)
✔ completeChange writes done report after verification evidence exists (81.331583ms)
✔ completeChange includes changed files in done report when Git is available (117.568458ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (139.8625ms)
✔ runCli report prints the report path (129.521125ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (195.934875ms)
✔ runCli release prints release handoff path (180.955625ms)
ℹ tests 115
ℹ suites 0
ℹ pass 115
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14883.090917
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.384292ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.989416ms)
✔ startChange writes a richer OpenSpec proposal template (1.923167ms)
✔ runCli dispatches init, start, and status commands (2.146209ms)
✔ runCli quickstart prepares the low-ceremony project path (78.324666ms)
✔ runCli quickstart --light avoids agent ceremony (70.867209ms)
✔ runMission prepares an AGI-style mission for a new request (347.714041ms)
✔ runMission does not suggest generated setup files as likely files (419.382458ms)
✔ runMission continues an active change and prepares review when evidence passes (486.580792ms)
✔ runCli with no args asks for a mission when none exists (12.4625ms)
✔ runCli with no args runs autopilot for an active mission (486.302375ms)
✔ runCli routes plain text to Mission Autopilot (331.439459ms)
✔ runCli share aliases pack (65.001958ms)
✔ runCli ask aliases share (67.069ms)
✔ runCli fix aliases light quickstart (70.77425ms)
✔ runCli ship runs ready verification, validation, and report (187.560541ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (195.387875ms)
✔ runCli supports help and version for an installable CLI (0.268833ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (15.9885ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.744041ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.249542ms)
✔ runCli supports the AGI-style run command (333.246166ms)
✔ runCli skill path prints source and default install target (0.276291ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.722042ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.326792ms)
✔ runSelfTest summarizes command health using an injectable runner (0.245083ms)
✔ runCli examples and self-test print summary output (1.228958ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.161875ms)
✔ runCli desktop prints generated desktop app path (0.86875ms)
✔ package is ready for TypeScript core and npm publishing (0.311541ms)
✔ TypeScript adapters describe ShipSpec integration points (0.382958ms)
✔ runCli adapters lists integration points (0.150958ms)
✔ intake creates a ShipSpec request intake record (1.288125ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.82025ms)
✔ room creates role files for the active ShipSpec change (2.579083ms)
✔ audit reports ShipSpec delivery trail readiness (3.756542ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.196292ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.067875ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (345.10625ms)
✔ learnFromChange stores governed lessons and project patterns (125.449542ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (393.808375ms)
✔ runCli reflect and learn expose self-improving loop commands (191.7985ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (138.0325ms)
✔ runLoop learns when verification and reflection are ready (546.910583ms)
✔ runCli loop exposes the one-pass self-improvement loop (124.448542ms)
✔ runOperation orchestrates safe delivery control loop (205.171041ms)
✔ runCli operate exposes safe operator command with json output (457.610125ms)
✔ runCli autopilot asks for a mission when none is active (13.001042ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (459.406375ms)
✔ runCli autopilot ignores generated setup files before implementation (497.322416ms)
✔ runCli autopilot includes smart memory when routing to AI (804.962291ms)
✔ runCli autopilot guides changed code to ship verification (491.075542ms)
✔ runCli autopilot reports review-ready missions (303.836834ms)
✔ recordDecision stores human decisions for the active change (2.572ms)
✔ runCli decision records decisions and validates input (2.304458ms)
✔ generateReview writes a decision-aware review checklist (138.412667ms)
✔ runCli review exposes decision-aware review checklist (125.987625ms)
✔ getNextRecommendation guides users with no active change (1.502708ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.493125ms)
✔ runCli next prints recommendation and supports json output (3.359084ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (185.618875ms)
✔ generatePlanPrompt includes recorded human decisions (2.967708ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.298334ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (384.310291ms)
✔ runCli codex prints no-copy handoff and appears in help (382.311792ms)
✔ generateContextPack writes a portable AI handoff pack (135.40325ms)
✔ generateContextPack flags high-risk auth changes without full proof (83.984708ms)
✔ runCli pack writes and prints the context pack path (67.220167ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (242.095584ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (319.624709ms)
✔ generateCodexHandoff includes smart memory for the next feature (722.454334ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (126.296459ms)
✔ runCli reason prints reasoning path and supports json output (3.572542ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (263.16175ms)
✔ generateUiDashboard keeps the first screen compact (83.204583ms)
✔ generateUiDashboard moves full likely files into advanced details (86.819208ms)
✔ generateUiDashboard shows committed files when working tree is clean (324.72725ms)
✔ generateUiDashboard shows ShipSpec audit trail (69.4245ms)
✔ generateUiDashboard shows self-improving loop state (178.648625ms)
✔ generateUiDashboard shows adaptive reasoning state (72.301958ms)
✔ generateUiDashboard shows operator state (251.662ms)
✔ generateUiDashboard shows human decisions and review state (179.735542ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.144458ms)
✔ runCli ui prints generated dashboard path (76.916084ms)
✔ runCli ui --open opens the generated dashboard (67.842292ms)
✔ runCli run --open starts a mission and opens the dashboard (334.322208ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.674709ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.578041ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.291875ms)
✔ doctorWorkspace reports repo readiness checks (29.111709ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (11.533291ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.510125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.401458ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.618709ms)
✔ runCli detect and configure print project detection output (1.682333ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.690833ms)
✔ runCli ci prints generated GitHub Actions path (1.336041ms)
✔ getSpecStatus reports active change files and required proposal sections (1.774917ms)
✔ validateChange passes for a generated spec (1.881958ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.914917ms)
✔ validateChange --ready requires verification evidence (1.639875ms)
✔ validateChange --ready passes after verification evidence exists (53.855625ms)
✔ runCli spec and validate print spec gate output (2.371083ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (201.862167ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (80.560291ms)
✔ runCli diff prints review-oriented Git and change status (81.130875ms)
✔ verifyChange runs fast checks by default and writes evidence (54.52425ms)
✔ verifyChange --full includes full-only checks (115.124209ms)
✔ completeChange blocks until verification evidence exists (1.999917ms)
✔ completeChange writes done report after verification evidence exists (78.527708ms)
✔ completeChange includes changed files in done report when Git is available (94.775125ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (145.620667ms)
✔ runCli report prints the report path (135.214917ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (224.587708ms)
✔ runCli release prints release handoff path (197.451833ms)
ℹ tests 115
ℹ suites 0
ℹ pass 115
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14873.981459
```

