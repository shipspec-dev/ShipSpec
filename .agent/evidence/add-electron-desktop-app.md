# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T11:01:20.769Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.389292ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.169625ms)
✔ startChange writes a richer OpenSpec proposal template (2.224ms)
✔ runCli dispatches init, start, and status commands (2.583042ms)
✔ runCli supports help and version for an installable CLI (0.265041ms)
✔ runCli skill path prints source and default install target (0.264792ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.7515ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.747041ms)
✔ runSelfTest summarizes command health using an injectable runner (0.372791ms)
✔ runCli examples and self-test print summary output (1.693667ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.639417ms)
✔ runCli desktop prints generated desktop app path (1.038084ms)
✔ package is ready for TypeScript core and npm publishing (0.356709ms)
✔ TypeScript adapters describe ShipSpec integration points (1.143375ms)
✔ runCli adapters lists integration points (0.293916ms)
✔ intake creates a ShipSpec request intake record (1.390291ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.214291ms)
✔ room creates role files for the active ShipSpec change (3.200416ms)
✔ audit reports ShipSpec delivery trail readiness (3.94875ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.665667ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.414ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (449.040875ms)
✔ learnFromChange stores governed lessons and project patterns (90.322458ms)
✔ runCli reflect and learn expose self-improving loop commands (176.086042ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (152.771625ms)
✔ runLoop learns when verification and reflection are ready (506.336667ms)
✔ runCli loop exposes the one-pass self-improvement loop (150.947958ms)
✔ runOperation orchestrates safe delivery control loop (237.659959ms)
✔ runCli operate exposes safe operator command with json output (493.3ms)
✔ recordDecision stores human decisions for the active change (3.382375ms)
✔ runCli decision records decisions and validates input (2.222375ms)
✔ generateReview writes a decision-aware review checklist (159.048959ms)
✔ runCli review exposes decision-aware review checklist (158.943916ms)
✔ getNextRecommendation guides users with no active change (1.795125ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.989541ms)
✔ runCli next prints recommendation and supports json output (4.028167ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (229.57325ms)
✔ generatePlanPrompt includes recorded human decisions (2.740375ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.431917ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (225.371416ms)
✔ runCli memory prints memory summary and supports json output (89.543ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (88.471291ms)
✔ runCli reason prints reasoning path and supports json output (4.871208ms)
✔ generateUiDashboard writes a single-page pixel dashboard (333.3585ms)
✔ generateUiDashboard shows committed files when working tree is clean (411.924916ms)
✔ generateUiDashboard shows ShipSpec audit trail (86.478541ms)
✔ generateUiDashboard shows self-improving loop state (245.397417ms)
✔ generateUiDashboard shows adaptive reasoning state (89.351625ms)
✔ generateUiDashboard shows operator state (320.991666ms)
✔ generateUiDashboard shows human decisions and review state (233.117166ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.18975ms)
✔ runCli ui prints generated dashboard path (84.762958ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.778084ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.175083ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.0685ms)
✔ doctorWorkspace reports repo readiness checks (33.5295ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.57175ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.591041ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.110125ms)
✔ runCli detect and configure print project detection output (1.836ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.7915ms)
✔ runCli ci prints generated GitHub Actions path (1.607084ms)
✔ getSpecStatus reports active change files and required proposal sections (4.002542ms)
✔ validateChange passes for a generated spec (2.020291ms)
✔ validateChange fails when proposal is missing acceptance criteria (3.476417ms)
✔ validateChange --ready requires verification evidence (1.764208ms)
✔ validateChange --ready passes after verification evidence exists (68.422291ms)
✔ runCli spec and validate print spec gate output (5.088375ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (248.36575ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (101.616084ms)
✔ runCli diff prints review-oriented Git and change status (102.4225ms)
✔ verifyChange runs fast checks by default and writes evidence (61.512959ms)
✔ verifyChange --full includes full-only checks (121.777708ms)
✔ completeChange blocks until verification evidence exists (2.049584ms)
✔ completeChange writes done report after verification evidence exists (87.110166ms)
✔ completeChange includes changed files in done report when Git is available (108.979291ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (163.949541ms)
✔ runCli report prints the report path (155.940667ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.725458ms)
✔ runCli release prints release handoff path (218.727458ms)
ℹ tests 80
ℹ suites 0
ℹ pass 80
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6946.428458
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.833458ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.319917ms)
✔ startChange writes a richer OpenSpec proposal template (1.946541ms)
✔ runCli dispatches init, start, and status commands (2.191ms)
✔ runCli supports help and version for an installable CLI (0.245792ms)
✔ runCli skill path prints source and default install target (0.278375ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.774458ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.690334ms)
✔ runSelfTest summarizes command health using an injectable runner (0.252ms)
✔ runCli examples and self-test print summary output (1.555416ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.348625ms)
✔ runCli desktop prints generated desktop app path (1.036041ms)
✔ package is ready for TypeScript core and npm publishing (0.372ms)
✔ TypeScript adapters describe ShipSpec integration points (0.509ms)
✔ runCli adapters lists integration points (0.196041ms)
✔ intake creates a ShipSpec request intake record (1.472541ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.84575ms)
✔ room creates role files for the active ShipSpec change (3.227167ms)
✔ audit reports ShipSpec delivery trail readiness (3.900625ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.754833ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.138208ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (407.810208ms)
✔ learnFromChange stores governed lessons and project patterns (88.999416ms)
✔ runCli reflect and learn expose self-improving loop commands (170.115041ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (145.001333ms)
✔ runLoop learns when verification and reflection are ready (463.015541ms)
✔ runCli loop exposes the one-pass self-improvement loop (139.277834ms)
✔ runOperation orchestrates safe delivery control loop (226.0065ms)
✔ runCli operate exposes safe operator command with json output (436.2995ms)
✔ recordDecision stores human decisions for the active change (2.777416ms)
✔ runCli decision records decisions and validates input (2.307208ms)
✔ generateReview writes a decision-aware review checklist (164.896208ms)
✔ runCli review exposes decision-aware review checklist (149.692542ms)
✔ getNextRecommendation guides users with no active change (2.887041ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.854ms)
✔ runCli next prints recommendation and supports json output (3.344792ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (227.484458ms)
✔ generatePlanPrompt includes recorded human decisions (3.126ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.99ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (217.236542ms)
✔ runCli memory prints memory summary and supports json output (85.189708ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (84.398417ms)
✔ runCli reason prints reasoning path and supports json output (3.554375ms)
✔ generateUiDashboard writes a single-page pixel dashboard (329.109167ms)
✔ generateUiDashboard shows committed files when working tree is clean (394.203459ms)
✔ generateUiDashboard shows ShipSpec audit trail (86.267125ms)
✔ generateUiDashboard shows self-improving loop state (212.193792ms)
✔ generateUiDashboard shows adaptive reasoning state (88.200458ms)
✔ generateUiDashboard shows operator state (324.732542ms)
✔ generateUiDashboard shows human decisions and review state (231.28325ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.69625ms)
✔ runCli ui prints generated dashboard path (87.931334ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.552416ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.976917ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.667292ms)
✔ doctorWorkspace reports repo readiness checks (36.488333ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.935958ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.603959ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (2.319542ms)
✔ runCli detect and configure print project detection output (2.09475ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.813666ms)
✔ runCli ci prints generated GitHub Actions path (1.547667ms)
✔ getSpecStatus reports active change files and required proposal sections (4.164417ms)
✔ validateChange passes for a generated spec (1.948ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.951917ms)
✔ validateChange --ready requires verification evidence (1.779708ms)
✔ validateChange --ready passes after verification evidence exists (68.757041ms)
✔ runCli spec and validate print spec gate output (2.980042ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (251.485417ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (98.592458ms)
✔ runCli diff prints review-oriented Git and change status (102.593125ms)
✔ verifyChange runs fast checks by default and writes evidence (62.804166ms)
✔ verifyChange --full includes full-only checks (116.852167ms)
✔ completeChange blocks until verification evidence exists (2.637416ms)
✔ completeChange writes done report after verification evidence exists (88.372292ms)
✔ completeChange includes changed files in done report when Git is available (109.3565ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (155.478166ms)
✔ runCli report prints the report path (177.098834ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (274.452167ms)
✔ runCli release prints release handoff path (207.806958ms)
ℹ tests 80
ℹ suites 0
ℹ pass 80
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6724.3475
```

