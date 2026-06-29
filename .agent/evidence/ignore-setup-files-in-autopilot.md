# Ignore Setup Files In Autopilot Verification Evidence

Mode: full
Generated: 2026-06-29T09:47:52.770Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (10.702083ms)
✔ startChange creates an OpenSpec change, task file, and active status (5.214542ms)
✔ startChange writes a richer OpenSpec proposal template (2.833ms)
✔ runCli dispatches init, start, and status commands (3.256625ms)
✔ runCli quickstart prepares the low-ceremony project path (99.950208ms)
✔ runCli quickstart --light avoids agent ceremony (75.590792ms)
✔ runMission prepares an AGI-style mission for a new request (374.060625ms)
✔ runMission does not suggest generated setup files as likely files (398.797625ms)
✔ runMission continues an active change and prepares review when evidence passes (479.832167ms)
✔ runCli with no args asks for a mission when none exists (15.616084ms)
✔ runCli with no args runs autopilot for an active mission (573.545875ms)
✔ runCli routes plain text to Mission Autopilot (434.522083ms)
✔ runCli share aliases pack (88.331917ms)
✔ runCli ask aliases share (92.894833ms)
✔ runCli fix aliases light quickstart (90.098084ms)
✔ runCli ship runs ready verification, validation, and report (202.242917ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (217.936958ms)
✔ runCli supports help and version for an installable CLI (0.480917ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.626292ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.208167ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.348292ms)
✔ runCli supports the AGI-style run command (393.725375ms)
✔ runCli skill path prints source and default install target (0.402375ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.066042ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.556041ms)
✔ runSelfTest summarizes command health using an injectable runner (0.2485ms)
✔ runCli examples and self-test print summary output (1.295041ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.49625ms)
✔ runCli desktop prints generated desktop app path (0.953084ms)
✔ package is ready for TypeScript core and npm publishing (0.346958ms)
✔ TypeScript adapters describe ShipSpec integration points (0.565584ms)
✔ runCli adapters lists integration points (0.223ms)
✔ intake creates a ShipSpec request intake record (1.561667ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.9915ms)
✔ room creates role files for the active ShipSpec change (3.12225ms)
✔ audit reports ShipSpec delivery trail readiness (3.758834ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.6175ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.457083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (416.643083ms)
✔ learnFromChange stores governed lessons and project patterns (146.014167ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (462.303458ms)
✔ runCli reflect and learn expose self-improving loop commands (225.026833ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (142.013167ms)
✔ runLoop learns when verification and reflection are ready (493.49575ms)
✔ runCli loop exposes the one-pass self-improvement loop (123.973625ms)
✔ runOperation orchestrates safe delivery control loop (201.037834ms)
✔ runCli operate exposes safe operator command with json output (488.5215ms)
✔ runCli autopilot asks for a mission when none is active (17.461334ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (549.644125ms)
✔ runCli autopilot ignores generated setup files before implementation (638.040084ms)
✔ runCli autopilot includes smart memory when routing to AI (937.859917ms)
✔ runCli autopilot guides changed code to ship verification (565.711917ms)
✔ runCli autopilot reports review-ready missions (260.933792ms)
✔ recordDecision stores human decisions for the active change (3.589334ms)
✔ runCli decision records decisions and validates input (2.239917ms)
✔ generateReview writes a decision-aware review checklist (135.064209ms)
✔ runCli review exposes decision-aware review checklist (127.084375ms)
✔ getNextRecommendation guides users with no active change (1.639125ms)
✔ getNextRecommendation guides active changes through missing artifacts (3.96325ms)
✔ runCli next prints recommendation and supports json output (3.428208ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (188.613083ms)
✔ generatePlanPrompt includes recorded human decisions (2.588166ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.279917ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (443.797791ms)
✔ runCli codex prints no-copy handoff and appears in help (448.119208ms)
✔ generateContextPack writes a portable AI handoff pack (143.476291ms)
✔ generateContextPack flags high-risk auth changes without full proof (89.590042ms)
✔ runCli pack writes and prints the context pack path (69.42425ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (260.993042ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (353.976334ms)
✔ generateCodexHandoff includes smart memory for the next feature (777.940708ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (150.660584ms)
✔ runCli reason prints reasoning path and supports json output (3.98025ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (287.709625ms)
✔ generateUiDashboard shows committed files when working tree is clean (343.678542ms)
✔ generateUiDashboard shows ShipSpec audit trail (73.938709ms)
✔ generateUiDashboard shows self-improving loop state (193.125625ms)
✔ generateUiDashboard shows adaptive reasoning state (73.142667ms)
✔ generateUiDashboard shows operator state (270.611541ms)
✔ generateUiDashboard shows human decisions and review state (190.592083ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.403416ms)
✔ runCli ui prints generated dashboard path (77.5095ms)
✔ runCli ui --open opens the generated dashboard (73.206459ms)
✔ runCli run --open starts a mission and opens the dashboard (407.869542ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.382333ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.15775ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.815333ms)
✔ doctorWorkspace reports repo readiness checks (34.196917ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.45425ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.771333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.537292ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.866917ms)
✔ runCli detect and configure print project detection output (2.169042ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.636917ms)
✔ runCli ci prints generated GitHub Actions path (1.606042ms)
✔ getSpecStatus reports active change files and required proposal sections (2.094041ms)
✔ validateChange passes for a generated spec (2.217292ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.930125ms)
✔ validateChange --ready requires verification evidence (2.077417ms)
✔ validateChange --ready passes after verification evidence exists (57.846375ms)
✔ runCli spec and validate print spec gate output (2.803458ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (237.634958ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (96.097291ms)
✔ runCli diff prints review-oriented Git and change status (89.682833ms)
✔ verifyChange runs fast checks by default and writes evidence (58.545416ms)
✔ verifyChange --full includes full-only checks (118.375708ms)
✔ completeChange blocks until verification evidence exists (2.702542ms)
✔ completeChange writes done report after verification evidence exists (86.811584ms)
✔ completeChange includes changed files in done report when Git is available (109.070584ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (157.089167ms)
✔ runCli report prints the report path (152.127208ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (224.847042ms)
✔ runCli release prints release handoff path (226.66625ms)
ℹ tests 113
ℹ suites 0
ℹ pass 113
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 16300.773708
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.389583ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.548375ms)
✔ startChange writes a richer OpenSpec proposal template (2.727125ms)
✔ runCli dispatches init, start, and status commands (2.346625ms)
✔ runCli quickstart prepares the low-ceremony project path (98.773ms)
✔ runCli quickstart --light avoids agent ceremony (75.205292ms)
✔ runMission prepares an AGI-style mission for a new request (328.802375ms)
✔ runMission does not suggest generated setup files as likely files (359.125208ms)
✔ runMission continues an active change and prepares review when evidence passes (487.379459ms)
✔ runCli with no args asks for a mission when none exists (12.835292ms)
✔ runCli with no args runs autopilot for an active mission (629.684541ms)
✔ runCli routes plain text to Mission Autopilot (394.847209ms)
✔ runCli share aliases pack (71.440625ms)
✔ runCli ask aliases share (69.093708ms)
✔ runCli fix aliases light quickstart (72.673375ms)
✔ runCli ship runs ready verification, validation, and report (196.794083ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (261.757459ms)
✔ runCli supports help and version for an installable CLI (0.590625ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (29.584042ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.113875ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (4.370458ms)
✔ runCli supports the AGI-style run command (451.3275ms)
✔ runCli skill path prints source and default install target (0.280375ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.873334ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.466417ms)
✔ runSelfTest summarizes command health using an injectable runner (0.254042ms)
✔ runCli examples and self-test print summary output (1.326834ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.205208ms)
✔ runCli desktop prints generated desktop app path (0.980916ms)
✔ package is ready for TypeScript core and npm publishing (0.284291ms)
✔ TypeScript adapters describe ShipSpec integration points (0.355208ms)
✔ runCli adapters lists integration points (0.1375ms)
✔ intake creates a ShipSpec request intake record (1.257916ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.817375ms)
✔ room creates role files for the active ShipSpec change (2.603041ms)
✔ audit reports ShipSpec delivery trail readiness (3.542125ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.389667ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.831ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (409.554ms)
✔ learnFromChange stores governed lessons and project patterns (143.572458ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (417.296667ms)
✔ runCli reflect and learn expose self-improving loop commands (203.277458ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (122.069292ms)
✔ runLoop learns when verification and reflection are ready (486.55725ms)
✔ runCli loop exposes the one-pass self-improvement loop (123.104166ms)
✔ runOperation orchestrates safe delivery control loop (192.399208ms)
✔ runCli operate exposes safe operator command with json output (377.342542ms)
✔ runCli autopilot asks for a mission when none is active (14.107917ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (481.522292ms)
✔ runCli autopilot ignores generated setup files before implementation (577.03125ms)
✔ runCli autopilot includes smart memory when routing to AI (928.579917ms)
✔ runCli autopilot guides changed code to ship verification (498.563125ms)
✔ runCli autopilot reports review-ready missions (267.312542ms)
✔ recordDecision stores human decisions for the active change (2.645542ms)
✔ runCli decision records decisions and validates input (2.25025ms)
✔ generateReview writes a decision-aware review checklist (131.746459ms)
✔ runCli review exposes decision-aware review checklist (126.742917ms)
✔ getNextRecommendation guides users with no active change (1.446125ms)
✔ getNextRecommendation guides active changes through missing artifacts (3.960791ms)
✔ runCli next prints recommendation and supports json output (3.018667ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (197.504791ms)
✔ generatePlanPrompt includes recorded human decisions (3.442583ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.9565ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (411.525625ms)
✔ runCli codex prints no-copy handoff and appears in help (405.062833ms)
✔ generateContextPack writes a portable AI handoff pack (145.583458ms)
✔ generateContextPack flags high-risk auth changes without full proof (87.80675ms)
✔ runCli pack writes and prints the context pack path (66.341834ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (251.12325ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (356.0005ms)
✔ generateCodexHandoff includes smart memory for the next feature (807.376375ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (129.1705ms)
✔ runCli reason prints reasoning path and supports json output (3.310666ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (359.836667ms)
✔ generateUiDashboard shows committed files when working tree is clean (714.456208ms)
✔ generateUiDashboard shows ShipSpec audit trail (86.648875ms)
✔ generateUiDashboard shows self-improving loop state (207.430791ms)
✔ generateUiDashboard shows adaptive reasoning state (75.93125ms)
✔ generateUiDashboard shows operator state (355.83375ms)
✔ generateUiDashboard shows human decisions and review state (220.53975ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (4.301708ms)
✔ runCli ui prints generated dashboard path (78.105458ms)
✔ runCli ui --open opens the generated dashboard (80.7815ms)
✔ runCli run --open starts a mission and opens the dashboard (526.609625ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (7.02175ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (11.964875ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.943458ms)
✔ doctorWorkspace reports repo readiness checks (37.674708ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.294208ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.67875ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.424375ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.801833ms)
✔ runCli detect and configure print project detection output (1.850792ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (5.368625ms)
✔ runCli ci prints generated GitHub Actions path (1.586417ms)
✔ getSpecStatus reports active change files and required proposal sections (1.810917ms)
✔ validateChange passes for a generated spec (1.801459ms)
✔ validateChange fails when proposal is missing acceptance criteria (4.012333ms)
✔ validateChange --ready requires verification evidence (1.965ms)
✔ validateChange --ready passes after verification evidence exists (59.083916ms)
✔ runCli spec and validate print spec gate output (2.619584ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (237.676958ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (109.44625ms)
✔ runCli diff prints review-oriented Git and change status (119.54475ms)
✔ verifyChange runs fast checks by default and writes evidence (55.237042ms)
✔ verifyChange --full includes full-only checks (122.344292ms)
✔ completeChange blocks until verification evidence exists (2.299042ms)
✔ completeChange writes done report after verification evidence exists (82.105625ms)
✔ completeChange includes changed files in done report when Git is available (98.252166ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (152.122542ms)
✔ runCli report prints the report path (152.59925ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (239.030583ms)
✔ runCli release prints release handoff path (190.538333ms)
ℹ tests 113
ℹ suites 0
ℹ pass 113
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 16530.592333
```

