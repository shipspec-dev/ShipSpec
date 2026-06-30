# Add agentic context engine Verification Evidence

Mode: full
Generated: 2026-06-30T03:14:08.151Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.14075ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.300166ms)
✔ startChange writes a richer OpenSpec proposal template (2.119584ms)
✔ runCli dispatches init, start, and status commands (2.3195ms)
✔ runCli quickstart prepares the low-ceremony project path (93.543875ms)
✔ runCli quickstart --light avoids agent ceremony (84.15875ms)
✔ runMission prepares an AGI-style mission for a new request (485.569375ms)
✔ runMission does not suggest generated setup files as likely files (553.744834ms)
✔ runMission continues an active change and prepares review when evidence passes (615.750416ms)
✔ runCli with no args asks for a mission when none exists (16.5125ms)
✔ runCli with no args runs autopilot for an active mission (647.125875ms)
✔ runCli routes plain text to Mission Autopilot (482.68625ms)
✔ runCli share aliases pack (79.8445ms)
✔ runCli ask aliases share (78.87375ms)
✔ runCli fix aliases light quickstart (85.125667ms)
✔ runCli ship runs ready verification, validation, and report (245.995334ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (244.503375ms)
✔ runCli supports help and version for an installable CLI (0.292792ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.937792ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.706041ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.205291ms)
✔ runCli supports the AGI-style run command (481.492791ms)
✔ runCli skill path prints source and default install target (0.330875ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.60775ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.446083ms)
✔ runSelfTest summarizes command health using an injectable runner (0.198167ms)
✔ runCli examples and self-test print summary output (1.314958ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.31775ms)
✔ runCli desktop prints generated desktop app path (3.354084ms)
✔ package is ready for TypeScript core and npm publishing (0.399042ms)
✔ TypeScript adapters describe ShipSpec integration points (1.142625ms)
✔ runCli adapters lists integration points (0.199375ms)
✔ intake creates a ShipSpec request intake record (1.337833ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.236916ms)
✔ room creates role files for the active ShipSpec change (3.082709ms)
✔ audit reports ShipSpec delivery trail readiness (3.653792ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.442667ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.163625ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (431.721833ms)
✔ learnFromChange stores governed lessons and project patterns (158.488375ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (481.456375ms)
✔ runCli reflect and learn expose self-improving loop commands (234.198417ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (146.852542ms)
✔ runLoop learns when verification and reflection are ready (526.2255ms)
✔ runCli loop exposes the one-pass self-improvement loop (136.802625ms)
✔ runOperation orchestrates safe delivery control loop (224.212792ms)
✔ runCli operate exposes safe operator command with json output (456.192875ms)
✔ runCli autopilot asks for a mission when none is active (14.556209ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (646.416417ms)
✔ runCli autopilot ignores generated setup files before implementation (688.619875ms)
✔ runCli autopilot includes smart memory when routing to AI (1080.772875ms)
✔ runCli autopilot guides changed code to ship verification (739.892167ms)
✔ runCli autopilot reports review-ready missions (380.123375ms)
✔ recordDecision stores human decisions for the active change (6.123541ms)
✔ runCli decision records decisions and validates input (2.773459ms)
✔ generateReview writes a decision-aware review checklist (214.35575ms)
✔ runCli review exposes decision-aware review checklist (158.177833ms)
✔ getNextRecommendation guides users with no active change (1.464917ms)
✔ getNextRecommendation guides active changes through missing artifacts (8.191083ms)
✔ runCli next prints recommendation and supports json output (3.895625ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (278.333166ms)
✔ generatePlanPrompt includes recorded human decisions (5.655334ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.797917ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (615.287708ms)
✔ runCli codex prints no-copy handoff and appears in help (601.615ms)
✔ generateContextPack writes a portable AI handoff pack (182.61575ms)
✔ generateAgenticContext writes local retrieval context for the active change (106.308584ms)
✔ runCli context supports json output (81.383666ms)
✔ generateAgenticContext does not flag skipped none as risk (139.86175ms)
✔ generateContextPack flags high-risk auth changes without full proof (103.916333ms)
✔ runCli pack writes and prints the context pack path (79.432791ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (300.393625ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (410.158ms)
✔ generateCodexHandoff includes smart memory for the next feature (1028.730125ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (160.302583ms)
✔ runCli reason prints reasoning path and supports json output (3.889417ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (344.153167ms)
✔ generateUiDashboard keeps the first screen compact (108.012ms)
✔ generateUiDashboard keeps progress out of the first viewport (106.258792ms)
✔ generateUiDashboard moves full likely files into advanced details (106.321666ms)
✔ generateUiDashboard uses short likely-file labels above the fold (128.738167ms)
✔ generateUiDashboard shows committed files when working tree is clean (444.707ms)
✔ generateUiDashboard shows ShipSpec audit trail (95.499459ms)
✔ generateUiDashboard shows self-improving loop state (243.387333ms)
✔ generateUiDashboard shows adaptive reasoning state (92.328208ms)
✔ generateUiDashboard shows operator state (312.936167ms)
✔ generateUiDashboard shows human decisions and review state (240.967917ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.325667ms)
✔ runCli ui prints generated dashboard path (81.695458ms)
✔ runCli ui --open opens the generated dashboard (81.657458ms)
✔ generateAppDashboard writes a richer Mission Control app shell (105.985458ms)
✔ generateAppDashboard makes the mission home a dense dashboard (115.243583ms)
✔ runCli app prints generated app path and supports open (86.624834ms)
✔ runCli run --open starts a mission and opens the dashboard (513.012ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.001542ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (10.104583ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.303125ms)
✔ doctorWorkspace reports repo readiness checks (40.568667ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.41175ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.678209ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.463417ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.133417ms)
✔ runCli detect and configure print project detection output (2.112625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.877625ms)
✔ runCli ci prints generated GitHub Actions path (1.607458ms)
✔ getSpecStatus reports active change files and required proposal sections (1.895917ms)
✔ validateChange passes for a generated spec (1.741792ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.802625ms)
✔ validateChange --ready requires verification evidence (2.064292ms)
✔ validateChange --ready passes after verification evidence exists (79.575958ms)
✔ runCli spec and validate print spec gate output (3.539625ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (284.84775ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (111.755292ms)
✔ runCli diff prints review-oriented Git and change status (103.270333ms)
✔ verifyChange runs fast checks by default and writes evidence (61.3225ms)
✔ verifyChange --full includes full-only checks (118.336792ms)
✔ completeChange blocks until verification evidence exists (2.485417ms)
✔ completeChange writes done report after verification evidence exists (85.0445ms)
✔ completeChange includes changed files in done report when Git is available (109.660667ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (165.305125ms)
✔ runCli report prints the report path (179.204ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (259.255458ms)
✔ runCli release prints release handoff path (257.103041ms)
ℹ tests 123
ℹ suites 0
ℹ pass 123
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 20347.72475
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.689125ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.308833ms)
✔ startChange writes a richer OpenSpec proposal template (2.151041ms)
✔ runCli dispatches init, start, and status commands (2.436083ms)
✔ runCli quickstart prepares the low-ceremony project path (95.722292ms)
✔ runCli quickstart --light avoids agent ceremony (94.912083ms)
✔ runMission prepares an AGI-style mission for a new request (544.253083ms)
✔ runMission does not suggest generated setup files as likely files (545.676583ms)
✔ runMission continues an active change and prepares review when evidence passes (766.437459ms)
✔ runCli with no args asks for a mission when none exists (17.109459ms)
✔ runCli with no args runs autopilot for an active mission (692.615708ms)
✔ runCli routes plain text to Mission Autopilot (740.41225ms)
✔ runCli share aliases pack (81.948208ms)
✔ runCli ask aliases share (79.877042ms)
✔ runCli fix aliases light quickstart (86.846625ms)
✔ runCli ship runs ready verification, validation, and report (222.462084ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (241.611459ms)
✔ runCli supports help and version for an installable CLI (0.287875ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.063417ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.468167ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.246666ms)
✔ runCli supports the AGI-style run command (706.41275ms)
✔ runCli skill path prints source and default install target (0.528417ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.94225ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.436875ms)
✔ runSelfTest summarizes command health using an injectable runner (0.237541ms)
✔ runCli examples and self-test print summary output (1.302083ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.378375ms)
✔ runCli desktop prints generated desktop app path (3.083667ms)
✔ package is ready for TypeScript core and npm publishing (0.483166ms)
✔ TypeScript adapters describe ShipSpec integration points (1.297208ms)
✔ runCli adapters lists integration points (0.200125ms)
✔ intake creates a ShipSpec request intake record (1.397125ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.140583ms)
✔ room creates role files for the active ShipSpec change (3.164125ms)
✔ audit reports ShipSpec delivery trail readiness (3.563792ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.923ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.071042ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (523.997958ms)
✔ learnFromChange stores governed lessons and project patterns (262.951375ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (502.210292ms)
✔ runCli reflect and learn expose self-improving loop commands (250.106958ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (137.702ms)
✔ runLoop learns when verification and reflection are ready (546.497292ms)
✔ runCli loop exposes the one-pass self-improvement loop (139.640667ms)
✔ runOperation orchestrates safe delivery control loop (223.972875ms)
✔ runCli operate exposes safe operator command with json output (442.496875ms)
✔ runCli autopilot asks for a mission when none is active (15.579542ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (665.602667ms)
✔ runCli autopilot ignores generated setup files before implementation (733.632542ms)
✔ runCli autopilot includes smart memory when routing to AI (1707.274958ms)
✔ runCli autopilot guides changed code to ship verification (898.530291ms)
✔ runCli autopilot reports review-ready missions (448.604292ms)
✔ recordDecision stores human decisions for the active change (2.497917ms)
✔ runCli decision records decisions and validates input (2.715834ms)
✔ generateReview writes a decision-aware review checklist (161.060583ms)
✔ runCli review exposes decision-aware review checklist (162.277333ms)
✔ getNextRecommendation guides users with no active change (21.2545ms)
✔ getNextRecommendation guides active changes through missing artifacts (10.923583ms)
✔ runCli next prints recommendation and supports json output (3.719917ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (332.849667ms)
✔ generatePlanPrompt includes recorded human decisions (3.007917ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.785417ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (572.678208ms)
✔ runCli codex prints no-copy handoff and appears in help (591.105125ms)
✔ generateContextPack writes a portable AI handoff pack (209.46825ms)
✔ generateAgenticContext writes local retrieval context for the active change (139.468208ms)
✔ runCli context supports json output (82.924958ms)
✔ generateAgenticContext does not flag skipped none as risk (149.307542ms)
✔ generateContextPack flags high-risk auth changes without full proof (107.782834ms)
✔ runCli pack writes and prints the context pack path (82.205333ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (298.420125ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (429.887125ms)
✔ generateCodexHandoff includes smart memory for the next feature (1158.753625ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (164.135083ms)
✔ runCli reason prints reasoning path and supports json output (4.349958ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (336.787ms)
✔ generateUiDashboard keeps the first screen compact (105.597375ms)
✔ generateUiDashboard keeps progress out of the first viewport (104.98125ms)
✔ generateUiDashboard moves full likely files into advanced details (108.554666ms)
✔ generateUiDashboard uses short likely-file labels above the fold (111.134208ms)
✔ generateUiDashboard shows committed files when working tree is clean (517.260292ms)
✔ generateUiDashboard shows ShipSpec audit trail (93.6905ms)
✔ generateUiDashboard shows self-improving loop state (245.171417ms)
✔ generateUiDashboard shows adaptive reasoning state (94.5425ms)
✔ generateUiDashboard shows operator state (329.90175ms)
✔ generateUiDashboard shows human decisions and review state (224.389541ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.090625ms)
✔ runCli ui prints generated dashboard path (81.678375ms)
✔ runCli ui --open opens the generated dashboard (83.1175ms)
✔ generateAppDashboard writes a richer Mission Control app shell (116.005958ms)
✔ generateAppDashboard makes the mission home a dense dashboard (108.591625ms)
✔ runCli app prints generated app path and supports open (83.851541ms)
✔ runCli run --open starts a mission and opens the dashboard (549.627334ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.655709ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (8.807625ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.391625ms)
✔ doctorWorkspace reports repo readiness checks (33.892417ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.029958ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.553292ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.463542ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.970917ms)
✔ runCli detect and configure print project detection output (1.861625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.895584ms)
✔ runCli ci prints generated GitHub Actions path (1.557209ms)
✔ getSpecStatus reports active change files and required proposal sections (1.9515ms)
✔ validateChange passes for a generated spec (2.109333ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.183917ms)
✔ validateChange --ready requires verification evidence (2.002625ms)
✔ validateChange --ready passes after verification evidence exists (64.979916ms)
✔ runCli spec and validate print spec gate output (2.732791ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (244.703167ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (114.492125ms)
✔ runCli diff prints review-oriented Git and change status (99.69025ms)
✔ verifyChange runs fast checks by default and writes evidence (61.715333ms)
✔ verifyChange --full includes full-only checks (117.505916ms)
✔ completeChange blocks until verification evidence exists (2.306333ms)
✔ completeChange writes done report after verification evidence exists (85.802709ms)
✔ completeChange includes changed files in done report when Git is available (109.644459ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (204.675708ms)
✔ runCli report prints the report path (188.750375ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (296.251417ms)
✔ runCli release prints release handoff path (213.062291ms)
ℹ tests 123
ℹ suites 0
ℹ pass 123
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 22482.378
```

