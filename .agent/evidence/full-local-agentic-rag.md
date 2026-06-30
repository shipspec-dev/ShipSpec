# Full local agentic RAG Verification Evidence

Mode: full
Generated: 2026-06-30T09:37:25.799Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.5145ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.291625ms)
✔ startChange writes a richer OpenSpec proposal template (2.243958ms)
✔ runCli dispatches init, start, and status commands (2.665333ms)
✔ runCli quickstart prepares the low-ceremony project path (95.405875ms)
✔ runCli quickstart --light avoids agent ceremony (85.630417ms)
✔ runMission prepares an AGI-style mission for a new request (516.405542ms)
✔ runMission does not suggest generated setup files as likely files (536.183458ms)
✔ runMission continues an active change and prepares review when evidence passes (654.561083ms)
✔ runCli with no args asks for a mission when none exists (16.015333ms)
✔ runCli with no args runs autopilot for an active mission (759.88725ms)
✔ runCli routes plain text to Mission Autopilot (512.9135ms)
✔ runCli share aliases pack (87.228042ms)
✔ runCli ask aliases share (87.567042ms)
✔ runCli fix aliases light quickstart (88.173625ms)
✔ runCli ship runs ready verification, validation, and report (239.45175ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (256.460791ms)
✔ runCli supports help and version for an installable CLI (0.313917ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.777709ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (14.238125ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.417042ms)
✔ runCli supports the AGI-style run command (537.17325ms)
✔ runCli skill path prints source and default install target (0.337958ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.733084ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.485375ms)
✔ runSelfTest summarizes command health using an injectable runner (0.236333ms)
✔ runCli examples and self-test print summary output (1.580959ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.646542ms)
✔ runCli desktop prints generated desktop app path (1.086542ms)
✔ package is ready for TypeScript core and npm publishing (0.291958ms)
✔ TypeScript adapters describe ShipSpec integration points (0.36625ms)
✔ runCli adapters lists integration points (0.174125ms)
✔ intake creates a ShipSpec request intake record (1.563625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.265042ms)
✔ room creates role files for the active ShipSpec change (3.204833ms)
✔ audit reports ShipSpec delivery trail readiness (3.550458ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.33925ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.4375ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (440.695875ms)
✔ learnFromChange stores governed lessons and project patterns (166.864834ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (557.582542ms)
✔ runCli reflect and learn expose self-improving loop commands (264.396ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (146.380916ms)
✔ runLoop learns when verification and reflection are ready (592.168333ms)
✔ runCli loop exposes the one-pass self-improvement loop (151.213375ms)
✔ runOperation orchestrates safe delivery control loop (325.055459ms)
✔ runCli operate exposes safe operator command with json output (646.409167ms)
✔ runCli autopilot asks for a mission when none is active (18.842667ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (686.709917ms)
✔ runCli autopilot ignores generated setup files before implementation (796.297917ms)
✔ runCli autopilot includes smart memory when routing to AI (1169.653ms)
✔ runCli autopilot guides changed code to ship verification (729.026125ms)
✔ runCli autopilot reports review-ready missions (326.809542ms)
✔ recordDecision stores human decisions for the active change (2.587666ms)
✔ runCli decision records decisions and validates input (2.549875ms)
✔ generateReview writes a decision-aware review checklist (167.684208ms)
✔ runCli review exposes decision-aware review checklist (161.840375ms)
✔ getNextRecommendation guides users with no active change (1.679917ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.70325ms)
✔ runCli next prints recommendation and supports json output (3.496583ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (314.92325ms)
✔ generatePlanPrompt includes recorded human decisions (2.916ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.577375ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (586.345375ms)
✔ runCli codex prints no-copy handoff and appears in help (586.470792ms)
✔ generateContextPack writes a portable AI handoff pack (174.100083ms)
✔ generateAgenticContext writes local retrieval context for the active change (104.273833ms)
✔ runCli context supports json output (83.780333ms)
✔ runCli rag writes cited local retrieval report and json output (85.327875ms)
✔ runCli rag excludes unsafe and noisy files from the local index (85.380459ms)
✔ generateAgenticContext links the full RAG report when available (167.791416ms)
✔ generateAgenticContext marks empty retrieval context as weak (85.493375ms)
✔ generateAgenticContext does not flag skipped none as risk (146.432625ms)
✔ generateContextPack flags high-risk auth changes without full proof (110.405166ms)
✔ runCli pack writes and prints the context pack path (83.939125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (309.427875ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (417.36275ms)
✔ generateCodexHandoff includes smart memory for the next feature (1024.859833ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (164.512041ms)
✔ runCli reason prints reasoning path and supports json output (3.820208ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (345.012ms)
✔ generateUiDashboard keeps the first screen compact (109.891375ms)
✔ generateUiDashboard keeps progress out of the first viewport (104.182875ms)
✔ generateUiDashboard moves full likely files into advanced details (107.295125ms)
✔ generateUiDashboard uses short likely-file labels above the fold (106.518333ms)
✔ generateUiDashboard shows committed files when working tree is clean (420.984917ms)
✔ generateUiDashboard shows ShipSpec audit trail (87.912416ms)
✔ generateUiDashboard shows self-improving loop state (239.004125ms)
✔ generateUiDashboard shows adaptive reasoning state (93.045708ms)
✔ generateUiDashboard shows operator state (412.175083ms)
✔ generateUiDashboard shows human decisions and review state (250.589875ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.153666ms)
✔ runCli ui prints generated dashboard path (92.261792ms)
✔ runCli ui --open opens the generated dashboard (90.695875ms)
✔ generateAppDashboard writes a richer Mission Control app shell (113.733417ms)
✔ generateAppDashboard makes the mission home a dense dashboard (115.249333ms)
✔ runCli app prints generated app path and supports open (87.893958ms)
✔ runCli run --open starts a mission and opens the dashboard (503.265083ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.137042ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.019ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.66325ms)
✔ doctorWorkspace reports repo readiness checks (33.713292ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (16.528958ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.775667ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.423833ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.806375ms)
✔ runCli detect and configure print project detection output (1.766334ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.117333ms)
✔ runCli ci prints generated GitHub Actions path (1.562792ms)
✔ getSpecStatus reports active change files and required proposal sections (1.792583ms)
✔ validateChange passes for a generated spec (1.880459ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.2085ms)
✔ validateChange --ready requires verification evidence (2.791667ms)
✔ validateChange --ready passes after verification evidence exists (69.61725ms)
✔ runCli spec and validate print spec gate output (2.532167ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (251.540792ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (102.834875ms)
✔ runCli diff prints review-oriented Git and change status (101.756375ms)
✔ verifyChange runs fast checks by default and writes evidence (60.461791ms)
✔ verifyChange --full includes full-only checks (128.402625ms)
✔ completeChange blocks until verification evidence exists (2.681333ms)
✔ completeChange writes done report after verification evidence exists (87.132917ms)
✔ completeChange includes changed files in done report when Git is available (117.190875ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (162.679625ms)
✔ runCli report prints the report path (161.626458ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (248.6725ms)
✔ runCli release prints release handoff path (234.541083ms)
ℹ tests 127
ℹ suites 0
ℹ pass 127
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 21665.266875
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

✔ initWorkspace creates repo-local delivery folders and default workflow (12.696333ms)
✔ startChange creates an OpenSpec change, task file, and active status (5.800875ms)
✔ startChange writes a richer OpenSpec proposal template (2.796792ms)
✔ runCli dispatches init, start, and status commands (2.741833ms)
✔ runCli quickstart prepares the low-ceremony project path (125.131542ms)
✔ runCli quickstart --light avoids agent ceremony (159.763292ms)
✔ runMission prepares an AGI-style mission for a new request (525.324708ms)
✔ runMission does not suggest generated setup files as likely files (581.429ms)
✔ runMission continues an active change and prepares review when evidence passes (721.370667ms)
✔ runCli with no args asks for a mission when none exists (17.467625ms)
✔ runCli with no args runs autopilot for an active mission (734.637042ms)
✔ runCli routes plain text to Mission Autopilot (513.708084ms)
✔ runCli share aliases pack (83.919166ms)
✔ runCli ask aliases share (83.783708ms)
✔ runCli fix aliases light quickstart (88.551791ms)
✔ runCli ship runs ready verification, validation, and report (229.920875ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (297.842333ms)
✔ runCli supports help and version for an installable CLI (0.43025ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.153167ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.130666ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.352792ms)
✔ runCli supports the AGI-style run command (501.276792ms)
✔ runCli skill path prints source and default install target (0.329667ms)
✔ runCli skill install copies the bundled ShipSpec skill (5.413333ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.598792ms)
✔ runSelfTest summarizes command health using an injectable runner (0.292333ms)
✔ runCli examples and self-test print summary output (1.595334ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.344084ms)
✔ runCli desktop prints generated desktop app path (1.216083ms)
✔ package is ready for TypeScript core and npm publishing (0.352334ms)
✔ TypeScript adapters describe ShipSpec integration points (0.511917ms)
✔ runCli adapters lists integration points (0.165625ms)
✔ intake creates a ShipSpec request intake record (1.561333ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.259291ms)
✔ room creates role files for the active ShipSpec change (3.304666ms)
✔ audit reports ShipSpec delivery trail readiness (3.5615ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.241791ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.392333ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (430.80975ms)
✔ learnFromChange stores governed lessons and project patterns (169.349917ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (491.833583ms)
✔ runCli reflect and learn expose self-improving loop commands (242.199208ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (142.603708ms)
✔ runLoop learns when verification and reflection are ready (551.437416ms)
✔ runCli loop exposes the one-pass self-improvement loop (150.06675ms)
✔ runOperation orchestrates safe delivery control loop (329.614459ms)
✔ runCli operate exposes safe operator command with json output (635.462917ms)
✔ runCli autopilot asks for a mission when none is active (15.6155ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (684.023917ms)
✔ runCli autopilot ignores generated setup files before implementation (726.812291ms)
✔ runCli autopilot includes smart memory when routing to AI (1165.896875ms)
✔ runCli autopilot guides changed code to ship verification (758.965667ms)
✔ runCli autopilot reports review-ready missions (322.6535ms)
✔ recordDecision stores human decisions for the active change (2.930291ms)
✔ runCli decision records decisions and validates input (2.546666ms)
✔ generateReview writes a decision-aware review checklist (165.046334ms)
✔ runCli review exposes decision-aware review checklist (162.533667ms)
✔ getNextRecommendation guides users with no active change (1.985125ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.111958ms)
✔ runCli next prints recommendation and supports json output (5.971709ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (324.335625ms)
✔ generatePlanPrompt includes recorded human decisions (2.960417ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.518833ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (583.634958ms)
✔ runCli codex prints no-copy handoff and appears in help (580.586416ms)
✔ generateContextPack writes a portable AI handoff pack (166.619125ms)
✔ generateAgenticContext writes local retrieval context for the active change (106.2175ms)
✔ runCli context supports json output (87.072834ms)
✔ runCli rag writes cited local retrieval report and json output (87.169458ms)
✔ runCli rag excludes unsafe and noisy files from the local index (86.6565ms)
✔ generateAgenticContext links the full RAG report when available (167.471958ms)
✔ generateAgenticContext marks empty retrieval context as weak (86.432958ms)
✔ generateAgenticContext does not flag skipped none as risk (143.335709ms)
✔ generateContextPack flags high-risk auth changes without full proof (106.604834ms)
✔ runCli pack writes and prints the context pack path (84.61625ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (312.937083ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (424.709375ms)
✔ generateCodexHandoff includes smart memory for the next feature (1018.312583ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (163.34175ms)
✔ runCli reason prints reasoning path and supports json output (4.067708ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (334.358875ms)
✔ generateUiDashboard keeps the first screen compact (109.127959ms)
✔ generateUiDashboard keeps progress out of the first viewport (104.711583ms)
✔ generateUiDashboard moves full likely files into advanced details (107.624833ms)
✔ generateUiDashboard uses short likely-file labels above the fold (111.299209ms)
✔ generateUiDashboard shows committed files when working tree is clean (414.53575ms)
✔ generateUiDashboard shows ShipSpec audit trail (87.268708ms)
✔ generateUiDashboard shows self-improving loop state (227.061334ms)
✔ generateUiDashboard shows adaptive reasoning state (86.543459ms)
✔ generateUiDashboard shows operator state (399.381625ms)
✔ generateUiDashboard shows human decisions and review state (227.832708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.307292ms)
✔ runCli ui prints generated dashboard path (84.787666ms)
✔ runCli ui --open opens the generated dashboard (86.051833ms)
✔ generateAppDashboard writes a richer Mission Control app shell (113.296416ms)
✔ generateAppDashboard makes the mission home a dense dashboard (111.726084ms)
✔ runCli app prints generated app path and supports open (91.358833ms)
✔ runCli run --open starts a mission and opens the dashboard (508.003417ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.124084ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.764291ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.843875ms)
✔ doctorWorkspace reports repo readiness checks (34.186375ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.288125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.770416ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.581625ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.141375ms)
✔ runCli detect and configure print project detection output (1.923042ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.975041ms)
✔ runCli ci prints generated GitHub Actions path (1.363ms)
✔ getSpecStatus reports active change files and required proposal sections (1.845959ms)
✔ validateChange passes for a generated spec (1.982167ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.454458ms)
✔ validateChange --ready requires verification evidence (2.215458ms)
✔ validateChange --ready passes after verification evidence exists (59.328042ms)
✔ runCli spec and validate print spec gate output (2.803417ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (251.34575ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (103.247166ms)
✔ runCli diff prints review-oriented Git and change status (100.901833ms)
✔ verifyChange runs fast checks by default and writes evidence (66.593916ms)
✔ verifyChange --full includes full-only checks (126.068333ms)
✔ completeChange blocks until verification evidence exists (22.501083ms)
✔ completeChange writes done report after verification evidence exists (112.726833ms)
✔ completeChange includes changed files in done report when Git is available (106.3795ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (159.312041ms)
✔ runCli report prints the report path (161.7995ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (249.224917ms)
✔ runCli release prints release handoff path (222.021375ms)
ℹ tests 127
ℹ suites 0
ℹ pass 127
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 21613.230542
```
