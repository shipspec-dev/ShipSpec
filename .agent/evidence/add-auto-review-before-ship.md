# Add auto review before ship Verification Evidence

Mode: full
Generated: 2026-06-25T06:55:58.377Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.520958ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.947917ms)
✔ startChange writes a richer OpenSpec proposal template (2.1ms)
✔ runCli dispatches init, start, and status commands (2.222958ms)
✔ runCli quickstart prepares the low-ceremony project path (88.362875ms)
✔ runCli quickstart --light avoids agent ceremony (86.567292ms)
✔ runMission prepares an AGI-style mission for a new request (335.464208ms)
✔ runMission continues an active change and prepares review when evidence passes (477.758833ms)
✔ runCli with no args shows the operator guide instead of raw help (84.309416ms)
✔ runCli routes plain text to quickstart (80.887875ms)
✔ runCli share aliases pack (71.982958ms)
✔ runCli ask aliases share (75.318584ms)
✔ runCli fix aliases light quickstart (81.347959ms)
✔ runCli ship runs ready verification, validation, and report (255.204792ms)
✔ runCli supports help and version for an installable CLI (0.290292ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.045417ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.616958ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.241709ms)
✔ runCli supports the AGI-style run command (304.940125ms)
✔ runCli skill path prints source and default install target (0.689584ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.726625ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.450875ms)
✔ runSelfTest summarizes command health using an injectable runner (0.27375ms)
✔ runCli examples and self-test print summary output (1.415292ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.601666ms)
✔ runCli desktop prints generated desktop app path (0.89575ms)
✔ package is ready for TypeScript core and npm publishing (0.291334ms)
✔ TypeScript adapters describe ShipSpec integration points (0.938625ms)
✔ runCli adapters lists integration points (0.276291ms)
✔ intake creates a ShipSpec request intake record (1.493208ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.94425ms)
✔ room creates role files for the active ShipSpec change (3.225583ms)
✔ audit reports ShipSpec delivery trail readiness (3.293875ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.846042ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.894875ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (385.431667ms)
✔ learnFromChange stores governed lessons and project patterns (70.698041ms)
✔ runCli reflect and learn expose self-improving loop commands (140.483667ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (128.305875ms)
✔ runLoop learns when verification and reflection are ready (407.506125ms)
✔ runCli loop exposes the one-pass self-improvement loop (125.402375ms)
✔ runOperation orchestrates safe delivery control loop (200.817542ms)
✔ runCli operate exposes safe operator command with json output (396.340542ms)
✔ recordDecision stores human decisions for the active change (2.803834ms)
✔ runCli decision records decisions and validates input (2.2415ms)
✔ generateReview writes a decision-aware review checklist (145.418667ms)
✔ runCli review exposes decision-aware review checklist (137.596542ms)
✔ getNextRecommendation guides users with no active change (1.68025ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.15575ms)
✔ runCli next prints recommendation and supports json output (3.596959ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (198.75475ms)
✔ generatePlanPrompt includes recorded human decisions (2.949458ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.318834ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (284.939ms)
✔ runCli codex prints no-copy handoff and appears in help (282.880417ms)
✔ generateContextPack writes a portable AI handoff pack (145.492041ms)
✔ generateContextPack flags high-risk auth changes without full proof (91.58975ms)
✔ runCli pack writes and prints the context pack path (71.118625ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (196.175791ms)
✔ runCli memory prints memory summary and supports json output (76.30975ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (85.182834ms)
✔ runCli reason prints reasoning path and supports json output (3.315541ms)
✔ generateUiDashboard writes a single-page pixel dashboard (320.872667ms)
✔ generateUiDashboard shows committed files when working tree is clean (417.728583ms)
✔ generateUiDashboard shows ShipSpec audit trail (77.709291ms)
✔ generateUiDashboard shows self-improving loop state (222.95275ms)
✔ generateUiDashboard shows adaptive reasoning state (83.524209ms)
✔ generateUiDashboard shows operator state (330.299792ms)
✔ generateUiDashboard shows human decisions and review state (244.972916ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.592292ms)
✔ runCli ui prints generated dashboard path (92.061375ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.723542ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.915583ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.305791ms)
✔ doctorWorkspace reports repo readiness checks (36.886625ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.186333ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.8035ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.302834ms)
✔ runCli detect and configure print project detection output (2.163417ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.488667ms)
✔ runCli ci prints generated GitHub Actions path (1.706042ms)
✔ getSpecStatus reports active change files and required proposal sections (2.211541ms)
✔ validateChange passes for a generated spec (1.910459ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.745792ms)
✔ validateChange --ready requires verification evidence (3.757917ms)
✔ validateChange --ready passes after verification evidence exists (66.372042ms)
✔ runCli spec and validate print spec gate output (2.772375ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (258.473625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (111.43175ms)
✔ runCli diff prints review-oriented Git and change status (108.022208ms)
✔ verifyChange runs fast checks by default and writes evidence (60.937959ms)
✔ verifyChange --full includes full-only checks (122.686459ms)
✔ completeChange blocks until verification evidence exists (1.953417ms)
✔ completeChange writes done report after verification evidence exists (85.861541ms)
✔ completeChange includes changed files in done report when Git is available (96.603833ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (151.795459ms)
✔ runCli report prints the report path (187.517584ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (226.94475ms)
✔ runCli release prints release handoff path (200.956375ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9257.679625
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.702875ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.05175ms)
✔ startChange writes a richer OpenSpec proposal template (1.909041ms)
✔ runCli dispatches init, start, and status commands (2.33125ms)
✔ runCli quickstart prepares the low-ceremony project path (83.786834ms)
✔ runCli quickstart --light avoids agent ceremony (73.014792ms)
✔ runMission prepares an AGI-style mission for a new request (302.754292ms)
✔ runMission continues an active change and prepares review when evidence passes (398.775042ms)
✔ runCli with no args shows the operator guide instead of raw help (69.376916ms)
✔ runCli routes plain text to quickstart (76.187875ms)
✔ runCli share aliases pack (72.057166ms)
✔ runCli ask aliases share (71.607958ms)
✔ runCli fix aliases light quickstart (77.373375ms)
✔ runCli ship runs ready verification, validation, and report (190.392833ms)
✔ runCli supports help and version for an installable CLI (0.265209ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (17.62ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (10.141958ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.317833ms)
✔ runCli supports the AGI-style run command (290.887042ms)
✔ runCli skill path prints source and default install target (0.495917ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.6855ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.427041ms)
✔ runSelfTest summarizes command health using an injectable runner (0.193208ms)
✔ runCli examples and self-test print summary output (1.179042ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.214375ms)
✔ runCli desktop prints generated desktop app path (0.849875ms)
✔ package is ready for TypeScript core and npm publishing (0.298667ms)
✔ TypeScript adapters describe ShipSpec integration points (0.410542ms)
✔ runCli adapters lists integration points (0.21625ms)
✔ intake creates a ShipSpec request intake record (1.3715ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.961833ms)
✔ room creates role files for the active ShipSpec change (3.539792ms)
✔ audit reports ShipSpec delivery trail readiness (3.621834ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.070041ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.096041ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (389.230208ms)
✔ learnFromChange stores governed lessons and project patterns (71.985375ms)
✔ runCli reflect and learn expose self-improving loop commands (137.295041ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (125.473417ms)
✔ runLoop learns when verification and reflection are ready (413.216583ms)
✔ runCli loop exposes the one-pass self-improvement loop (125.963708ms)
✔ runOperation orchestrates safe delivery control loop (199.994291ms)
✔ runCli operate exposes safe operator command with json output (400.267167ms)
✔ recordDecision stores human decisions for the active change (2.69125ms)
✔ runCli decision records decisions and validates input (2.276959ms)
✔ generateReview writes a decision-aware review checklist (142.136834ms)
✔ runCli review exposes decision-aware review checklist (130.505541ms)
✔ getNextRecommendation guides users with no active change (1.426417ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.0715ms)
✔ runCli next prints recommendation and supports json output (3.119083ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (201.038084ms)
✔ generatePlanPrompt includes recorded human decisions (2.817083ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.493625ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (287.878875ms)
✔ runCli codex prints no-copy handoff and appears in help (286.43325ms)
✔ generateContextPack writes a portable AI handoff pack (147.341917ms)
✔ generateContextPack flags high-risk auth changes without full proof (88.600792ms)
✔ runCli pack writes and prints the context pack path (70.095584ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (196.649417ms)
✔ runCli memory prints memory summary and supports json output (72.016958ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (75.863167ms)
✔ runCli reason prints reasoning path and supports json output (3.514833ms)
✔ generateUiDashboard writes a single-page pixel dashboard (286.867292ms)
✔ generateUiDashboard shows committed files when working tree is clean (356.904583ms)
✔ generateUiDashboard shows ShipSpec audit trail (73.116583ms)
✔ generateUiDashboard shows self-improving loop state (195.753042ms)
✔ generateUiDashboard shows adaptive reasoning state (74.008917ms)
✔ generateUiDashboard shows operator state (267.537417ms)
✔ generateUiDashboard shows human decisions and review state (194.96725ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.149834ms)
✔ runCli ui prints generated dashboard path (72.423708ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.937917ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.448416ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.361916ms)
✔ doctorWorkspace reports repo readiness checks (30.3295ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.54825ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.390459ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.827917ms)
✔ runCli detect and configure print project detection output (1.756208ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.950333ms)
✔ runCli ci prints generated GitHub Actions path (1.41025ms)
✔ getSpecStatus reports active change files and required proposal sections (1.882333ms)
✔ validateChange passes for a generated spec (2.147208ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.878041ms)
✔ validateChange --ready requires verification evidence (1.60425ms)
✔ validateChange --ready passes after verification evidence exists (58.339583ms)
✔ runCli spec and validate print spec gate output (2.578583ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (215.389625ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (87.969125ms)
✔ runCli diff prints review-oriented Git and change status (88.333709ms)
✔ verifyChange runs fast checks by default and writes evidence (54.695625ms)
✔ verifyChange --full includes full-only checks (107.306041ms)
✔ completeChange blocks until verification evidence exists (2.35875ms)
✔ completeChange writes done report after verification evidence exists (81.705083ms)
✔ completeChange includes changed files in done report when Git is available (98.263084ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (144.256375ms)
✔ runCli report prints the report path (144.873625ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (215.399792ms)
✔ runCli release prints release handoff path (194.053875ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8532.733208
```

