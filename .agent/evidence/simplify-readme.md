# Simplify README Verification Evidence

Mode: full
Generated: 2026-06-24T17:02:33.825Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.240916ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.520041ms)
✔ startChange writes a richer OpenSpec proposal template (3.722375ms)
✔ runCli dispatches init, start, and status commands (2.193541ms)
✔ runCli quickstart prepares the low-ceremony project path (100.1135ms)
✔ runCli quickstart --light avoids agent ceremony (90.097917ms)
✔ runMission prepares an AGI-style mission for a new request (355.944333ms)
✔ runMission continues an active change and prepares review when evidence passes (493.663875ms)
✔ runCli with no args shows the operator guide instead of raw help (77.26375ms)
✔ runCli routes plain text to quickstart (88.319792ms)
✔ runCli share aliases pack (84.712292ms)
✔ runCli ask aliases share (83.108ms)
✔ runCli fix aliases light quickstart (80.80775ms)
✔ runCli ship runs ready verification, validation, and report (143.406458ms)
✔ runCli supports help and version for an installable CLI (0.58475ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (19.8705ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (14.434166ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.362917ms)
✔ runCli supports the AGI-style run command (334.836125ms)
✔ runCli skill path prints source and default install target (0.471042ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.167792ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.450291ms)
✔ runSelfTest summarizes command health using an injectable runner (0.2685ms)
✔ runCli examples and self-test print summary output (1.696958ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.530917ms)
✔ runCli desktop prints generated desktop app path (0.920958ms)
✔ package is ready for TypeScript core and npm publishing (0.380292ms)
✔ TypeScript adapters describe ShipSpec integration points (1.171792ms)
✔ runCli adapters lists integration points (0.182875ms)
✔ intake creates a ShipSpec request intake record (1.34975ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.248834ms)
✔ room creates role files for the active ShipSpec change (3.002875ms)
✔ audit reports ShipSpec delivery trail readiness (3.843667ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.471916ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.596458ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (426.131208ms)
✔ learnFromChange stores governed lessons and project patterns (79.943625ms)
✔ runCli reflect and learn expose self-improving loop commands (157.014333ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (147.940084ms)
✔ runLoop learns when verification and reflection are ready (460.555833ms)
✔ runCli loop exposes the one-pass self-improvement loop (143.060625ms)
✔ runOperation orchestrates safe delivery control loop (220.227125ms)
✔ runCli operate exposes safe operator command with json output (452.559042ms)
✔ recordDecision stores human decisions for the active change (4.612958ms)
✔ runCli decision records decisions and validates input (2.99425ms)
✔ generateReview writes a decision-aware review checklist (195.490584ms)
✔ runCli review exposes decision-aware review checklist (168.445416ms)
✔ getNextRecommendation guides users with no active change (2.395417ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.315542ms)
✔ runCli next prints recommendation and supports json output (3.633958ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (243.500625ms)
✔ generatePlanPrompt includes recorded human decisions (3.418625ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.428417ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (348.5805ms)
✔ runCli codex prints no-copy handoff and appears in help (326.996042ms)
✔ generateContextPack writes a portable AI handoff pack (161.92175ms)
✔ generateContextPack flags high-risk auth changes without full proof (106.394791ms)
✔ runCli pack writes and prints the context pack path (86.068917ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (226.451958ms)
✔ runCli memory prints memory summary and supports json output (81.052375ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (83.097584ms)
✔ runCli reason prints reasoning path and supports json output (3.729667ms)
✔ generateUiDashboard writes a single-page pixel dashboard (327.67625ms)
✔ generateUiDashboard shows committed files when working tree is clean (411.64675ms)
✔ generateUiDashboard shows ShipSpec audit trail (80.608625ms)
✔ generateUiDashboard shows self-improving loop state (215.709792ms)
✔ generateUiDashboard shows adaptive reasoning state (85.885958ms)
✔ generateUiDashboard shows operator state (313.121958ms)
✔ generateUiDashboard shows human decisions and review state (219.511958ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.647ms)
✔ runCli ui prints generated dashboard path (87.424875ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.420875ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.023875ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.138375ms)
✔ doctorWorkspace reports repo readiness checks (31.612375ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.675375ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.411917ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.148041ms)
✔ runCli detect and configure print project detection output (1.8475ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.749959ms)
✔ runCli ci prints generated GitHub Actions path (1.489416ms)
✔ getSpecStatus reports active change files and required proposal sections (2.02775ms)
✔ validateChange passes for a generated spec (1.783917ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.729584ms)
✔ validateChange --ready requires verification evidence (1.772542ms)
✔ validateChange --ready passes after verification evidence exists (61.30475ms)
✔ runCli spec and validate print spec gate output (4.811583ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (251.605125ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (108.627166ms)
✔ runCli diff prints review-oriented Git and change status (109.386042ms)
✔ verifyChange runs fast checks by default and writes evidence (60.869167ms)
✔ verifyChange --full includes full-only checks (120.788667ms)
✔ completeChange blocks until verification evidence exists (2.423709ms)
✔ completeChange writes done report after verification evidence exists (92.64ms)
✔ completeChange includes changed files in done report when Git is available (109.183666ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (157.79025ms)
✔ runCli report prints the report path (155.704166ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (257.538792ms)
✔ runCli release prints release handoff path (216.623042ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9779.713542
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

✔ initWorkspace creates repo-local delivery folders and default workflow (8.663ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.916917ms)
✔ startChange writes a richer OpenSpec proposal template (2.313625ms)
✔ runCli dispatches init, start, and status commands (2.225417ms)
✔ runCli quickstart prepares the low-ceremony project path (97.770791ms)
✔ runCli quickstart --light avoids agent ceremony (90.546166ms)
✔ runMission prepares an AGI-style mission for a new request (328.077333ms)
✔ runMission continues an active change and prepares review when evidence passes (465.330958ms)
✔ runCli with no args shows the operator guide instead of raw help (83.463959ms)
✔ runCli routes plain text to quickstart (92.185375ms)
✔ runCli share aliases pack (84.176916ms)
✔ runCli ask aliases share (84.540541ms)
✔ runCli fix aliases light quickstart (82.321125ms)
✔ runCli ship runs ready verification, validation, and report (150.371541ms)
✔ runCli supports help and version for an installable CLI (0.300375ms)
✔ runCli clean previews safe dummy ShipSpec artifacts without deleting them (18.376084ms)
✔ runCli clean --apply removes only safe dummy ShipSpec artifacts (13.969334ms)
✔ runCli clean reports when nothing is safe to clean and appears only in advanced help (2.938584ms)
✔ runCli supports the AGI-style run command (352.719416ms)
✔ runCli skill path prints source and default install target (0.3615ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.268458ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.467459ms)
✔ runSelfTest summarizes command health using an injectable runner (0.238083ms)
✔ runCli examples and self-test print summary output (1.515209ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.398958ms)
✔ runCli desktop prints generated desktop app path (1.019291ms)
✔ package is ready for TypeScript core and npm publishing (0.416291ms)
✔ TypeScript adapters describe ShipSpec integration points (0.457875ms)
✔ runCli adapters lists integration points (0.170625ms)
✔ intake creates a ShipSpec request intake record (1.457167ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.461292ms)
✔ room creates role files for the active ShipSpec change (2.992292ms)
✔ audit reports ShipSpec delivery trail readiness (3.92375ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.942667ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.561875ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (411.458375ms)
✔ learnFromChange stores governed lessons and project patterns (81.54475ms)
✔ runCli reflect and learn expose self-improving loop commands (160.717458ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (138.182083ms)
✔ runLoop learns when verification and reflection are ready (475.020917ms)
✔ runCli loop exposes the one-pass self-improvement loop (137.663625ms)
✔ runOperation orchestrates safe delivery control loop (232.774458ms)
✔ runCli operate exposes safe operator command with json output (465.855083ms)
✔ recordDecision stores human decisions for the active change (2.83375ms)
✔ runCli decision records decisions and validates input (2.777125ms)
✔ generateReview writes a decision-aware review checklist (166.565375ms)
✔ runCli review exposes decision-aware review checklist (151.726625ms)
✔ getNextRecommendation guides users with no active change (1.670458ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.402625ms)
✔ runCli next prints recommendation and supports json output (4.929583ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (227.536042ms)
✔ generatePlanPrompt includes recorded human decisions (2.926417ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.841625ms)
✔ generateCodexHandoff prints a compact no-copy handoff from mission files (333.558ms)
✔ runCli codex prints no-copy handoff and appears in help (339.322ms)
✔ generateContextPack writes a portable AI handoff pack (173.489584ms)
✔ generateContextPack flags high-risk auth changes without full proof (115.915167ms)
✔ runCli pack writes and prints the context pack path (85.875334ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (233.407584ms)
✔ runCli memory prints memory summary and supports json output (91.67775ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (92.071208ms)
✔ runCli reason prints reasoning path and supports json output (3.79025ms)
✔ generateUiDashboard writes a single-page pixel dashboard (337.50375ms)
✔ generateUiDashboard shows committed files when working tree is clean (409.583917ms)
✔ generateUiDashboard shows ShipSpec audit trail (106.816583ms)
✔ generateUiDashboard shows self-improving loop state (228.345125ms)
✔ generateUiDashboard shows adaptive reasoning state (83.023333ms)
✔ generateUiDashboard shows operator state (311.40225ms)
✔ generateUiDashboard shows human decisions and review state (225.274667ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.261042ms)
✔ runCli ui prints generated dashboard path (79.149458ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.830209ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.802041ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.387042ms)
✔ doctorWorkspace reports repo readiness checks (33.877833ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.78125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.490958ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.3785ms)
✔ runCli detect and configure print project detection output (2.237291ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.968083ms)
✔ runCli ci prints generated GitHub Actions path (1.521375ms)
✔ getSpecStatus reports active change files and required proposal sections (2.387583ms)
✔ validateChange passes for a generated spec (2.007458ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.873583ms)
✔ validateChange --ready requires verification evidence (1.803125ms)
✔ validateChange --ready passes after verification evidence exists (59.267916ms)
✔ runCli spec and validate print spec gate output (4.885708ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (248.398416ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (98.018167ms)
✔ runCli diff prints review-oriented Git and change status (97.31175ms)
✔ verifyChange runs fast checks by default and writes evidence (77.358667ms)
✔ verifyChange --full includes full-only checks (127.914ms)
✔ completeChange blocks until verification evidence exists (2.450542ms)
✔ completeChange writes done report after verification evidence exists (82.903167ms)
✔ completeChange includes changed files in done report when Git is available (108.453041ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (158.987125ms)
✔ runCli report prints the report path (162.499792ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.880333ms)
✔ runCli release prints release handoff path (236.196875ms)
ℹ tests 99
ℹ suites 0
ℹ pass 99
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9791.678834
```

