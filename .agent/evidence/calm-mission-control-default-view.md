# Calm Mission Control default view Verification Evidence

Mode: full
Generated: 2026-06-26T09:46:54.850Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.428459ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.873167ms)
✔ startChange writes a richer OpenSpec proposal template (2.576917ms)
✔ runCli dispatches init, start, and status commands (2.409292ms)
✔ runCli quickstart prepares the low-ceremony project path (95.413833ms)
✔ runCli quickstart --light avoids agent ceremony (88.593833ms)
✔ runMission prepares an AGI-style mission for a new request (352.28ms)
✔ runMission continues an active change and prepares review when evidence passes (474.9095ms)
✔ runCli with no args shows the operator guide instead of raw help (82.648375ms)
✔ runCli routes plain text to quickstart (87.5065ms)
✔ runCli share aliases pack (79.946916ms)
✔ runCli ask aliases share (74.907375ms)
✔ runCli fix aliases light quickstart (84.564834ms)
✔ runCli ship runs ready verification, validation, and report (210.500166ms)
✔ runCli supports help and version for an installable CLI (0.2685ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.222875ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.368041ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.489ms)
✔ runCli supports the AGI-style run command (321.370209ms)
✔ runCli skill path prints source and default install target (0.330958ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.061166ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.513084ms)
✔ runSelfTest summarizes command health using an injectable runner (0.256334ms)
✔ runCli examples and self-test print summary output (1.213625ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.135167ms)
✔ runCli desktop prints generated desktop app path (0.822291ms)
✔ package is ready for TypeScript core and npm publishing (0.337833ms)
✔ TypeScript adapters describe ShipSpec integration points (0.50475ms)
✔ runCli adapters lists integration points (0.164209ms)
✔ intake creates a ShipSpec request intake record (1.549292ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.030042ms)
✔ room creates role files for the active ShipSpec change (2.595416ms)
✔ audit reports ShipSpec delivery trail readiness (4.730583ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.085166ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.225625ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (390.244625ms)
✔ learnFromChange stores governed lessons and project patterns (157.631042ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (486.834333ms)
✔ runCli reflect and learn expose self-improving loop commands (264.444417ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (141.224542ms)
✔ runLoop learns when verification and reflection are ready (638.741625ms)
✔ runCli loop exposes the one-pass self-improvement loop (157.8025ms)
✔ runOperation orchestrates safe delivery control loop (240.994584ms)
✔ runCli operate exposes safe operator command with json output (520.538208ms)
✔ recordDecision stores human decisions for the active change (3.242709ms)
✔ runCli decision records decisions and validates input (2.6965ms)
✔ generateReview writes a decision-aware review checklist (170.34225ms)
✔ runCli review exposes decision-aware review checklist (166.201583ms)
✔ getNextRecommendation guides users with no active change (1.607917ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.578125ms)
✔ runCli next prints recommendation and supports json output (3.933583ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (231.731125ms)
✔ generatePlanPrompt includes recorded human decisions (3.74275ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.100417ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (339.251916ms)
✔ runCli codex prints no-copy handoff and appears in help (341.958625ms)
✔ generateContextPack writes a portable AI handoff pack (165.217542ms)
✔ generateContextPack flags high-risk auth changes without full proof (104.454708ms)
✔ runCli pack writes and prints the context pack path (82.176917ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (309.982125ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (437.2765ms)
✔ generateCodexHandoff includes smart memory for the next feature (928.796458ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (186.179792ms)
✔ runCli reason prints reasoning path and supports json output (5.430458ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (415.966083ms)
✔ generateUiDashboard shows committed files when working tree is clean (427.237375ms)
✔ generateUiDashboard shows ShipSpec audit trail (93.356958ms)
✔ generateUiDashboard shows self-improving loop state (235.987792ms)
✔ generateUiDashboard shows adaptive reasoning state (86.554542ms)
✔ generateUiDashboard shows operator state (302.581625ms)
✔ generateUiDashboard shows human decisions and review state (208.238792ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.451958ms)
✔ runCli ui prints generated dashboard path (78.951458ms)
✔ runCli ui --open opens the generated dashboard (82.904042ms)
✔ runCli run --open starts a mission and opens the dashboard (496.416542ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.504292ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.807375ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.537167ms)
✔ doctorWorkspace reports repo readiness checks (32.622125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.672583ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.513708ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.17575ms)
✔ runCli detect and configure print project detection output (1.728625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.722541ms)
✔ runCli ci prints generated GitHub Actions path (1.613333ms)
✔ getSpecStatus reports active change files and required proposal sections (1.701292ms)
✔ validateChange passes for a generated spec (1.826917ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.026ms)
✔ validateChange --ready requires verification evidence (2.005958ms)
✔ validateChange --ready passes after verification evidence exists (57.79525ms)
✔ runCli spec and validate print spec gate output (3.0145ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (256.229875ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (93.860625ms)
✔ runCli diff prints review-oriented Git and change status (95.773667ms)
✔ verifyChange runs fast checks by default and writes evidence (63.133834ms)
✔ verifyChange --full includes full-only checks (121.985834ms)
✔ completeChange blocks until verification evidence exists (2.227708ms)
✔ completeChange writes done report after verification evidence exists (88.882834ms)
✔ completeChange includes changed files in done report when Git is available (105.913792ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (165.482958ms)
✔ runCli report prints the report path (161.5905ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (256.9105ms)
✔ runCli release prints release handoff path (229.977792ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 12816.6
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.264834ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.9275ms)
✔ startChange writes a richer OpenSpec proposal template (2.359709ms)
✔ runCli dispatches init, start, and status commands (3.128042ms)
✔ runCli quickstart prepares the low-ceremony project path (107.047709ms)
✔ runCli quickstart --light avoids agent ceremony (102.712916ms)
✔ runMission prepares an AGI-style mission for a new request (356.3335ms)
✔ runMission continues an active change and prepares review when evidence passes (482.953334ms)
✔ runCli with no args shows the operator guide instead of raw help (87.22075ms)
✔ runCli routes plain text to quickstart (90.874291ms)
✔ runCli share aliases pack (88.33375ms)
✔ runCli ask aliases share (82.963834ms)
✔ runCli fix aliases light quickstart (83.296291ms)
✔ runCli ship runs ready verification, validation, and report (210.189625ms)
✔ runCli supports help and version for an installable CLI (0.263875ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.1005ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.282792ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (3.415375ms)
✔ runCli supports the AGI-style run command (323.480167ms)
✔ runCli skill path prints source and default install target (0.347417ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.603417ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.57625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.259167ms)
✔ runCli examples and self-test print summary output (1.212541ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.452208ms)
✔ runCli desktop prints generated desktop app path (0.915084ms)
✔ package is ready for TypeScript core and npm publishing (0.630833ms)
✔ TypeScript adapters describe ShipSpec integration points (0.591167ms)
✔ runCli adapters lists integration points (0.256792ms)
✔ intake creates a ShipSpec request intake record (1.574875ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.106959ms)
✔ room creates role files for the active ShipSpec change (2.59275ms)
✔ audit reports ShipSpec delivery trail readiness (4.416458ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.287417ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.010625ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (423.121458ms)
✔ learnFromChange stores governed lessons and project patterns (173.373708ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (511.916458ms)
✔ runCli reflect and learn expose self-improving loop commands (247.3975ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (146.168542ms)
✔ runLoop learns when verification and reflection are ready (704.393375ms)
✔ runCli loop exposes the one-pass self-improvement loop (142.577792ms)
✔ runOperation orchestrates safe delivery control loop (235.578875ms)
✔ runCli operate exposes safe operator command with json output (557.521875ms)
✔ recordDecision stores human decisions for the active change (4.17575ms)
✔ runCli decision records decisions and validates input (3.161709ms)
✔ generateReview writes a decision-aware review checklist (170.721292ms)
✔ runCli review exposes decision-aware review checklist (164.063125ms)
✔ getNextRecommendation guides users with no active change (1.92975ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.9765ms)
✔ runCli next prints recommendation and supports json output (3.74325ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (236.055416ms)
✔ generatePlanPrompt includes recorded human decisions (3.7895ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.068125ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (316.625625ms)
✔ runCli codex prints no-copy handoff and appears in help (362.174333ms)
✔ generateContextPack writes a portable AI handoff pack (174.313667ms)
✔ generateContextPack flags high-risk auth changes without full proof (110.688042ms)
✔ runCli pack writes and prints the context pack path (113.170959ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (314.563625ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (437.030333ms)
✔ generateCodexHandoff includes smart memory for the next feature (734.553083ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (148.966041ms)
✔ runCli reason prints reasoning path and supports json output (3.868833ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (331.971083ms)
✔ generateUiDashboard shows committed files when working tree is clean (440.343333ms)
✔ generateUiDashboard shows ShipSpec audit trail (98.167209ms)
✔ generateUiDashboard shows self-improving loop state (242.03775ms)
✔ generateUiDashboard shows adaptive reasoning state (90.088042ms)
✔ generateUiDashboard shows operator state (305.356333ms)
✔ generateUiDashboard shows human decisions and review state (224.748416ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.777375ms)
✔ runCli ui prints generated dashboard path (88.254375ms)
✔ runCli ui --open opens the generated dashboard (95.737958ms)
✔ runCli run --open starts a mission and opens the dashboard (349.185292ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.904042ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (7.139667ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (6.170208ms)
✔ doctorWorkspace reports repo readiness checks (44.438333ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.837083ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.936167ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.312875ms)
✔ runCli detect and configure print project detection output (2.669ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (5.034208ms)
✔ runCli ci prints generated GitHub Actions path (2.336375ms)
✔ getSpecStatus reports active change files and required proposal sections (3.329667ms)
✔ validateChange passes for a generated spec (3.553791ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.526666ms)
✔ validateChange --ready requires verification evidence (3.122292ms)
✔ validateChange --ready passes after verification evidence exists (74.527625ms)
✔ runCli spec and validate print spec gate output (3.430792ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (282.51775ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (110.779875ms)
✔ runCli diff prints review-oriented Git and change status (104.885666ms)
✔ verifyChange runs fast checks by default and writes evidence (64.466167ms)
✔ verifyChange --full includes full-only checks (121.818666ms)
✔ completeChange blocks until verification evidence exists (3.060417ms)
✔ completeChange writes done report after verification evidence exists (86.087ms)
✔ completeChange includes changed files in done report when Git is available (105.125875ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (161.022083ms)
✔ runCli report prints the report path (167.526958ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (233.118ms)
✔ runCli release prints release handoff path (212.233625ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 12743.167542
```

