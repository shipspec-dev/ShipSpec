# Mission Autopilot v1 Verification Evidence

Mode: full
Generated: 2026-06-28T02:14:06.983Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.507792ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.224167ms)
✔ startChange writes a richer OpenSpec proposal template (1.959083ms)
✔ runCli dispatches init, start, and status commands (2.064958ms)
✔ runCli quickstart prepares the low-ceremony project path (99.958875ms)
✔ runCli quickstart --light avoids agent ceremony (88.74625ms)
✔ runMission prepares an AGI-style mission for a new request (421.784875ms)
✔ runMission continues an active change and prepares review when evidence passes (563.860416ms)
✔ runCli with no args shows the operator guide instead of raw help (90.436542ms)
✔ runCli routes plain text to quickstart (83.524417ms)
✔ runCli share aliases pack (80.2365ms)
✔ runCli ask aliases share (75.8425ms)
✔ runCli fix aliases light quickstart (81.434833ms)
✔ runCli ship runs ready verification, validation, and report (307.281417ms)
✔ runCli supports help and version for an installable CLI (0.454709ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (26.337042ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (14.473375ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.644916ms)
✔ runCli supports the AGI-style run command (393.29725ms)
✔ runCli skill path prints source and default install target (0.3235ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.47675ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.798458ms)
✔ runSelfTest summarizes command health using an injectable runner (0.373792ms)
✔ runCli examples and self-test print summary output (1.263167ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.573708ms)
✔ runCli desktop prints generated desktop app path (0.909542ms)
✔ package is ready for TypeScript core and npm publishing (0.34125ms)
✔ TypeScript adapters describe ShipSpec integration points (0.554208ms)
✔ runCli adapters lists integration points (0.175ms)
✔ intake creates a ShipSpec request intake record (1.770375ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.154542ms)
✔ room creates role files for the active ShipSpec change (2.792917ms)
✔ audit reports ShipSpec delivery trail readiness (3.9015ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.229792ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.492083ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (400.739875ms)
✔ learnFromChange stores governed lessons and project patterns (149.326709ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (513.838458ms)
✔ runCli reflect and learn expose self-improving loop commands (234.740291ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (145.091791ms)
✔ runLoop learns when verification and reflection are ready (557.274208ms)
✔ runCli loop exposes the one-pass self-improvement loop (142.244125ms)
✔ runOperation orchestrates safe delivery control loop (237.393417ms)
✔ runCli operate exposes safe operator command with json output (475.138959ms)
✔ recordDecision stores human decisions for the active change (3.373125ms)
✔ runCli decision records decisions and validates input (2.365667ms)
✔ generateReview writes a decision-aware review checklist (154.426875ms)
✔ runCli review exposes decision-aware review checklist (151.781ms)
✔ getNextRecommendation guides users with no active change (1.818083ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.085083ms)
✔ runCli next prints recommendation and supports json output (3.593708ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (224.358083ms)
✔ generatePlanPrompt includes recorded human decisions (3.669792ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.672084ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (463.380541ms)
✔ runCli codex prints no-copy handoff and appears in help (468.313209ms)
✔ generateContextPack writes a portable AI handoff pack (159.037125ms)
✔ generateContextPack flags high-risk auth changes without full proof (96.893833ms)
✔ runCli pack writes and prints the context pack path (76.314208ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (294.682916ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (400.464292ms)
✔ generateCodexHandoff includes smart memory for the next feature (948.323041ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (227.390916ms)
✔ runCli reason prints reasoning path and supports json output (4.103667ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (337.681416ms)
✔ generateUiDashboard shows committed files when working tree is clean (503.378584ms)
✔ generateUiDashboard shows ShipSpec audit trail (165.27375ms)
✔ generateUiDashboard shows self-improving loop state (228.80375ms)
✔ generateUiDashboard shows adaptive reasoning state (81.270958ms)
✔ generateUiDashboard shows operator state (312.861333ms)
✔ generateUiDashboard shows human decisions and review state (210.002917ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.365709ms)
✔ runCli ui prints generated dashboard path (78.21925ms)
✔ runCli ui --open opens the generated dashboard (77.616875ms)
✔ runCli run --open starts a mission and opens the dashboard (410.088333ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.288584ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.30675ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.079459ms)
✔ doctorWorkspace reports repo readiness checks (33.986417ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.750333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.551209ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.494958ms)
✔ runCli detect and configure print project detection output (2.028167ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.127709ms)
✔ runCli ci prints generated GitHub Actions path (3.166333ms)
✔ getSpecStatus reports active change files and required proposal sections (2.049208ms)
✔ validateChange passes for a generated spec (1.696542ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.654ms)
✔ validateChange --ready requires verification evidence (2.296125ms)
✔ validateChange --ready passes after verification evidence exists (58.021583ms)
✔ runCli spec and validate print spec gate output (2.649208ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (238.135917ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (104.613875ms)
✔ runCli diff prints review-oriented Git and change status (94.346792ms)
✔ verifyChange runs fast checks by default and writes evidence (57.005958ms)
✔ verifyChange --full includes full-only checks (113.897625ms)
✔ completeChange blocks until verification evidence exists (2.519833ms)
✔ completeChange writes done report after verification evidence exists (99.831167ms)
✔ completeChange includes changed files in done report when Git is available (110.073125ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (159.581584ms)
✔ runCli report prints the report path (159.931875ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (291.95175ms)
✔ runCli release prints release handoff path (238.954042ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13229.817125
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.587042ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.402375ms)
✔ startChange writes a richer OpenSpec proposal template (2.191292ms)
✔ runCli dispatches init, start, and status commands (2.3585ms)
✔ runCli quickstart prepares the low-ceremony project path (88.282625ms)
✔ runCli quickstart --light avoids agent ceremony (83.52425ms)
✔ runMission prepares an AGI-style mission for a new request (394.975ms)
✔ runMission continues an active change and prepares review when evidence passes (506.899791ms)
✔ runCli with no args shows the operator guide instead of raw help (82.086125ms)
✔ runCli routes plain text to quickstart (91.402459ms)
✔ runCli share aliases pack (82.302041ms)
✔ runCli ask aliases share (81.41975ms)
✔ runCli fix aliases light quickstart (89.525125ms)
✔ runCli ship runs ready verification, validation, and report (201.399875ms)
✔ runCli supports help and version for an installable CLI (0.446833ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.253459ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (11.446916ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.407667ms)
✔ runCli supports the AGI-style run command (395.827958ms)
✔ runCli skill path prints source and default install target (0.401542ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.926917ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.688292ms)
✔ runSelfTest summarizes command health using an injectable runner (0.441084ms)
✔ runCli examples and self-test print summary output (1.945417ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.518125ms)
✔ runCli desktop prints generated desktop app path (1.069542ms)
✔ package is ready for TypeScript core and npm publishing (0.33775ms)
✔ TypeScript adapters describe ShipSpec integration points (0.397667ms)
✔ runCli adapters lists integration points (0.173666ms)
✔ intake creates a ShipSpec request intake record (1.462875ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.289792ms)
✔ room creates role files for the active ShipSpec change (2.569291ms)
✔ audit reports ShipSpec delivery trail readiness (5.686125ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.311166ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.34025ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (404.064666ms)
✔ learnFromChange stores governed lessons and project patterns (162.094083ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (480.495584ms)
✔ runCli reflect and learn expose self-improving loop commands (229.407166ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (155.906375ms)
✔ runLoop learns when verification and reflection are ready (531.695583ms)
✔ runCli loop exposes the one-pass self-improvement loop (132.634542ms)
✔ runOperation orchestrates safe delivery control loop (215.267042ms)
✔ runCli operate exposes safe operator command with json output (424.079ms)
✔ recordDecision stores human decisions for the active change (2.599125ms)
✔ runCli decision records decisions and validates input (2.328958ms)
✔ generateReview writes a decision-aware review checklist (150.260042ms)
✔ runCli review exposes decision-aware review checklist (143.020042ms)
✔ getNextRecommendation guides users with no active change (2.096917ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.026083ms)
✔ runCli next prints recommendation and supports json output (5.014542ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (214.063041ms)
✔ generatePlanPrompt includes recorded human decisions (4.116042ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.770583ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (464.777875ms)
✔ runCli codex prints no-copy handoff and appears in help (506.667041ms)
✔ generateContextPack writes a portable AI handoff pack (163.317542ms)
✔ generateContextPack flags high-risk auth changes without full proof (105.52725ms)
✔ runCli pack writes and prints the context pack path (81.663458ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (290.440958ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (371.627542ms)
✔ generateCodexHandoff includes smart memory for the next feature (846.847042ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (154.630542ms)
✔ runCli reason prints reasoning path and supports json output (3.826125ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (312.146541ms)
✔ generateUiDashboard shows committed files when working tree is clean (384.313542ms)
✔ generateUiDashboard shows ShipSpec audit trail (83.522125ms)
✔ generateUiDashboard shows self-improving loop state (208.144291ms)
✔ generateUiDashboard shows adaptive reasoning state (77.9775ms)
✔ generateUiDashboard shows operator state (295.823042ms)
✔ generateUiDashboard shows human decisions and review state (221.398708ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.581292ms)
✔ runCli ui prints generated dashboard path (88.256583ms)
✔ runCli ui --open opens the generated dashboard (88.654541ms)
✔ runCli run --open starts a mission and opens the dashboard (411.54525ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.279208ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.23175ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.619583ms)
✔ doctorWorkspace reports repo readiness checks (32.719375ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.811583ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.541875ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.789292ms)
✔ runCli detect and configure print project detection output (1.995666ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.957833ms)
✔ runCli ci prints generated GitHub Actions path (1.658375ms)
✔ getSpecStatus reports active change files and required proposal sections (1.797292ms)
✔ validateChange passes for a generated spec (1.770291ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.117084ms)
✔ validateChange --ready requires verification evidence (1.92275ms)
✔ validateChange --ready passes after verification evidence exists (69.951333ms)
✔ runCli spec and validate print spec gate output (2.899667ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (236.867542ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (104.334875ms)
✔ runCli diff prints review-oriented Git and change status (103.888625ms)
✔ verifyChange runs fast checks by default and writes evidence (59.159458ms)
✔ verifyChange --full includes full-only checks (118.009375ms)
✔ completeChange blocks until verification evidence exists (2.565208ms)
✔ completeChange writes done report after verification evidence exists (83.243209ms)
✔ completeChange includes changed files in done report when Git is available (102.173042ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (159.155459ms)
✔ runCli report prints the report path (155.182959ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (232.422625ms)
✔ runCli release prints release handoff path (200.97525ms)
ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 12403.276042
```

