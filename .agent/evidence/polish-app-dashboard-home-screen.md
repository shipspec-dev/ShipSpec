# Polish app dashboard home screen Verification Evidence

Mode: full
Generated: 2026-06-29T16:20:00.127Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.406041ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.144166ms)
✔ startChange writes a richer OpenSpec proposal template (2.266833ms)
✔ runCli dispatches init, start, and status commands (2.659125ms)
✔ runCli quickstart prepares the low-ceremony project path (93.143ms)
✔ runCli quickstart --light avoids agent ceremony (83.150917ms)
✔ runMission prepares an AGI-style mission for a new request (478.933083ms)
✔ runMission does not suggest generated setup files as likely files (438.029458ms)
✔ runMission continues an active change and prepares review when evidence passes (525.102417ms)
✔ runCli with no args asks for a mission when none exists (15.429875ms)
✔ runCli with no args runs autopilot for an active mission (571.398542ms)
✔ runCli routes plain text to Mission Autopilot (399.883292ms)
✔ runCli share aliases pack (78.481292ms)
✔ runCli ask aliases share (78.681208ms)
✔ runCli fix aliases light quickstart (83.737708ms)
✔ runCli ship runs ready verification, validation, and report (212.045708ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (235.432292ms)
✔ runCli supports help and version for an installable CLI (0.324792ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.494167ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (12.141542ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.238125ms)
✔ runCli supports the AGI-style run command (393.9035ms)
✔ runCli skill path prints source and default install target (0.312792ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.828667ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.457708ms)
✔ runSelfTest summarizes command health using an injectable runner (0.291708ms)
✔ runCli examples and self-test print summary output (1.191792ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.34025ms)
✔ runCli desktop prints generated desktop app path (0.906ms)
✔ package is ready for TypeScript core and npm publishing (0.333833ms)
✔ TypeScript adapters describe ShipSpec integration points (1.188958ms)
✔ runCli adapters lists integration points (0.153917ms)
✔ intake creates a ShipSpec request intake record (1.32125ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.0435ms)
✔ room creates role files for the active ShipSpec change (3.140625ms)
✔ audit reports ShipSpec delivery trail readiness (3.700084ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.39625ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.837333ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (448.558041ms)
✔ learnFromChange stores governed lessons and project patterns (162.28225ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (483.899833ms)
✔ runCli reflect and learn expose self-improving loop commands (233.921709ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (151.981083ms)
✔ runLoop learns when verification and reflection are ready (672.624583ms)
✔ runCli loop exposes the one-pass self-improvement loop (296.212667ms)
✔ runOperation orchestrates safe delivery control loop (270.875667ms)
✔ runCli operate exposes safe operator command with json output (486.893083ms)
✔ runCli autopilot asks for a mission when none is active (17.049167ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (658.634666ms)
✔ runCli autopilot ignores generated setup files before implementation (610.388833ms)
✔ runCli autopilot includes smart memory when routing to AI (1149.8645ms)
✔ runCli autopilot guides changed code to ship verification (630.665417ms)
✔ runCli autopilot reports review-ready missions (320.934ms)
✔ recordDecision stores human decisions for the active change (2.764958ms)
✔ runCli decision records decisions and validates input (2.221708ms)
✔ generateReview writes a decision-aware review checklist (163.922ms)
✔ runCli review exposes decision-aware review checklist (151.199125ms)
✔ getNextRecommendation guides users with no active change (1.511584ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.606125ms)
✔ runCli next prints recommendation and supports json output (3.419917ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (217.845709ms)
✔ generatePlanPrompt includes recorded human decisions (2.996791ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.469334ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (461.464625ms)
✔ runCli codex prints no-copy handoff and appears in help (474.866875ms)
✔ generateContextPack writes a portable AI handoff pack (164.591375ms)
✔ generateContextPack flags high-risk auth changes without full proof (102.623375ms)
✔ runCli pack writes and prints the context pack path (81.923875ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (304.822708ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (405.44525ms)
✔ generateCodexHandoff includes smart memory for the next feature (1065.907125ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (195.164292ms)
✔ runCli reason prints reasoning path and supports json output (3.704667ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (325.061333ms)
✔ generateUiDashboard keeps the first screen compact (106.151916ms)
✔ generateUiDashboard keeps progress out of the first viewport (105.894375ms)
✔ generateUiDashboard moves full likely files into advanced details (106.348125ms)
✔ generateUiDashboard uses short likely-file labels above the fold (104.375625ms)
✔ generateUiDashboard shows committed files when working tree is clean (415.634833ms)
✔ generateUiDashboard shows ShipSpec audit trail (82.342333ms)
✔ generateUiDashboard shows self-improving loop state (212.850833ms)
✔ generateUiDashboard shows adaptive reasoning state (81.332791ms)
✔ generateUiDashboard shows operator state (304.034583ms)
✔ generateUiDashboard shows human decisions and review state (222.504583ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (2.059333ms)
✔ runCli ui prints generated dashboard path (83.205458ms)
✔ runCli ui --open opens the generated dashboard (77.7305ms)
✔ generateAppDashboard writes a richer Mission Control app shell (112.792042ms)
✔ generateAppDashboard makes the mission home a dense dashboard (109.884333ms)
✔ runCli app prints generated app path and supports open (81.054708ms)
✔ runCli run --open starts a mission and opens the dashboard (413.088125ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.115ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.13225ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.000292ms)
✔ doctorWorkspace reports repo readiness checks (33.190125ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (16.035041ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.6565ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.550708ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (5.719833ms)
✔ runCli detect and configure print project detection output (2.887208ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.454625ms)
✔ runCli ci prints generated GitHub Actions path (2.1085ms)
✔ getSpecStatus reports active change files and required proposal sections (2.7015ms)
✔ validateChange passes for a generated spec (1.887584ms)
✔ validateChange fails when proposal is missing acceptance criteria (4.284ms)
✔ validateChange --ready requires verification evidence (6.5025ms)
✔ validateChange --ready passes after verification evidence exists (61.011583ms)
✔ runCli spec and validate print spec gate output (2.531542ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (237.934625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (97.157167ms)
✔ runCli diff prints review-oriented Git and change status (97.767667ms)
✔ verifyChange runs fast checks by default and writes evidence (58.465ms)
✔ verifyChange --full includes full-only checks (117.648833ms)
✔ completeChange blocks until verification evidence exists (2.098375ms)
✔ completeChange writes done report after verification evidence exists (89.556375ms)
✔ completeChange includes changed files in done report when Git is available (202.806958ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (152.708208ms)
✔ runCli report prints the report path (152.603542ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (231.008292ms)
✔ runCli release prints release handoff path (206.935291ms)
ℹ tests 120
ℹ suites 0
ℹ pass 120
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 19044.844542
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

✔ initWorkspace creates repo-local delivery folders and default workflow (13.339667ms)
✔ startChange creates an OpenSpec change, task file, and active status (6.933208ms)
✔ startChange writes a richer OpenSpec proposal template (4.026541ms)
✔ runCli dispatches init, start, and status commands (4.081875ms)
✔ runCli quickstart prepares the low-ceremony project path (97.488917ms)
✔ runCli quickstart --light avoids agent ceremony (89.082542ms)
✔ runMission prepares an AGI-style mission for a new request (420.946792ms)
✔ runMission does not suggest generated setup files as likely files (615.234375ms)
✔ runMission continues an active change and prepares review when evidence passes (533.404959ms)
✔ runCli with no args asks for a mission when none exists (114.861625ms)
✔ runCli with no args runs autopilot for an active mission (900.255666ms)
✔ runCli routes plain text to Mission Autopilot (506.315917ms)
✔ runCli share aliases pack (121.955583ms)
✔ runCli ask aliases share (79.628459ms)
✔ runCli fix aliases light quickstart (95.785125ms)
✔ runCli ship runs ready verification, validation, and report (250.891334ms)
✔ runCli ship writes pre-ship risk review for sensitive changes (229.292208ms)
✔ runCli supports help and version for an installable CLI (0.314459ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (20.448667ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.563125ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.355042ms)
✔ runCli supports the AGI-style run command (394.038833ms)
✔ runCli skill path prints source and default install target (0.313208ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.509958ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.450917ms)
✔ runSelfTest summarizes command health using an injectable runner (0.227708ms)
✔ runCli examples and self-test print summary output (1.424958ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.481292ms)
✔ runCli desktop prints generated desktop app path (0.988625ms)
✔ package is ready for TypeScript core and npm publishing (0.314ms)
✔ TypeScript adapters describe ShipSpec integration points (1.474416ms)
✔ runCli adapters lists integration points (0.191125ms)
✔ intake creates a ShipSpec request intake record (1.528167ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.109875ms)
✔ room creates role files for the active ShipSpec change (2.770125ms)
✔ audit reports ShipSpec delivery trail readiness (3.394084ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.013583ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.664333ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (406.7805ms)
✔ learnFromChange stores governed lessons and project patterns (150.725125ms)
✔ learnFromChange writes structured smart memory from local ShipSpec artifacts (460.945ms)
✔ runCli reflect and learn expose self-improving loop commands (219.378791ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (133.401375ms)
✔ runLoop learns when verification and reflection are ready (504.962917ms)
✔ runCli loop exposes the one-pass self-improvement loop (131.890958ms)
✔ runOperation orchestrates safe delivery control loop (213.105375ms)
✔ runCli operate exposes safe operator command with json output (418.372834ms)
✔ runCli autopilot asks for a mission when none is active (13.806834ms)
✔ runCli autopilot guides a prepared mission to Codex handoff (559.676375ms)
✔ runCli autopilot ignores generated setup files before implementation (577.746292ms)
✔ runCli autopilot includes smart memory when routing to AI (947.258833ms)
✔ runCli autopilot guides changed code to ship verification (595.245791ms)
✔ runCli autopilot reports review-ready missions (297.264375ms)
✔ recordDecision stores human decisions for the active change (2.438291ms)
✔ runCli decision records decisions and validates input (2.17675ms)
✔ generateReview writes a decision-aware review checklist (155.277625ms)
✔ runCli review exposes decision-aware review checklist (152.582375ms)
✔ getNextRecommendation guides users with no active change (1.459958ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.229667ms)
✔ runCli next prints recommendation and supports json output (3.810042ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (212.880083ms)
✔ generatePlanPrompt includes recorded human decisions (2.866875ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.28775ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (451.30225ms)
✔ runCli codex prints no-copy handoff and appears in help (449.852292ms)
✔ generateContextPack writes a portable AI handoff pack (154.968166ms)
✔ generateContextPack flags high-risk auth changes without full proof (95.3885ms)
✔ runCli pack writes and prints the context pack path (75.64125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (279.87475ms)
✔ runCli memory prints memory summary, smart memory, and supports json output (385.748416ms)
✔ generateCodexHandoff includes smart memory for the next feature (845.034833ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (151.807ms)
✔ runCli reason prints reasoning path and supports json output (3.543375ms)
✔ generateUiDashboard writes a professional Mission Control dashboard (302.144208ms)
✔ generateUiDashboard keeps the first screen compact (98.019458ms)
✔ generateUiDashboard keeps progress out of the first viewport (98.734042ms)
✔ generateUiDashboard moves full likely files into advanced details (98.338041ms)
✔ generateUiDashboard uses short likely-file labels above the fold (98.330708ms)
✔ generateUiDashboard shows committed files when working tree is clean (382.86825ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.290959ms)
✔ generateUiDashboard shows self-improving loop state (206.216917ms)
✔ generateUiDashboard shows adaptive reasoning state (78.981292ms)
✔ generateUiDashboard shows operator state (288.444625ms)
✔ generateUiDashboard shows human decisions and review state (214.849625ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.156958ms)
✔ runCli ui prints generated dashboard path (77.354708ms)
✔ runCli ui --open opens the generated dashboard (76.455333ms)
✔ generateAppDashboard writes a richer Mission Control app shell (99.706917ms)
✔ generateAppDashboard makes the mission home a dense dashboard (100.675917ms)
✔ runCli app prints generated app path and supports open (78.627292ms)
✔ runCli run --open starts a mission and opens the dashboard (382.560125ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.902625ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.728709ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.383958ms)
✔ doctorWorkspace reports repo readiness checks (31.941792ms)
✔ runCli doctor prints operator-grade diagnostics and fixes (14.011917ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.713708ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.572125ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.199334ms)
✔ runCli detect and configure print project detection output (1.696ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.680083ms)
✔ runCli ci prints generated GitHub Actions path (1.607709ms)
✔ getSpecStatus reports active change files and required proposal sections (1.700833ms)
✔ validateChange passes for a generated spec (1.672875ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.073083ms)
✔ validateChange --ready requires verification evidence (1.677417ms)
✔ validateChange --ready passes after verification evidence exists (65.370625ms)
✔ runCli spec and validate print spec gate output (2.552625ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (227.217417ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (93.647875ms)
✔ runCli diff prints review-oriented Git and change status (92.012541ms)
✔ verifyChange runs fast checks by default and writes evidence (58.468708ms)
✔ verifyChange --full includes full-only checks (114.960584ms)
✔ completeChange blocks until verification evidence exists (2.207083ms)
✔ completeChange writes done report after verification evidence exists (84.543083ms)
✔ completeChange includes changed files in done report when Git is available (103.344625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (164.598958ms)
✔ runCli report prints the report path (181.252625ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (283.395458ms)
✔ runCli release prints release handoff path (207.482333ms)
ℹ tests 120
ℹ suites 0
ℹ pass 120
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 18233.769583
```

