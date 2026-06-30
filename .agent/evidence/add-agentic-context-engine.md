# Add agentic context engine Verification Evidence

Mode: full
Generated: 2026-06-30T02:51:50.358Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.813625ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.137125ms)
✔ startChange writes a richer OpenSpec proposal template (2.292292ms)
✔ runCli dispatches init, start, and status commands (2.671417ms)
✔ runCli quickstart prepares the low-ceremony project path (97.91075ms)
✔ runCli quickstart --light avoids agent ceremony (88.069ms)
✔ runMission prepares an AGI-style mission for a new request (500.258167ms)
✔ runMission does not suggest generated setup files as likely files (531.155458ms)
✔ runMission continues an active change and prepares review when evidence passes (618.878917ms)
✔ runCli with no args asks for a mission when none exists (16.366084ms)
✔ runCli with no args runs autopilot for an active mission (676.8885ms)
✔ runCli routes plain text to Mission Autopilot (492.430167ms)
✔ runCli share aliases pack (83.425291ms)
✔ runCli ask aliases share (81.351542ms)
✔ runCli fix aliases light quickstart (89.711708ms)
✔ runCli ship runs ready verification, validation, and report (215.952917ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (242.672209ms)
✔ runCli supports help and version for an installable CLI (0.310041ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.7815ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.887083ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.3795ms)
✔ runCli supports the AGI-style run command (491.688041ms)
✔ runCli skill path prints source and default install target (0.346292ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.042792ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.774542ms)
✔ runSelfTest summarizes command health using an injectable runner (0.291542ms)
✔ runCli examples and self-test print summary output (1.39425ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.390542ms)
✔ runCli desktop prints generated desktop app path (3.592042ms)
✔ package is ready for TypeScript core and npm publishing (0.420417ms)
✔ TypeScript adapters describe ShipSpec integration points (1.333291ms)
✔ runCli adapters lists integration points (0.18975ms)
✔ intake creates a ShipSpec request intake record (1.378375ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.083166ms)
✔ room creates role files for the active ShipSpec change (2.84975ms)
✔ audit reports ShipSpec delivery trail readiness (3.750375ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.355625ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.205333ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (434.803625ms)
✔ learnFromChange stores governed lessons and project patterns (159.951333ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (514.40575ms)
✔ runCli reflect and learn expose self-improving loop commands (237.412916ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (142.184542ms)
✔ runLoop learns when verification and reflection are ready (543.936083ms)
✔ runCli loop exposes the one-pass self-improvement loop (142.287375ms)
✔ runOperation orchestrates safe delivery control loop (226.575666ms)
✔ runCli operate exposes safe operator command with json output (449.318333ms)
✔ runCli autopilot asks for a mission when none is active (15.595791ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (667.035167ms)
✔ runCli autopilot ignores generated setup files before implementation (709.2035ms)
✔ runCli autopilot includes smart memory when routing to AI (1107.5175ms)
✔ runCli autopilot guides changed code to ship verification (761.14025ms)
✔ runCli autopilot reports review-ready missions (408.178791ms)
✔ recordDecision stores human decisions for the active change (3.603542ms)
✔ runCli decision records decisions and validates input (3.00775ms)
✔ generateReview writes a decision-aware review checklist (176.331792ms)
✔ runCli review exposes decision-aware review checklist (182.969958ms)
✔ getNextRecommendation guides users with no active change (2.475125ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.770958ms)
✔ runCli next prints recommendation and supports json output (4.555916ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (250.43525ms)
✔ generatePlanPrompt includes recorded human decisions (3.047708ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.26475ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (682.927167ms)
✔ runCli codex prints no-copy handoff and appears in help (626.0555ms)
✔ generateContextPack writes a portable AI handoff pack (178.855458ms)
✔ generateAgenticContext writes local retrieval context for the active change (117.695542ms)
✔ runCli context supports json output (84.930167ms)
✔ generateContextPack flags high-risk auth changes without full proof (111.689583ms)
✔ runCli pack writes and prints the context pack path (82.349083ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (324.986959ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (400.319875ms)
✔ generateCodexHandoff includes smart memory for the next feature (998.882333ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (155.104833ms)
✔ runCli reason prints reasoning path and supports json output (3.553209ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (325.923292ms)
✔ generateUiDashboard keeps the first screen compact (108.311625ms)
✔ generateUiDashboard keeps progress out of the first viewport (134.668167ms)
✔ generateUiDashboard moves full likely files into advanced details (166.693416ms)
✔ generateUiDashboard uses short likely-file labels above the fold (121.674042ms)
✔ generateUiDashboard shows committed files when working tree is clean (431.556041ms)
✔ generateUiDashboard shows ShipSpec audit trail (83.912542ms)
✔ generateUiDashboard shows self-improving loop state (263.619958ms)
✔ generateUiDashboard shows adaptive reasoning state (109.392875ms)
✔ generateUiDashboard shows operator state (307.423166ms)
✔ generateUiDashboard shows human decisions and review state (225.278333ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.684958ms)
✔ runCli ui prints generated dashboard path (84.745125ms)
✔ runCli ui --open opens the generated dashboard (83.826ms)
✔ generateAppDashboard writes a richer Mission Control app shell (102.365292ms)
✔ generateAppDashboard makes the mission home a dense dashboard (100.902041ms)
✔ runCli app prints generated app path and supports open (77.331708ms)
✔ runCli run --open starts a mission and opens the dashboard (451.705541ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.150958ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (9.008792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.302458ms)
✔ doctorWorkspace reports repo readiness checks (33.209333ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.221666ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.704792ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (4.88775ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.747ms)
✔ runCli detect and configure print project detection output (2.264334ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.913875ms)
✔ runCli ci prints generated GitHub Actions path (1.70175ms)
✔ getSpecStatus reports active change files and required proposal sections (2.246916ms)
✔ validateChange passes for a generated spec (2.418542ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.201083ms)
✔ validateChange --ready requires verification evidence (2.470041ms)
✔ validateChange --ready passes after verification evidence exists (58.914875ms)
✔ runCli spec and validate print spec gate output (2.568583ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (301.020666ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (99.61325ms)
✔ runCli diff prints review-oriented Git and change status (97.60925ms)
✔ verifyChange runs fast checks by default and writes evidence (59.239708ms)
✔ verifyChange --full includes full-only checks (114.448583ms)
✔ completeChange blocks until verification evidence exists (2.385917ms)
✔ completeChange writes done report after verification evidence exists (85.251167ms)
✔ completeChange includes changed files in done report when Git is available (108.098833ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (157.675583ms)
✔ runCli report prints the report path (160.616125ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (235.254042ms)
✔ runCli release prints release handoff path (239.451833ms)
ℹ tests 122
ℹ suites 0
ℹ pass 122
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 20334.595083
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.821709ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.478292ms)
✔ startChange writes a richer OpenSpec proposal template (2.059875ms)
✔ runCli dispatches init, start, and status commands (2.395583ms)
✔ runCli quickstart prepares the low-ceremony project path (90.63975ms)
✔ runCli quickstart --light avoids agent ceremony (82.393416ms)
✔ runMission prepares an AGI-style mission for a new request (464.029791ms)
✔ runMission does not suggest generated setup files as likely files (500.805583ms)
✔ runMission continues an active change and prepares review when evidence passes (674.813792ms)
✔ runCli with no args asks for a mission when none exists (15.785833ms)
✔ runCli with no args runs autopilot for an active mission (644.676292ms)
✔ runCli routes plain text to Mission Autopilot (475.715042ms)
✔ runCli share aliases pack (79.2295ms)
✔ runCli ask aliases share (78.282292ms)
✔ runCli fix aliases light quickstart (87.29125ms)
✔ runCli ship runs ready verification, validation, and report (223.022ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (237.914167ms)
✔ runCli supports help and version for an installable CLI (0.289708ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.137084ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.504292ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.583875ms)
✔ runCli supports the AGI-style run command (475.428958ms)
✔ runCli skill path prints source and default install target (0.345542ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.749875ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.44275ms)
✔ runSelfTest summarizes command health using an injectable runner (0.251625ms)
✔ runCli examples and self-test print summary output (1.353792ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.441459ms)
✔ runCli desktop prints generated desktop app path (3.794875ms)
✔ package is ready for TypeScript core and npm publishing (0.397542ms)
✔ TypeScript adapters describe ShipSpec integration points (0.464708ms)
✔ runCli adapters lists integration points (0.22575ms)
✔ intake creates a ShipSpec request intake record (1.355583ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.1805ms)
✔ room creates role files for the active ShipSpec change (2.993625ms)
✔ audit reports ShipSpec delivery trail readiness (28.633375ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.535625ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.443583ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (403.840666ms)
✔ learnFromChange stores governed lessons and project patterns (167.565458ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (724.297209ms)
✔ runCli reflect and learn expose self-improving loop commands (277.195625ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (162.309167ms)
✔ runLoop learns when verification and reflection are ready (699.673042ms)
✔ runCli loop exposes the one-pass self-improvement loop (163.241375ms)
✔ runOperation orchestrates safe delivery control loop (256.219375ms)
✔ runCli operate exposes safe operator command with json output (471.283792ms)
✔ runCli autopilot asks for a mission when none is active (15.872334ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (696.030084ms)
✔ runCli autopilot ignores generated setup files before implementation (749.06975ms)
✔ runCli autopilot includes smart memory when routing to AI (1162.47925ms)
✔ runCli autopilot guides changed code to ship verification (756.234ms)
✔ runCli autopilot reports review-ready missions (326.951ms)
✔ recordDecision stores human decisions for the active change (2.869083ms)
✔ runCli decision records decisions and validates input (2.680791ms)
✔ generateReview writes a decision-aware review checklist (167.729416ms)
✔ runCli review exposes decision-aware review checklist (163.58375ms)
✔ getNextRecommendation guides users with no active change (1.715625ms)
✔ getNextRecommendation guides active changes through missing artifacts (7.068042ms)
✔ runCli next prints recommendation and supports json output (4.459709ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (235.791083ms)
✔ generatePlanPrompt includes recorded human decisions (2.990416ms)
✔ runCli prompt prints Plan mode prompt and supports json output (11.60425ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (621.676916ms)
✔ runCli codex prints no-copy handoff and appears in help (595.992542ms)
✔ generateContextPack writes a portable AI handoff pack (192.647167ms)
✔ generateAgenticContext writes local retrieval context for the active change (118.275875ms)
✔ runCli context supports json output (85.8155ms)
✔ generateContextPack flags high-risk auth changes without full proof (125.439833ms)
✔ runCli pack writes and prints the context pack path (83.228333ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (304.673417ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (419.278542ms)
✔ generateCodexHandoff includes smart memory for the next feature (1015.230584ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (163.4035ms)
✔ runCli reason prints reasoning path and supports json output (4.171625ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (346.4125ms)
✔ generateUiDashboard keeps the first screen compact (110.354583ms)
✔ generateUiDashboard keeps progress out of the first viewport (107.838208ms)
✔ generateUiDashboard moves full likely files into advanced details (107.52575ms)
✔ generateUiDashboard uses short likely-file labels above the fold (106.664625ms)
✔ generateUiDashboard shows committed files when working tree is clean (407.764792ms)
✔ generateUiDashboard shows ShipSpec audit trail (86.198083ms)
✔ generateUiDashboard shows self-improving loop state (240.031667ms)
✔ generateUiDashboard shows adaptive reasoning state (89.103959ms)
✔ generateUiDashboard shows operator state (316.844667ms)
✔ generateUiDashboard shows human decisions and review state (239.974708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.518584ms)
✔ runCli ui prints generated dashboard path (86.741542ms)
✔ runCli ui --open opens the generated dashboard (94.538125ms)
✔ generateAppDashboard writes a richer Mission Control app shell (601.663375ms)
✔ generateAppDashboard makes the mission home a dense dashboard (113.42525ms)
✔ runCli app prints generated app path and supports open (84.751ms)
✔ runCli run --open starts a mission and opens the dashboard (501.082375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.464375ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.003958ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.668709ms)
✔ doctorWorkspace reports repo readiness checks (34.556667ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.280292ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.632208ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.449792ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.893958ms)
✔ runCli detect and configure print project detection output (5.912709ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.680166ms)
✔ runCli ci prints generated GitHub Actions path (1.569666ms)
✔ getSpecStatus reports active change files and required proposal sections (2.189583ms)
✔ validateChange passes for a generated spec (1.755625ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.40975ms)
✔ validateChange --ready requires verification evidence (2.408583ms)
✔ validateChange --ready passes after verification evidence exists (66.901667ms)
✔ runCli spec and validate print spec gate output (3.19125ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (1047.77925ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (103.72675ms)
✔ runCli diff prints review-oriented Git and change status (727.582375ms)
✔ verifyChange runs fast checks by default and writes evidence (74.802625ms)
✔ verifyChange --full includes full-only checks (167.851583ms)
✔ completeChange blocks until verification evidence exists (3.2075ms)
✔ completeChange writes done report after verification evidence exists (98.797292ms)
✔ completeChange includes changed files in done report when Git is available (612.674375ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (170.395416ms)
✔ runCli report prints the report path (757.706083ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (254.0735ms)
✔ runCli release prints release handoff path (315.510916ms)
ℹ tests 122
ℹ suites 0
ℹ pass 122
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 23836.9605
```

