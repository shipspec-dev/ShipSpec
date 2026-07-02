# Add Agentic RAG skill router Verification Evidence

Mode: full
Generated: 2026-07-02T13:41:08.732Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.795833ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.92475ms)
✔ startChange writes a richer OpenSpec proposal template (2.465625ms)
✔ runCli dispatches init, start, and status commands (2.678834ms)
✔ runCli quickstart prepares the low-ceremony project path (97.25925ms)
✔ runCli quickstart --light avoids agent ceremony (86.991ms)
✔ runMission prepares an AGI-style mission for a new request (497.5035ms)
✔ runMission does not suggest generated setup files as likely files (533.109041ms)
✔ runMission continues an active change and prepares review when evidence passes (645.56925ms)
✔ runCli with no args asks for a mission when none exists (16.097041ms)
✔ runCli with no args runs autopilot for an active mission (663.636708ms)
✔ runCli routes plain text to Mission Autopilot (485.959083ms)
✔ runCli share aliases pack (82.694084ms)
✔ runCli ask aliases share (81.375334ms)
✔ runCli fix aliases light quickstart (86.5725ms)
✔ runCli ship runs ready verification, validation, and report (218.903709ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (244.893625ms)
✔ runCli supports help and version for an installable CLI (0.486667ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.500416ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.5935ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.649792ms)
✔ runCli supports the AGI-style run command (489.710875ms)
✔ runCli skill path prints source and default install target (0.509958ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.845958ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.646167ms)
✔ runSelfTest summarizes command health using an injectable runner (0.26275ms)
✔ runCli examples and self-test print summary output (2.998708ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.407459ms)
✔ runCli desktop prints generated desktop app path (1.069667ms)
✔ package is ready for TypeScript core and npm publishing (0.306ms)
✔ TypeScript adapters describe ShipSpec integration points (0.33675ms)
✔ runCli adapters lists integration points (0.304083ms)
✔ intake creates a ShipSpec request intake record (1.56575ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.502333ms)
✔ room creates role files for the active ShipSpec change (3.013042ms)
✔ audit reports ShipSpec delivery trail readiness (5.322542ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.004083ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.4715ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (337.885042ms)
✔ learnFromChange stores governed lessons and project patterns (163.14625ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (489.123708ms)
✔ runCli reflect and learn expose self-improving loop commands (238.765791ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (139.326ms)
✔ runLoop learns when verification and reflection are ready (536.488416ms)
✔ runCli loop exposes the one-pass self-improvement loop (142.520917ms)
✔ runOperation orchestrates safe delivery control loop (300.995125ms)
✔ runCli operate exposes safe operator command with json output (606.141417ms)
✔ runCli autopilot asks for a mission when none is active (15.883708ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (655.148166ms)
✔ runCli autopilot ignores generated setup files before implementation (700.6665ms)
✔ runCli autopilot includes smart memory when routing to AI (1085.199417ms)
✔ runCli autopilot guides changed code to ship verification (780.934459ms)
✔ runCli autopilot reports review-ready missions (311.381083ms)
✔ recordDecision stores human decisions for the active change (2.465916ms)
✔ runCli decision records decisions and validates input (2.580333ms)
✔ generateReview writes a decision-aware review checklist (158.279875ms)
✔ runCli review exposes decision-aware review checklist (155.45025ms)
✔ getNextRecommendation guides users with no active change (1.9875ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.218125ms)
✔ runCli next prints recommendation and supports json output (3.9135ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (300.45425ms)
✔ generatePlanPrompt includes recorded human decisions (3.456333ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.691125ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (647.161417ms)
✔ runCli codex prints no-copy handoff and appears in help (635.270416ms)
✔ runCli route recommends skills from request and repo evidence (165.635958ms)
✔ generateCodexHandoff includes Agentic RAG-first skill routing (466.143875ms)
✔ generateContextPack writes a portable AI handoff pack (170.831708ms)
✔ generateAgenticContext writes local retrieval context for the active change (106.54625ms)
✔ runCli context supports json output (80.267125ms)
✔ runCli rag writes cited local retrieval report and json output (81.03375ms)
✔ runCli rag excludes unsafe and noisy files from the local index (83.630375ms)
✔ generateAgenticContext links the full RAG report when available (161.942084ms)
✔ generateAgenticContext marks empty retrieval context as weak (82.109125ms)
✔ generateAgenticContext does not flag skipped none as risk (138.690416ms)
✔ generateContextPack flags high-risk auth changes without full proof (103.198625ms)
✔ runCli pack writes and prints the context pack path (80.003458ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (294.58375ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (414.973208ms)
✔ generateCodexHandoff includes smart memory for the next feature (1101.7275ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (167.915292ms)
✔ runCli reason prints reasoning path and supports json output (3.466416ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (343.888542ms)
✔ generateUiDashboard keeps the first screen compact (109.909667ms)
✔ generateUiDashboard keeps progress out of the first viewport (111.973333ms)
✔ generateUiDashboard moves full likely files into advanced details (108.326125ms)
✔ generateUiDashboard uses short likely-file labels above the fold (105.153375ms)
✔ generateUiDashboard shows committed files when working tree is clean (404.029375ms)
✔ generateUiDashboard shows ShipSpec audit trail (85.567583ms)
✔ generateUiDashboard shows self-improving loop state (233.64125ms)
✔ generateUiDashboard shows adaptive reasoning state (89.537917ms)
✔ generateUiDashboard shows operator state (380.858042ms)
✔ generateUiDashboard shows human decisions and review state (215.6245ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.136541ms)
✔ runCli ui prints generated dashboard path (84.028417ms)
✔ runCli ui --open opens the generated dashboard (89.932542ms)
✔ generateAppDashboard writes a richer Mission Control app shell (113.281583ms)
✔ generateAppDashboard makes the mission home a dense dashboard (110.85025ms)
✔ generateAppDashboard surfaces skill routing in the mission home (238.172041ms)
✔ runCli app prints generated app path and supports open (83.426459ms)
✔ runCli run --open starts a mission and opens the dashboard (493.881833ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.068833ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.655375ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.665459ms)
✔ doctorWorkspace reports repo readiness checks (44.074625ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (18.76275ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.567583ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.545916ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.921375ms)
✔ runCli detect and configure print project detection output (5.176292ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.772792ms)
✔ runCli ci prints generated GitHub Actions path (1.3265ms)
✔ getSpecStatus reports active change files and required proposal sections (1.734209ms)
✔ validateChange passes for a generated spec (2.17075ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.850708ms)
✔ validateChange --ready requires verification evidence (1.685666ms)
✔ validateChange --ready passes after verification evidence exists (58.618917ms)
✔ runCli spec and validate print spec gate output (2.707041ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (245.131ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (100.66825ms)
✔ runCli diff prints review-oriented Git and change status (115.262ms)
✔ verifyChange runs fast checks by default and writes evidence (71.374084ms)
✔ verifyChange --full includes full-only checks (125.178959ms)
✔ completeChange blocks until verification evidence exists (3.216625ms)
✔ completeChange writes done report after verification evidence exists (88.878541ms)
✔ completeChange includes changed files in done report when Git is available (107.133166ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (157.766292ms)
✔ runCli report prints the report path (160.277833ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (240.210166ms)
✔ runCli release prints release handoff path (215.357042ms)
ℹ tests 130
ℹ suites 0
ℹ pass 130
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 21737.258125
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.764792ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.508375ms)
✔ startChange writes a richer OpenSpec proposal template (2.082833ms)
✔ runCli dispatches init, start, and status commands (2.774875ms)
✔ runCli quickstart prepares the low-ceremony project path (93.403459ms)
✔ runCli quickstart --light avoids agent ceremony (85.252834ms)
✔ runMission prepares an AGI-style mission for a new request (491.144208ms)
✔ runMission does not suggest generated setup files as likely files (567.519083ms)
✔ runMission continues an active change and prepares review when evidence passes (676.072375ms)
✔ runCli with no args asks for a mission when none exists (16.168708ms)
✔ runCli with no args runs autopilot for an active mission (699.509292ms)
✔ runCli routes plain text to Mission Autopilot (501.361583ms)
✔ runCli share aliases pack (81.155583ms)
✔ runCli ask aliases share (83.189417ms)
✔ runCli fix aliases light quickstart (85.294333ms)
✔ runCli ship runs ready verification, validation, and report (228.489792ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (237.829542ms)
✔ runCli supports help and version for an installable CLI (0.287917ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.08675ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.835084ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.528333ms)
✔ runCli supports the AGI-style run command (483.253375ms)
✔ runCli skill path prints source and default install target (0.323708ms)
✔ runCli skill install copies the bundled ShipSpec skill (5.202709ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (3.041083ms)
✔ runSelfTest summarizes command health using an injectable runner (0.283292ms)
✔ runCli examples and self-test print summary output (2.626875ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.476667ms)
✔ runCli desktop prints generated desktop app path (1.202125ms)
✔ package is ready for TypeScript core and npm publishing (0.289875ms)
✔ TypeScript adapters describe ShipSpec integration points (0.914458ms)
✔ runCli adapters lists integration points (0.387167ms)
✔ intake creates a ShipSpec request intake record (1.528083ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.227542ms)
✔ room creates role files for the active ShipSpec change (2.97675ms)
✔ audit reports ShipSpec delivery trail readiness (3.795166ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.559083ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.367959ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (413.346375ms)
✔ learnFromChange stores governed lessons and project patterns (157.2545ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (491.129208ms)
✔ runCli reflect and learn expose self-improving loop commands (231.661541ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (139.656166ms)
✔ runLoop learns when verification and reflection are ready (534.347416ms)
✔ runCli loop exposes the one-pass self-improvement loop (138.736708ms)
✔ runOperation orchestrates safe delivery control loop (309.972875ms)
✔ runCli operate exposes safe operator command with json output (607.560625ms)
✔ runCli autopilot asks for a mission when none is active (14.156084ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (668.189375ms)
✔ runCli autopilot ignores generated setup files before implementation (696.418625ms)
✔ runCli autopilot includes smart memory when routing to AI (1102.351375ms)
✔ runCli autopilot guides changed code to ship verification (711.165541ms)
✔ runCli autopilot reports review-ready missions (310.456875ms)
✔ recordDecision stores human decisions for the active change (3.056958ms)
✔ runCli decision records decisions and validates input (2.5885ms)
✔ generateReview writes a decision-aware review checklist (162.515834ms)
✔ runCli review exposes decision-aware review checklist (161.073375ms)
✔ getNextRecommendation guides users with no active change (1.382083ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.833708ms)
✔ runCli next prints recommendation and supports json output (3.442167ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (314.759916ms)
✔ generatePlanPrompt includes recorded human decisions (2.877333ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.103291ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (683.662041ms)
✔ runCli codex prints no-copy handoff and appears in help (678.801125ms)
✔ runCli route recommends skills from request and repo evidence (182.169042ms)
✔ generateCodexHandoff includes Agentic RAG-first skill routing (484.320166ms)
✔ generateContextPack writes a portable AI handoff pack (275.448875ms)
✔ generateAgenticContext writes local retrieval context for the active change (112.569042ms)
✔ runCli context supports json output (84.663ms)
✔ runCli rag writes cited local retrieval report and json output (85.013375ms)
✔ runCli rag excludes unsafe and noisy files from the local index (85.300084ms)
✔ generateAgenticContext links the full RAG report when available (163.799083ms)
✔ generateAgenticContext marks empty retrieval context as weak (84.890041ms)
✔ generateAgenticContext does not flag skipped none as risk (142.776916ms)
✔ generateContextPack flags high-risk auth changes without full proof (121.150916ms)
✔ runCli pack writes and prints the context pack path (81.677458ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (319.929834ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (411.562375ms)
✔ generateCodexHandoff includes smart memory for the next feature (1089.928292ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (157.981292ms)
✔ runCli reason prints reasoning path and supports json output (3.948042ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (333.550333ms)
✔ generateUiDashboard keeps the first screen compact (105.048ms)
✔ generateUiDashboard keeps progress out of the first viewport (108.244541ms)
✔ generateUiDashboard moves full likely files into advanced details (114.056334ms)
✔ generateUiDashboard uses short likely-file labels above the fold (104.394167ms)
✔ generateUiDashboard shows committed files when working tree is clean (612.301958ms)
✔ generateUiDashboard shows ShipSpec audit trail (110.927375ms)
✔ generateUiDashboard shows self-improving loop state (451.763375ms)
✔ generateUiDashboard shows adaptive reasoning state (112.597375ms)
✔ generateUiDashboard shows operator state (558.305291ms)
✔ generateUiDashboard shows human decisions and review state (258.373708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.309167ms)
✔ runCli ui prints generated dashboard path (107.276625ms)
✔ runCli ui --open opens the generated dashboard (84.818333ms)
✔ generateAppDashboard writes a richer Mission Control app shell (112.044375ms)
✔ generateAppDashboard makes the mission home a dense dashboard (109.026917ms)
✔ generateAppDashboard surfaces skill routing in the mission home (240.42325ms)
✔ runCli app prints generated app path and supports open (85.859125ms)
✔ runCli run --open starts a mission and opens the dashboard (486.54075ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.824958ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.678084ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.7515ms)
✔ doctorWorkspace reports repo readiness checks (34.679625ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.448916ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.605459ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.439041ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.986125ms)
✔ runCli detect and configure print project detection output (2.008875ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.014334ms)
✔ runCli ci prints generated GitHub Actions path (1.513041ms)
✔ getSpecStatus reports active change files and required proposal sections (2.037125ms)
✔ validateChange passes for a generated spec (2.14375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.341084ms)
✔ validateChange --ready requires verification evidence (1.874209ms)
✔ validateChange --ready passes after verification evidence exists (69.0735ms)
✔ runCli spec and validate print spec gate output (2.710167ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (241.179292ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (101.572ms)
✔ runCli diff prints review-oriented Git and change status (104.397917ms)
✔ verifyChange runs fast checks by default and writes evidence (58.856708ms)
✔ verifyChange --full includes full-only checks (115.348667ms)
✔ completeChange blocks until verification evidence exists (2.558792ms)
✔ completeChange writes done report after verification evidence exists (87.408458ms)
✔ completeChange includes changed files in done report when Git is available (110.050375ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (159.74575ms)
✔ runCli report prints the report path (161.469917ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (286.319667ms)
✔ runCli release prints release handoff path (222.503ms)
ℹ tests 130
ℹ suites 0
ℹ pass 130
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 22855.791
```

