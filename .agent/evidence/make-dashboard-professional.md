# Make dashboard professional Verification Evidence

Mode: full
Generated: 2026-06-26T08:49:21.350Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.867625ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.725417ms)
✔ startChange writes a richer OpenSpec proposal template (1.986042ms)
✔ runCli dispatches init, start, and status commands (2.333166ms)
✔ runCli quickstart prepares the low-ceremony project path (100.929333ms)
✔ runCli quickstart --light avoids agent ceremony (93.138375ms)
✔ runMission prepares an AGI-style mission for a new request (385.252292ms)
✔ runMission continues an active change and prepares review when evidence passes (507.720167ms)
✔ runCli with no args shows the operator guide instead of raw help (84.740333ms)
✔ runCli routes plain text to quickstart (83.151459ms)
✔ runCli share aliases pack (79.750333ms)
✔ runCli ask aliases share (75.872084ms)
✔ runCli fix aliases light quickstart (78.510166ms)
✔ runCli ship runs ready verification, validation, and report (205.127166ms)
✔ runCli supports help and version for an installable CLI (0.400875ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.309084ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.932666ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.602667ms)
✔ runCli supports the AGI-style run command (314.661417ms)
✔ runCli skill path prints source and default install target (0.647041ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.360125ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.406833ms)
✔ runSelfTest summarizes command health using an injectable runner (0.384708ms)
✔ runCli examples and self-test print summary output (1.239333ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.284917ms)
✔ runCli desktop prints generated desktop app path (0.997042ms)
✔ package is ready for TypeScript core and npm publishing (0.577583ms)
✔ TypeScript adapters describe ShipSpec integration points (0.539834ms)
✔ runCli adapters lists integration points (0.1915ms)
✔ intake creates a ShipSpec request intake record (1.690333ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.928583ms)
✔ room creates role files for the active ShipSpec change (2.652542ms)
✔ audit reports ShipSpec delivery trail readiness (3.729583ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.789792ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.503417ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (391.775ms)
✔ learnFromChange stores governed lessons and project patterns (147.415209ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (480.967792ms)
✔ runCli reflect and learn expose self-improving loop commands (225.713958ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (137.631458ms)
✔ runLoop learns when verification and reflection are ready (595.060667ms)
✔ runCli loop exposes the one-pass self-improvement loop (154.833125ms)
✔ runOperation orchestrates safe delivery control loop (250.465667ms)
✔ runCli operate exposes safe operator command with json output (531.998792ms)
✔ recordDecision stores human decisions for the active change (2.568125ms)
✔ runCli decision records decisions and validates input (2.152ms)
✔ generateReview writes a decision-aware review checklist (165.368833ms)
✔ runCli review exposes decision-aware review checklist (198.330041ms)
✔ getNextRecommendation guides users with no active change (1.933625ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.184542ms)
✔ runCli next prints recommendation and supports json output (3.368542ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (242.402459ms)
✔ generatePlanPrompt includes recorded human decisions (3.640959ms)
✔ runCli prompt prints Plan mode prompt and supports json output (6.177375ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (337.180916ms)
✔ runCli codex prints no-copy handoff and appears in help (350.556791ms)
✔ generateContextPack writes a portable AI handoff pack (153.465792ms)
✔ generateContextPack flags high-risk auth changes without full proof (109.78225ms)
✔ runCli pack writes and prints the context pack path (88.24675ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (315.794209ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (384.36425ms)
✔ generateCodexHandoff includes smart memory for the next feature (753.49425ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (243.825625ms)
✔ runCli reason prints reasoning path and supports json output (4.479667ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (329.721958ms)
✔ generateUiDashboard shows committed files when working tree is clean (434.30375ms)
✔ generateUiDashboard shows ShipSpec audit trail (85.909959ms)
✔ generateUiDashboard shows self-improving loop state (210.705875ms)
✔ generateUiDashboard shows adaptive reasoning state (83.531208ms)
✔ generateUiDashboard shows operator state (327.496375ms)
✔ generateUiDashboard shows human decisions and review state (205.585958ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.362208ms)
✔ runCli ui prints generated dashboard path (83.039125ms)
✔ runCli ui --open opens the generated dashboard (86.9775ms)
✔ runCli run --open starts a mission and opens the dashboard (332.706958ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.587708ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.622792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.784375ms)
✔ doctorWorkspace reports repo readiness checks (31.736084ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.62075ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.780917ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.185583ms)
✔ runCli detect and configure print project detection output (1.741625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.924ms)
✔ runCli ci prints generated GitHub Actions path (1.401625ms)
✔ getSpecStatus reports active change files and required proposal sections (1.828625ms)
✔ validateChange passes for a generated spec (2.161042ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.984167ms)
✔ validateChange --ready requires verification evidence (1.789708ms)
✔ validateChange --ready passes after verification evidence exists (57.045333ms)
✔ runCli spec and validate print spec gate output (2.826958ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (255.193625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (92.852917ms)
✔ runCli diff prints review-oriented Git and change status (94.080084ms)
✔ verifyChange runs fast checks by default and writes evidence (62.753458ms)
✔ verifyChange --full includes full-only checks (120.054917ms)
✔ completeChange blocks until verification evidence exists (2.458625ms)
✔ completeChange writes done report after verification evidence exists (91.541583ms)
✔ completeChange includes changed files in done report when Git is available (159.720583ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (176.395625ms)
✔ runCli report prints the report path (176.94425ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (271.17ms)
✔ runCli release prints release handoff path (249.253875ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 12536.256584
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.009375ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.496167ms)
✔ startChange writes a richer OpenSpec proposal template (2.648959ms)
✔ runCli dispatches init, start, and status commands (2.289ms)
✔ runCli quickstart prepares the low-ceremony project path (97.554875ms)
✔ runCli quickstart --light avoids agent ceremony (90.598959ms)
✔ runMission prepares an AGI-style mission for a new request (351.668291ms)
✔ runMission continues an active change and prepares review when evidence passes (487.74275ms)
✔ runCli with no args shows the operator guide instead of raw help (86.546709ms)
✔ runCli routes plain text to quickstart (92.691416ms)
✔ runCli share aliases pack (84.49525ms)
✔ runCli ask aliases share (86.141375ms)
✔ runCli fix aliases light quickstart (90.131875ms)
✔ runCli ship runs ready verification, validation, and report (233.904542ms)
✔ runCli supports help and version for an installable CLI (0.28475ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (34.774542ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.080959ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.231333ms)
✔ runCli supports the AGI-style run command (371.327458ms)
✔ runCli skill path prints source and default install target (0.328625ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.628458ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.691084ms)
✔ runSelfTest summarizes command health using an injectable runner (0.349916ms)
✔ runCli examples and self-test print summary output (1.833458ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.489791ms)
✔ runCli desktop prints generated desktop app path (0.899333ms)
✔ package is ready for TypeScript core and npm publishing (0.352083ms)
✔ TypeScript adapters describe ShipSpec integration points (0.388875ms)
✔ runCli adapters lists integration points (0.330875ms)
✔ intake creates a ShipSpec request intake record (1.267875ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.108292ms)
✔ room creates role files for the active ShipSpec change (3.107833ms)
✔ audit reports ShipSpec delivery trail readiness (4.5995ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.311458ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.014917ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (291.733166ms)
✔ learnFromChange stores governed lessons and project patterns (167.675125ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (488.798708ms)
✔ runCli reflect and learn expose self-improving loop commands (243.475875ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (144.430084ms)
✔ runLoop learns when verification and reflection are ready (496.042875ms)
✔ runCli loop exposes the one-pass self-improvement loop (131.76525ms)
✔ runOperation orchestrates safe delivery control loop (209.532166ms)
✔ runCli operate exposes safe operator command with json output (409.881708ms)
✔ recordDecision stores human decisions for the active change (4.426417ms)
✔ runCli decision records decisions and validates input (2.385042ms)
✔ generateReview writes a decision-aware review checklist (150.666958ms)
✔ runCli review exposes decision-aware review checklist (143.542041ms)
✔ getNextRecommendation guides users with no active change (1.805667ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.278583ms)
✔ runCli next prints recommendation and supports json output (3.429458ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (212.60825ms)
✔ generatePlanPrompt includes recorded human decisions (2.687958ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.556792ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (303.818708ms)
✔ runCli codex prints no-copy handoff and appears in help (296.552458ms)
✔ generateContextPack writes a portable AI handoff pack (151.044458ms)
✔ generateContextPack flags high-risk auth changes without full proof (95.807416ms)
✔ runCli pack writes and prints the context pack path (114.593125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (279.900583ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (399.213916ms)
✔ generateCodexHandoff includes smart memory for the next feature (774.941209ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (149.724916ms)
✔ runCli reason prints reasoning path and supports json output (3.593208ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (300.863333ms)
✔ generateUiDashboard shows committed files when working tree is clean (379.002083ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.160625ms)
✔ generateUiDashboard shows self-improving loop state (207.107541ms)
✔ generateUiDashboard shows adaptive reasoning state (76.407292ms)
✔ generateUiDashboard shows operator state (284.176083ms)
✔ generateUiDashboard shows human decisions and review state (212.677416ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.450375ms)
✔ runCli ui prints generated dashboard path (80.51825ms)
✔ runCli ui --open opens the generated dashboard (77.5405ms)
✔ runCli run --open starts a mission and opens the dashboard (305.309375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.023ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.918917ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.607ms)
✔ doctorWorkspace reports repo readiness checks (31.872542ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.654708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.500792ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.142959ms)
✔ runCli detect and configure print project detection output (2.144667ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.909291ms)
✔ runCli ci prints generated GitHub Actions path (1.77075ms)
✔ getSpecStatus reports active change files and required proposal sections (1.894416ms)
✔ validateChange passes for a generated spec (2.090083ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.542542ms)
✔ validateChange --ready requires verification evidence (1.634958ms)
✔ validateChange --ready passes after verification evidence exists (56.763542ms)
✔ runCli spec and validate print spec gate output (3.150875ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (222.004459ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (90.6145ms)
✔ runCli diff prints review-oriented Git and change status (91.552292ms)
✔ verifyChange runs fast checks by default and writes evidence (57.804875ms)
✔ verifyChange --full includes full-only checks (112.052916ms)
✔ completeChange blocks until verification evidence exists (3.022792ms)
✔ completeChange writes done report after verification evidence exists (88.00675ms)
✔ completeChange includes changed files in done report when Git is available (104.154625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (159.828917ms)
✔ runCli report prints the report path (156.0115ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.181958ms)
✔ runCli release prints release handoff path (210.403834ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 11621.991625
```

