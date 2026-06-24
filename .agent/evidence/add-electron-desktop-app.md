# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T13:32:16.427Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.576791ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.150291ms)
✔ startChange writes a richer OpenSpec proposal template (2.032167ms)
✔ runCli dispatches init, start, and status commands (2.21475ms)
✔ runCli quickstart prepares the low-ceremony project path (104.071625ms)
✔ runCli quickstart --light avoids agent ceremony (83.985791ms)
✔ runCli supports help and version for an installable CLI (0.345083ms)
✔ runCli skill path prints source and default install target (0.432333ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.224167ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.847208ms)
✔ runSelfTest summarizes command health using an injectable runner (0.308667ms)
✔ runCli examples and self-test print summary output (1.572166ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.40425ms)
✔ runCli desktop prints generated desktop app path (0.917125ms)
✔ package is ready for TypeScript core and npm publishing (0.341167ms)
✔ TypeScript adapters describe ShipSpec integration points (1.784375ms)
✔ runCli adapters lists integration points (0.44125ms)
✔ intake creates a ShipSpec request intake record (1.850333ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.29975ms)
✔ room creates role files for the active ShipSpec change (2.941375ms)
✔ audit reports ShipSpec delivery trail readiness (4.483125ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.772417ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (7.767583ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (393.62125ms)
✔ learnFromChange stores governed lessons and project patterns (94.989333ms)
✔ runCli reflect and learn expose self-improving loop commands (156.180125ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (145.795917ms)
✔ runLoop learns when verification and reflection are ready (479.981875ms)
✔ runCli loop exposes the one-pass self-improvement loop (128.704916ms)
✔ runOperation orchestrates safe delivery control loop (208.636959ms)
✔ runCli operate exposes safe operator command with json output (464.503959ms)
✔ recordDecision stores human decisions for the active change (2.378875ms)
✔ runCli decision records decisions and validates input (2.343625ms)
✔ generateReview writes a decision-aware review checklist (156.86375ms)
✔ runCli review exposes decision-aware review checklist (187.318416ms)
✔ getNextRecommendation guides users with no active change (1.564125ms)
✔ getNextRecommendation guides active changes through missing artifacts (6.1485ms)
✔ runCli next prints recommendation and supports json output (3.462083ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (663.500416ms)
✔ generatePlanPrompt includes recorded human decisions (7.215959ms)
✔ runCli prompt prints Plan mode prompt and supports json output (6.56025ms)
✔ generateContextPack writes a portable AI handoff pack (211.403583ms)
✔ runCli pack writes and prints the context pack path (69.144208ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (211.415833ms)
✔ runCli memory prints memory summary and supports json output (91.718708ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (89.318708ms)
✔ runCli reason prints reasoning path and supports json output (5.117917ms)
✔ generateUiDashboard writes a single-page pixel dashboard (369.16ms)
✔ generateUiDashboard shows committed files when working tree is clean (428.49425ms)
✔ generateUiDashboard shows ShipSpec audit trail (79.761ms)
✔ generateUiDashboard shows self-improving loop state (239.213666ms)
✔ generateUiDashboard shows adaptive reasoning state (84.400667ms)
✔ generateUiDashboard shows operator state (301.033375ms)
✔ generateUiDashboard shows human decisions and review state (199.414333ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.115459ms)
✔ runCli ui prints generated dashboard path (124.169042ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (4.66625ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (8.270833ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (5.68975ms)
✔ doctorWorkspace reports repo readiness checks (47.984667ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (1.498125ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (1.289959ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (3.804666ms)
✔ runCli detect and configure print project detection output (3.002583ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (3.148708ms)
✔ runCli ci prints generated GitHub Actions path (3.080833ms)
✔ getSpecStatus reports active change files and required proposal sections (3.308041ms)
✔ validateChange passes for a generated spec (4.88425ms)
✔ validateChange fails when proposal is missing acceptance criteria (7.00425ms)
✔ validateChange --ready requires verification evidence (2.201833ms)
✔ validateChange --ready passes after verification evidence exists (80.890625ms)
✔ runCli spec and validate print spec gate output (4.285167ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (271.014167ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (89.992333ms)
✔ runCli diff prints review-oriented Git and change status (93.007375ms)
✔ verifyChange runs fast checks by default and writes evidence (58.554166ms)
✔ verifyChange --full includes full-only checks (109.42225ms)
✔ completeChange blocks until verification evidence exists (2.196125ms)
✔ completeChange writes done report after verification evidence exists (80.631125ms)
✔ completeChange includes changed files in done report when Git is available (98.374ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (146.912167ms)
✔ runCli report prints the report path (151.272209ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (228.106541ms)
✔ runCli release prints release handoff path (193.330583ms)
ℹ tests 84
ℹ suites 0
ℹ pass 84
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7659.410792
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.74675ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.101583ms)
✔ startChange writes a richer OpenSpec proposal template (2.305041ms)
✔ runCli dispatches init, start, and status commands (2.793208ms)
✔ runCli quickstart prepares the low-ceremony project path (98.097917ms)
✔ runCli quickstart --light avoids agent ceremony (89.351666ms)
✔ runCli supports help and version for an installable CLI (0.3255ms)
✔ runCli skill path prints source and default install target (0.228ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.778959ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (2.021333ms)
✔ runSelfTest summarizes command health using an injectable runner (0.292792ms)
✔ runCli examples and self-test print summary output (1.35925ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.416709ms)
✔ runCli desktop prints generated desktop app path (1.03075ms)
✔ package is ready for TypeScript core and npm publishing (0.321708ms)
✔ TypeScript adapters describe ShipSpec integration points (1.129084ms)
✔ runCli adapters lists integration points (2.12825ms)
✔ intake creates a ShipSpec request intake record (2.59325ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.379667ms)
✔ room creates role files for the active ShipSpec change (3.517041ms)
✔ audit reports ShipSpec delivery trail readiness (4.437917ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.541583ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (6.422542ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (391.982041ms)
✔ learnFromChange stores governed lessons and project patterns (77.187667ms)
✔ runCli reflect and learn expose self-improving loop commands (151.129583ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (148.626416ms)
✔ runLoop learns when verification and reflection are ready (422.033709ms)
✔ runCli loop exposes the one-pass self-improvement loop (124.81325ms)
✔ runOperation orchestrates safe delivery control loop (210.2365ms)
✔ runCli operate exposes safe operator command with json output (413.312208ms)
✔ recordDecision stores human decisions for the active change (2.510625ms)
✔ runCli decision records decisions and validates input (2.298583ms)
✔ generateReview writes a decision-aware review checklist (156.366667ms)
✔ runCli review exposes decision-aware review checklist (154.65525ms)
✔ getNextRecommendation guides users with no active change (1.786875ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.085375ms)
✔ runCli next prints recommendation and supports json output (3.444167ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (246.195375ms)
✔ generatePlanPrompt includes recorded human decisions (3.30325ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.363167ms)
✔ generateContextPack writes a portable AI handoff pack (166.111416ms)
✔ runCli pack writes and prints the context pack path (76.192459ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (220.962292ms)
✔ runCli memory prints memory summary and supports json output (89.693292ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (105.135875ms)
✔ runCli reason prints reasoning path and supports json output (3.936166ms)
✔ generateUiDashboard writes a single-page pixel dashboard (346.56525ms)
✔ generateUiDashboard shows committed files when working tree is clean (412.493125ms)
✔ generateUiDashboard shows ShipSpec audit trail (91.437083ms)
✔ generateUiDashboard shows self-improving loop state (248.09075ms)
✔ generateUiDashboard shows adaptive reasoning state (85.913458ms)
✔ generateUiDashboard shows operator state (318.524084ms)
✔ generateUiDashboard shows human decisions and review state (234.969333ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.721958ms)
✔ runCli ui prints generated dashboard path (88.355583ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.256417ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.744ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.889583ms)
✔ doctorWorkspace reports repo readiness checks (31.413ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.847334ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.564417ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.782958ms)
✔ runCli detect and configure print project detection output (1.675542ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.573042ms)
✔ runCli ci prints generated GitHub Actions path (1.413416ms)
✔ getSpecStatus reports active change files and required proposal sections (2.163375ms)
✔ validateChange passes for a generated spec (2.007042ms)
✔ validateChange fails when proposal is missing acceptance criteria (2.012917ms)
✔ validateChange --ready requires verification evidence (1.721791ms)
✔ validateChange --ready passes after verification evidence exists (66.491958ms)
✔ runCli spec and validate print spec gate output (3.324875ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (249.383834ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (92.216709ms)
✔ runCli diff prints review-oriented Git and change status (89.18675ms)
✔ verifyChange runs fast checks by default and writes evidence (59.219709ms)
✔ verifyChange --full includes full-only checks (114.408875ms)
✔ completeChange blocks until verification evidence exists (2.526875ms)
✔ completeChange writes done report after verification evidence exists (87.986917ms)
✔ completeChange includes changed files in done report when Git is available (110.957625ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (163.171209ms)
✔ runCli report prints the report path (150.597041ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (263.120625ms)
✔ runCli release prints release handoff path (223.861958ms)
ℹ tests 84
ℹ suites 0
ℹ pass 84
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7084.441833
```

