# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T10:37:18.092Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.215167ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.011666ms)
✔ startChange writes a richer OpenSpec proposal template (2.000708ms)
✔ runCli dispatches init, start, and status commands (2.136583ms)
✔ runCli supports help and version for an installable CLI (0.221375ms)
✔ runCli skill path prints source and default install target (0.243625ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.68675ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.411958ms)
✔ runSelfTest summarizes command health using an injectable runner (0.240583ms)
✔ runCli examples and self-test print summary output (1.406917ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.141833ms)
✔ runCli desktop prints generated desktop app path (0.98275ms)
✔ package is ready for TypeScript core and npm publishing (0.314209ms)
✔ TypeScript adapters describe ShipSpec integration points (1.107542ms)
✔ runCli adapters lists integration points (0.157375ms)
✔ intake creates a ShipSpec request intake record (1.289416ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.079375ms)
✔ room creates role files for the active ShipSpec change (2.653958ms)
✔ audit reports ShipSpec delivery trail readiness (3.559459ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.221166ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.314833ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (385.243167ms)
✔ learnFromChange stores governed lessons and project patterns (86.595333ms)
✔ runCli reflect and learn expose self-improving loop commands (149.277458ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (128.813167ms)
✔ runLoop learns when verification and reflection are ready (399.71925ms)
✔ runCli loop exposes the one-pass self-improvement loop (126.498459ms)
✔ runOperation orchestrates safe delivery control loop (203.799583ms)
✔ runCli operate exposes safe operator command with json output (465.208667ms)
✔ recordDecision stores human decisions for the active change (2.876292ms)
✔ runCli decision records decisions and validates input (3.019709ms)
✔ generateReview writes a decision-aware review checklist (169.021083ms)
✔ runCli review exposes decision-aware review checklist (140.887666ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (203.089667ms)
✔ generatePlanPrompt includes recorded human decisions (3.246792ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.257375ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (212.020542ms)
✔ runCli memory prints memory summary and supports json output (77.884875ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (72.288625ms)
✔ runCli reason prints reasoning path and supports json output (3.632125ms)
✔ generateUiDashboard writes a single-page pixel dashboard (319.1715ms)
✔ generateUiDashboard shows committed files when working tree is clean (393.376584ms)
✔ generateUiDashboard shows ShipSpec audit trail (100.524625ms)
✔ generateUiDashboard shows self-improving loop state (216.316416ms)
✔ generateUiDashboard shows adaptive reasoning state (85.835291ms)
✔ generateUiDashboard shows operator state (267.92175ms)
✔ generateUiDashboard shows human decisions and review state (209.258083ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.32525ms)
✔ runCli ui prints generated dashboard path (72.252416ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.204125ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.397167ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.088542ms)
✔ doctorWorkspace reports repo readiness checks (29.714209ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.586583ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.407ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.640041ms)
✔ runCli detect and configure print project detection output (1.684ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.609166ms)
✔ runCli ci prints generated GitHub Actions path (1.371917ms)
✔ getSpecStatus reports active change files and required proposal sections (1.818417ms)
✔ validateChange passes for a generated spec (1.870917ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.926667ms)
✔ validateChange --ready requires verification evidence (1.773625ms)
✔ validateChange --ready passes after verification evidence exists (62.016291ms)
✔ runCli spec and validate print spec gate output (2.337709ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (212.357375ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (86.011ms)
✔ runCli diff prints review-oriented Git and change status (87.07825ms)
✔ verifyChange runs fast checks by default and writes evidence (56.08875ms)
✔ verifyChange --full includes full-only checks (109.067833ms)
✔ completeChange blocks until verification evidence exists (2.333709ms)
✔ completeChange writes done report after verification evidence exists (79.737292ms)
✔ completeChange includes changed files in done report when Git is available (99.359583ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (164.367916ms)
✔ runCli report prints the report path (175.184208ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (227.392292ms)
✔ runCli release prints release handoff path (192.836917ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6248.545542
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

✔ initWorkspace creates repo-local delivery folders and default workflow (10.484458ms)
✔ startChange creates an OpenSpec change, task file, and active status (5.429667ms)
✔ startChange writes a richer OpenSpec proposal template (5.363834ms)
✔ runCli dispatches init, start, and status commands (2.467875ms)
✔ runCli supports help and version for an installable CLI (0.292ms)
✔ runCli skill path prints source and default install target (0.301209ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.6965ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.483666ms)
✔ runSelfTest summarizes command health using an injectable runner (0.295833ms)
✔ runCli examples and self-test print summary output (1.303708ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (2.278125ms)
✔ runCli desktop prints generated desktop app path (1.341083ms)
✔ package is ready for TypeScript core and npm publishing (0.402667ms)
✔ TypeScript adapters describe ShipSpec integration points (0.526542ms)
✔ runCli adapters lists integration points (0.18ms)
✔ intake creates a ShipSpec request intake record (1.332458ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.099834ms)
✔ room creates role files for the active ShipSpec change (3.622583ms)
✔ audit reports ShipSpec delivery trail readiness (3.914667ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.664792ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.359125ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (371.628542ms)
✔ learnFromChange stores governed lessons and project patterns (86.1965ms)
✔ runCli reflect and learn expose self-improving loop commands (163.269792ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (130.819333ms)
✔ runLoop learns when verification and reflection are ready (416.542458ms)
✔ runCli loop exposes the one-pass self-improvement loop (133.222583ms)
✔ runOperation orchestrates safe delivery control loop (215.456ms)
✔ runCli operate exposes safe operator command with json output (439.33325ms)
✔ recordDecision stores human decisions for the active change (2.9985ms)
✔ runCli decision records decisions and validates input (3.323584ms)
✔ generateReview writes a decision-aware review checklist (143.541125ms)
✔ runCli review exposes decision-aware review checklist (133.049917ms)
✔ generatePlanPrompt writes Codex Plan mode context from active ShipSpec state (193.881625ms)
✔ generatePlanPrompt includes recorded human decisions (3.295666ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.474125ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (193.606458ms)
✔ runCli memory prints memory summary and supports json output (72.249959ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (78.21525ms)
✔ runCli reason prints reasoning path and supports json output (4.178917ms)
✔ generateUiDashboard writes a single-page pixel dashboard (319.535667ms)
✔ generateUiDashboard shows committed files when working tree is clean (387.545125ms)
✔ generateUiDashboard shows ShipSpec audit trail (80.564584ms)
✔ generateUiDashboard shows self-improving loop state (202.820291ms)
✔ generateUiDashboard shows adaptive reasoning state (76.045333ms)
✔ generateUiDashboard shows operator state (275.840875ms)
✔ generateUiDashboard shows human decisions and review state (237.021209ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.388292ms)
✔ runCli ui prints generated dashboard path (89.391042ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.7355ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (5.340083ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.948333ms)
✔ doctorWorkspace reports repo readiness checks (36.294084ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (9.403ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.724417ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.890917ms)
✔ runCli detect and configure print project detection output (2.121166ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.846208ms)
✔ runCli ci prints generated GitHub Actions path (1.5545ms)
✔ getSpecStatus reports active change files and required proposal sections (1.92675ms)
✔ validateChange passes for a generated spec (18.691667ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.512917ms)
✔ validateChange --ready requires verification evidence (2.246042ms)
✔ validateChange --ready passes after verification evidence exists (97.173333ms)
✔ runCli spec and validate print spec gate output (3.585958ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (229.62975ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (97.550166ms)
✔ runCli diff prints review-oriented Git and change status (91.067ms)
✔ verifyChange runs fast checks by default and writes evidence (59.822542ms)
✔ verifyChange --full includes full-only checks (117.436791ms)
✔ completeChange blocks until verification evidence exists (1.978292ms)
✔ completeChange writes done report after verification evidence exists (87.987375ms)
✔ completeChange includes changed files in done report when Git is available (104.972542ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (147.942375ms)
✔ runCli report prints the report path (146.713834ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (242.465ms)
✔ runCli release prints release handoff path (208.560333ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6337.986959
```

