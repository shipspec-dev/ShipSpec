# Polish Mission Control first screen Verification Evidence

Mode: full
Generated: 2026-06-29T14:39:31.381Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (10.319125ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.419542ms)
✔ startChange writes a richer OpenSpec proposal template (2.771375ms)
✔ runCli dispatches init, start, and status commands (2.6085ms)
✔ runCli quickstart prepares the low-ceremony project path (114.249708ms)
✔ runCli quickstart --light avoids agent ceremony (107.976125ms)
✔ runMission prepares an AGI-style mission for a new request (484.297042ms)
✔ runMission does not suggest generated setup files as likely files (576.495708ms)
✔ runMission continues an active change and prepares review when evidence passes (615.644833ms)
✔ runCli with no args asks for a mission when none exists (16.522ms)
✔ runCli with no args runs autopilot for an active mission (684.672541ms)
✔ runCli routes plain text to Mission Autopilot (448.608ms)
✔ runCli share aliases pack (93.96025ms)
✔ runCli ask aliases share (89.478125ms)
✔ runCli fix aliases light quickstart (93.647833ms)
✔ runCli ship runs ready verification, validation, and report (571.978833ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (279.745292ms)
✔ runCli supports help and version for an installable CLI (0.363ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (22.120375ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.800458ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.416166ms)
✔ runCli supports the AGI-style run command (775.625917ms)
✔ runCli skill path prints source and default install target (0.376584ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.140625ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.858959ms)
✔ runSelfTest summarizes command health using an injectable runner (0.287666ms)
✔ runCli examples and self-test print summary output (1.516916ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.487792ms)
✔ runCli desktop prints generated desktop app path (1.028625ms)
✔ package is ready for TypeScript core and npm publishing (0.374583ms)
✔ TypeScript adapters describe ShipSpec integration points (1.21875ms)
✔ runCli adapters lists integration points (0.209458ms)
✔ intake creates a ShipSpec request intake record (1.434917ms)
✔ contract creates a delivery contract for the active ShipSpec change (3.731458ms)
✔ room creates role files for the active ShipSpec change (3.49675ms)
✔ audit reports ShipSpec delivery trail readiness (3.685ms)
✔ deliver prepares intake, spec, contract, room, and validation (5.362125ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.177ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (461.62875ms)
✔ learnFromChange stores governed lessons and project patterns (174.366541ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (667.431625ms)
✔ runCli reflect and learn expose self-improving loop commands (328.902667ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (163.71275ms)
✔ runLoop learns when verification and reflection are ready (636.06025ms)
✔ runCli loop exposes the one-pass self-improvement loop (152.2645ms)
✔ runOperation orchestrates safe delivery control loop (249.118583ms)
✔ runCli operate exposes safe operator command with json output (714.51425ms)
✔ runCli autopilot asks for a mission when none is active (17.073041ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (858.6845ms)
✔ runCli autopilot ignores generated setup files before implementation (787.375333ms)
✔ runCli autopilot includes smart memory when routing to AI (1116.378542ms)
✔ runCli autopilot guides changed code to ship verification (786.508834ms)
✔ runCli autopilot reports review-ready missions (340.408708ms)
✔ recordDecision stores human decisions for the active change (2.511042ms)
✔ runCli decision records decisions and validates input (2.664583ms)
✔ generateReview writes a decision-aware review checklist (177.110541ms)
✔ runCli review exposes decision-aware review checklist (181.703208ms)
✔ getNextRecommendation guides users with no active change (1.845541ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.870167ms)
✔ runCli next prints recommendation and supports json output (3.712875ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (263.393542ms)
✔ generatePlanPrompt includes recorded human decisions (3.13675ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.9475ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (542.391834ms)
✔ runCli codex prints no-copy handoff and appears in help (576.374625ms)
✔ generateContextPack writes a portable AI handoff pack (173.394459ms)
✔ generateContextPack flags high-risk auth changes without full proof (113.231208ms)
✔ runCli pack writes and prints the context pack path (92.079875ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (333.914375ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (589.415583ms)
✔ generateCodexHandoff includes smart memory for the next feature (1163.138333ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (265.324917ms)
✔ runCli reason prints reasoning path and supports json output (4.210708ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (457.500125ms)
✔ generateUiDashboard keeps the first screen compact (118.028834ms)
✔ generateUiDashboard keeps progress out of the first viewport (117.97075ms)
✔ generateUiDashboard moves full likely files into advanced details (131.672333ms)
✔ generateUiDashboard uses short likely-file labels above the fold (174.065541ms)
✔ generateUiDashboard shows committed files when working tree is clean (467.226833ms)
✔ generateUiDashboard shows ShipSpec audit trail (100.190375ms)
✔ generateUiDashboard shows self-improving loop state (282.3155ms)
✔ generateUiDashboard shows adaptive reasoning state (100.903125ms)
✔ generateUiDashboard shows operator state (359.299583ms)
✔ generateUiDashboard shows human decisions and review state (236.944875ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.26625ms)
✔ runCli ui prints generated dashboard path (91.13525ms)
✔ runCli ui --open opens the generated dashboard (93.262208ms)
✔ runCli run --open starts a mission and opens the dashboard (462.285875ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.723792ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.089625ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.702416ms)
✔ doctorWorkspace reports repo readiness checks (35.766833ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.301083ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.754625ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.547417ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.868292ms)
✔ runCli detect and configure print project detection output (1.962458ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.941792ms)
✔ runCli ci prints generated GitHub Actions path (1.989667ms)
✔ getSpecStatus reports active change files and required proposal sections (2.153833ms)
✔ validateChange passes for a generated spec (1.762625ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.176417ms)
✔ validateChange --ready requires verification evidence (2.20125ms)
✔ validateChange --ready passes after verification evidence exists (67.43475ms)
✔ runCli spec and validate print spec gate output (2.685959ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (262.409458ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (115.691333ms)
✔ runCli diff prints review-oriented Git and change status (118.446709ms)
✔ verifyChange runs fast checks by default and writes evidence (64.871333ms)
✔ verifyChange --full includes full-only checks (129.186708ms)
✔ completeChange blocks until verification evidence exists (2.306291ms)
✔ completeChange writes done report after verification evidence exists (91.660375ms)
✔ completeChange includes changed files in done report when Git is available (115.014333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (172.353542ms)
✔ runCli report prints the report path (169.781875ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (265.13525ms)
✔ runCli release prints release handoff path (233.81175ms)
ℹ tests 117
ℹ suites 0
ℹ pass 117
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 22204.740125
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.09675ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.407917ms)
✔ startChange writes a richer OpenSpec proposal template (2.491375ms)
✔ runCli dispatches init, start, and status commands (2.491541ms)
✔ runCli quickstart prepares the low-ceremony project path (106.074125ms)
✔ runCli quickstart --light avoids agent ceremony (96.830708ms)
✔ runMission prepares an AGI-style mission for a new request (464.921209ms)
✔ runMission does not suggest generated setup files as likely files (505.57375ms)
✔ runMission continues an active change and prepares review when evidence passes (606.985625ms)
✔ runCli with no args asks for a mission when none exists (17.578125ms)
✔ runCli with no args runs autopilot for an active mission (647.478125ms)
✔ runCli routes plain text to Mission Autopilot (458.042041ms)
✔ runCli share aliases pack (90.431917ms)
✔ runCli ask aliases share (90.907959ms)
✔ runCli fix aliases light quickstart (94.09175ms)
✔ runCli ship runs ready verification, validation, and report (254.94875ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (264.167084ms)
✔ runCli supports help and version for an installable CLI (0.362ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.303042ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.271791ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.429292ms)
✔ runCli supports the AGI-style run command (455.393417ms)
✔ runCli skill path prints source and default install target (0.330375ms)
✔ runCli skill install copies the bundled ShipSpec skill (4.704125ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.574542ms)
✔ runSelfTest summarizes command health using an injectable runner (0.30425ms)
✔ runCli examples and self-test print summary output (1.562709ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.332416ms)
✔ runCli desktop prints generated desktop app path (0.9345ms)
✔ package is ready for TypeScript core and npm publishing (0.379541ms)
✔ TypeScript adapters describe ShipSpec integration points (0.720125ms)
✔ runCli adapters lists integration points (0.177083ms)
✔ intake creates a ShipSpec request intake record (1.604625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.442583ms)
✔ room creates role files for the active ShipSpec change (2.781125ms)
✔ audit reports ShipSpec delivery trail readiness (4.126084ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.482084ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.717417ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (457.740167ms)
✔ learnFromChange stores governed lessons and project patterns (204.036958ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (686.569667ms)
✔ runCli reflect and learn expose self-improving loop commands (266.534625ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (148.700875ms)
✔ runLoop learns when verification and reflection are ready (630.635792ms)
✔ runCli loop exposes the one-pass self-improvement loop (153.390875ms)
✔ runOperation orchestrates safe delivery control loop (247.884291ms)
✔ runCli operate exposes safe operator command with json output (493.733375ms)
✔ runCli autopilot asks for a mission when none is active (17.099791ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (645.923917ms)
✔ runCli autopilot ignores generated setup files before implementation (691.963417ms)
✔ runCli autopilot includes smart memory when routing to AI (1126.490584ms)
✔ runCli autopilot guides changed code to ship verification (689.156916ms)
✔ runCli autopilot reports review-ready missions (387.785417ms)
✔ recordDecision stores human decisions for the active change (2.724ms)
✔ runCli decision records decisions and validates input (2.774875ms)
✔ generateReview writes a decision-aware review checklist (172.181042ms)
✔ runCli review exposes decision-aware review checklist (179.492625ms)
✔ getNextRecommendation guides users with no active change (1.512917ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.947042ms)
✔ runCli next prints recommendation and supports json output (5.414708ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (290.527625ms)
✔ generatePlanPrompt includes recorded human decisions (3.055042ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.91825ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (612.983667ms)
✔ runCli codex prints no-copy handoff and appears in help (538.521ms)
✔ generateContextPack writes a portable AI handoff pack (176.795167ms)
✔ generateContextPack flags high-risk auth changes without full proof (117.114917ms)
✔ runCli pack writes and prints the context pack path (94.396959ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (331.164833ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (448.886292ms)
✔ generateCodexHandoff includes smart memory for the next feature (988.582833ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (182.503792ms)
✔ runCli reason prints reasoning path and supports json output (3.862416ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (351.071167ms)
✔ generateUiDashboard keeps the first screen compact (114.234584ms)
✔ generateUiDashboard keeps progress out of the first viewport (113.890709ms)
✔ generateUiDashboard moves full likely files into advanced details (112.542ms)
✔ generateUiDashboard uses short likely-file labels above the fold (114.630042ms)
✔ generateUiDashboard shows committed files when working tree is clean (688.836042ms)
✔ generateUiDashboard shows ShipSpec audit trail (95.186042ms)
✔ generateUiDashboard shows self-improving loop state (241.558791ms)
✔ generateUiDashboard shows adaptive reasoning state (93.976125ms)
✔ generateUiDashboard shows operator state (343.009917ms)
✔ generateUiDashboard shows human decisions and review state (247.76075ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.167666ms)
✔ runCli ui prints generated dashboard path (99.425666ms)
✔ runCli ui --open opens the generated dashboard (103.611667ms)
✔ runCli run --open starts a mission and opens the dashboard (480.60525ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (7.455667ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.510459ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.493375ms)
✔ doctorWorkspace reports repo readiness checks (35.148542ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (16.165875ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.667708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.747375ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.903875ms)
✔ runCli detect and configure print project detection output (1.721375ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.593375ms)
✔ runCli ci prints generated GitHub Actions path (1.779708ms)
✔ getSpecStatus reports active change files and required proposal sections (2.830667ms)
✔ validateChange passes for a generated spec (2.265959ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.526916ms)
✔ validateChange --ready requires verification evidence (2.111542ms)
✔ validateChange --ready passes after verification evidence exists (64.802458ms)
✔ runCli spec and validate print spec gate output (2.987292ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (256.529792ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (108.62775ms)
✔ runCli diff prints review-oriented Git and change status (105.678917ms)
✔ verifyChange runs fast checks by default and writes evidence (60.177917ms)
✔ verifyChange --full includes full-only checks (118.612542ms)
✔ completeChange blocks until verification evidence exists (1.982375ms)
✔ completeChange writes done report after verification evidence exists (89.071417ms)
✔ completeChange includes changed files in done report when Git is available (112.124333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (180.774167ms)
✔ runCli report prints the report path (165.854792ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (256.746084ms)
✔ runCli release prints release handoff path (234.911291ms)
ℹ tests 117
ℹ suites 0
ℹ pass 117
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 20400.355791
```

