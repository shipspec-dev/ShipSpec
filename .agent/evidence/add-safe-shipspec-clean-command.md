# Add safe ShipSpec clean command Verification Evidence

Mode: full
Generated: 2026-06-24T16:46:20.723Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (12.523458ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.685417ms)
✔ startChange writes a richer OpenSpec proposal template (2.066167ms)
✔ runCli dispatches init, start, and status commands (2.513375ms)
✔ runCli quickstart prepares the low-ceremony project path (106.276291ms)
✔ runCli quickstart --light avoids agent ceremony (101.078208ms)
✔ runMission prepares an AGI-style mission for a new request (357.811708ms)
✔ runMission continues an active change and prepares review when evidence passes (507.297166ms)
✔ runCli with no args shows the operator guide instead of raw help (85.82525ms)
✔ runCli routes plain text to quickstart (87.219ms)
✔ runCli share aliases pack (82.550167ms)
✔ runCli ask aliases share (82.318417ms)
✔ runCli fix aliases light quickstart (85.451917ms)
✔ runCli ship runs ready verification, validation, and report (144.463917ms)
✔ runCli supports help and version for an installable CLI (0.294166ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.508458ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.472625ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.731083ms)
✔ runCli supports the AGI-style run command (331.242917ms)
✔ runCli skill path prints source and default install target (0.517625ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.103209ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.661208ms)
✔ runSelfTest summarizes command health using an injectable runner (0.26775ms)
✔ runCli examples and self-test print summary output (1.454833ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.685833ms)
✔ runCli desktop prints generated desktop app path (1.159666ms)
✔ package is ready for TypeScript core and npm publishing (0.333958ms)
✔ TypeScript adapters describe ShipSpec integration points (0.988625ms)
✔ runCli adapters lists integration points (0.182ms)
✔ intake creates a ShipSpec request intake record (1.460708ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.345125ms)
✔ room creates role files for the active ShipSpec change (3.166375ms)
✔ audit reports ShipSpec delivery trail readiness (3.915875ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.576125ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.227459ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (412.46325ms)
✔ learnFromChange stores governed lessons and project patterns (84.702875ms)
✔ runCli reflect and learn expose self-improving loop commands (165.835083ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (139.652166ms)
✔ runLoop learns when verification and reflection are ready (474.482083ms)
✔ runCli loop exposes the one-pass self-improvement loop (138.317ms)
✔ runOperation orchestrates safe delivery control loop (231.058166ms)
✔ runCli operate exposes safe operator command with json output (458.271125ms)
✔ recordDecision stores human decisions for the active change (4.579458ms)
✔ runCli decision records decisions and validates input (2.832542ms)
✔ generateReview writes a decision-aware review checklist (174.672583ms)
✔ runCli review exposes decision-aware review checklist (171.987167ms)
✔ getNextRecommendation guides users with no active change (2.170834ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.340917ms)
✔ runCli next prints recommendation and supports json output (4.259833ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (248.713208ms)
✔ generatePlanPrompt includes recorded human decisions (2.92575ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.360833ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (355.751416ms)
✔ runCli codex prints no-copy handoff and appears in help (331.876875ms)
✔ generateContextPack writes a portable AI handoff pack (166.920958ms)
✔ generateContextPack flags high-risk auth changes without full proof (109.274958ms)
✔ runCli pack writes and prints the context pack path (77.712958ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (225.714ms)
✔ runCli memory prints memory summary and supports json output (84.211042ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (80.114458ms)
✔ runCli reason prints reasoning path and supports json output (3.695625ms)
✔ generateUiDashboard writes a single-page pixel dashboard (324.929458ms)
✔ generateUiDashboard shows committed files when working tree is clean (422.733792ms)
✔ generateUiDashboard shows ShipSpec audit trail (89.391042ms)
✔ generateUiDashboard shows self-improving loop state (222.383292ms)
✔ generateUiDashboard shows adaptive reasoning state (83.617833ms)
✔ generateUiDashboard shows operator state (315.98175ms)
✔ generateUiDashboard shows human decisions and review state (215.74125ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.317417ms)
✔ runCli ui prints generated dashboard path (85.590375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.65175ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.997333ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.419292ms)
✔ doctorWorkspace reports repo readiness checks (34.041917ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.70775ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.634291ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.240875ms)
✔ runCli detect and configure print project detection output (2.463167ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.958833ms)
✔ runCli ci prints generated GitHub Actions path (1.539834ms)
✔ getSpecStatus reports active change files and required proposal sections (2.140167ms)
✔ validateChange passes for a generated spec (2.135084ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.037958ms)
✔ validateChange --ready requires verification evidence (2.443583ms)
✔ validateChange --ready passes after verification evidence exists (63.075083ms)
✔ runCli spec and validate print spec gate output (4.941542ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (258.797333ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (109.482166ms)
✔ runCli diff prints review-oriented Git and change status (109.932625ms)
✔ verifyChange runs fast checks by default and writes evidence (64.054625ms)
✔ verifyChange --full includes full-only checks (227.4675ms)
✔ completeChange blocks until verification evidence exists (3.237666ms)
✔ completeChange writes done report after verification evidence exists (97.5065ms)
✔ completeChange includes changed files in done report when Git is available (116.836625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (203.28225ms)
✔ runCli report prints the report path (163.733875ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (253.8825ms)
✔ runCli release prints release handoff path (223.964166ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 10052.327583
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.241917ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.342333ms)
✔ startChange writes a richer OpenSpec proposal template (2.742084ms)
✔ runCli dispatches init, start, and status commands (2.165875ms)
✔ runCli quickstart prepares the low-ceremony project path (93.878167ms)
✔ runCli quickstart --light avoids agent ceremony (89.29825ms)
✔ runMission prepares an AGI-style mission for a new request (332.533917ms)
✔ runMission continues an active change and prepares review when evidence passes (466.290167ms)
✔ runCli with no args shows the operator guide instead of raw help (82.980083ms)
✔ runCli routes plain text to quickstart (89.876959ms)
✔ runCli share aliases pack (88.686375ms)
✔ runCli ask aliases share (91.918584ms)
✔ runCli fix aliases light quickstart (91.960625ms)
✔ runCli ship runs ready verification, validation, and report (149.872916ms)
✔ runCli supports help and version for an installable CLI (0.3285ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.682667ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.74425ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.568458ms)
✔ runCli supports the AGI-style run command (358.969959ms)
✔ runCli skill path prints source and default install target (0.363583ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.401708ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.508167ms)
✔ runSelfTest summarizes command health using an injectable runner (0.236833ms)
✔ runCli examples and self-test print summary output (1.562458ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.446125ms)
✔ runCli desktop prints generated desktop app path (0.9845ms)
✔ package is ready for TypeScript core and npm publishing (0.519542ms)
✔ TypeScript adapters describe ShipSpec integration points (0.509416ms)
✔ runCli adapters lists integration points (0.242084ms)
✔ intake creates a ShipSpec request intake record (1.505042ms)
✔ contract creates a delivery contract for the active ShipSpec change (3.377917ms)
✔ room creates role files for the active ShipSpec change (3.140083ms)
✔ audit reports ShipSpec delivery trail readiness (3.8085ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.509833ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.296833ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (404.618292ms)
✔ learnFromChange stores governed lessons and project patterns (84.796208ms)
✔ runCli reflect and learn expose self-improving loop commands (165.142792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (144.800416ms)
✔ runLoop learns when verification and reflection are ready (471.076541ms)
✔ runCli loop exposes the one-pass self-improvement loop (141.565208ms)
✔ runOperation orchestrates safe delivery control loop (229.911333ms)
✔ runCli operate exposes safe operator command with json output (455.423417ms)
✔ recordDecision stores human decisions for the active change (3.301ms)
✔ runCli decision records decisions and validates input (2.924584ms)
✔ generateReview writes a decision-aware review checklist (165.951625ms)
✔ runCli review exposes decision-aware review checklist (155.830875ms)
✔ getNextRecommendation guides users with no active change (1.469042ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.43075ms)
✔ runCli next prints recommendation and supports json output (3.876875ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (233.481917ms)
✔ generatePlanPrompt includes recorded human decisions (2.736334ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.720208ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (339.622375ms)
✔ runCli codex prints no-copy handoff and appears in help (342.742958ms)
✔ generateContextPack writes a portable AI handoff pack (172.376167ms)
✔ generateContextPack flags high-risk auth changes without full proof (113.060041ms)
✔ runCli pack writes and prints the context pack path (115.680125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (239.253208ms)
✔ runCli memory prints memory summary and supports json output (91.037625ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (88.604625ms)
✔ runCli reason prints reasoning path and supports json output (3.995709ms)
✔ generateUiDashboard writes a single-page pixel dashboard (323.322208ms)
✔ generateUiDashboard shows committed files when working tree is clean (414.48ms)
✔ generateUiDashboard shows ShipSpec audit trail (136.934541ms)
✔ generateUiDashboard shows self-improving loop state (255.793291ms)
✔ generateUiDashboard shows adaptive reasoning state (120.413209ms)
✔ generateUiDashboard shows operator state (317.747458ms)
✔ generateUiDashboard shows human decisions and review state (222.816208ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.63725ms)
✔ runCli ui prints generated dashboard path (86.535833ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.003458ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.1425ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.562792ms)
✔ doctorWorkspace reports repo readiness checks (33.386667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.71125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.714125ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.307333ms)
✔ runCli detect and configure print project detection output (2.324959ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.866792ms)
✔ runCli ci prints generated GitHub Actions path (1.607ms)
✔ getSpecStatus reports active change files and required proposal sections (2.422416ms)
✔ validateChange passes for a generated spec (2.030458ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.260292ms)
✔ validateChange --ready requires verification evidence (2.153458ms)
✔ validateChange --ready passes after verification evidence exists (63.793667ms)
✔ runCli spec and validate print spec gate output (5.280458ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (242.880833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (116.987ms)
✔ runCli diff prints review-oriented Git and change status (104.206125ms)
✔ verifyChange runs fast checks by default and writes evidence (65.023916ms)
✔ verifyChange --full includes full-only checks (114.020291ms)
✔ completeChange blocks until verification evidence exists (1.938584ms)
✔ completeChange writes done report after verification evidence exists (89.183792ms)
✔ completeChange includes changed files in done report when Git is available (107.986625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (168.725ms)
✔ runCli report prints the report path (168.1805ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (264.225584ms)
✔ runCli release prints release handoff path (233.469625ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9989.971666
```

