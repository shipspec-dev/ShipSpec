# Autopilot Apply Loop v1 Verification Evidence

Mode: full
Generated: 2026-06-28T03:18:28.545Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.55125ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.787833ms)
✔ startChange writes a richer OpenSpec proposal template (2.724042ms)
✔ runCli dispatches init, start, and status commands (3.401833ms)
✔ runCli quickstart prepares the low-ceremony project path (113.154709ms)
✔ runCli quickstart --light avoids agent ceremony (99.100708ms)
✔ runMission prepares an AGI-style mission for a new request (483.139958ms)
✔ runMission continues an active change and prepares review when evidence passes (613.434875ms)
✔ runCli with no args shows the operator guide instead of raw help (87.335209ms)
✔ runCli routes plain text to quickstart (99.969958ms)
✔ runCli share aliases pack (97.348083ms)
✔ runCli ask aliases share (94.494167ms)
✔ runCli fix aliases light quickstart (92.641875ms)
✔ runCli ship runs ready verification, validation, and report (224.218625ms)
✔ runCli supports help and version for an installable CLI (0.333958ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.95525ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.985166ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.664167ms)
✔ runCli supports the AGI-style run command (447.632459ms)
✔ runCli skill path prints source and default install target (0.621875ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.280834ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.776542ms)
✔ runSelfTest summarizes command health using an injectable runner (0.424875ms)
✔ runCli examples and self-test print summary output (1.87825ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.681208ms)
✔ runCli desktop prints generated desktop app path (1.034916ms)
✔ package is ready for TypeScript core and npm publishing (0.398791ms)
✔ TypeScript adapters describe ShipSpec integration points (1.002042ms)
✔ runCli adapters lists integration points (0.196292ms)
✔ intake creates a ShipSpec request intake record (1.90475ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.217292ms)
✔ room creates role files for the active ShipSpec change (3.252541ms)
✔ audit reports ShipSpec delivery trail readiness (4.636416ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.817416ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.22525ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (428.362458ms)
✔ learnFromChange stores governed lessons and project patterns (169.65525ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (518.067833ms)
✔ runCli reflect and learn expose self-improving loop commands (254.214708ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (145.131333ms)
✔ runLoop learns when verification and reflection are ready (580.387334ms)
✔ runCli loop exposes the one-pass self-improvement loop (153.757ms)
✔ runOperation orchestrates safe delivery control loop (251.734959ms)
✔ runCli operate exposes safe operator command with json output (480.955291ms)
✔ runCli autopilot asks for a mission when none is active (1.961334ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (599.739125ms)
✔ runCli autopilot guides changed code to ship verification (631.793209ms)
✔ runCli autopilot reports review-ready missions (304.041583ms)
✔ recordDecision stores human decisions for the active change (3.340042ms)
✔ runCli decision records decisions and validates input (2.899959ms)
✔ generateReview writes a decision-aware review checklist (165.1305ms)
✔ runCli review exposes decision-aware review checklist (163.749208ms)
✔ getNextRecommendation guides users with no active change (2.022375ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.068916ms)
✔ runCli next prints recommendation and supports json output (3.594375ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (236.073583ms)
✔ generatePlanPrompt includes recorded human decisions (4.072292ms)
✔ runCli prompt prints Plan mode prompt and supports json output (6.556542ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (509.504625ms)
✔ runCli codex prints no-copy handoff and appears in help (524.363333ms)
✔ generateContextPack writes a portable AI handoff pack (175.280042ms)
✔ generateContextPack flags high-risk auth changes without full proof (114.053834ms)
✔ runCli pack writes and prints the context pack path (88.939917ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (321.093833ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (423.181ms)
✔ generateCodexHandoff includes smart memory for the next feature (939.51625ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (171.615458ms)
✔ runCli reason prints reasoning path and supports json output (3.42725ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (338.851125ms)
✔ generateUiDashboard shows committed files when working tree is clean (417.900625ms)
✔ generateUiDashboard shows ShipSpec audit trail (90.319209ms)
✔ generateUiDashboard shows self-improving loop state (228.35375ms)
✔ generateUiDashboard shows adaptive reasoning state (89.481ms)
✔ generateUiDashboard shows operator state (321.884625ms)
✔ generateUiDashboard shows human decisions and review state (238.9405ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.572666ms)
✔ runCli ui prints generated dashboard path (92.01325ms)
✔ runCli ui --open opens the generated dashboard (93.591125ms)
✔ runCli run --open starts a mission and opens the dashboard (446.713584ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.768416ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.236459ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.701666ms)
✔ doctorWorkspace reports repo readiness checks (36.3055ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.076042ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.932834ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.441834ms)
✔ runCli detect and configure print project detection output (3.375458ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.036833ms)
✔ runCli ci prints generated GitHub Actions path (1.677708ms)
✔ getSpecStatus reports active change files and required proposal sections (2.034916ms)
✔ validateChange passes for a generated spec (2.326833ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.28ms)
✔ validateChange --ready requires verification evidence (2.143417ms)
✔ validateChange --ready passes after verification evidence exists (61.440875ms)
✔ runCli spec and validate print spec gate output (3.041792ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (247.032917ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (105.071958ms)
✔ runCli diff prints review-oriented Git and change status (104.441125ms)
✔ verifyChange runs fast checks by default and writes evidence (62.181291ms)
✔ verifyChange --full includes full-only checks (119.38875ms)
✔ completeChange blocks until verification evidence exists (2.502708ms)
✔ completeChange writes done report after verification evidence exists (92.370458ms)
✔ completeChange includes changed files in done report when Git is available (111.3715ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (166.298625ms)
✔ runCli report prints the report path (164.42175ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (251.045333ms)
✔ runCli release prints release handoff path (221.243583ms)
ℹ tests 107
ℹ suites 0
ℹ pass 107
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 15193.981
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.470416ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.15025ms)
✔ startChange writes a richer OpenSpec proposal template (2.078209ms)
✔ runCli dispatches init, start, and status commands (2.522542ms)
✔ runCli quickstart prepares the low-ceremony project path (97.921209ms)
✔ runCli quickstart --light avoids agent ceremony (91.175625ms)
✔ runMission prepares an AGI-style mission for a new request (455.975292ms)
✔ runMission continues an active change and prepares review when evidence passes (589.347833ms)
✔ runCli with no args shows the operator guide instead of raw help (85.529583ms)
✔ runCli routes plain text to quickstart (92.051083ms)
✔ runCli share aliases pack (86.177334ms)
✔ runCli ask aliases share (87.740333ms)
✔ runCli fix aliases light quickstart (88.187ms)
✔ runCli ship runs ready verification, validation, and report (224.769875ms)
✔ runCli supports help and version for an installable CLI (0.280834ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.613083ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.152125ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (3.331334ms)
✔ runCli supports the AGI-style run command (445.098125ms)
✔ runCli skill path prints source and default install target (0.326375ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.529625ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.518292ms)
✔ runSelfTest summarizes command health using an injectable runner (0.209291ms)
✔ runCli examples and self-test print summary output (1.464209ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.647125ms)
✔ runCli desktop prints generated desktop app path (1.006041ms)
✔ package is ready for TypeScript core and npm publishing (0.333792ms)
✔ TypeScript adapters describe ShipSpec integration points (0.418083ms)
✔ runCli adapters lists integration points (0.229625ms)
✔ intake creates a ShipSpec request intake record (1.43975ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.071709ms)
✔ room creates role files for the active ShipSpec change (2.639417ms)
✔ audit reports ShipSpec delivery trail readiness (4.011541ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.272708ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.464083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (401.465459ms)
✔ learnFromChange stores governed lessons and project patterns (166.598083ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (502.485709ms)
✔ runCli reflect and learn expose self-improving loop commands (248.838208ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (181.155416ms)
✔ runLoop learns when verification and reflection are ready (576.299333ms)
✔ runCli loop exposes the one-pass self-improvement loop (154.017417ms)
✔ runOperation orchestrates safe delivery control loop (248.550125ms)
✔ runCli operate exposes safe operator command with json output (481.960875ms)
✔ runCli autopilot asks for a mission when none is active (1.582417ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (611.610375ms)
✔ runCli autopilot guides changed code to ship verification (645.298125ms)
✔ runCli autopilot reports review-ready missions (311.242083ms)
✔ recordDecision stores human decisions for the active change (2.490583ms)
✔ runCli decision records decisions and validates input (2.2925ms)
✔ generateReview writes a decision-aware review checklist (168.12425ms)
✔ runCli review exposes decision-aware review checklist (166.327333ms)
✔ getNextRecommendation guides users with no active change (1.727417ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.923125ms)
✔ runCli next prints recommendation and supports json output (5.32175ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (229.539916ms)
✔ generatePlanPrompt includes recorded human decisions (4.023708ms)
✔ runCli prompt prints Plan mode prompt and supports json output (5.26275ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (503.941541ms)
✔ runCli codex prints no-copy handoff and appears in help (527.304ms)
✔ generateContextPack writes a portable AI handoff pack (177.195125ms)
✔ generateContextPack flags high-risk auth changes without full proof (115.436292ms)
✔ runCli pack writes and prints the context pack path (92.221125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (326.829708ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (418.571ms)
✔ generateCodexHandoff includes smart memory for the next feature (948.850833ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (168.362917ms)
✔ runCli reason prints reasoning path and supports json output (4.269417ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (338.770875ms)
✔ generateUiDashboard shows committed files when working tree is clean (414.510625ms)
✔ generateUiDashboard shows ShipSpec audit trail (87.089542ms)
✔ generateUiDashboard shows self-improving loop state (246.651417ms)
✔ generateUiDashboard shows adaptive reasoning state (90.464125ms)
✔ generateUiDashboard shows operator state (335.541542ms)
✔ generateUiDashboard shows human decisions and review state (248.556208ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.50725ms)
✔ runCli ui prints generated dashboard path (92.842291ms)
✔ runCli ui --open opens the generated dashboard (93.546833ms)
✔ runCli run --open starts a mission and opens the dashboard (462.864833ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.115708ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.117917ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.696417ms)
✔ doctorWorkspace reports repo readiness checks (35.26ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.95275ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.803542ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.100083ms)
✔ runCli detect and configure print project detection output (3.794416ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.244375ms)
✔ runCli ci prints generated GitHub Actions path (1.402083ms)
✔ getSpecStatus reports active change files and required proposal sections (1.841416ms)
✔ validateChange passes for a generated spec (2.114375ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.465959ms)
✔ validateChange --ready requires verification evidence (1.916166ms)
✔ validateChange --ready passes after verification evidence exists (68.0865ms)
✔ runCli spec and validate print spec gate output (2.924417ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (248.374833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (102.424666ms)
✔ runCli diff prints review-oriented Git and change status (103.910542ms)
✔ verifyChange runs fast checks by default and writes evidence (62.721667ms)
✔ verifyChange --full includes full-only checks (121.1425ms)
✔ completeChange blocks until verification evidence exists (2.641542ms)
✔ completeChange writes done report after verification evidence exists (94.273375ms)
✔ completeChange includes changed files in done report when Git is available (111.589542ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (164.463ms)
✔ runCli report prints the report path (163.858958ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (255.401459ms)
✔ runCli release prints release handoff path (223.984125ms)
ℹ tests 107
ℹ suites 0
ℹ pass 107
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 15135.592791
```

