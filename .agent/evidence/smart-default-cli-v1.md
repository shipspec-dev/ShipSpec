# Smart Default CLI v1 Verification Evidence

Mode: full
Generated: 2026-06-29T05:25:53.671Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.747208ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.218208ms)
✔ startChange writes a richer OpenSpec proposal template (2.237291ms)
✔ runCli dispatches init, start, and status commands (2.949833ms)
✔ runCli quickstart prepares the low-ceremony project path (100.305208ms)
✔ runCli quickstart --light avoids agent ceremony (85.156292ms)
✔ runMission prepares an AGI-style mission for a new request (382.697125ms)
✔ runMission continues an active change and prepares review when evidence passes (508.042833ms)
✔ runCli with no args asks for a mission when none exists (1.30025ms)
✔ runCli with no args runs autopilot for an active mission (507.12825ms)
✔ runCli routes plain text to Mission Autopilot (383.50275ms)
✔ runCli share aliases pack (72.828417ms)
✔ runCli ask aliases share (73.482709ms)
✔ runCli fix aliases light quickstart (76.645542ms)
✔ runCli ship runs ready verification, validation, and report (201.676125ms)
✔ runCli supports help and version for an installable CLI (0.265541ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.04625ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.626667ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.506167ms)
✔ runCli supports the AGI-style run command (367.114292ms)
✔ runCli skill path prints source and default install target (0.524334ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.816792ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.819791ms)
✔ runSelfTest summarizes command health using an injectable runner (0.38825ms)
✔ runCli examples and self-test print summary output (1.213291ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.319333ms)
✔ runCli desktop prints generated desktop app path (1.067959ms)
✔ package is ready for TypeScript core and npm publishing (0.313833ms)
✔ TypeScript adapters describe ShipSpec integration points (1.090958ms)
✔ runCli adapters lists integration points (0.197333ms)
✔ intake creates a ShipSpec request intake record (1.390791ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.9465ms)
✔ room creates role files for the active ShipSpec change (2.566459ms)
✔ audit reports ShipSpec delivery trail readiness (3.213458ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.164834ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.894333ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (409.646042ms)
✔ learnFromChange stores governed lessons and project patterns (145.523458ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (811.125208ms)
✔ runCli reflect and learn expose self-improving loop commands (235.423542ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (134.525417ms)
✔ runLoop learns when verification and reflection are ready (501.676875ms)
✔ runCli loop exposes the one-pass self-improvement loop (127.258209ms)
✔ runOperation orchestrates safe delivery control loop (205.945792ms)
✔ runCli operate exposes safe operator command with json output (421.004583ms)
✔ runCli autopilot asks for a mission when none is active (1.203ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (507.1215ms)
✔ runCli autopilot guides changed code to ship verification (548.711709ms)
✔ runCli autopilot reports review-ready missions (268.5385ms)
✔ recordDecision stores human decisions for the active change (3.167667ms)
✔ runCli decision records decisions and validates input (4.227666ms)
✔ generateReview writes a decision-aware review checklist (145.113375ms)
✔ runCli review exposes decision-aware review checklist (143.977375ms)
✔ getNextRecommendation guides users with no active change (1.886084ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.315541ms)
✔ runCli next prints recommendation and supports json output (4.786125ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (201.132667ms)
✔ generatePlanPrompt includes recorded human decisions (3.021042ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.588ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (434.674625ms)
✔ runCli codex prints no-copy handoff and appears in help (436.518834ms)
✔ generateContextPack writes a portable AI handoff pack (144.515458ms)
✔ generateContextPack flags high-risk auth changes without full proof (92.542417ms)
✔ runCli pack writes and prints the context pack path (72.771167ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (267.745334ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (358.557875ms)
✔ generateCodexHandoff includes smart memory for the next feature (803.8555ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (237.618708ms)
✔ runCli reason prints reasoning path and supports json output (5.445083ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (350.696875ms)
✔ generateUiDashboard shows committed files when working tree is clean (388.221042ms)
✔ generateUiDashboard shows ShipSpec audit trail (82.493333ms)
✔ generateUiDashboard shows self-improving loop state (213.993125ms)
✔ generateUiDashboard shows adaptive reasoning state (80.854666ms)
✔ generateUiDashboard shows operator state (277.509834ms)
✔ generateUiDashboard shows human decisions and review state (197.778458ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.607834ms)
✔ runCli ui prints generated dashboard path (74.185792ms)
✔ runCli ui --open opens the generated dashboard (74.791625ms)
✔ runCli run --open starts a mission and opens the dashboard (369.068625ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.674916ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.548583ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.379917ms)
✔ doctorWorkspace reports repo readiness checks (29.954417ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.656667ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.794292ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.079208ms)
✔ runCli detect and configure print project detection output (1.886625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.75075ms)
✔ runCli ci prints generated GitHub Actions path (1.805917ms)
✔ getSpecStatus reports active change files and required proposal sections (2.032208ms)
✔ validateChange passes for a generated spec (2.027333ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.046833ms)
✔ validateChange --ready requires verification evidence (1.721084ms)
✔ validateChange --ready passes after verification evidence exists (56.031792ms)
✔ runCli spec and validate print spec gate output (2.621708ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (218.680833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (89.385917ms)
✔ runCli diff prints review-oriented Git and change status (89.2ms)
✔ verifyChange runs fast checks by default and writes evidence (54.961042ms)
✔ verifyChange --full includes full-only checks (107.768625ms)
✔ completeChange blocks until verification evidence exists (2.84425ms)
✔ completeChange writes done report after verification evidence exists (80.305083ms)
✔ completeChange includes changed files in done report when Git is available (97.149708ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (141.622125ms)
✔ runCli report prints the report path (149.525917ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (311.547625ms)
✔ runCli release prints release handoff path (346.837708ms)
ℹ tests 108
ℹ suites 0
ℹ pass 108
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14537.432583
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.665292ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.297667ms)
✔ startChange writes a richer OpenSpec proposal template (1.965708ms)
✔ runCli dispatches init, start, and status commands (2.212542ms)
✔ runCli quickstart prepares the low-ceremony project path (85.15275ms)
✔ runCli quickstart --light avoids agent ceremony (79.247625ms)
✔ runMission prepares an AGI-style mission for a new request (367.42025ms)
✔ runMission continues an active change and prepares review when evidence passes (474.742167ms)
✔ runCli with no args asks for a mission when none exists (1.821ms)
✔ runCli with no args runs autopilot for an active mission (498.710791ms)
✔ runCli routes plain text to Mission Autopilot (361.635041ms)
✔ runCli share aliases pack (72.411667ms)
✔ runCli ask aliases share (72.709958ms)
✔ runCli fix aliases light quickstart (76.253958ms)
✔ runCli ship runs ready verification, validation, and report (193.35175ms)
✔ runCli supports help and version for an installable CLI (0.275958ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.254375ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.2985ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.188958ms)
✔ runCli supports the AGI-style run command (361.291625ms)
✔ runCli skill path prints source and default install target (0.642125ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.673042ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.463167ms)
✔ runSelfTest summarizes command health using an injectable runner (0.204ms)
✔ runCli examples and self-test print summary output (1.432875ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.258ms)
✔ runCli desktop prints generated desktop app path (0.948375ms)
✔ package is ready for TypeScript core and npm publishing (0.282458ms)
✔ TypeScript adapters describe ShipSpec integration points (0.445042ms)
✔ runCli adapters lists integration points (0.160708ms)
✔ intake creates a ShipSpec request intake record (1.274417ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.922959ms)
✔ room creates role files for the active ShipSpec change (4.065416ms)
✔ audit reports ShipSpec delivery trail readiness (3.294292ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.306ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.8295ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (372.481042ms)
✔ learnFromChange stores governed lessons and project patterns (139.29525ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (442.568125ms)
✔ runCli reflect and learn expose self-improving loop commands (206.106709ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (127.223208ms)
✔ runLoop learns when verification and reflection are ready (486.904125ms)
✔ runCli loop exposes the one-pass self-improvement loop (126.554916ms)
✔ runOperation orchestrates safe delivery control loop (200.796834ms)
✔ runCli operate exposes safe operator command with json output (398.545167ms)
✔ runCli autopilot asks for a mission when none is active (1.267959ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (500.529958ms)
✔ runCli autopilot guides changed code to ship verification (537.501ms)
✔ runCli autopilot reports review-ready missions (261.968542ms)
✔ recordDecision stores human decisions for the active change (2.473166ms)
✔ runCli decision records decisions and validates input (2.206959ms)
✔ generateReview writes a decision-aware review checklist (143.960959ms)
✔ runCli review exposes decision-aware review checklist (138.09175ms)
✔ getNextRecommendation guides users with no active change (2.016375ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.000083ms)
✔ runCli next prints recommendation and supports json output (3.253333ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (199.87275ms)
✔ generatePlanPrompt includes recorded human decisions (3.307875ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.43875ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (428.695583ms)
✔ runCli codex prints no-copy handoff and appears in help (422.028875ms)
✔ generateContextPack writes a portable AI handoff pack (147.755334ms)
✔ generateContextPack flags high-risk auth changes without full proof (92.483583ms)
✔ runCli pack writes and prints the context pack path (74.232875ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (264.946417ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (362.792875ms)
✔ generateCodexHandoff includes smart memory for the next feature (795.2455ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (144.07175ms)
✔ runCli reason prints reasoning path and supports json output (3.584208ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (294.483417ms)
✔ generateUiDashboard shows committed files when working tree is clean (465.78825ms)
✔ generateUiDashboard shows ShipSpec audit trail (106.275875ms)
✔ generateUiDashboard shows self-improving loop state (216.6595ms)
✔ generateUiDashboard shows adaptive reasoning state (79.751ms)
✔ generateUiDashboard shows operator state (272.210459ms)
✔ generateUiDashboard shows human decisions and review state (200.208875ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.608291ms)
✔ runCli ui prints generated dashboard path (77.354917ms)
✔ runCli ui --open opens the generated dashboard (102.179792ms)
✔ runCli run --open starts a mission and opens the dashboard (679.888084ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.933458ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.60225ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.497625ms)
✔ doctorWorkspace reports repo readiness checks (32.121667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.574458ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.446208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.889666ms)
✔ runCli detect and configure print project detection output (1.613833ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.524791ms)
✔ runCli ci prints generated GitHub Actions path (1.441ms)
✔ getSpecStatus reports active change files and required proposal sections (1.82875ms)
✔ validateChange passes for a generated spec (1.897959ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.944041ms)
✔ validateChange --ready requires verification evidence (1.664042ms)
✔ validateChange --ready passes after verification evidence exists (61.045042ms)
✔ runCli spec and validate print spec gate output (2.959916ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (218.457625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (90.685792ms)
✔ runCli diff prints review-oriented Git and change status (89.764375ms)
✔ verifyChange runs fast checks by default and writes evidence (55.024292ms)
✔ verifyChange --full includes full-only checks (114.747875ms)
✔ completeChange blocks until verification evidence exists (2.540042ms)
✔ completeChange writes done report after verification evidence exists (81.253209ms)
✔ completeChange includes changed files in done report when Git is available (99.060625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (141.865792ms)
✔ runCli report prints the report path (140.780667ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (214.3515ms)
✔ runCli release prints release handoff path (191.934959ms)
ℹ tests 108
ℹ suites 0
ℹ pass 108
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13914.623834
```

