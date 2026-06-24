# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T13:39:10.682Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.208042ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.912417ms)
✔ startChange writes a richer OpenSpec proposal template (2.127875ms)
✔ runCli dispatches init, start, and status commands (2.115041ms)
✔ runCli quickstart prepares the low-ceremony project path (78.007667ms)
✔ runCli quickstart --light avoids agent ceremony (87.885459ms)
✔ runCli with no args shows the operator guide instead of raw help (5.079541ms)
✔ runCli routes plain text to quickstart (86.422625ms)
✔ runCli share aliases pack (106.568916ms)
✔ runCli ship runs ready verification, validation, and report (138.792833ms)
✔ runCli supports help and version for an installable CLI (0.265583ms)
✔ runCli skill path prints source and default install target (0.381375ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.461542ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.541833ms)
✔ runSelfTest summarizes command health using an injectable runner (0.244041ms)
✔ runCli examples and self-test print summary output (1.577459ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.585375ms)
✔ runCli desktop prints generated desktop app path (1.530125ms)
✔ package is ready for TypeScript core and npm publishing (0.390542ms)
✔ TypeScript adapters describe ShipSpec integration points (1.406375ms)
✔ runCli adapters lists integration points (0.216791ms)
✔ intake creates a ShipSpec request intake record (1.590625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.400708ms)
✔ room creates role files for the active ShipSpec change (3.318709ms)
✔ audit reports ShipSpec delivery trail readiness (4.131541ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.450875ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.240542ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (436.899625ms)
✔ learnFromChange stores governed lessons and project patterns (77.12425ms)
✔ runCli reflect and learn expose self-improving loop commands (147.185292ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (126.974292ms)
✔ runLoop learns when verification and reflection are ready (604.636125ms)
✔ runCli loop exposes the one-pass self-improvement loop (145.667833ms)
✔ runOperation orchestrates safe delivery control loop (224.048916ms)
✔ runCli operate exposes safe operator command with json output (472.547917ms)
✔ recordDecision stores human decisions for the active change (7.094ms)
✔ runCli decision records decisions and validates input (3.124ms)
✔ generateReview writes a decision-aware review checklist (160.791167ms)
✔ runCli review exposes decision-aware review checklist (137.484416ms)
✔ getNextRecommendation guides users with no active change (1.524083ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.047ms)
✔ runCli next prints recommendation and supports json output (3.722666ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (198.898584ms)
✔ generatePlanPrompt includes recorded human decisions (3.205166ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.215375ms)
✔ generateContextPack writes a portable AI handoff pack (182.176667ms)
✔ runCli pack writes and prints the context pack path (80.803792ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (217.579875ms)
✔ runCli memory prints memory summary and supports json output (81.404ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (81.983125ms)
✔ runCli reason prints reasoning path and supports json output (4.002583ms)
✔ generateUiDashboard writes a single-page pixel dashboard (309.456166ms)
✔ generateUiDashboard shows committed files when working tree is clean (387.62675ms)
✔ generateUiDashboard shows ShipSpec audit trail (81.782917ms)
✔ generateUiDashboard shows self-improving loop state (212.510625ms)
✔ generateUiDashboard shows adaptive reasoning state (80.508041ms)
✔ generateUiDashboard shows operator state (287.461ms)
✔ generateUiDashboard shows human decisions and review state (205.972708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.114209ms)
✔ runCli ui prints generated dashboard path (76.122375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (5.120708ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.974ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.394125ms)
✔ doctorWorkspace reports repo readiness checks (30.970125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.50525ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.408541ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.788208ms)
✔ runCli detect and configure print project detection output (1.683417ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.633834ms)
✔ runCli ci prints generated GitHub Actions path (1.391875ms)
✔ getSpecStatus reports active change files and required proposal sections (1.818584ms)
✔ validateChange passes for a generated spec (1.966583ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.852041ms)
✔ validateChange --ready requires verification evidence (2.011167ms)
✔ validateChange --ready passes after verification evidence exists (55.779458ms)
✔ runCli spec and validate print spec gate output (2.535667ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (221.686334ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (91.722916ms)
✔ runCli diff prints review-oriented Git and change status (87.951833ms)
✔ verifyChange runs fast checks by default and writes evidence (58.468125ms)
✔ verifyChange --full includes full-only checks (109.935459ms)
✔ completeChange blocks until verification evidence exists (1.964792ms)
✔ completeChange writes done report after verification evidence exists (80.000917ms)
✔ completeChange includes changed files in done report when Git is available (99.153208ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (144.426ms)
✔ runCli report prints the report path (142.83025ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (229.072125ms)
✔ runCli release prints release handoff path (215.214709ms)
ℹ tests 88
ℹ suites 0
ℹ pass 88
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7294.403083
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.4105ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.913542ms)
✔ startChange writes a richer OpenSpec proposal template (2.096042ms)
✔ runCli dispatches init, start, and status commands (2.596708ms)
✔ runCli quickstart prepares the low-ceremony project path (125.431041ms)
✔ runCli quickstart --light avoids agent ceremony (72.796875ms)
✔ runCli with no args shows the operator guide instead of raw help (2.946917ms)
✔ runCli routes plain text to quickstart (88.945875ms)
✔ runCli share aliases pack (74.438542ms)
✔ runCli ship runs ready verification, validation, and report (138.154459ms)
✔ runCli supports help and version for an installable CLI (0.343291ms)
✔ runCli skill path prints source and default install target (0.401083ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.843334ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.611667ms)
✔ runSelfTest summarizes command health using an injectable runner (0.228417ms)
✔ runCli examples and self-test print summary output (1.353458ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.671084ms)
✔ runCli desktop prints generated desktop app path (1.1005ms)
✔ package is ready for TypeScript core and npm publishing (0.369291ms)
✔ TypeScript adapters describe ShipSpec integration points (1.115625ms)
✔ runCli adapters lists integration points (0.178333ms)
✔ intake creates a ShipSpec request intake record (1.521625ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.134292ms)
✔ room creates role files for the active ShipSpec change (2.983292ms)
✔ audit reports ShipSpec delivery trail readiness (4.133458ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.293ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.650375ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (446.459875ms)
✔ learnFromChange stores governed lessons and project patterns (91.220916ms)
✔ runCli reflect and learn expose self-improving loop commands (145.636083ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (128.375875ms)
✔ runLoop learns when verification and reflection are ready (432.77525ms)
✔ runCli loop exposes the one-pass self-improvement loop (123.534833ms)
✔ runOperation orchestrates safe delivery control loop (264.0935ms)
✔ runCli operate exposes safe operator command with json output (539.414417ms)
✔ recordDecision stores human decisions for the active change (6.97175ms)
✔ runCli decision records decisions and validates input (2.937167ms)
✔ generateReview writes a decision-aware review checklist (184.926708ms)
✔ runCli review exposes decision-aware review checklist (160.994667ms)
✔ getNextRecommendation guides users with no active change (2.389417ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.535542ms)
✔ runCli next prints recommendation and supports json output (3.585458ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (257.410792ms)
✔ generatePlanPrompt includes recorded human decisions (2.620041ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.563333ms)
✔ generateContextPack writes a portable AI handoff pack (157.674542ms)
✔ runCli pack writes and prints the context pack path (85.238791ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (275.987292ms)
✔ runCli memory prints memory summary and supports json output (78.915792ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (81.335416ms)
✔ runCli reason prints reasoning path and supports json output (3.692375ms)
✔ generateUiDashboard writes a single-page pixel dashboard (293.185334ms)
✔ generateUiDashboard shows committed files when working tree is clean (364.232417ms)
✔ generateUiDashboard shows ShipSpec audit trail (73.718208ms)
✔ generateUiDashboard shows self-improving loop state (213.199417ms)
✔ generateUiDashboard shows adaptive reasoning state (79.312084ms)
✔ generateUiDashboard shows operator state (274.490542ms)
✔ generateUiDashboard shows human decisions and review state (203.009083ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.150541ms)
✔ runCli ui prints generated dashboard path (72.162167ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.549ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.680292ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.268834ms)
✔ doctorWorkspace reports repo readiness checks (30.3515ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.607417ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.422958ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.765709ms)
✔ runCli detect and configure print project detection output (1.859584ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.824792ms)
✔ runCli ci prints generated GitHub Actions path (1.455541ms)
✔ getSpecStatus reports active change files and required proposal sections (1.87225ms)
✔ validateChange passes for a generated spec (1.858917ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.884292ms)
✔ validateChange --ready requires verification evidence (3.476583ms)
✔ validateChange --ready passes after verification evidence exists (57.081541ms)
✔ runCli spec and validate print spec gate output (2.178875ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (218.435333ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (89.309333ms)
✔ runCli diff prints review-oriented Git and change status (87.912458ms)
✔ verifyChange runs fast checks by default and writes evidence (55.731042ms)
✔ verifyChange --full includes full-only checks (111.427416ms)
✔ completeChange blocks until verification evidence exists (2.048125ms)
✔ completeChange writes done report after verification evidence exists (82.938792ms)
✔ completeChange includes changed files in done report when Git is available (98.391875ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (152.502958ms)
✔ runCli report prints the report path (144.63925ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (220.563166ms)
✔ runCli release prints release handoff path (196.480042ms)
ℹ tests 88
ℹ suites 0
ℹ pass 88
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7291.320541
```

