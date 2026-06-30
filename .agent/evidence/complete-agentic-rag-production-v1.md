# Complete agentic RAG production v1 Verification Evidence

Mode: full
Generated: 2026-06-30T08:21:57.330Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (14.006708ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.684292ms)
✔ startChange writes a richer OpenSpec proposal template (4.314875ms)
✔ runCli dispatches init, start, and status commands (3.998167ms)
✔ runCli quickstart prepares the low-ceremony project path (121.058709ms)
✔ runCli quickstart --light avoids agent ceremony (115.938583ms)
✔ runMission prepares an AGI-style mission for a new request (616.797959ms)
✔ runMission does not suggest generated setup files as likely files (681.211833ms)
✔ runMission continues an active change and prepares review when evidence passes (736.833333ms)
✔ runCli with no args asks for a mission when none exists (20.250042ms)
✔ runCli with no args runs autopilot for an active mission (791.977084ms)
✔ runCli routes plain text to Mission Autopilot (559.267125ms)
✔ runCli share aliases pack (96.562416ms)
✔ runCli ask aliases share (92.79375ms)
✔ runCli fix aliases light quickstart (103.06225ms)
✔ runCli ship runs ready verification, validation, and report (254.658292ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (309.174917ms)
✔ runCli supports help and version for an installable CLI (0.507334ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (21.392083ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (15.388083ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (3.584167ms)
✔ runCli supports the AGI-style run command (542.286708ms)
✔ runCli skill path prints source and default install target (0.423ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.982042ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (4.123792ms)
✔ runSelfTest summarizes command health using an injectable runner (0.312708ms)
✔ runCli examples and self-test print summary output (2.209334ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.063375ms)
✔ runCli desktop prints generated desktop app path (1.777334ms)
✔ package is ready for TypeScript core and npm publishing (0.601667ms)
✔ TypeScript adapters describe ShipSpec integration points (0.707125ms)
✔ runCli adapters lists integration points (0.255042ms)
✔ intake creates a ShipSpec request intake record (2.53575ms)
✔ contract creates a delivery contract for the active ShipSpec change (3.26325ms)
✔ room creates role files for the active ShipSpec change (4.215042ms)
✔ audit reports ShipSpec delivery trail readiness (5.507958ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.482208ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.494625ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (464.525375ms)
✔ learnFromChange stores governed lessons and project patterns (268.701166ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (713.295041ms)
✔ runCli reflect and learn expose self-improving loop commands (292.067041ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (187.570083ms)
✔ runLoop learns when verification and reflection are ready (600.437666ms)
✔ runCli loop exposes the one-pass self-improvement loop (144.253291ms)
✔ runOperation orchestrates safe delivery control loop (320.981209ms)
✔ runCli operate exposes safe operator command with json output (694.978625ms)
✔ runCli autopilot asks for a mission when none is active (15.945625ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (967.597042ms)
✔ runCli autopilot ignores generated setup files before implementation (774.754708ms)
✔ runCli autopilot includes smart memory when routing to AI (1506.87775ms)
✔ runCli autopilot guides changed code to ship verification (856.557292ms)
✔ runCli autopilot reports review-ready missions (322.893459ms)
✔ recordDecision stores human decisions for the active change (2.815417ms)
✔ runCli decision records decisions and validates input (3.188542ms)
✔ generateReview writes a decision-aware review checklist (178.473792ms)
✔ runCli review exposes decision-aware review checklist (302.656875ms)
✔ getNextRecommendation guides users with no active change (7.464333ms)
✔ getNextRecommendation guides active changes through missing artifacts (11.325708ms)
✔ runCli next prints recommendation and supports json output (7.800542ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (496.707542ms)
✔ generatePlanPrompt includes recorded human decisions (4.563333ms)
✔ runCli prompt prints Plan mode prompt and supports json output (5.773ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (631.583209ms)
✔ runCli codex prints no-copy handoff and appears in help (570.99475ms)
✔ generateContextPack writes a portable AI handoff pack (281.710792ms)
✔ generateAgenticContext writes local retrieval context for the active change (105.432958ms)
✔ runCli context supports json output (79.615875ms)
✔ generateAgenticContext marks empty retrieval context as weak (110.212958ms)
✔ generateAgenticContext does not flag skipped none as risk (134.401416ms)
✔ generateContextPack flags high-risk auth changes without full proof (100.892292ms)
✔ runCli pack writes and prints the context pack path (79.620417ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (328.43975ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (394.912709ms)
✔ generateCodexHandoff includes smart memory for the next feature (1004.785917ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (173.452666ms)
✔ runCli reason prints reasoning path and supports json output (5.373792ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (348.041459ms)
✔ generateUiDashboard keeps the first screen compact (112.592917ms)
✔ generateUiDashboard keeps progress out of the first viewport (129.027541ms)
✔ generateUiDashboard moves full likely files into advanced details (112.342333ms)
✔ generateUiDashboard uses short likely-file labels above the fold (106.671917ms)
✔ generateUiDashboard shows committed files when working tree is clean (402.187416ms)
✔ generateUiDashboard shows ShipSpec audit trail (89.928ms)
✔ generateUiDashboard shows self-improving loop state (216.93475ms)
✔ generateUiDashboard shows adaptive reasoning state (84.924ms)
✔ generateUiDashboard shows operator state (392.499333ms)
✔ generateUiDashboard shows human decisions and review state (216.909042ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.342875ms)
✔ runCli ui prints generated dashboard path (88.585083ms)
✔ runCli ui --open opens the generated dashboard (77.626458ms)
✔ generateAppDashboard writes a richer Mission Control app shell (108.901125ms)
✔ generateAppDashboard makes the mission home a dense dashboard (112.918833ms)
✔ runCli app prints generated app path and supports open (82.857291ms)
✔ runCli run --open starts a mission and opens the dashboard (484.459458ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.182084ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.064792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.991125ms)
✔ doctorWorkspace reports repo readiness checks (34.344958ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.771ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.783291ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.784959ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.295375ms)
✔ runCli detect and configure print project detection output (2.214833ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.202042ms)
✔ runCli ci prints generated GitHub Actions path (1.738583ms)
✔ getSpecStatus reports active change files and required proposal sections (2.383708ms)
✔ validateChange passes for a generated spec (2.356375ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.013417ms)
✔ validateChange --ready requires verification evidence (2.065291ms)
✔ validateChange --ready passes after verification evidence exists (92.013959ms)
✔ runCli spec and validate print spec gate output (2.79225ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (237.257041ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (99.893416ms)
✔ runCli diff prints review-oriented Git and change status (128.874125ms)
✔ verifyChange runs fast checks by default and writes evidence (60.507167ms)
✔ verifyChange --full includes full-only checks (118.986916ms)
✔ completeChange blocks until verification evidence exists (3.164167ms)
✔ completeChange writes done report after verification evidence exists (85.763042ms)
✔ completeChange includes changed files in done report when Git is available (118.000375ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (170.993416ms)
✔ runCli report prints the report path (164.058875ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.691917ms)
✔ runCli release prints release handoff path (217.589625ms)
ℹ tests 124
ℹ suites 0
ℹ pass 124
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 23429.76675
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.125291ms)
✔ startChange creates an OpenSpec change, task file, and active status (5.8885ms)
✔ startChange writes a richer OpenSpec proposal template (4.630875ms)
✔ runCli dispatches init, start, and status commands (4.44225ms)
✔ runCli quickstart prepares the low-ceremony project path (93.587542ms)
✔ runCli quickstart --light avoids agent ceremony (84.547708ms)
✔ runMission prepares an AGI-style mission for a new request (508.955375ms)
✔ runMission does not suggest generated setup files as likely files (631.936958ms)
✔ runMission continues an active change and prepares review when evidence passes (664.280833ms)
✔ runCli with no args asks for a mission when none exists (16.875542ms)
✔ runCli with no args runs autopilot for an active mission (641.909875ms)
✔ runCli routes plain text to Mission Autopilot (494.084ms)
✔ runCli share aliases pack (78.682333ms)
✔ runCli ask aliases share (78.12925ms)
✔ runCli fix aliases light quickstart (81.563458ms)
✔ runCli ship runs ready verification, validation, and report (216.995125ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (247.8275ms)
✔ runCli supports help and version for an installable CLI (0.282959ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.01225ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.241291ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.83875ms)
✔ runCli supports the AGI-style run command (485.520625ms)
✔ runCli skill path prints source and default install target (0.289625ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.636542ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.588375ms)
✔ runSelfTest summarizes command health using an injectable runner (0.239583ms)
✔ runCli examples and self-test print summary output (1.768084ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.380792ms)
✔ runCli desktop prints generated desktop app path (1.240459ms)
✔ package is ready for TypeScript core and npm publishing (0.387042ms)
✔ TypeScript adapters describe ShipSpec integration points (0.570291ms)
✔ runCli adapters lists integration points (0.185875ms)
✔ intake creates a ShipSpec request intake record (1.574416ms)
✔ contract creates a delivery contract for the active ShipSpec change (3.982667ms)
✔ room creates role files for the active ShipSpec change (3.42275ms)
✔ audit reports ShipSpec delivery trail readiness (4.109459ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.8695ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (14.043708ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (490.743833ms)
✔ learnFromChange stores governed lessons and project patterns (161.532167ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (531.778834ms)
✔ runCli reflect and learn expose self-improving loop commands (359.651458ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (158.680333ms)
✔ runLoop learns when verification and reflection are ready (650.159833ms)
✔ runCli loop exposes the one-pass self-improvement loop (147.42675ms)
✔ runOperation orchestrates safe delivery control loop (385.179417ms)
✔ runCli operate exposes safe operator command with json output (628.5695ms)
✔ runCli autopilot asks for a mission when none is active (16.402208ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (796.317333ms)
✔ runCli autopilot ignores generated setup files before implementation (698.322666ms)
✔ runCli autopilot includes smart memory when routing to AI (1098.1875ms)
✔ runCli autopilot guides changed code to ship verification (721.250792ms)
✔ runCli autopilot reports review-ready missions (306.237625ms)
✔ recordDecision stores human decisions for the active change (2.714ms)
✔ runCli decision records decisions and validates input (2.631041ms)
✔ generateReview writes a decision-aware review checklist (158.822125ms)
✔ runCli review exposes decision-aware review checklist (183.114125ms)
✔ getNextRecommendation guides users with no active change (1.87425ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.990291ms)
✔ runCli next prints recommendation and supports json output (4.017375ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (303.070375ms)
✔ generatePlanPrompt includes recorded human decisions (3.354583ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.834083ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (546.218667ms)
✔ runCli codex prints no-copy handoff and appears in help (549.134375ms)
✔ generateContextPack writes a portable AI handoff pack (170.418708ms)
✔ generateAgenticContext writes local retrieval context for the active change (100.36175ms)
✔ runCli context supports json output (79.436625ms)
✔ generateAgenticContext marks empty retrieval context as weak (78.197667ms)
✔ generateAgenticContext does not flag skipped none as risk (135.548625ms)
✔ generateContextPack flags high-risk auth changes without full proof (106.00025ms)
✔ runCli pack writes and prints the context pack path (82.549ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (340.671292ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (396.945167ms)
✔ generateCodexHandoff includes smart memory for the next feature (1123.965083ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (162.625625ms)
✔ runCli reason prints reasoning path and supports json output (4.08775ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (330.449791ms)
✔ generateUiDashboard keeps the first screen compact (104.735375ms)
✔ generateUiDashboard keeps progress out of the first viewport (106.606417ms)
✔ generateUiDashboard moves full likely files into advanced details (102.691375ms)
✔ generateUiDashboard uses short likely-file labels above the fold (104.656375ms)
✔ generateUiDashboard shows committed files when working tree is clean (413.95275ms)
✔ generateUiDashboard shows ShipSpec audit trail (85.1155ms)
✔ generateUiDashboard shows self-improving loop state (227.11875ms)
✔ generateUiDashboard shows adaptive reasoning state (82.995792ms)
✔ generateUiDashboard shows operator state (400.927375ms)
✔ generateUiDashboard shows human decisions and review state (228.473958ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.390167ms)
✔ runCli ui prints generated dashboard path (90.276125ms)
✔ runCli ui --open opens the generated dashboard (86.864875ms)
✔ generateAppDashboard writes a richer Mission Control app shell (109.954625ms)
✔ generateAppDashboard makes the mission home a dense dashboard (110.180542ms)
✔ runCli app prints generated app path and supports open (93.300666ms)
✔ runCli run --open starts a mission and opens the dashboard (510.140875ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.327375ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.793042ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.487625ms)
✔ doctorWorkspace reports repo readiness checks (37.774875ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.692834ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.664375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.848416ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.015375ms)
✔ runCli detect and configure print project detection output (2.018292ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.365083ms)
✔ runCli ci prints generated GitHub Actions path (1.919ms)
✔ getSpecStatus reports active change files and required proposal sections (2.24725ms)
✔ validateChange passes for a generated spec (2.353042ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.652625ms)
✔ validateChange --ready requires verification evidence (2.180208ms)
✔ validateChange --ready passes after verification evidence exists (74.233333ms)
✔ runCli spec and validate print spec gate output (3.102542ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (249.140875ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (110.640916ms)
✔ runCli diff prints review-oriented Git and change status (112.344625ms)
✔ verifyChange runs fast checks by default and writes evidence (58.913583ms)
✔ verifyChange --full includes full-only checks (116.64275ms)
✔ completeChange blocks until verification evidence exists (2.438125ms)
✔ completeChange writes done report after verification evidence exists (85.017875ms)
✔ completeChange includes changed files in done report when Git is available (108.872042ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (156.358667ms)
✔ runCli report prints the report path (157.867542ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (247.182292ms)
✔ runCli release prints release handoff path (214.736083ms)
ℹ tests 124
ℹ suites 0
ℹ pass 124
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 21204.603458
```

