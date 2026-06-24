# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T13:57:52.052Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.246167ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.059ms)
✔ startChange writes a richer OpenSpec proposal template (2.288291ms)
✔ runCli dispatches init, start, and status commands (2.168667ms)
✔ runCli quickstart prepares the low-ceremony project path (152.441917ms)
✔ runCli quickstart --light avoids agent ceremony (86.541458ms)
✔ runCli with no args shows the operator guide instead of raw help (81.112917ms)
✔ runCli routes plain text to quickstart (108.835833ms)
✔ runCli share aliases pack (94.848125ms)
✔ runCli ask aliases share (80.967583ms)
✔ runCli fix aliases light quickstart (78.950875ms)
✔ runCli ship runs ready verification, validation, and report (191.131583ms)
✔ runCli supports help and version for an installable CLI (0.308417ms)
✔ runCli skill path prints source and default install target (0.37825ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.944709ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.405667ms)
✔ runSelfTest summarizes command health using an injectable runner (0.217666ms)
✔ runCli examples and self-test print summary output (1.504667ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.31575ms)
✔ runCli desktop prints generated desktop app path (1.044375ms)
✔ package is ready for TypeScript core and npm publishing (0.390042ms)
✔ TypeScript adapters describe ShipSpec integration points (1.184084ms)
✔ runCli adapters lists integration points (0.290708ms)
✔ intake creates a ShipSpec request intake record (1.530791ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.035625ms)
✔ room creates role files for the active ShipSpec change (3.483042ms)
✔ audit reports ShipSpec delivery trail readiness (3.774709ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.120208ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.498167ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (372.487ms)
✔ learnFromChange stores governed lessons and project patterns (75.763917ms)
✔ runCli reflect and learn expose self-improving loop commands (143.832333ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (136.256084ms)
✔ runLoop learns when verification and reflection are ready (419.572459ms)
✔ runCli loop exposes the one-pass self-improvement loop (122.06225ms)
✔ runOperation orchestrates safe delivery control loop (196.872708ms)
✔ runCli operate exposes safe operator command with json output (401.138833ms)
✔ recordDecision stores human decisions for the active change (2.409625ms)
✔ runCli decision records decisions and validates input (2.375709ms)
✔ generateReview writes a decision-aware review checklist (142.479334ms)
✔ runCli review exposes decision-aware review checklist (131.260958ms)
✔ getNextRecommendation guides users with no active change (1.511166ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.44075ms)
✔ runCli next prints recommendation and supports json output (3.526708ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (199.351292ms)
✔ generatePlanPrompt includes recorded human decisions (3.892542ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.441ms)
✔ generateContextPack writes a portable AI handoff pack (143.741792ms)
✔ generateContextPack flags high-risk auth changes without full proof (90.156667ms)
✔ runCli pack writes and prints the context pack path (72.596916ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (196.261334ms)
✔ runCli memory prints memory summary and supports json output (75.221083ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (73.918167ms)
✔ runCli reason prints reasoning path and supports json output (4.994ms)
✔ generateUiDashboard writes a single-page pixel dashboard (305.015875ms)
✔ generateUiDashboard shows committed files when working tree is clean (394.802833ms)
✔ generateUiDashboard shows ShipSpec audit trail (80.805333ms)
✔ generateUiDashboard shows self-improving loop state (211.874375ms)
✔ generateUiDashboard shows adaptive reasoning state (73.606792ms)
✔ generateUiDashboard shows operator state (269.104375ms)
✔ generateUiDashboard shows human decisions and review state (197.951583ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.007958ms)
✔ runCli ui prints generated dashboard path (73.601083ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.55875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.667834ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.399583ms)
✔ doctorWorkspace reports repo readiness checks (30.117333ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.648167ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.425208ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.736833ms)
✔ runCli detect and configure print project detection output (1.820292ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.705208ms)
✔ runCli ci prints generated GitHub Actions path (1.626125ms)
✔ getSpecStatus reports active change files and required proposal sections (1.798541ms)
✔ validateChange passes for a generated spec (1.676583ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.743917ms)
✔ validateChange --ready requires verification evidence (1.75425ms)
✔ validateChange --ready passes after verification evidence exists (55.660666ms)
✔ runCli spec and validate print spec gate output (2.268625ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (235.297542ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (152.840791ms)
✔ runCli diff prints review-oriented Git and change status (226.936667ms)
✔ verifyChange runs fast checks by default and writes evidence (62.163792ms)
✔ verifyChange --full includes full-only checks (112.219ms)
✔ completeChange blocks until verification evidence exists (1.904041ms)
✔ completeChange writes done report after verification evidence exists (79.998209ms)
✔ completeChange includes changed files in done report when Git is available (98.2615ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (139.403792ms)
✔ runCli report prints the report path (143.302708ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (213.057792ms)
✔ runCli release prints release handoff path (191.172667ms)
ℹ tests 91
ℹ suites 0
ℹ pass 91
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7420.995917
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.890917ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.276167ms)
✔ startChange writes a richer OpenSpec proposal template (2.395083ms)
✔ runCli dispatches init, start, and status commands (2.469291ms)
✔ runCli quickstart prepares the low-ceremony project path (86.903917ms)
✔ runCli quickstart --light avoids agent ceremony (82.698792ms)
✔ runCli with no args shows the operator guide instead of raw help (75.207958ms)
✔ runCli routes plain text to quickstart (84.4465ms)
✔ runCli share aliases pack (77.434166ms)
✔ runCli ask aliases share (75.862875ms)
✔ runCli fix aliases light quickstart (79.572333ms)
✔ runCli ship runs ready verification, validation, and report (135.658209ms)
✔ runCli supports help and version for an installable CLI (0.274167ms)
✔ runCli skill path prints source and default install target (0.388791ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.766209ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.460625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.261666ms)
✔ runCli examples and self-test print summary output (1.498416ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.347791ms)
✔ runCli desktop prints generated desktop app path (1.003041ms)
✔ package is ready for TypeScript core and npm publishing (0.325125ms)
✔ TypeScript adapters describe ShipSpec integration points (0.399459ms)
✔ runCli adapters lists integration points (0.172292ms)
✔ intake creates a ShipSpec request intake record (1.514166ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.951042ms)
✔ room creates role files for the active ShipSpec change (3.521666ms)
✔ audit reports ShipSpec delivery trail readiness (3.455833ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.444542ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.488875ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (370.773875ms)
✔ learnFromChange stores governed lessons and project patterns (74.594667ms)
✔ runCli reflect and learn expose self-improving loop commands (135.095792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (131.064084ms)
✔ runLoop learns when verification and reflection are ready (411.70225ms)
✔ runCli loop exposes the one-pass self-improvement loop (125.723584ms)
✔ runOperation orchestrates safe delivery control loop (201.327042ms)
✔ runCli operate exposes safe operator command with json output (396.916042ms)
✔ recordDecision stores human decisions for the active change (2.565166ms)
✔ runCli decision records decisions and validates input (2.510375ms)
✔ generateReview writes a decision-aware review checklist (144.71625ms)
✔ runCli review exposes decision-aware review checklist (137.960417ms)
✔ getNextRecommendation guides users with no active change (1.893667ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.40225ms)
✔ runCli next prints recommendation and supports json output (3.242584ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (196.999792ms)
✔ generatePlanPrompt includes recorded human decisions (3.848208ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.782083ms)
✔ generateContextPack writes a portable AI handoff pack (148.983875ms)
✔ generateContextPack flags high-risk auth changes without full proof (90.479917ms)
✔ runCli pack writes and prints the context pack path (71.734916ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (199.466916ms)
✔ runCli memory prints memory summary and supports json output (73.114292ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (73.708333ms)
✔ runCli reason prints reasoning path and supports json output (3.356625ms)
✔ generateUiDashboard writes a single-page pixel dashboard (307.652541ms)
✔ generateUiDashboard shows committed files when working tree is clean (382.832459ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.831708ms)
✔ generateUiDashboard shows self-improving loop state (211.357625ms)
✔ generateUiDashboard shows adaptive reasoning state (73.886625ms)
✔ generateUiDashboard shows operator state (272.010334ms)
✔ generateUiDashboard shows human decisions and review state (193.655625ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.252666ms)
✔ runCli ui prints generated dashboard path (71.998375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.9285ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.145667ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.256584ms)
✔ doctorWorkspace reports repo readiness checks (29.974292ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.5325ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.409792ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.085417ms)
✔ runCli detect and configure print project detection output (1.62175ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.556542ms)
✔ runCli ci prints generated GitHub Actions path (1.473208ms)
✔ getSpecStatus reports active change files and required proposal sections (1.94875ms)
✔ validateChange passes for a generated spec (1.85675ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.715542ms)
✔ validateChange --ready requires verification evidence (1.859625ms)
✔ validateChange --ready passes after verification evidence exists (56.126542ms)
✔ runCli spec and validate print spec gate output (2.592042ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (214.881625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (90.160542ms)
✔ runCli diff prints review-oriented Git and change status (86.50675ms)
✔ verifyChange runs fast checks by default and writes evidence (57.391334ms)
✔ verifyChange --full includes full-only checks (110.081209ms)
✔ completeChange blocks until verification evidence exists (2.129292ms)
✔ completeChange writes done report after verification evidence exists (81.695916ms)
✔ completeChange includes changed files in done report when Git is available (98.538333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (145.877125ms)
✔ runCli report prints the report path (146.481417ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (215.566625ms)
✔ runCli release prints release handoff path (190.512542ms)
ℹ tests 91
ℹ suites 0
ℹ pass 91
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7000.038458
```

