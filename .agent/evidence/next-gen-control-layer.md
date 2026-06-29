# Next Gen Control Layer Verification Evidence

Mode: full
Generated: 2026-06-29T08:15:21.924Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.761667ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.876542ms)
✔ startChange writes a richer OpenSpec proposal template (2.109125ms)
✔ runCli dispatches init, start, and status commands (2.235375ms)
✔ runCli quickstart prepares the low-ceremony project path (85.601333ms)
✔ runCli quickstart --light avoids agent ceremony (76.438875ms)
✔ runMission prepares an AGI-style mission for a new request (359.724375ms)
✔ runMission continues an active change and prepares review when evidence passes (469.659708ms)
✔ runCli with no args asks for a mission when none exists (13.67325ms)
✔ runCli with no args runs autopilot for an active mission (496.441042ms)
✔ runCli routes plain text to Mission Autopilot (360.928167ms)
✔ runCli share aliases pack (71.286584ms)
✔ runCli ask aliases share (71.704291ms)
✔ runCli fix aliases light quickstart (86.67925ms)
✔ runCli ship runs ready verification, validation, and report (214.439458ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (239.610042ms)
✔ runCli supports help and version for an installable CLI (0.300666ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.277875ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (14.710792ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.413208ms)
✔ runCli supports the AGI-style run command (397.007459ms)
✔ runCli skill path prints source and default install target (0.277625ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.905125ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.301ms)
✔ runSelfTest summarizes command health using an injectable runner (0.236167ms)
✔ runCli examples and self-test print summary output (1.165291ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.381333ms)
✔ runCli desktop prints generated desktop app path (0.860542ms)
✔ package is ready for TypeScript core and npm publishing (0.287125ms)
✔ TypeScript adapters describe ShipSpec integration points (0.349625ms)
✔ runCli adapters lists integration points (0.340709ms)
✔ intake creates a ShipSpec request intake record (1.301708ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.05175ms)
✔ room creates role files for the active ShipSpec change (2.57725ms)
✔ audit reports ShipSpec delivery trail readiness (3.534958ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.252041ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.115792ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (434.454125ms)
✔ learnFromChange stores governed lessons and project patterns (147.801ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (433.007583ms)
✔ runCli reflect and learn expose self-improving loop commands (203.339334ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (121.329209ms)
✔ runLoop learns when verification and reflection are ready (475.674ms)
✔ runCli loop exposes the one-pass self-improvement loop (127.4165ms)
✔ runOperation orchestrates safe delivery control loop (194.495042ms)
✔ runCli operate exposes safe operator command with json output (395.001041ms)
✔ runCli autopilot asks for a mission when none is active (12.959583ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (495.905166ms)
✔ runCli autopilot includes smart memory when routing to AI (878.195583ms)
✔ runCli autopilot guides changed code to ship verification (527.074833ms)
✔ runCli autopilot reports review-ready missions (266.962667ms)
✔ recordDecision stores human decisions for the active change (3.094625ms)
✔ runCli decision records decisions and validates input (3.548459ms)
✔ generateReview writes a decision-aware review checklist (146.456125ms)
✔ runCli review exposes decision-aware review checklist (137.758208ms)
✔ getNextRecommendation guides users with no active change (1.714667ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.705375ms)
✔ runCli next prints recommendation and supports json output (3.258208ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (200.165333ms)
✔ generatePlanPrompt includes recorded human decisions (3.294208ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.2965ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (429.393292ms)
✔ runCli codex prints no-copy handoff and appears in help (434.976792ms)
✔ generateContextPack writes a portable AI handoff pack (144.717334ms)
✔ generateContextPack flags high-risk auth changes without full proof (93.027417ms)
✔ runCli pack writes and prints the context pack path (66.890167ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (266.096417ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (346.742708ms)
✔ generateCodexHandoff includes smart memory for the next feature (795.2455ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (138.225667ms)
✔ runCli reason prints reasoning path and supports json output (3.52325ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (287.258666ms)
✔ generateUiDashboard shows committed files when working tree is clean (387.049292ms)
✔ generateUiDashboard shows ShipSpec audit trail (74.003958ms)
✔ generateUiDashboard shows self-improving loop state (196.436042ms)
✔ generateUiDashboard shows adaptive reasoning state (75.026208ms)
✔ generateUiDashboard shows operator state (358.502667ms)
✔ generateUiDashboard shows human decisions and review state (212.258708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.575375ms)
✔ runCli ui prints generated dashboard path (81.313333ms)
✔ runCli ui --open opens the generated dashboard (78.913084ms)
✔ runCli run --open starts a mission and opens the dashboard (367.3925ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.01975ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.548167ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.331959ms)
✔ doctorWorkspace reports repo readiness checks (31.858459ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (13.1285ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.813541ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.465875ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.827958ms)
✔ runCli detect and configure print project detection output (1.819417ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.711666ms)
✔ runCli ci prints generated GitHub Actions path (1.431875ms)
✔ getSpecStatus reports active change files and required proposal sections (1.890792ms)
✔ validateChange passes for a generated spec (2.008792ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.939958ms)
✔ validateChange --ready requires verification evidence (4.976333ms)
✔ validateChange --ready passes after verification evidence exists (59.899833ms)
✔ runCli spec and validate print spec gate output (2.372ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (216.97775ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (89.303084ms)
✔ runCli diff prints review-oriented Git and change status (95.313666ms)
✔ verifyChange runs fast checks by default and writes evidence (55.5255ms)
✔ verifyChange --full includes full-only checks (109.141833ms)
✔ completeChange blocks until verification evidence exists (2.457458ms)
✔ completeChange writes done report after verification evidence exists (77.8465ms)
✔ completeChange includes changed files in done report when Git is available (96.823875ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (138.438584ms)
✔ runCli report prints the report path (142.515083ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.50175ms)
✔ runCli release prints release handoff path (214.316416ms)
ℹ tests 111
ℹ suites 0
ℹ pass 111
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14792.796916
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.7985ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.9905ms)
✔ startChange writes a richer OpenSpec proposal template (1.999708ms)
✔ runCli dispatches init, start, and status commands (2.156542ms)
✔ runCli quickstart prepares the low-ceremony project path (83.284042ms)
✔ runCli quickstart --light avoids agent ceremony (72.793125ms)
✔ runMission prepares an AGI-style mission for a new request (351.163916ms)
✔ runMission continues an active change and prepares review when evidence passes (475.784916ms)
✔ runCli with no args asks for a mission when none exists (13.89625ms)
✔ runCli with no args runs autopilot for an active mission (542.950667ms)
✔ runCli routes plain text to Mission Autopilot (358.423375ms)
✔ runCli share aliases pack (77.494667ms)
✔ runCli ask aliases share (73.622583ms)
✔ runCli fix aliases light quickstart (74.684917ms)
✔ runCli ship runs ready verification, validation, and report (194.527916ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (206.779792ms)
✔ runCli supports help and version for an installable CLI (0.294833ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.27ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (9.889958ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.115417ms)
✔ runCli supports the AGI-style run command (358.315834ms)
✔ runCli skill path prints source and default install target (0.559ms)
✔ runCli skill install copies the bundled ShipSpec skill (5.847792ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (13.381542ms)
✔ runSelfTest summarizes command health using an injectable runner (0.229833ms)
✔ runCli examples and self-test print summary output (1.495667ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.543125ms)
✔ runCli desktop prints generated desktop app path (4.502958ms)
✔ package is ready for TypeScript core and npm publishing (0.3395ms)
✔ TypeScript adapters describe ShipSpec integration points (0.485834ms)
✔ runCli adapters lists integration points (0.198333ms)
✔ intake creates a ShipSpec request intake record (6.61475ms)
✔ contract creates a delivery contract for the active ShipSpec change (4.013958ms)
✔ room creates role files for the active ShipSpec change (2.529541ms)
✔ audit reports ShipSpec delivery trail readiness (3.686292ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.965334ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.975958ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (394.460542ms)
✔ learnFromChange stores governed lessons and project patterns (139.740375ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (434.239ms)
✔ runCli reflect and learn expose self-improving loop commands (205.735792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (125.785041ms)
✔ runLoop learns when verification and reflection are ready (467.829375ms)
✔ runCli loop exposes the one-pass self-improvement loop (123.5855ms)
✔ runOperation orchestrates safe delivery control loop (203.330125ms)
✔ runCli operate exposes safe operator command with json output (412.176625ms)
✔ runCli autopilot asks for a mission when none is active (13.768166ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (519.105417ms)
✔ runCli autopilot includes smart memory when routing to AI (989.782333ms)
✔ runCli autopilot guides changed code to ship verification (974.542375ms)
✔ runCli autopilot reports review-ready missions (664.632958ms)
✔ recordDecision stores human decisions for the active change (3.113625ms)
✔ runCli decision records decisions and validates input (3.6585ms)
✔ generateReview writes a decision-aware review checklist (217.096167ms)
✔ runCli review exposes decision-aware review checklist (146.10175ms)
✔ getNextRecommendation guides users with no active change (2.873625ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.615ms)
✔ runCli next prints recommendation and supports json output (3.426417ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (260.44925ms)
✔ generatePlanPrompt includes recorded human decisions (3.095167ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.775875ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (859.312208ms)
✔ runCli codex prints no-copy handoff and appears in help (732.762167ms)
✔ generateContextPack writes a portable AI handoff pack (177.803125ms)
✔ generateContextPack flags high-risk auth changes without full proof (96.893709ms)
✔ runCli pack writes and prints the context pack path (75.777917ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (327.605417ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (443.9145ms)
✔ generateCodexHandoff includes smart memory for the next feature (978.755791ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (176.080041ms)
✔ runCli reason prints reasoning path and supports json output (3.814292ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (337.609417ms)
✔ generateUiDashboard shows committed files when working tree is clean (572.150084ms)
✔ generateUiDashboard shows ShipSpec audit trail (80.07025ms)
✔ generateUiDashboard shows self-improving loop state (280.345125ms)
✔ generateUiDashboard shows adaptive reasoning state (125.158625ms)
✔ generateUiDashboard shows operator state (369.27125ms)
✔ generateUiDashboard shows human decisions and review state (220.680334ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.12275ms)
✔ runCli ui prints generated dashboard path (78.473542ms)
✔ runCli ui --open opens the generated dashboard (76.407ms)
✔ runCli run --open starts a mission and opens the dashboard (535.80075ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.649667ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.490292ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.165375ms)
✔ doctorWorkspace reports repo readiness checks (41.525208ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.882667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.588625ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.77875ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.585208ms)
✔ runCli detect and configure print project detection output (2.328084ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.182666ms)
✔ runCli ci prints generated GitHub Actions path (1.877917ms)
✔ getSpecStatus reports active change files and required proposal sections (2.481792ms)
✔ validateChange passes for a generated spec (2.286375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.307208ms)
✔ validateChange --ready requires verification evidence (2.1215ms)
✔ validateChange --ready passes after verification evidence exists (67.640958ms)
✔ runCli spec and validate print spec gate output (2.998166ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (260.219417ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (157.196917ms)
✔ runCli diff prints review-oriented Git and change status (170.407375ms)
✔ verifyChange runs fast checks by default and writes evidence (59.391709ms)
✔ verifyChange --full includes full-only checks (111.587334ms)
✔ completeChange blocks until verification evidence exists (2.032625ms)
✔ completeChange writes done report after verification evidence exists (80.817333ms)
✔ completeChange includes changed files in done report when Git is available (106.916208ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (153.470958ms)
✔ runCli report prints the report path (148.588916ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (264.129709ms)
✔ runCli release prints release handoff path (221.409ms)
ℹ tests 111
ℹ suites 0
ℹ pass 111
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 17848.107875
```

