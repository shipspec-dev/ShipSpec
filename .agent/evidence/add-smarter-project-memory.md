# Add smarter project memory Verification Evidence

Mode: full
Generated: 2026-06-25T07:35:10.008Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.611083ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.401166ms)
✔ startChange writes a richer OpenSpec proposal template (2.278417ms)
✔ runCli dispatches init, start, and status commands (2.264042ms)
✔ runCli quickstart prepares the low-ceremony project path (92.268416ms)
✔ runCli quickstart --light avoids agent ceremony (90.72625ms)
✔ runMission prepares an AGI-style mission for a new request (369.900458ms)
✔ runMission continues an active change and prepares review when evidence passes (496.989834ms)
✔ runCli with no args shows the operator guide instead of raw help (84.776834ms)
✔ runCli routes plain text to quickstart (89.225833ms)
✔ runCli share aliases pack (82.850292ms)
✔ runCli ask aliases share (82.303958ms)
✔ runCli fix aliases light quickstart (86.777791ms)
✔ runCli ship runs ready verification, validation, and report (218.194542ms)
✔ runCli supports help and version for an installable CLI (0.285333ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.111084ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.949708ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.344333ms)
✔ runCli supports the AGI-style run command (340.428667ms)
✔ runCli skill path prints source and default install target (0.326541ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.446541ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.751583ms)
✔ runSelfTest summarizes command health using an injectable runner (0.294416ms)
✔ runCli examples and self-test print summary output (1.231833ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.324208ms)
✔ runCli desktop prints generated desktop app path (0.88ms)
✔ package is ready for TypeScript core and npm publishing (0.386042ms)
✔ TypeScript adapters describe ShipSpec integration points (0.427541ms)
✔ runCli adapters lists integration points (0.22325ms)
✔ intake creates a ShipSpec request intake record (1.427125ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.325417ms)
✔ room creates role files for the active ShipSpec change (3.671542ms)
✔ audit reports ShipSpec delivery trail readiness (3.865709ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.156042ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.031708ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (287.781ms)
✔ learnFromChange stores governed lessons and project patterns (166.11975ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (493.057083ms)
✔ runCli reflect and learn expose self-improving loop commands (244.55ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (143.604417ms)
✔ runLoop learns when verification and reflection are ready (546.603875ms)
✔ runCli loop exposes the one-pass self-improvement loop (143.830666ms)
✔ runOperation orchestrates safe delivery control loop (243.582666ms)
✔ runCli operate exposes safe operator command with json output (481.536375ms)
✔ recordDecision stores human decisions for the active change (2.938875ms)
✔ runCli decision records decisions and validates input (2.404834ms)
✔ generateReview writes a decision-aware review checklist (168.359ms)
✔ runCli review exposes decision-aware review checklist (162.256625ms)
✔ getNextRecommendation guides users with no active change (1.934916ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.852167ms)
✔ runCli next prints recommendation and supports json output (5.052791ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (228.664916ms)
✔ generatePlanPrompt includes recorded human decisions (3.558083ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.195625ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (338.008792ms)
✔ runCli codex prints no-copy handoff and appears in help (336.797708ms)
✔ generateContextPack writes a portable AI handoff pack (163.3415ms)
✔ generateContextPack flags high-risk auth changes without full proof (104.823209ms)
✔ runCli pack writes and prints the context pack path (85.312833ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (305.092875ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (418.894166ms)
✔ generateCodexHandoff includes smart memory for the next feature (758.830875ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (166.071875ms)
✔ runCli reason prints reasoning path and supports json output (3.660083ms)
✔ generateUiDashboard writes a single-page pixel dashboard (374.802167ms)
✔ generateUiDashboard shows committed files when working tree is clean (475.839625ms)
✔ generateUiDashboard shows ShipSpec audit trail (90.017208ms)
✔ generateUiDashboard shows self-improving loop state (233.212209ms)
✔ generateUiDashboard shows adaptive reasoning state (85.362209ms)
✔ generateUiDashboard shows operator state (316.141334ms)
✔ generateUiDashboard shows human decisions and review state (225.662834ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.68175ms)
✔ runCli ui prints generated dashboard path (87.981542ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.596292ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.774292ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.912292ms)
✔ doctorWorkspace reports repo readiness checks (32.993583ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.753708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.61475ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.834917ms)
✔ runCli detect and configure print project detection output (1.870666ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.108459ms)
✔ runCli ci prints generated GitHub Actions path (1.519125ms)
✔ getSpecStatus reports active change files and required proposal sections (1.859417ms)
✔ validateChange passes for a generated spec (1.831958ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.135958ms)
✔ validateChange --ready requires verification evidence (1.812167ms)
✔ validateChange --ready passes after verification evidence exists (59.90375ms)
✔ runCli spec and validate print spec gate output (2.390167ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (245.4065ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (105.219334ms)
✔ runCli diff prints review-oriented Git and change status (102.505875ms)
✔ verifyChange runs fast checks by default and writes evidence (62.621416ms)
✔ verifyChange --full includes full-only checks (116.778458ms)
✔ completeChange blocks until verification evidence exists (2.742833ms)
✔ completeChange writes done report after verification evidence exists (87.784083ms)
✔ completeChange includes changed files in done report when Git is available (109.519416ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (161.932584ms)
✔ runCli report prints the report path (159.950708ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (250.916375ms)
✔ runCli release prints release handoff path (218.362375ms)
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 11867.942792
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

✔ initWorkspace creates repo-local delivery folders and default workflow (9.072167ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.723917ms)
✔ startChange writes a richer OpenSpec proposal template (2.061833ms)
✔ runCli dispatches init, start, and status commands (2.7995ms)
✔ runCli quickstart prepares the low-ceremony project path (99.755042ms)
✔ runCli quickstart --light avoids agent ceremony (87.442125ms)
✔ runMission prepares an AGI-style mission for a new request (312.360291ms)
✔ runMission continues an active change and prepares review when evidence passes (415.891459ms)
✔ runCli with no args shows the operator guide instead of raw help (68.630458ms)
✔ runCli routes plain text to quickstart (75.424333ms)
✔ runCli share aliases pack (69.724041ms)
✔ runCli ask aliases share (69.270083ms)
✔ runCli fix aliases light quickstart (72.670542ms)
✔ runCli ship runs ready verification, validation, and report (187.329167ms)
✔ runCli supports help and version for an installable CLI (0.262166ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.504833ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (9.7865ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.204042ms)
✔ runCli supports the AGI-style run command (276.654084ms)
✔ runCli skill path prints source and default install target (0.312125ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.667416ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.387ms)
✔ runSelfTest summarizes command health using an injectable runner (0.2055ms)
✔ runCli examples and self-test print summary output (1.24175ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.358ms)
✔ runCli desktop prints generated desktop app path (0.99925ms)
✔ package is ready for TypeScript core and npm publishing (0.299417ms)
✔ TypeScript adapters describe ShipSpec integration points (0.399959ms)
✔ runCli adapters lists integration points (0.17775ms)
✔ intake creates a ShipSpec request intake record (2.025458ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.861084ms)
✔ room creates role files for the active ShipSpec change (2.406125ms)
✔ audit reports ShipSpec delivery trail readiness (3.126041ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.764917ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.788875ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (363.768667ms)
✔ learnFromChange stores governed lessons and project patterns (260.267666ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (469.217625ms)
✔ runCli reflect and learn expose self-improving loop commands (198.520625ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (124.940916ms)
✔ runLoop learns when verification and reflection are ready (472.449291ms)
✔ runCli loop exposes the one-pass self-improvement loop (136.442167ms)
✔ runOperation orchestrates safe delivery control loop (206.429458ms)
✔ runCli operate exposes safe operator command with json output (381.64325ms)
✔ recordDecision stores human decisions for the active change (2.588833ms)
✔ runCli decision records decisions and validates input (2.225917ms)
✔ generateReview writes a decision-aware review checklist (155.336916ms)
✔ runCli review exposes decision-aware review checklist (146.968291ms)
✔ getNextRecommendation guides users with no active change (2.920625ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.65175ms)
✔ runCli next prints recommendation and supports json output (3.13225ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (210.543083ms)
✔ generatePlanPrompt includes recorded human decisions (3.129084ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.651375ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (280.319417ms)
✔ runCli codex prints no-copy handoff and appears in help (292.849375ms)
✔ generateContextPack writes a portable AI handoff pack (147.451792ms)
✔ generateContextPack flags high-risk auth changes without full proof (84.389125ms)
✔ runCli pack writes and prints the context pack path (79.524709ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (293.914416ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (419.332333ms)
✔ generateCodexHandoff includes smart memory for the next feature (654.253833ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (140.321916ms)
✔ runCli reason prints reasoning path and supports json output (4.434042ms)
✔ generateUiDashboard writes a single-page pixel dashboard (310.761708ms)
✔ generateUiDashboard shows committed files when working tree is clean (385.507042ms)
✔ generateUiDashboard shows ShipSpec audit trail (93.133875ms)
✔ generateUiDashboard shows self-improving loop state (204.016375ms)
✔ generateUiDashboard shows adaptive reasoning state (72.12175ms)
✔ generateUiDashboard shows operator state (306.261292ms)
✔ generateUiDashboard shows human decisions and review state (201.606916ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.132209ms)
✔ runCli ui prints generated dashboard path (83.973291ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.151792ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.711083ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.859833ms)
✔ doctorWorkspace reports repo readiness checks (32.434459ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.82825ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.595ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.044917ms)
✔ runCli detect and configure print project detection output (1.723875ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.770834ms)
✔ runCli ci prints generated GitHub Actions path (1.516125ms)
✔ getSpecStatus reports active change files and required proposal sections (1.893667ms)
✔ validateChange passes for a generated spec (1.901541ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.77025ms)
✔ validateChange --ready requires verification evidence (1.69325ms)
✔ validateChange --ready passes after verification evidence exists (57.465792ms)
✔ runCli spec and validate print spec gate output (3.335833ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (239.48225ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (98.918959ms)
✔ runCli diff prints review-oriented Git and change status (85.912958ms)
✔ verifyChange runs fast checks by default and writes evidence (56.364916ms)
✔ verifyChange --full includes full-only checks (110.842833ms)
✔ completeChange blocks until verification evidence exists (2.310166ms)
✔ completeChange writes done report after verification evidence exists (80.478709ms)
✔ completeChange includes changed files in done report when Git is available (96.254542ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (142.576459ms)
✔ runCli report prints the report path (150.051125ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (232.502417ms)
✔ runCli release prints release handoff path (221.031125ms)
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 10759.602625
```

