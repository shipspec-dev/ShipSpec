# Add Smart UI command center Verification Evidence

Mode: full
Generated: 2026-06-26T07:22:09.570Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (13.757375ms)
✔ startChange creates an OpenSpec change, task file, and active status (5.273417ms)
✔ startChange writes a richer OpenSpec proposal template (3.180625ms)
✔ runCli dispatches init, start, and status commands (2.866625ms)
✔ runCli quickstart prepares the low-ceremony project path (111.542667ms)
✔ runCli quickstart --light avoids agent ceremony (107.389584ms)
✔ runMission prepares an AGI-style mission for a new request (382.731125ms)
✔ runMission continues an active change and prepares review when evidence passes (574.989375ms)
✔ runCli with no args shows the operator guide instead of raw help (85.9065ms)
✔ runCli routes plain text to quickstart (92.122875ms)
✔ runCli share aliases pack (82.885792ms)
✔ runCli ask aliases share (81.850833ms)
✔ runCli fix aliases light quickstart (92.786917ms)
✔ runCli ship runs ready verification, validation, and report (222.026125ms)
✔ runCli supports help and version for an installable CLI (0.72ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.83125ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.533458ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.599042ms)
✔ runCli supports the AGI-style run command (340.17725ms)
✔ runCli skill path prints source and default install target (1.413417ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.98325ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (3.383375ms)
✔ runSelfTest summarizes command health using an injectable runner (0.343ms)
✔ runCli examples and self-test print summary output (1.875584ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (22.735667ms)
✔ runCli desktop prints generated desktop app path (1.098292ms)
✔ package is ready for TypeScript core and npm publishing (0.403041ms)
✔ TypeScript adapters describe ShipSpec integration points (1.425375ms)
✔ runCli adapters lists integration points (0.218542ms)
✔ intake creates a ShipSpec request intake record (3.195709ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.637583ms)
✔ room creates role files for the active ShipSpec change (2.788291ms)
✔ audit reports ShipSpec delivery trail readiness (3.944875ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.147458ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.014083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (428.204959ms)
✔ learnFromChange stores governed lessons and project patterns (153.72175ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (467.9515ms)
✔ runCli reflect and learn expose self-improving loop commands (226.838875ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (134.356209ms)
✔ runLoop learns when verification and reflection are ready (568.531708ms)
✔ runCli loop exposes the one-pass self-improvement loop (152.522916ms)
✔ runOperation orchestrates safe delivery control loop (237.174542ms)
✔ runCli operate exposes safe operator command with json output (453.02125ms)
✔ recordDecision stores human decisions for the active change (4.464333ms)
✔ runCli decision records decisions and validates input (2.200583ms)
✔ generateReview writes a decision-aware review checklist (157.662875ms)
✔ runCli review exposes decision-aware review checklist (150.009375ms)
✔ getNextRecommendation guides users with no active change (5.173291ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.563334ms)
✔ runCli next prints recommendation and supports json output (3.464166ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (253.904709ms)
✔ generatePlanPrompt includes recorded human decisions (2.761459ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.908792ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (335.08975ms)
✔ runCli codex prints no-copy handoff and appears in help (799.34125ms)
✔ generateContextPack writes a portable AI handoff pack (229.338667ms)
✔ generateContextPack flags high-risk auth changes without full proof (116.066375ms)
✔ runCli pack writes and prints the context pack path (103.409041ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (337.028583ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (442.410584ms)
✔ generateCodexHandoff includes smart memory for the next feature (1100.198ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (209.263167ms)
✔ runCli reason prints reasoning path and supports json output (5.71425ms)
✔ generateUiDashboard writes a single-page pixel dashboard (380.653917ms)
✔ generateUiDashboard shows committed files when working tree is clean (449.135416ms)
✔ generateUiDashboard shows ShipSpec audit trail (93.10275ms)
✔ generateUiDashboard shows self-improving loop state (216.5275ms)
✔ generateUiDashboard shows adaptive reasoning state (88.4665ms)
✔ generateUiDashboard shows operator state (306.519ms)
✔ generateUiDashboard shows human decisions and review state (207.520291ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.573458ms)
✔ runCli ui prints generated dashboard path (79.953292ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.044875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.854333ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.741875ms)
✔ doctorWorkspace reports repo readiness checks (34.390667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.085375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.605917ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.311416ms)
✔ runCli detect and configure print project detection output (1.794875ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.804125ms)
✔ runCli ci prints generated GitHub Actions path (1.618292ms)
✔ getSpecStatus reports active change files and required proposal sections (3.953167ms)
✔ validateChange passes for a generated spec (1.73275ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.766167ms)
✔ validateChange --ready requires verification evidence (2.063458ms)
✔ validateChange --ready passes after verification evidence exists (64.210833ms)
✔ runCli spec and validate print spec gate output (2.723459ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (258.466208ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (99.238125ms)
✔ runCli diff prints review-oriented Git and change status (100.595375ms)
✔ verifyChange runs fast checks by default and writes evidence (68.567125ms)
✔ verifyChange --full includes full-only checks (142.990959ms)
✔ completeChange blocks until verification evidence exists (2.428291ms)
✔ completeChange writes done report after verification evidence exists (88.969375ms)
✔ completeChange includes changed files in done report when Git is available (113.106ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (171.799375ms)
✔ runCli report prints the report path (203.026959ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (285.178375ms)
✔ runCli release prints release handoff path (216.100375ms)
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13202.311166
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.1665ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.079875ms)
✔ startChange writes a richer OpenSpec proposal template (2.282125ms)
✔ runCli dispatches init, start, and status commands (2.45175ms)
✔ runCli quickstart prepares the low-ceremony project path (93.688625ms)
✔ runCli quickstart --light avoids agent ceremony (86.307917ms)
✔ runMission prepares an AGI-style mission for a new request (332.70725ms)
✔ runMission continues an active change and prepares review when evidence passes (448.314583ms)
✔ runCli with no args shows the operator guide instead of raw help (84.446042ms)
✔ runCli routes plain text to quickstart (86.591334ms)
✔ runCli share aliases pack (127.158958ms)
✔ runCli ask aliases share (97.522291ms)
✔ runCli fix aliases light quickstart (102.561958ms)
✔ runCli ship runs ready verification, validation, and report (249.7795ms)
✔ runCli supports help and version for an installable CLI (1.318292ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.622417ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.246417ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (3.769459ms)
✔ runCli supports the AGI-style run command (353.170333ms)
✔ runCli skill path prints source and default install target (0.327125ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.978541ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.870667ms)
✔ runSelfTest summarizes command health using an injectable runner (0.328958ms)
✔ runCli examples and self-test print summary output (1.325583ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.294791ms)
✔ runCli desktop prints generated desktop app path (1.014125ms)
✔ package is ready for TypeScript core and npm publishing (0.447292ms)
✔ TypeScript adapters describe ShipSpec integration points (0.398209ms)
✔ runCli adapters lists integration points (0.183417ms)
✔ intake creates a ShipSpec request intake record (1.557708ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.587542ms)
✔ room creates role files for the active ShipSpec change (2.598667ms)
✔ audit reports ShipSpec delivery trail readiness (3.881625ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.800542ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.679542ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (421.088709ms)
✔ learnFromChange stores governed lessons and project patterns (168.851459ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (836.896458ms)
✔ runCli reflect and learn expose self-improving loop commands (318.828708ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (172.462625ms)
✔ runLoop learns when verification and reflection are ready (708.506917ms)
✔ runCli loop exposes the one-pass self-improvement loop (140.415833ms)
✔ runOperation orchestrates safe delivery control loop (235.226458ms)
✔ runCli operate exposes safe operator command with json output (503.155125ms)
✔ recordDecision stores human decisions for the active change (3.123625ms)
✔ runCli decision records decisions and validates input (2.389ms)
✔ generateReview writes a decision-aware review checklist (166.266458ms)
✔ runCli review exposes decision-aware review checklist (163.362334ms)
✔ getNextRecommendation guides users with no active change (1.990958ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.574042ms)
✔ runCli next prints recommendation and supports json output (6.415125ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (262.122ms)
✔ generatePlanPrompt includes recorded human decisions (3.400209ms)
✔ runCli prompt prints Plan mode prompt and supports json output (5.4795ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (415.664042ms)
✔ runCli codex prints no-copy handoff and appears in help (372.992209ms)
✔ generateContextPack writes a portable AI handoff pack (203.694667ms)
✔ generateContextPack flags high-risk auth changes without full proof (109.98075ms)
✔ runCli pack writes and prints the context pack path (86.99075ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (322.679334ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (415.104542ms)
✔ generateCodexHandoff includes smart memory for the next feature (972.504ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (168.110875ms)
✔ runCli reason prints reasoning path and supports json output (4.040708ms)
✔ generateUiDashboard writes a single-page pixel dashboard (371.661208ms)
✔ generateUiDashboard shows committed files when working tree is clean (548.547667ms)
✔ generateUiDashboard shows ShipSpec audit trail (101.544709ms)
✔ generateUiDashboard shows self-improving loop state (241.368833ms)
✔ generateUiDashboard shows adaptive reasoning state (91.0665ms)
✔ generateUiDashboard shows operator state (336.52325ms)
✔ generateUiDashboard shows human decisions and review state (240.150041ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.479083ms)
✔ runCli ui prints generated dashboard path (89.485333ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.240875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.652959ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.4465ms)
✔ doctorWorkspace reports repo readiness checks (33.740583ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.127083ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.58725ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.066209ms)
✔ runCli detect and configure print project detection output (3.002583ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.94275ms)
✔ runCli ci prints generated GitHub Actions path (1.812ms)
✔ getSpecStatus reports active change files and required proposal sections (1.895959ms)
✔ validateChange passes for a generated spec (1.971667ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.279917ms)
✔ validateChange --ready requires verification evidence (1.997834ms)
✔ validateChange --ready passes after verification evidence exists (63.289166ms)
✔ runCli spec and validate print spec gate output (2.925333ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (239.672791ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (98.246542ms)
✔ runCli diff prints review-oriented Git and change status (117.817917ms)
✔ verifyChange runs fast checks by default and writes evidence (61.197708ms)
✔ verifyChange --full includes full-only checks (125.547ms)
✔ completeChange blocks until verification evidence exists (2.782708ms)
✔ completeChange writes done report after verification evidence exists (84.305042ms)
✔ completeChange includes changed files in done report when Git is available (106.991583ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (167.827625ms)
✔ runCli report prints the report path (163.54375ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (234.903625ms)
✔ runCli release prints release handoff path (212.893583ms)
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13214.851291
```

