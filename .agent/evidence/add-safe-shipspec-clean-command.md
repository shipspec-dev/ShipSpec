# Add safe ShipSpec clean command Verification Evidence

Mode: full
Generated: 2026-06-24T16:43:22.218Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.878833ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.292458ms)
✔ startChange writes a richer OpenSpec proposal template (2.09275ms)
✔ runCli dispatches init, start, and status commands (2.530042ms)
✔ runCli quickstart prepares the low-ceremony project path (94.885083ms)
✔ runCli quickstart --light avoids agent ceremony (95.90075ms)
✔ runMission prepares an AGI-style mission for a new request (370.917958ms)
✔ runMission continues an active change and prepares review when evidence passes (508.893791ms)
✔ runCli with no args shows the operator guide instead of raw help (87.236625ms)
✔ runCli routes plain text to quickstart (88.279333ms)
✔ runCli share aliases pack (86.529333ms)
✔ runCli ask aliases share (85.468042ms)
✔ runCli fix aliases light quickstart (86.816542ms)
✔ runCli ship runs ready verification, validation, and report (136.427625ms)
✔ runCli supports help and version for an installable CLI (0.286666ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.895458ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.39825ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.786666ms)
✔ runCli supports the AGI-style run command (333.605958ms)
✔ runCli skill path prints source and default install target (0.332541ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.173584ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.695709ms)
✔ runSelfTest summarizes command health using an injectable runner (0.349667ms)
✔ runCli examples and self-test print summary output (1.293333ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.478708ms)
✔ runCli desktop prints generated desktop app path (1.221ms)
✔ package is ready for TypeScript core and npm publishing (0.44975ms)
✔ TypeScript adapters describe ShipSpec integration points (0.480917ms)
✔ runCli adapters lists integration points (0.2015ms)
✔ intake creates a ShipSpec request intake record (2.099125ms)
✔ contract creates a delivery contract for the active ShipSpec change (9.225958ms)
✔ room creates role files for the active ShipSpec change (3.065167ms)
✔ audit reports ShipSpec delivery trail readiness (18.918583ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.424958ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.272208ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (403.187083ms)
✔ learnFromChange stores governed lessons and project patterns (85.787875ms)
✔ runCli reflect and learn expose self-improving loop commands (159.983583ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (136.907417ms)
✔ runLoop learns when verification and reflection are ready (468.994041ms)
✔ runCli loop exposes the one-pass self-improvement loop (149.001459ms)
✔ runOperation orchestrates safe delivery control loop (224.980959ms)
✔ runCli operate exposes safe operator command with json output (451.589334ms)
✔ recordDecision stores human decisions for the active change (2.593083ms)
✔ runCli decision records decisions and validates input (2.821708ms)
✔ generateReview writes a decision-aware review checklist (174.7745ms)
✔ runCli review exposes decision-aware review checklist (171.719292ms)
✔ getNextRecommendation guides users with no active change (1.630208ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.146125ms)
✔ runCli next prints recommendation and supports json output (4.071625ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (242.562042ms)
✔ generatePlanPrompt includes recorded human decisions (2.850125ms)
✔ runCli prompt prints Plan mode prompt and supports json output (6.219208ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (356.915333ms)
✔ runCli codex prints no-copy handoff and appears in help (337.24ms)
✔ generateContextPack writes a portable AI handoff pack (173.11575ms)
✔ generateContextPack flags high-risk auth changes without full proof (101.158833ms)
✔ runCli pack writes and prints the context pack path (83.20325ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (220.538209ms)
✔ runCli memory prints memory summary and supports json output (85.914542ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (84.988166ms)
✔ runCli reason prints reasoning path and supports json output (3.17325ms)
✔ generateUiDashboard writes a single-page pixel dashboard (330.898083ms)
✔ generateUiDashboard shows committed files when working tree is clean (397.496667ms)
✔ generateUiDashboard shows ShipSpec audit trail (88.778125ms)
✔ generateUiDashboard shows self-improving loop state (218.349708ms)
✔ generateUiDashboard shows adaptive reasoning state (87.160875ms)
✔ generateUiDashboard shows operator state (315.322ms)
✔ generateUiDashboard shows human decisions and review state (218.932375ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.489458ms)
✔ runCli ui prints generated dashboard path (83.239458ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.699083ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.920042ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.888208ms)
✔ doctorWorkspace reports repo readiness checks (34.250042ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (3.793375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.724584ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.155ms)
✔ runCli detect and configure print project detection output (2.400875ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.325583ms)
✔ runCli ci prints generated GitHub Actions path (1.910541ms)
✔ getSpecStatus reports active change files and required proposal sections (1.805ms)
✔ validateChange passes for a generated spec (1.982583ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.44875ms)
✔ validateChange --ready requires verification evidence (2.133417ms)
✔ validateChange --ready passes after verification evidence exists (60.663667ms)
✔ runCli spec and validate print spec gate output (3.019291ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (262.503167ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (111.036167ms)
✔ runCli diff prints review-oriented Git and change status (111.594ms)
✔ verifyChange runs fast checks by default and writes evidence (64.337125ms)
✔ verifyChange --full includes full-only checks (126.662041ms)
✔ completeChange blocks until verification evidence exists (2.840042ms)
✔ completeChange writes done report after verification evidence exists (93.311292ms)
✔ completeChange includes changed files in done report when Git is available (115.058917ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (168.069583ms)
✔ runCli report prints the report path (165.863041ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (243.213ms)
✔ runCli release prints release handoff path (214.181541ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9876.299708
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.085625ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.503833ms)
✔ startChange writes a richer OpenSpec proposal template (2.31875ms)
✔ runCli dispatches init, start, and status commands (2.369292ms)
✔ runCli quickstart prepares the low-ceremony project path (93.588083ms)
✔ runCli quickstart --light avoids agent ceremony (88.035167ms)
✔ runMission prepares an AGI-style mission for a new request (335.767208ms)
✔ runMission continues an active change and prepares review when evidence passes (461.230583ms)
✔ runCli with no args shows the operator guide instead of raw help (77.5315ms)
✔ runCli routes plain text to quickstart (90.45425ms)
✔ runCli share aliases pack (87.460292ms)
✔ runCli ask aliases share (85.485834ms)
✔ runCli fix aliases light quickstart (86.292958ms)
✔ runCli ship runs ready verification, validation, and report (151.314542ms)
✔ runCli supports help and version for an installable CLI (0.369875ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (23.217792ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.812792ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.840458ms)
✔ runCli supports the AGI-style run command (371.340584ms)
✔ runCli skill path prints source and default install target (0.659458ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.279042ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.847833ms)
✔ runSelfTest summarizes command health using an injectable runner (0.276166ms)
✔ runCli examples and self-test print summary output (1.394ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.548084ms)
✔ runCli desktop prints generated desktop app path (1.086917ms)
✔ package is ready for TypeScript core and npm publishing (0.341708ms)
✔ TypeScript adapters describe ShipSpec integration points (0.456917ms)
✔ runCli adapters lists integration points (0.174167ms)
✔ intake creates a ShipSpec request intake record (1.531792ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.051542ms)
✔ room creates role files for the active ShipSpec change (2.861208ms)
✔ audit reports ShipSpec delivery trail readiness (5.179916ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.38575ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.807375ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (419.031375ms)
✔ learnFromChange stores governed lessons and project patterns (84.704125ms)
✔ runCli reflect and learn expose self-improving loop commands (165.683708ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (136.682167ms)
✔ runLoop learns when verification and reflection are ready (474.608333ms)
✔ runCli loop exposes the one-pass self-improvement loop (140.8425ms)
✔ runOperation orchestrates safe delivery control loop (227.599834ms)
✔ runCli operate exposes safe operator command with json output (451.805292ms)
✔ recordDecision stores human decisions for the active change (2.766625ms)
✔ runCli decision records decisions and validates input (2.516ms)
✔ generateReview writes a decision-aware review checklist (165.968333ms)
✔ runCli review exposes decision-aware review checklist (154.32825ms)
✔ getNextRecommendation guides users with no active change (1.721125ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.045334ms)
✔ runCli next prints recommendation and supports json output (5.461625ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (226.10225ms)
✔ generatePlanPrompt includes recorded human decisions (2.567583ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.168125ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (334.283125ms)
✔ runCli codex prints no-copy handoff and appears in help (337.869916ms)
✔ generateContextPack writes a portable AI handoff pack (181.09425ms)
✔ generateContextPack flags high-risk auth changes without full proof (114.072834ms)
✔ runCli pack writes and prints the context pack path (91.400125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (245.440542ms)
✔ runCli memory prints memory summary and supports json output (91.361666ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (91.086ms)
✔ runCli reason prints reasoning path and supports json output (3.595292ms)
✔ generateUiDashboard writes a single-page pixel dashboard (348.662375ms)
✔ generateUiDashboard shows committed files when working tree is clean (402.9025ms)
✔ generateUiDashboard shows ShipSpec audit trail (85.423375ms)
✔ generateUiDashboard shows self-improving loop state (221.997291ms)
✔ generateUiDashboard shows adaptive reasoning state (88.936875ms)
✔ generateUiDashboard shows operator state (302.037542ms)
✔ generateUiDashboard shows human decisions and review state (226.824542ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.467291ms)
✔ runCli ui prints generated dashboard path (80.184167ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.392417ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.052958ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.712375ms)
✔ doctorWorkspace reports repo readiness checks (33.700542ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (2.271125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.4505ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.809292ms)
✔ runCli detect and configure print project detection output (2.022ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.846042ms)
✔ runCli ci prints generated GitHub Actions path (1.352416ms)
✔ getSpecStatus reports active change files and required proposal sections (1.629ms)
✔ validateChange passes for a generated spec (1.582375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.171584ms)
✔ validateChange --ready requires verification evidence (1.775667ms)
✔ validateChange --ready passes after verification evidence exists (61.400917ms)
✔ runCli spec and validate print spec gate output (2.760417ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (243.532334ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (102.617333ms)
✔ runCli diff prints review-oriented Git and change status (97.254834ms)
✔ verifyChange runs fast checks by default and writes evidence (61.0215ms)
✔ verifyChange --full includes full-only checks (122.862375ms)
✔ completeChange blocks until verification evidence exists (2.795666ms)
✔ completeChange writes done report after verification evidence exists (88.8915ms)
✔ completeChange includes changed files in done report when Git is available (108.334916ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (158.459459ms)
✔ runCli report prints the report path (159.609542ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (255.6455ms)
✔ runCli release prints release handoff path (236.841167ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9798.396
```

