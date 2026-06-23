# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-23T14:37:36.397Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.645041ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.07675ms)
✔ startChange writes a richer OpenSpec proposal template (1.860667ms)
✔ runCli dispatches init, start, and status commands (2.037625ms)
✔ runCli supports help and version for an installable CLI (0.217375ms)
✔ runCli skill path prints source and default install target (0.425708ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.269667ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.452375ms)
✔ runSelfTest summarizes command health using an injectable runner (0.263416ms)
✔ runCli examples and self-test print summary output (1.2925ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.284666ms)
✔ runCli desktop prints generated desktop app path (1.554666ms)
✔ package is ready for TypeScript core and npm publishing (0.3505ms)
✔ TypeScript adapters describe ShipSpec integration points (0.45175ms)
✔ runCli adapters lists integration points (0.248542ms)
✔ intake creates a ShipSpec request intake record (1.437417ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.27425ms)
✔ room creates role files for the active ShipSpec change (2.627083ms)
✔ audit reports ShipSpec delivery trail readiness (3.620208ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.181166ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.850708ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (368.555584ms)
✔ learnFromChange stores governed lessons and project patterns (72.878041ms)
✔ runCli reflect and learn expose self-improving loop commands (135.102958ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (121.432958ms)
✔ runLoop learns when verification and reflection are ready (391.545792ms)
✔ runCli loop exposes the one-pass self-improvement loop (120.848541ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (185.254375ms)
✔ runCli memory prints memory summary and supports json output (71.617333ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (69.563375ms)
✔ runCli reason prints reasoning path and supports json output (4.223792ms)
✔ generateUiDashboard writes a single-page pixel dashboard (269.540417ms)
✔ generateUiDashboard shows committed files when working tree is clean (330.284083ms)
✔ generateUiDashboard shows ShipSpec audit trail (64.904ms)
✔ generateUiDashboard shows self-improving loop state (182.951041ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.299084ms)
✔ runCli ui prints generated dashboard path (71.276292ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.818ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.356458ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.486542ms)
✔ doctorWorkspace reports repo readiness checks (29.51475ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.4685ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.385791ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.676958ms)
✔ runCli detect and configure print project detection output (1.654458ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.757458ms)
✔ runCli ci prints generated GitHub Actions path (1.343542ms)
✔ getSpecStatus reports active change files and required proposal sections (1.781084ms)
✔ validateChange passes for a generated spec (1.880709ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.918708ms)
✔ validateChange --ready requires verification evidence (1.788333ms)
✔ validateChange --ready passes after verification evidence exists (57.004583ms)
✔ runCli spec and validate print spec gate output (2.872458ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (225.223833ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (96.442458ms)
✔ runCli diff prints review-oriented Git and change status (93.667833ms)
✔ verifyChange runs fast checks by default and writes evidence (54.9255ms)
✔ verifyChange --full includes full-only checks (111.129125ms)
✔ completeChange blocks until verification evidence exists (2.325584ms)
✔ completeChange writes done report after verification evidence exists (79.497584ms)
✔ completeChange includes changed files in done report when Git is available (100.492208ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (142.957292ms)
✔ runCli report prints the report path (141.14125ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (207.119ms)
✔ runCli release prints release handoff path (187.103875ms)
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 4149.655833
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

✔ initWorkspace creates repo-local delivery folders and default workflow (6.53275ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.032417ms)
✔ startChange writes a richer OpenSpec proposal template (1.859084ms)
✔ runCli dispatches init, start, and status commands (2.015083ms)
✔ runCli supports help and version for an installable CLI (0.214084ms)
✔ runCli skill path prints source and default install target (0.231375ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.252417ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.423166ms)
✔ runSelfTest summarizes command health using an injectable runner (0.277375ms)
✔ runCli examples and self-test print summary output (1.297792ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.229334ms)
✔ runCli desktop prints generated desktop app path (1.548417ms)
✔ package is ready for TypeScript core and npm publishing (0.3645ms)
✔ TypeScript adapters describe ShipSpec integration points (0.432417ms)
✔ runCli adapters lists integration points (0.200167ms)
✔ intake creates a ShipSpec request intake record (1.267458ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.043625ms)
✔ room creates role files for the active ShipSpec change (2.655666ms)
✔ audit reports ShipSpec delivery trail readiness (3.565208ms)
✔ deliver prepares intake, spec, contract, room, and validation (4.093917ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (5.146917ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (256.159042ms)
✔ learnFromChange stores governed lessons and project patterns (71.611792ms)
✔ runCli reflect and learn expose self-improving loop commands (132.334833ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (124.408417ms)
✔ runLoop learns when verification and reflection are ready (389.124208ms)
✔ runCli loop exposes the one-pass self-improvement loop (121.400583ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (189.979208ms)
✔ runCli memory prints memory summary and supports json output (70.328708ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (69.887959ms)
✔ runCli reason prints reasoning path and supports json output (3.330333ms)
✔ generateUiDashboard writes a single-page pixel dashboard (286.272041ms)
✔ generateUiDashboard shows committed files when working tree is clean (374.411417ms)
✔ generateUiDashboard shows ShipSpec audit trail (75.148209ms)
✔ generateUiDashboard shows self-improving loop state (204.03575ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.36675ms)
✔ runCli ui prints generated dashboard path (74.233708ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.994167ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.853167ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.844125ms)
✔ doctorWorkspace reports repo readiness checks (30.723791ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.713584ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.531209ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.861125ms)
✔ runCli detect and configure print project detection output (1.670417ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.667875ms)
✔ runCli ci prints generated GitHub Actions path (1.373042ms)
✔ getSpecStatus reports active change files and required proposal sections (2.690709ms)
✔ validateChange passes for a generated spec (2.057042ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.969291ms)
✔ validateChange --ready requires verification evidence (1.950625ms)
✔ validateChange --ready passes after verification evidence exists (55.531333ms)
✔ runCli spec and validate print spec gate output (2.46025ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (213.608875ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (82.039292ms)
✔ runCli diff prints review-oriented Git and change status (82.851875ms)
✔ verifyChange runs fast checks by default and writes evidence (55.214416ms)
✔ verifyChange --full includes full-only checks (105.526375ms)
✔ completeChange blocks until verification evidence exists (2.439334ms)
✔ completeChange writes done report after verification evidence exists (76.221084ms)
✔ completeChange includes changed files in done report when Git is available (94.245416ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (140.862875ms)
✔ runCli report prints the report path (137.976542ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (207.671084ms)
✔ runCli release prints release handoff path (181.814666ms)
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 4070.562916
```

