# Ignore Setup Files In Autopilot Verification Evidence

Mode: full
Generated: 2026-06-29T09:32:02.496Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.342208ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.2345ms)
✔ startChange writes a richer OpenSpec proposal template (1.977708ms)
✔ runCli dispatches init, start, and status commands (2.208625ms)
✔ runCli quickstart prepares the low-ceremony project path (78.974375ms)
✔ runCli quickstart --light avoids agent ceremony (70.20825ms)
✔ runMission prepares an AGI-style mission for a new request (327.698583ms)
✔ runMission continues an active change and prepares review when evidence passes (435.525333ms)
✔ runCli with no args asks for a mission when none exists (13.364334ms)
✔ runCli with no args runs autopilot for an active mission (461.877708ms)
✔ runCli routes plain text to Mission Autopilot (331.169458ms)
✔ runCli share aliases pack (65.848541ms)
✔ runCli ask aliases share (64.738833ms)
✔ runCli fix aliases light quickstart (69.454875ms)
✔ runCli ship runs ready verification, validation, and report (176.740584ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (196.29325ms)
✔ runCli supports help and version for an installable CLI (1.541958ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (16.755ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.067166ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.2005ms)
✔ runCli supports the AGI-style run command (327.814166ms)
✔ runCli skill path prints source and default install target (0.29ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.569125ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.594625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.394291ms)
✔ runCli examples and self-test print summary output (1.136333ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.247625ms)
✔ runCli desktop prints generated desktop app path (0.932375ms)
✔ package is ready for TypeScript core and npm publishing (0.289958ms)
✔ TypeScript adapters describe ShipSpec integration points (0.4815ms)
✔ runCli adapters lists integration points (0.18025ms)
✔ intake creates a ShipSpec request intake record (1.306417ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.012167ms)
✔ room creates role files for the active ShipSpec change (2.879667ms)
✔ audit reports ShipSpec delivery trail readiness (3.673ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.945459ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.964416ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (343.900166ms)
✔ learnFromChange stores governed lessons and project patterns (124.893917ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (392.394333ms)
✔ runCli reflect and learn expose self-improving loop commands (190.877834ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (148.46825ms)
✔ runLoop learns when verification and reflection are ready (440.036125ms)
✔ runCli loop exposes the one-pass self-improvement loop (118.183792ms)
✔ runOperation orchestrates safe delivery control loop (185.391833ms)
✔ runCli operate exposes safe operator command with json output (373.715708ms)
✔ runCli autopilot asks for a mission when none is active (12.215708ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (451.944417ms)
✔ runCli autopilot ignores generated setup files before implementation (495.0375ms)
✔ runCli autopilot includes smart memory when routing to AI (805.693792ms)
✔ runCli autopilot guides changed code to ship verification (493.317291ms)
✔ runCli autopilot reports review-ready missions (248.613833ms)
✔ recordDecision stores human decisions for the active change (2.699292ms)
✔ runCli decision records decisions and validates input (2.36975ms)
✔ generateReview writes a decision-aware review checklist (130.492875ms)
✔ runCli review exposes decision-aware review checklist (126.36675ms)
✔ getNextRecommendation guides users with no active change (2.092541ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.67975ms)
✔ runCli next prints recommendation and supports json output (3.224458ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (197.478167ms)
✔ generatePlanPrompt includes recorded human decisions (4.812208ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.283209ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (390.583875ms)
✔ runCli codex prints no-copy handoff and appears in help (383.346792ms)
✔ generateContextPack writes a portable AI handoff pack (139.015458ms)
✔ generateContextPack flags high-risk auth changes without full proof (82.845959ms)
✔ runCli pack writes and prints the context pack path (74.032333ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (238.379584ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (322.48525ms)
✔ generateCodexHandoff includes smart memory for the next feature (736.819791ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (128.887208ms)
✔ runCli reason prints reasoning path and supports json output (6.346167ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (265.693417ms)
✔ generateUiDashboard shows committed files when working tree is clean (329.326ms)
✔ generateUiDashboard shows ShipSpec audit trail (69.351208ms)
✔ generateUiDashboard shows self-improving loop state (181.215042ms)
✔ generateUiDashboard shows adaptive reasoning state (69.657167ms)
✔ generateUiDashboard shows operator state (245.317125ms)
✔ generateUiDashboard shows human decisions and review state (182.434416ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.298166ms)
✔ runCli ui prints generated dashboard path (67.126875ms)
✔ runCli ui --open opens the generated dashboard (67.524583ms)
✔ runCli run --open starts a mission and opens the dashboard (323.665542ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.308834ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.036209ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.479417ms)
✔ doctorWorkspace reports repo readiness checks (27.9655ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (11.8995ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.496375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.405ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.622459ms)
✔ runCli detect and configure print project detection output (1.962125ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.932583ms)
✔ runCli ci prints generated GitHub Actions path (1.81775ms)
✔ getSpecStatus reports active change files and required proposal sections (1.828334ms)
✔ validateChange passes for a generated spec (1.861458ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.857959ms)
✔ validateChange --ready requires verification evidence (1.761959ms)
✔ validateChange --ready passes after verification evidence exists (52.529458ms)
✔ runCli spec and validate print spec gate output (2.743ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (199.394667ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (82.078166ms)
✔ runCli diff prints review-oriented Git and change status (85.602583ms)
✔ verifyChange runs fast checks by default and writes evidence (53.898292ms)
✔ verifyChange --full includes full-only checks (102.563125ms)
✔ completeChange blocks until verification evidence exists (3.482291ms)
✔ completeChange writes done report after verification evidence exists (75.818167ms)
✔ completeChange includes changed files in done report when Git is available (91.912958ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (134.483334ms)
✔ runCli report prints the report path (134.584792ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (200.275625ms)
✔ runCli release prints release handoff path (174.006958ms)
ℹ tests 112
ℹ suites 0
ℹ pass 112
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13850.731041
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.746958ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.053375ms)
✔ startChange writes a richer OpenSpec proposal template (2.046042ms)
✔ runCli dispatches init, start, and status commands (2.289875ms)
✔ runCli quickstart prepares the low-ceremony project path (78.032875ms)
✔ runCli quickstart --light avoids agent ceremony (74.283917ms)
✔ runMission prepares an AGI-style mission for a new request (332.074417ms)
✔ runMission continues an active change and prepares review when evidence passes (441.9275ms)
✔ runCli with no args asks for a mission when none exists (12.763625ms)
✔ runCli with no args runs autopilot for an active mission (458.518875ms)
✔ runCli routes plain text to Mission Autopilot (331.818125ms)
✔ runCli share aliases pack (67.516ms)
✔ runCli ask aliases share (66.485792ms)
✔ runCli fix aliases light quickstart (71.50025ms)
✔ runCli ship runs ready verification, validation, and report (177.280875ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (202.6305ms)
✔ runCli supports help and version for an installable CLI (0.419791ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.462667ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.596709ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.051542ms)
✔ runCli supports the AGI-style run command (328.836042ms)
✔ runCli skill path prints source and default install target (0.30975ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.805667ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.409791ms)
✔ runSelfTest summarizes command health using an injectable runner (0.367209ms)
✔ runCli examples and self-test print summary output (1.215084ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.368042ms)
✔ runCli desktop prints generated desktop app path (0.784792ms)
✔ package is ready for TypeScript core and npm publishing (0.3085ms)
✔ TypeScript adapters describe ShipSpec integration points (1.725916ms)
✔ runCli adapters lists integration points (0.188125ms)
✔ intake creates a ShipSpec request intake record (1.25625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.240084ms)
✔ room creates role files for the active ShipSpec change (2.536ms)
✔ audit reports ShipSpec delivery trail readiness (3.852ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.175375ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.152208ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (347.1895ms)
✔ learnFromChange stores governed lessons and project patterns (130.754916ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (393.912375ms)
✔ runCli reflect and learn expose self-improving loop commands (192.295666ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (116.529833ms)
✔ runLoop learns when verification and reflection are ready (436.653083ms)
✔ runCli loop exposes the one-pass self-improvement loop (117.796875ms)
✔ runOperation orchestrates safe delivery control loop (190.047458ms)
✔ runCli operate exposes safe operator command with json output (368.917125ms)
✔ runCli autopilot asks for a mission when none is active (12.767084ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (462.211084ms)
✔ runCli autopilot ignores generated setup files before implementation (490.20975ms)
✔ runCli autopilot includes smart memory when routing to AI (815.915542ms)
✔ runCli autopilot guides changed code to ship verification (494.697083ms)
✔ runCli autopilot reports review-ready missions (254.564584ms)
✔ recordDecision stores human decisions for the active change (2.40925ms)
✔ runCli decision records decisions and validates input (2.559875ms)
✔ generateReview writes a decision-aware review checklist (133.3905ms)
✔ runCli review exposes decision-aware review checklist (122.28225ms)
✔ getNextRecommendation guides users with no active change (1.72125ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.495334ms)
✔ runCli next prints recommendation and supports json output (3.23175ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (184.807125ms)
✔ generatePlanPrompt includes recorded human decisions (2.708292ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.397292ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (391.504542ms)
✔ runCli codex prints no-copy handoff and appears in help (389.43975ms)
✔ generateContextPack writes a portable AI handoff pack (137.25075ms)
✔ generateContextPack flags high-risk auth changes without full proof (85.720541ms)
✔ runCli pack writes and prints the context pack path (67.8825ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (244.196875ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (331.982916ms)
✔ generateCodexHandoff includes smart memory for the next feature (723.160625ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (128.201875ms)
✔ runCli reason prints reasoning path and supports json output (5.510708ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (272.249416ms)
✔ generateUiDashboard shows committed files when working tree is clean (333.974458ms)
✔ generateUiDashboard shows ShipSpec audit trail (71.241584ms)
✔ generateUiDashboard shows self-improving loop state (188.465791ms)
✔ generateUiDashboard shows adaptive reasoning state (73.375792ms)
✔ generateUiDashboard shows operator state (259.302541ms)
✔ generateUiDashboard shows human decisions and review state (180.221959ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.410209ms)
✔ runCli ui prints generated dashboard path (68.280417ms)
✔ runCli ui --open opens the generated dashboard (65.570042ms)
✔ runCli run --open starts a mission and opens the dashboard (325.553291ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.208ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.472792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.516875ms)
✔ doctorWorkspace reports repo readiness checks (29.390083ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (11.513042ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.458666ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.392709ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.7925ms)
✔ runCli detect and configure print project detection output (1.610458ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.750833ms)
✔ runCli ci prints generated GitHub Actions path (1.34ms)
✔ getSpecStatus reports active change files and required proposal sections (1.889916ms)
✔ validateChange passes for a generated spec (1.788334ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.501125ms)
✔ validateChange --ready requires verification evidence (1.834416ms)
✔ validateChange --ready passes after verification evidence exists (51.877917ms)
✔ runCli spec and validate print spec gate output (2.420541ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (196.674542ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (82.42875ms)
✔ runCli diff prints review-oriented Git and change status (82.892958ms)
✔ verifyChange runs fast checks by default and writes evidence (54.547709ms)
✔ verifyChange --full includes full-only checks (102.820833ms)
✔ completeChange blocks until verification evidence exists (2.537083ms)
✔ completeChange writes done report after verification evidence exists (76.308584ms)
✔ completeChange includes changed files in done report when Git is available (93.452208ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (136.695291ms)
✔ runCli report prints the report path (134.115ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (201.271917ms)
✔ runCli release prints release handoff path (177.804375ms)
ℹ tests 112
ℹ suites 0
ℹ pass 112
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13904.212041
```

