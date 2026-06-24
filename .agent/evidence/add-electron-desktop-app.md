# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T13:26:32.788Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.438417ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.107791ms)
✔ startChange writes a richer OpenSpec proposal template (1.901084ms)
✔ runCli dispatches init, start, and status commands (2.082042ms)
✔ runCli quickstart prepares the low-ceremony project path (78.511916ms)
✔ runCli quickstart --light avoids agent ceremony (80.050083ms)
✔ runCli supports help and version for an installable CLI (0.276542ms)
✔ runCli skill path prints source and default install target (0.229917ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.839167ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.530458ms)
✔ runSelfTest summarizes command health using an injectable runner (0.4285ms)
✔ runCli examples and self-test print summary output (1.289125ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.189ms)
✔ runCli desktop prints generated desktop app path (0.928625ms)
✔ package is ready for TypeScript core and npm publishing (0.380084ms)
✔ TypeScript adapters describe ShipSpec integration points (1.094333ms)
✔ runCli adapters lists integration points (0.171834ms)
✔ intake creates a ShipSpec request intake record (2.030708ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.049708ms)
✔ room creates role files for the active ShipSpec change (3.003125ms)
✔ audit reports ShipSpec delivery trail readiness (4.023875ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.306542ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.972458ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (361.95225ms)
✔ learnFromChange stores governed lessons and project patterns (73.143542ms)
✔ runCli reflect and learn expose self-improving loop commands (142.992791ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (146.656042ms)
✔ runLoop learns when verification and reflection are ready (456.836291ms)
✔ runCli loop exposes the one-pass self-improvement loop (133.054541ms)
✔ runOperation orchestrates safe delivery control loop (214.551334ms)
✔ runCli operate exposes safe operator command with json output (403.563208ms)
✔ recordDecision stores human decisions for the active change (2.639958ms)
✔ runCli decision records decisions and validates input (2.371084ms)
✔ generateReview writes a decision-aware review checklist (151.7895ms)
✔ runCli review exposes decision-aware review checklist (160.687167ms)
✔ getNextRecommendation guides users with no active change (1.720625ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.506167ms)
✔ runCli next prints recommendation and supports json output (3.337042ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (213.834042ms)
✔ generatePlanPrompt includes recorded human decisions (2.89025ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.813209ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (195.270417ms)
✔ runCli memory prints memory summary and supports json output (71.301375ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (69.38675ms)
✔ runCli reason prints reasoning path and supports json output (3.755333ms)
✔ generateUiDashboard writes a single-page pixel dashboard (291.327291ms)
✔ generateUiDashboard shows committed files when working tree is clean (350.568375ms)
✔ generateUiDashboard shows ShipSpec audit trail (74.055084ms)
✔ generateUiDashboard shows self-improving loop state (206.9015ms)
✔ generateUiDashboard shows adaptive reasoning state (71.867167ms)
✔ generateUiDashboard shows operator state (266.152916ms)
✔ generateUiDashboard shows human decisions and review state (192.401833ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.181667ms)
✔ runCli ui prints generated dashboard path (71.354291ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.353458ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.555083ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.247667ms)
✔ doctorWorkspace reports repo readiness checks (29.492125ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.482708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.44075ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.585125ms)
✔ runCli detect and configure print project detection output (1.700541ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.660667ms)
✔ runCli ci prints generated GitHub Actions path (1.472167ms)
✔ getSpecStatus reports active change files and required proposal sections (1.806167ms)
✔ validateChange passes for a generated spec (1.863792ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.927834ms)
✔ validateChange --ready requires verification evidence (1.806916ms)
✔ validateChange --ready passes after verification evidence exists (55.305333ms)
✔ runCli spec and validate print spec gate output (2.874292ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (217.929667ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (86.468167ms)
✔ runCli diff prints review-oriented Git and change status (84.145333ms)
✔ verifyChange runs fast checks by default and writes evidence (56.909917ms)
✔ verifyChange --full includes full-only checks (123.417208ms)
✔ completeChange blocks until verification evidence exists (2.598542ms)
✔ completeChange writes done report after verification evidence exists (82.878542ms)
✔ completeChange includes changed files in done report when Git is available (98.777958ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (141.693625ms)
✔ runCli report prints the report path (154.656708ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (241.408417ms)
✔ runCli release prints release handoff path (220.643041ms)
ℹ tests 82
ℹ suites 0
ℹ pass 82
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6266.314958
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.778916ms)
✔ startChange creates an OpenSpec change, task file, and active status (2.773ms)
✔ startChange writes a richer OpenSpec proposal template (1.933708ms)
✔ runCli dispatches init, start, and status commands (2.251041ms)
✔ runCli quickstart prepares the low-ceremony project path (91.725875ms)
✔ runCli quickstart --light avoids agent ceremony (93.606834ms)
✔ runCli supports help and version for an installable CLI (0.415375ms)
✔ runCli skill path prints source and default install target (0.326833ms)
✔ runCli skill install copies the bundled ShipSpec skill (4.80725ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (3.315541ms)
✔ runSelfTest summarizes command health using an injectable runner (0.306041ms)
✔ runCli examples and self-test print summary output (1.925084ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.610792ms)
✔ runCli desktop prints generated desktop app path (0.932542ms)
✔ package is ready for TypeScript core and npm publishing (0.334167ms)
✔ TypeScript adapters describe ShipSpec integration points (1.066417ms)
✔ runCli adapters lists integration points (0.196458ms)
✔ intake creates a ShipSpec request intake record (1.402208ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.183333ms)
✔ room creates role files for the active ShipSpec change (2.70925ms)
✔ audit reports ShipSpec delivery trail readiness (3.502791ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.218792ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.617375ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (380.127708ms)
✔ learnFromChange stores governed lessons and project patterns (75.281208ms)
✔ runCli reflect and learn expose self-improving loop commands (150.733792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (135.003459ms)
✔ runLoop learns when verification and reflection are ready (460.720584ms)
✔ runCli loop exposes the one-pass self-improvement loop (134.260458ms)
✔ runOperation orchestrates safe delivery control loop (238.396875ms)
✔ runCli operate exposes safe operator command with json output (450.620834ms)
✔ recordDecision stores human decisions for the active change (2.837292ms)
✔ runCli decision records decisions and validates input (4.614292ms)
✔ generateReview writes a decision-aware review checklist (146.745667ms)
✔ runCli review exposes decision-aware review checklist (135.839583ms)
✔ getNextRecommendation guides users with no active change (1.581625ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.081833ms)
✔ runCli next prints recommendation and supports json output (3.413292ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (204.063833ms)
✔ generatePlanPrompt includes recorded human decisions (2.644959ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.131ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (196.20525ms)
✔ runCli memory prints memory summary and supports json output (79.533333ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (74.781792ms)
✔ runCli reason prints reasoning path and supports json output (6.386875ms)
✔ generateUiDashboard writes a single-page pixel dashboard (309.327334ms)
✔ generateUiDashboard shows committed files when working tree is clean (386.83675ms)
✔ generateUiDashboard shows ShipSpec audit trail (87.102417ms)
✔ generateUiDashboard shows self-improving loop state (202.852125ms)
✔ generateUiDashboard shows adaptive reasoning state (70.714833ms)
✔ generateUiDashboard shows operator state (279.535ms)
✔ generateUiDashboard shows human decisions and review state (216.804542ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.384041ms)
✔ runCli ui prints generated dashboard path (71.209333ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.731333ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.377792ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.400125ms)
✔ doctorWorkspace reports repo readiness checks (29.85975ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.54125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.450917ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.652083ms)
✔ runCli detect and configure print project detection output (1.786208ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.671959ms)
✔ runCli ci prints generated GitHub Actions path (1.485667ms)
✔ getSpecStatus reports active change files and required proposal sections (1.653292ms)
✔ validateChange passes for a generated spec (1.844959ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.805583ms)
✔ validateChange --ready requires verification evidence (1.694ms)
✔ validateChange --ready passes after verification evidence exists (55.043083ms)
✔ runCli spec and validate print spec gate output (2.7715ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (233.87325ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (93.9615ms)
✔ runCli diff prints review-oriented Git and change status (86.541584ms)
✔ verifyChange runs fast checks by default and writes evidence (56.407292ms)
✔ verifyChange --full includes full-only checks (110.805125ms)
✔ completeChange blocks until verification evidence exists (2.506916ms)
✔ completeChange writes done report after verification evidence exists (77.793625ms)
✔ completeChange includes changed files in done report when Git is available (96.138292ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (144.407291ms)
✔ runCli report prints the report path (142.867458ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (230.152125ms)
✔ runCli release prints release handoff path (188.752833ms)
ℹ tests 82
ℹ suites 0
ℹ pass 82
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6428.433291
```

