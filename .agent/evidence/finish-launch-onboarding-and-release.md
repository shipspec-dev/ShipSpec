# Finish launch onboarding and release Verification Evidence

Mode: full
Generated: 2026-07-02T14:38:59.261Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.695292ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.132417ms)
✔ startChange writes a richer OpenSpec proposal template (2.098917ms)
✔ runCli dispatches init, start, and status commands (2.472958ms)
✔ runCli quickstart prepares the low-ceremony project path (86.409ms)
✔ runCli quickstart --light avoids agent ceremony (82.257875ms)
✔ runMission prepares an AGI-style mission for a new request (548.406125ms)
✔ runMission does not suggest generated setup files as likely files (614.415875ms)
✔ runMission continues an active change and prepares review when evidence passes (603.893417ms)
✔ runCli with no args asks for a mission when none exists (16.242125ms)
✔ runCli with no args runs autopilot for an active mission (739.807625ms)
✔ runCli routes plain text to Mission Autopilot (505.377791ms)
✔ runCli share aliases pack (79.211916ms)
✔ runCli ask aliases share (83.855917ms)
✔ runCli fix aliases light quickstart (109.204167ms)
✔ runCli ship runs ready verification, validation, and report (249.961583ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (322.659875ms)
✔ runCli supports help and version for an installable CLI (0.975542ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (23.039041ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.367375ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.582958ms)
✔ runCli supports the AGI-style run command (544.8165ms)
✔ runCli skill path prints source and default install target (0.459041ms)
✔ runCli skill install copies the bundled ShipSpec skill (5.052458ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (3.038375ms)
✔ runSelfTest summarizes command health using an injectable runner (0.409583ms)
✔ runCli examples and self-test print summary output (2.759417ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.352875ms)
✔ runCli desktop prints generated desktop app path (1.0175ms)
✔ package is ready for TypeScript core and npm publishing (0.345667ms)
✔ TypeScript adapters describe ShipSpec integration points (0.959083ms)
✔ runCli adapters lists integration points (0.357375ms)
✔ intake creates a ShipSpec request intake record (1.466625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.410083ms)
✔ room creates role files for the active ShipSpec change (2.779125ms)
✔ audit reports ShipSpec delivery trail readiness (3.521542ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.143917ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.456625ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (421.417125ms)
✔ learnFromChange stores governed lessons and project patterns (191.088083ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (658.050833ms)
✔ runCli reflect and learn expose self-improving loop commands (259.508666ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (153.37225ms)
✔ runLoop learns when verification and reflection are ready (546.6455ms)
✔ runCli loop exposes the one-pass self-improvement loop (152.104083ms)
✔ runOperation orchestrates safe delivery control loop (308.780625ms)
✔ runCli operate exposes safe operator command with json output (605.739625ms)
✔ runCli autopilot asks for a mission when none is active (15.74575ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (1133.04325ms)
✔ runCli autopilot ignores generated setup files before implementation (1075.46075ms)
✔ runCli autopilot includes smart memory when routing to AI (1260.582584ms)
✔ runCli autopilot guides changed code to ship verification (767.171083ms)
✔ runCli autopilot reports review-ready missions (330.130333ms)
✔ recordDecision stores human decisions for the active change (2.575708ms)
✔ runCli decision records decisions and validates input (2.477417ms)
✔ generateReview writes a decision-aware review checklist (166.044875ms)
✔ runCli review exposes decision-aware review checklist (170.292958ms)
✔ getNextRecommendation guides users with no active change (1.594416ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.069916ms)
✔ runCli next prints recommendation and supports json output (3.779666ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (323.925167ms)
✔ generatePlanPrompt includes recorded human decisions (3.06ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.197584ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (947.826459ms)
✔ runCli codex prints no-copy handoff and appears in help (775.882375ms)
✔ runCli route recommends skills from request and repo evidence (196.977167ms)
✔ generateCodexHandoff includes Agentic RAG-first skill routing (533.381917ms)
✔ generateContextPack writes a portable AI handoff pack (205.101625ms)
✔ generateAgenticContext writes local retrieval context for the active change (108.24875ms)
✔ runCli context supports json output (88.69775ms)
✔ runCli rag writes cited local retrieval report and json output (86.033875ms)
✔ runCli rag excludes unsafe and noisy files from the local index (96.801875ms)
✔ generateAgenticContext links the full RAG report when available (279.432916ms)
✔ generateAgenticContext marks empty retrieval context as weak (132.017583ms)
✔ generateAgenticContext does not flag skipped none as risk (149.977ms)
✔ generateContextPack flags high-risk auth changes without full proof (305.057334ms)
✔ runCli pack writes and prints the context pack path (194.633833ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (378.782125ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (506.195292ms)
✔ generateCodexHandoff includes smart memory for the next feature (1350.738542ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (174.712958ms)
✔ runCli reason prints reasoning path and supports json output (7.740166ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (365.030459ms)
✔ generateUiDashboard keeps the first screen compact (116.582334ms)
✔ generateUiDashboard keeps progress out of the first viewport (114.378292ms)
✔ generateUiDashboard moves full likely files into advanced details (114.528625ms)
✔ generateUiDashboard uses short likely-file labels above the fold (112.654792ms)
✔ generateUiDashboard shows committed files when working tree is clean (770.407833ms)
✔ generateUiDashboard shows ShipSpec audit trail (121.050375ms)
✔ generateUiDashboard shows self-improving loop state (238.53675ms)
✔ generateUiDashboard shows adaptive reasoning state (89.240709ms)
✔ generateUiDashboard shows operator state (403.8165ms)
✔ generateUiDashboard shows human decisions and review state (228.904458ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.20075ms)
✔ runCli ui prints generated dashboard path (82.350125ms)
✔ runCli ui --open opens the generated dashboard (84.962708ms)
✔ generateAppDashboard writes a richer Mission Control app shell (117.906334ms)
✔ generateAppDashboard makes the mission home a dense dashboard (110.72575ms)
✔ generateAppDashboard surfaces skill routing in the mission home (256.390542ms)
✔ runCli app prints generated app path and supports open (88.55325ms)
✔ runCli run --open starts a mission and opens the dashboard (505.334583ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (4.443417ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.523875ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (7.682ms)
✔ doctorWorkspace reports repo readiness checks (34.519ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.795041ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.593792ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.768625ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.893ms)
✔ runCli detect and configure print project detection output (1.979583ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.225042ms)
✔ runCli ci prints generated GitHub Actions path (1.548458ms)
✔ getSpecStatus reports active change files and required proposal sections (2.205542ms)
✔ validateChange passes for a generated spec (1.978083ms)
✔ validateChange fails when proposal is missing acceptance criteria (5.580417ms)
✔ validateChange --ready requires verification evidence (3.096292ms)
✔ validateChange --ready passes after verification evidence exists (62.478416ms)
✔ runCli spec and validate print spec gate output (3.240583ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (243.991542ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (106.070375ms)
✔ runCli diff prints review-oriented Git and change status (105.094667ms)
✔ verifyChange runs fast checks by default and writes evidence (61.043583ms)
✔ verifyChange --full includes full-only checks (121.544417ms)
✔ completeChange blocks until verification evidence exists (2.671083ms)
✔ completeChange writes done report after verification evidence exists (91.128709ms)
✔ completeChange includes changed files in done report when Git is available (112.636041ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (167.600042ms)
✔ runCli report prints the report path (274.620084ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (261.273958ms)
✔ runCli release prints release handoff path (227.457584ms)
ℹ tests 130
ℹ suites 0
ℹ pass 130
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 25719.387292
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.928792ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.005333ms)
✔ startChange writes a richer OpenSpec proposal template (2.197708ms)
✔ runCli dispatches init, start, and status commands (2.463916ms)
✔ runCli quickstart prepares the low-ceremony project path (102.025542ms)
✔ runCli quickstart --light avoids agent ceremony (94.683916ms)
✔ runMission prepares an AGI-style mission for a new request (530.293584ms)
✔ runMission does not suggest generated setup files as likely files (562.507833ms)
✔ runMission continues an active change and prepares review when evidence passes (715.678541ms)
✔ runCli with no args asks for a mission when none exists (18.783917ms)
✔ runCli with no args runs autopilot for an active mission (754.626375ms)
✔ runCli routes plain text to Mission Autopilot (540.864084ms)
✔ runCli share aliases pack (113.376167ms)
✔ runCli ask aliases share (82.335459ms)
✔ runCli fix aliases light quickstart (88.682125ms)
✔ runCli ship runs ready verification, validation, and report (222.439166ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (260.956291ms)
✔ runCli supports help and version for an installable CLI (0.303333ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (22.433208ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.611708ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (3.332625ms)
✔ runCli supports the AGI-style run command (535.896417ms)
✔ runCli skill path prints source and default install target (0.341958ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.316542ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (3.290916ms)
✔ runSelfTest summarizes command health using an injectable runner (0.399125ms)
✔ runCli examples and self-test print summary output (2.926083ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.71025ms)
✔ runCli desktop prints generated desktop app path (1.660125ms)
✔ package is ready for TypeScript core and npm publishing (0.652291ms)
✔ TypeScript adapters describe ShipSpec integration points (1.0795ms)
✔ runCli adapters lists integration points (0.297084ms)
✔ intake creates a ShipSpec request intake record (1.750833ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.016333ms)
✔ room creates role files for the active ShipSpec change (4.196417ms)
✔ audit reports ShipSpec delivery trail readiness (8.022292ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.341042ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.907459ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (475.665666ms)
✔ learnFromChange stores governed lessons and project patterns (163.091958ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (498.913459ms)
✔ runCli reflect and learn expose self-improving loop commands (259.469083ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (184.884166ms)
✔ runLoop learns when verification and reflection are ready (677.969875ms)
✔ runCli loop exposes the one-pass self-improvement loop (223.704125ms)
✔ runOperation orchestrates safe delivery control loop (416.696625ms)
✔ runCli operate exposes safe operator command with json output (1041.732334ms)
✔ runCli autopilot asks for a mission when none is active (17.74425ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (844.036584ms)
✔ runCli autopilot ignores generated setup files before implementation (857.343959ms)
✔ runCli autopilot includes smart memory when routing to AI (1466.521416ms)
✔ runCli autopilot guides changed code to ship verification (1022.128583ms)
✔ runCli autopilot reports review-ready missions (381.85375ms)
✔ recordDecision stores human decisions for the active change (2.830208ms)
✔ runCli decision records decisions and validates input (2.349708ms)
✔ generateReview writes a decision-aware review checklist (193.091041ms)
✔ runCli review exposes decision-aware review checklist (206.226084ms)
✔ getNextRecommendation guides users with no active change (1.846041ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.049708ms)
✔ runCli next prints recommendation and supports json output (6.011875ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (331.847708ms)
✔ generatePlanPrompt includes recorded human decisions (3.595583ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.469333ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (686.154ms)
✔ runCli codex prints no-copy handoff and appears in help (955.291292ms)
✔ runCli route recommends skills from request and repo evidence (514.243542ms)
✔ generateCodexHandoff includes Agentic RAG-first skill routing (778.372292ms)
✔ generateContextPack writes a portable AI handoff pack (235.379ms)
✔ generateAgenticContext writes local retrieval context for the active change (222.214792ms)
✔ runCli context supports json output (96.380792ms)
✔ runCli rag writes cited local retrieval report and json output (86.163333ms)
✔ runCli rag excludes unsafe and noisy files from the local index (81.082666ms)
✔ generateAgenticContext links the full RAG report when available (194.064792ms)
✔ generateAgenticContext marks empty retrieval context as weak (95.921209ms)
✔ generateAgenticContext does not flag skipped none as risk (251.933291ms)
✔ generateContextPack flags high-risk auth changes without full proof (94.422125ms)
✔ runCli pack writes and prints the context pack path (94.321375ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (323.71775ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (431.422583ms)
✔ generateCodexHandoff includes smart memory for the next feature (1299.399208ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (144.845375ms)
✔ runCli reason prints reasoning path and supports json output (3.456875ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (361.940792ms)
✔ generateUiDashboard keeps the first screen compact (102.741084ms)
✔ generateUiDashboard keeps progress out of the first viewport (104.878167ms)
✔ generateUiDashboard moves full likely files into advanced details (97.861958ms)
✔ generateUiDashboard uses short likely-file labels above the fold (214.364958ms)
✔ generateUiDashboard shows committed files when working tree is clean (558.950416ms)
✔ generateUiDashboard shows ShipSpec audit trail (252.80025ms)
✔ generateUiDashboard shows self-improving loop state (286.127916ms)
✔ generateUiDashboard shows adaptive reasoning state (96.100625ms)
✔ generateUiDashboard shows operator state (542.334666ms)
✔ generateUiDashboard shows human decisions and review state (250.893416ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (0.9995ms)
✔ runCli ui prints generated dashboard path (84.833125ms)
✔ runCli ui --open opens the generated dashboard (122.360208ms)
✔ generateAppDashboard writes a richer Mission Control app shell (116.215875ms)
✔ generateAppDashboard makes the mission home a dense dashboard (106.430667ms)
✔ generateAppDashboard surfaces skill routing in the mission home (405.076416ms)
✔ runCli app prints generated app path and supports open (86.097375ms)
✔ runCli run --open starts a mission and opens the dashboard (476.388375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.604542ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.195458ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.667666ms)
✔ doctorWorkspace reports repo readiness checks (31.503209ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.245959ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.543875ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.517958ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.68375ms)
✔ runCli detect and configure print project detection output (1.83025ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.836458ms)
✔ runCli ci prints generated GitHub Actions path (1.454791ms)
✔ getSpecStatus reports active change files and required proposal sections (1.896541ms)
✔ validateChange passes for a generated spec (2.168375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.040166ms)
✔ validateChange --ready requires verification evidence (1.804667ms)
✔ validateChange --ready passes after verification evidence exists (76.138708ms)
✔ runCli spec and validate print spec gate output (3.2325ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (223.573833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (95.198834ms)
✔ runCli diff prints review-oriented Git and change status (95.09525ms)
✔ verifyChange runs fast checks by default and writes evidence (56.412167ms)
✔ verifyChange --full includes full-only checks (114.612792ms)
✔ completeChange blocks until verification evidence exists (2.061709ms)
✔ completeChange writes done report after verification evidence exists (87.714833ms)
✔ completeChange includes changed files in done report when Git is available (99.9195ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (174.042667ms)
✔ runCli report prints the report path (177.872833ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (246.429917ms)
✔ runCli release prints release handoff path (207.09525ms)
ℹ tests 130
ℹ suites 0
ℹ pass 130
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 26713.527417
```

