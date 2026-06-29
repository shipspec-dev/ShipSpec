# Add React Mission Control app Verification Evidence

Mode: full
Generated: 2026-06-29T15:27:03.574Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.398958ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.590458ms)
✔ startChange writes a richer OpenSpec proposal template (2.936833ms)
✔ runCli dispatches init, start, and status commands (3.078791ms)
✔ runCli quickstart prepares the low-ceremony project path (100.684417ms)
✔ runCli quickstart --light avoids agent ceremony (93.804916ms)
✔ runMission prepares an AGI-style mission for a new request (440.326125ms)
✔ runMission does not suggest generated setup files as likely files (477.502208ms)
✔ runMission continues an active change and prepares review when evidence passes (570.047417ms)
✔ runCli with no args asks for a mission when none exists (16.308667ms)
✔ runCli with no args runs autopilot for an active mission (630.025583ms)
✔ runCli routes plain text to Mission Autopilot (439.649083ms)
✔ runCli share aliases pack (90.445958ms)
✔ runCli ask aliases share (85.375208ms)
✔ runCli fix aliases light quickstart (91.076125ms)
✔ runCli ship runs ready verification, validation, and report (228.987125ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (247.727125ms)
✔ runCli supports help and version for an installable CLI (0.460333ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (21.266333ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.671333ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.249375ms)
✔ runCli supports the AGI-style run command (433.813375ms)
✔ runCli skill path prints source and default install target (0.333417ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.20475ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.681ms)
✔ runSelfTest summarizes command health using an injectable runner (0.258541ms)
✔ runCli examples and self-test print summary output (1.211542ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.294541ms)
✔ runCli desktop prints generated desktop app path (1.052709ms)
✔ package is ready for TypeScript core and npm publishing (0.45875ms)
✔ TypeScript adapters describe ShipSpec integration points (0.506041ms)
✔ runCli adapters lists integration points (0.202334ms)
✔ intake creates a ShipSpec request intake record (1.32175ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.985875ms)
✔ room creates role files for the active ShipSpec change (3.068083ms)
✔ audit reports ShipSpec delivery trail readiness (4.41925ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.052959ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.145667ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (426.20125ms)
✔ learnFromChange stores governed lessons and project patterns (171.021541ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (514.934292ms)
✔ runCli reflect and learn expose self-improving loop commands (254.970375ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (151.105333ms)
✔ runLoop learns when verification and reflection are ready (567.555958ms)
✔ runCli loop exposes the one-pass self-improvement loop (149.266667ms)
✔ runOperation orchestrates safe delivery control loop (236.665333ms)
✔ runCli operate exposes safe operator command with json output (471.795792ms)
✔ runCli autopilot asks for a mission when none is active (16.316291ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (623.909667ms)
✔ runCli autopilot ignores generated setup files before implementation (652.90675ms)
✔ runCli autopilot includes smart memory when routing to AI (1070.018583ms)
✔ runCli autopilot guides changed code to ship verification (663.144917ms)
✔ runCli autopilot reports review-ready missions (330.606084ms)
✔ recordDecision stores human decisions for the active change (3.217625ms)
✔ runCli decision records decisions and validates input (2.398834ms)
✔ generateReview writes a decision-aware review checklist (166.934083ms)
✔ runCli review exposes decision-aware review checklist (168.368875ms)
✔ getNextRecommendation guides users with no active change (1.82275ms)
✔ getNextRecommendation guides active changes through missing artifacts (14.417417ms)
✔ runCli next prints recommendation and supports json output (13.028375ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (249.771208ms)
✔ generatePlanPrompt includes recorded human decisions (2.784458ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.596041ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (518.077166ms)
✔ runCli codex prints no-copy handoff and appears in help (512.742708ms)
✔ generateContextPack writes a portable AI handoff pack (168.273833ms)
✔ generateContextPack flags high-risk auth changes without full proof (107.312291ms)
✔ runCli pack writes and prints the context pack path (87.418125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (313.151792ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (423.889541ms)
✔ generateCodexHandoff includes smart memory for the next feature (947.248084ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (171.036916ms)
✔ runCli reason prints reasoning path and supports json output (3.678875ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (340.255458ms)
✔ generateUiDashboard keeps the first screen compact (110.75375ms)
✔ generateUiDashboard keeps progress out of the first viewport (111.172ms)
✔ generateUiDashboard moves full likely files into advanced details (109.79475ms)
✔ generateUiDashboard uses short likely-file labels above the fold (109.760833ms)
✔ generateUiDashboard shows committed files when working tree is clean (427.837208ms)
✔ generateUiDashboard shows ShipSpec audit trail (86.630666ms)
✔ generateUiDashboard shows self-improving loop state (229.136417ms)
✔ generateUiDashboard shows adaptive reasoning state (88.24675ms)
✔ generateUiDashboard shows operator state (323.639833ms)
✔ generateUiDashboard shows human decisions and review state (234.228ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.332542ms)
✔ runCli ui prints generated dashboard path (87.350833ms)
✔ runCli ui --open opens the generated dashboard (87.68125ms)
✔ generateAppDashboard writes a richer Mission Control app shell (114.336792ms)
✔ runCli app prints generated app path and supports open (88.408625ms)
✔ runCli run --open starts a mission and opens the dashboard (435.360792ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.03325ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.832375ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.730959ms)
✔ doctorWorkspace reports repo readiness checks (34.549333ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.924792ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.699333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.441958ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.831375ms)
✔ runCli detect and configure print project detection output (2.073ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.891ms)
✔ runCli ci prints generated GitHub Actions path (1.670209ms)
✔ getSpecStatus reports active change files and required proposal sections (1.90725ms)
✔ validateChange passes for a generated spec (2.144875ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.790625ms)
✔ validateChange --ready requires verification evidence (1.725375ms)
✔ validateChange --ready passes after verification evidence exists (59.796ms)
✔ runCli spec and validate print spec gate output (2.726ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (251.072458ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (106.638834ms)
✔ runCli diff prints review-oriented Git and change status (104.33475ms)
✔ verifyChange runs fast checks by default and writes evidence (59.825458ms)
✔ verifyChange --full includes full-only checks (118.347833ms)
✔ completeChange blocks until verification evidence exists (2.014166ms)
✔ completeChange writes done report after verification evidence exists (88.004333ms)
✔ completeChange includes changed files in done report when Git is available (109.655166ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (167.631ms)
✔ runCli report prints the report path (164.873209ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (253.973083ms)
✔ runCli release prints release handoff path (254.982583ms)
ℹ tests 119
ℹ suites 0
ℹ pass 119
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 19123.426042
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.44675ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.184625ms)
✔ startChange writes a richer OpenSpec proposal template (2.3145ms)
✔ runCli dispatches init, start, and status commands (2.318167ms)
✔ runCli quickstart prepares the low-ceremony project path (97.271541ms)
✔ runCli quickstart --light avoids agent ceremony (90.849791ms)
✔ runMission prepares an AGI-style mission for a new request (438.911167ms)
✔ runMission does not suggest generated setup files as likely files (477.361291ms)
✔ runMission continues an active change and prepares review when evidence passes (580.928458ms)
✔ runCli with no args asks for a mission when none exists (17.185166ms)
✔ runCli with no args runs autopilot for an active mission (619.049875ms)
✔ runCli routes plain text to Mission Autopilot (442.148875ms)
✔ runCli share aliases pack (89.071917ms)
✔ runCli ask aliases share (90.755667ms)
✔ runCli fix aliases light quickstart (91.654292ms)
✔ runCli ship runs ready verification, validation, and report (235.608583ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (260.46775ms)
✔ runCli supports help and version for an installable CLI (0.368417ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (21.825625ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.785625ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.30375ms)
✔ runCli supports the AGI-style run command (531.07825ms)
✔ runCli skill path prints source and default install target (0.350833ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.8885ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.55775ms)
✔ runSelfTest summarizes command health using an injectable runner (0.429542ms)
✔ runCli examples and self-test print summary output (1.729917ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.445792ms)
✔ runCli desktop prints generated desktop app path (0.933416ms)
✔ package is ready for TypeScript core and npm publishing (0.313458ms)
✔ TypeScript adapters describe ShipSpec integration points (1.214584ms)
✔ runCli adapters lists integration points (0.180792ms)
✔ intake creates a ShipSpec request intake record (1.623875ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.497875ms)
✔ room creates role files for the active ShipSpec change (2.947625ms)
✔ audit reports ShipSpec delivery trail readiness (3.77275ms)
✔ deliver prepares intake, spec, contract, room, and validation (5.478708ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.516834ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (427.90475ms)
✔ learnFromChange stores governed lessons and project patterns (175.200667ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (531.973667ms)
✔ runCli reflect and learn expose self-improving loop commands (253.558625ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (145.779083ms)
✔ runLoop learns when verification and reflection are ready (574.926542ms)
✔ runCli loop exposes the one-pass self-improvement loop (147.127833ms)
✔ runOperation orchestrates safe delivery control loop (242.660291ms)
✔ runCli operate exposes safe operator command with json output (471.739166ms)
✔ runCli autopilot asks for a mission when none is active (19.499625ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (615.55775ms)
✔ runCli autopilot ignores generated setup files before implementation (655.145375ms)
✔ runCli autopilot includes smart memory when routing to AI (1072.257542ms)
✔ runCli autopilot guides changed code to ship verification (655.485875ms)
✔ runCli autopilot reports review-ready missions (341.311083ms)
✔ recordDecision stores human decisions for the active change (2.515833ms)
✔ runCli decision records decisions and validates input (2.399666ms)
✔ generateReview writes a decision-aware review checklist (167.466042ms)
✔ runCli review exposes decision-aware review checklist (172.016791ms)
✔ getNextRecommendation guides users with no active change (1.482458ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.118417ms)
✔ runCli next prints recommendation and supports json output (3.564875ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (245.842417ms)
✔ generatePlanPrompt includes recorded human decisions (2.954292ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.310833ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (513.60925ms)
✔ runCli codex prints no-copy handoff and appears in help (513.858ms)
✔ generateContextPack writes a portable AI handoff pack (172.808875ms)
✔ generateContextPack flags high-risk auth changes without full proof (108.160334ms)
✔ runCli pack writes and prints the context pack path (87.594959ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (312.483667ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (420.858791ms)
✔ generateCodexHandoff includes smart memory for the next feature (956.865292ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (163.688958ms)
✔ runCli reason prints reasoning path and supports json output (3.9685ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (346.087792ms)
✔ generateUiDashboard keeps the first screen compact (109.596166ms)
✔ generateUiDashboard keeps progress out of the first viewport (109.887583ms)
✔ generateUiDashboard moves full likely files into advanced details (110.913541ms)
✔ generateUiDashboard uses short likely-file labels above the fold (112.358084ms)
✔ generateUiDashboard shows committed files when working tree is clean (427.589167ms)
✔ generateUiDashboard shows ShipSpec audit trail (91.855459ms)
✔ generateUiDashboard shows self-improving loop state (230.063042ms)
✔ generateUiDashboard shows adaptive reasoning state (92.184208ms)
✔ generateUiDashboard shows operator state (319.49275ms)
✔ generateUiDashboard shows human decisions and review state (229.776333ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.498708ms)
✔ runCli ui prints generated dashboard path (90.807709ms)
✔ runCli ui --open opens the generated dashboard (88.554458ms)
✔ generateAppDashboard writes a richer Mission Control app shell (114.145834ms)
✔ runCli app prints generated app path and supports open (90.160083ms)
✔ runCli run --open starts a mission and opens the dashboard (429.209166ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.95375ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.913708ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.48025ms)
✔ doctorWorkspace reports repo readiness checks (35.130375ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (15.80525ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.735667ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.548542ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.957416ms)
✔ runCli detect and configure print project detection output (2.255709ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.869834ms)
✔ runCli ci prints generated GitHub Actions path (1.764ms)
✔ getSpecStatus reports active change files and required proposal sections (5.6025ms)
✔ validateChange passes for a generated spec (1.94875ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.025292ms)
✔ validateChange --ready requires verification evidence (1.853ms)
✔ validateChange --ready passes after verification evidence exists (64.855375ms)
✔ runCli spec and validate print spec gate output (2.405583ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (242.939875ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (106.536208ms)
✔ runCli diff prints review-oriented Git and change status (105.314167ms)
✔ verifyChange runs fast checks by default and writes evidence (59.16025ms)
✔ verifyChange --full includes full-only checks (117.020708ms)
✔ completeChange blocks until verification evidence exists (2.261417ms)
✔ completeChange writes done report after verification evidence exists (87.934334ms)
✔ completeChange includes changed files in done report when Git is available (109.834083ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (162.766584ms)
✔ runCli report prints the report path (164.133208ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (251.365667ms)
✔ runCli release prints release handoff path (225.772166ms)
ℹ tests 119
ℹ suites 0
ℹ pass 119
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 19226.991375
```

