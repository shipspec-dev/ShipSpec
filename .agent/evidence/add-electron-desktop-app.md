# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T15:11:47.569Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.74125ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.904833ms)
✔ startChange writes a richer OpenSpec proposal template (2.204292ms)
✔ runCli dispatches init, start, and status commands (2.319875ms)
✔ runCli quickstart prepares the low-ceremony project path (79.235584ms)
✔ runCli quickstart --light avoids agent ceremony (73.321292ms)
✔ runMission prepares an AGI-style mission for a new request (316.3615ms)
✔ runMission continues an active change and prepares review when evidence passes (440.507708ms)
✔ runCli with no args shows the operator guide instead of raw help (76.481834ms)
✔ runCli routes plain text to quickstart (80.702416ms)
✔ runCli share aliases pack (70.576042ms)
✔ runCli ask aliases share (76.129292ms)
✔ runCli fix aliases light quickstart (76.252958ms)
✔ runCli ship runs ready verification, validation, and report (125.583875ms)
✔ runCli supports help and version for an installable CLI (0.26ms)
✔ runCli supports the AGI-style run command (289.615583ms)
✔ runCli skill path prints source and default install target (0.319834ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.825417ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.424625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.219375ms)
✔ runCli examples and self-test print summary output (1.241708ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.27975ms)
✔ runCli desktop prints generated desktop app path (0.906041ms)
✔ package is ready for TypeScript core and npm publishing (0.275042ms)
✔ TypeScript adapters describe ShipSpec integration points (0.322917ms)
✔ runCli adapters lists integration points (0.169542ms)
✔ intake creates a ShipSpec request intake record (1.249458ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.838208ms)
✔ room creates role files for the active ShipSpec change (2.587667ms)
✔ audit reports ShipSpec delivery trail readiness (3.348417ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.7845ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.115667ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (384.472458ms)
✔ learnFromChange stores governed lessons and project patterns (72.559417ms)
✔ runCli reflect and learn expose self-improving loop commands (142.312334ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (127.399917ms)
✔ runLoop learns when verification and reflection are ready (403.834291ms)
✔ runCli loop exposes the one-pass self-improvement loop (127.518ms)
✔ runOperation orchestrates safe delivery control loop (209.835167ms)
✔ runCli operate exposes safe operator command with json output (486.152917ms)
✔ recordDecision stores human decisions for the active change (2.825542ms)
✔ runCli decision records decisions and validates input (2.449542ms)
✔ generateReview writes a decision-aware review checklist (173.247667ms)
✔ runCli review exposes decision-aware review checklist (138.643917ms)
✔ getNextRecommendation guides users with no active change (1.891458ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.737458ms)
✔ runCli next prints recommendation and supports json output (5.078208ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (211.297208ms)
✔ generatePlanPrompt includes recorded human decisions (3.335916ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.71275ms)
✔ generateContextPack writes a portable AI handoff pack (165.701916ms)
✔ generateContextPack flags high-risk auth changes without full proof (98.033375ms)
✔ runCli pack writes and prints the context pack path (78.854625ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (217.708542ms)
✔ runCli memory prints memory summary and supports json output (80.146041ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (80.007041ms)
✔ runCli reason prints reasoning path and supports json output (3.509334ms)
✔ generateUiDashboard writes a single-page pixel dashboard (294.625417ms)
✔ generateUiDashboard shows committed files when working tree is clean (363.593959ms)
✔ generateUiDashboard shows ShipSpec audit trail (74.929416ms)
✔ generateUiDashboard shows self-improving loop state (195.031083ms)
✔ generateUiDashboard shows adaptive reasoning state (77.321791ms)
✔ generateUiDashboard shows operator state (271.720875ms)
✔ generateUiDashboard shows human decisions and review state (195.604125ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.368167ms)
✔ runCli ui prints generated dashboard path (75.587ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.273917ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.487375ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.73475ms)
✔ doctorWorkspace reports repo readiness checks (31.538625ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.538958ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.430708ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.746292ms)
✔ runCli detect and configure print project detection output (1.728417ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.718459ms)
✔ runCli ci prints generated GitHub Actions path (1.954833ms)
✔ getSpecStatus reports active change files and required proposal sections (1.908667ms)
✔ validateChange passes for a generated spec (1.651709ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.77775ms)
✔ validateChange --ready requires verification evidence (1.668416ms)
✔ validateChange --ready passes after verification evidence exists (55.989583ms)
✔ runCli spec and validate print spec gate output (4.380208ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (226.572667ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (89.456834ms)
✔ runCli diff prints review-oriented Git and change status (89.370375ms)
✔ verifyChange runs fast checks by default and writes evidence (56.496125ms)
✔ verifyChange --full includes full-only checks (110.023083ms)
✔ completeChange blocks until verification evidence exists (4.073584ms)
✔ completeChange writes done report after verification evidence exists (81.414417ms)
✔ completeChange includes changed files in done report when Git is available (98.45625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (146.883875ms)
✔ runCli report prints the report path (143.354583ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (214.824291ms)
✔ runCli release prints release handoff path (190.7085ms)
ℹ tests 94
ℹ suites 0
ℹ pass 94
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8186.835916
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.966458ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.114292ms)
✔ startChange writes a richer OpenSpec proposal template (1.888833ms)
✔ runCli dispatches init, start, and status commands (2.451959ms)
✔ runCli quickstart prepares the low-ceremony project path (86.404583ms)
✔ runCli quickstart --light avoids agent ceremony (76.643292ms)
✔ runMission prepares an AGI-style mission for a new request (293.418666ms)
✔ runMission continues an active change and prepares review when evidence passes (406.365917ms)
✔ runCli with no args shows the operator guide instead of raw help (75.418917ms)
✔ runCli routes plain text to quickstart (75.377625ms)
✔ runCli share aliases pack (70.450667ms)
✔ runCli ask aliases share (69.400292ms)
✔ runCli fix aliases light quickstart (75.51275ms)
✔ runCli ship runs ready verification, validation, and report (126.022667ms)
✔ runCli supports help and version for an installable CLI (2.623625ms)
✔ runCli supports the AGI-style run command (295.618333ms)
✔ runCli skill path prints source and default install target (0.308375ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.874583ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.434875ms)
✔ runSelfTest summarizes command health using an injectable runner (0.230792ms)
✔ runCli examples and self-test print summary output (1.187084ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.270791ms)
✔ runCli desktop prints generated desktop app path (0.887958ms)
✔ package is ready for TypeScript core and npm publishing (0.347917ms)
✔ TypeScript adapters describe ShipSpec integration points (0.3855ms)
✔ runCli adapters lists integration points (0.334333ms)
✔ intake creates a ShipSpec request intake record (1.464416ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.927417ms)
✔ room creates role files for the active ShipSpec change (2.540667ms)
✔ audit reports ShipSpec delivery trail readiness (4.312666ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.920916ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.81525ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (372.209584ms)
✔ learnFromChange stores governed lessons and project patterns (72.268959ms)
✔ runCli reflect and learn expose self-improving loop commands (140.02325ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (125.866292ms)
✔ runLoop learns when verification and reflection are ready (407.7305ms)
✔ runCli loop exposes the one-pass self-improvement loop (128.201625ms)
✔ runOperation orchestrates safe delivery control loop (199.477709ms)
✔ runCli operate exposes safe operator command with json output (502.84225ms)
✔ recordDecision stores human decisions for the active change (3.60375ms)
✔ runCli decision records decisions and validates input (2.898792ms)
✔ generateReview writes a decision-aware review checklist (164.920208ms)
✔ runCli review exposes decision-aware review checklist (182.295667ms)
✔ getNextRecommendation guides users with no active change (1.860417ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.992041ms)
✔ runCli next prints recommendation and supports json output (3.412667ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (205.590042ms)
✔ generatePlanPrompt includes recorded human decisions (3.558584ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.696208ms)
✔ generateContextPack writes a portable AI handoff pack (150.869583ms)
✔ generateContextPack flags high-risk auth changes without full proof (90.509916ms)
✔ runCli pack writes and prints the context pack path (72.165458ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (196.779875ms)
✔ runCli memory prints memory summary and supports json output (71.786792ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (74.89525ms)
✔ runCli reason prints reasoning path and supports json output (3.429167ms)
✔ generateUiDashboard writes a single-page pixel dashboard (284.0615ms)
✔ generateUiDashboard shows committed files when working tree is clean (380.136458ms)
✔ generateUiDashboard shows ShipSpec audit trail (81.779333ms)
✔ generateUiDashboard shows self-improving loop state (197.421541ms)
✔ generateUiDashboard shows adaptive reasoning state (74.676042ms)
✔ generateUiDashboard shows operator state (274.812833ms)
✔ generateUiDashboard shows human decisions and review state (200.900916ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.277958ms)
✔ runCli ui prints generated dashboard path (73.305458ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.933375ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.728ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.423ms)
✔ doctorWorkspace reports repo readiness checks (30.584875ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.626125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.618167ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.227875ms)
✔ runCli detect and configure print project detection output (1.704291ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.716459ms)
✔ runCli ci prints generated GitHub Actions path (1.391958ms)
✔ getSpecStatus reports active change files and required proposal sections (1.917334ms)
✔ validateChange passes for a generated spec (1.834042ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.276416ms)
✔ validateChange --ready requires verification evidence (1.88325ms)
✔ validateChange --ready passes after verification evidence exists (57.616417ms)
✔ runCli spec and validate print spec gate output (4.085875ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (221.806708ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (87.747042ms)
✔ runCli diff prints review-oriented Git and change status (87.716667ms)
✔ verifyChange runs fast checks by default and writes evidence (57.713417ms)
✔ verifyChange --full includes full-only checks (112.149042ms)
✔ completeChange blocks until verification evidence exists (2.32475ms)
✔ completeChange writes done report after verification evidence exists (85.341416ms)
✔ completeChange includes changed files in done report when Git is available (106.682791ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (154.76475ms)
✔ runCli report prints the report path (157.247083ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (229.041084ms)
✔ runCli release prints release handoff path (207.115709ms)
ℹ tests 94
ℹ suites 0
ℹ pass 94
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8175.623
```

