# Add Electron Desktop App Verification Evidence

Mode: full
Generated: 2026-06-24T15:03:34.530Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.4295ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.116042ms)
✔ startChange writes a richer OpenSpec proposal template (1.911625ms)
✔ runCli dispatches init, start, and status commands (2.080083ms)
✔ runCli quickstart prepares the low-ceremony project path (88.44275ms)
✔ runCli quickstart --light avoids agent ceremony (77.661583ms)
✔ runMission prepares an AGI-style mission for a new request (327.884333ms)
✔ runMission continues an active change and prepares review when evidence passes (476.307208ms)
✔ runCli with no args shows the operator guide instead of raw help (79.097292ms)
✔ runCli routes plain text to quickstart (80.418ms)
✔ runCli share aliases pack (115.423667ms)
✔ runCli ask aliases share (75.997667ms)
✔ runCli fix aliases light quickstart (77.255333ms)
✔ runCli ship runs ready verification, validation, and report (128.341542ms)
✔ runCli supports help and version for an installable CLI (0.271833ms)
✔ runCli supports the AGI-style run command (303.870875ms)
✔ runCli skill path prints source and default install target (0.319875ms)
✔ runCli skill install copies the bundled ShipSpec skill (2.643708ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.679084ms)
✔ runSelfTest summarizes command health using an injectable runner (0.24975ms)
✔ runCli examples and self-test print summary output (1.158292ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.17325ms)
✔ runCli desktop prints generated desktop app path (0.884667ms)
✔ package is ready for TypeScript core and npm publishing (0.291208ms)
✔ TypeScript adapters describe ShipSpec integration points (0.378834ms)
✔ runCli adapters lists integration points (0.178834ms)
✔ intake creates a ShipSpec request intake record (1.319125ms)
✔ contract creates a delivery contract for the active ShipSpec change (2.05ms)
✔ room creates role files for the active ShipSpec change (3.584708ms)
✔ audit reports ShipSpec delivery trail readiness (3.660333ms)
✔ deliver prepares intake, spec, contract, room, and validation (3.127625ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (4.015959ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (388.111041ms)
✔ learnFromChange stores governed lessons and project patterns (76.060208ms)
✔ runCli reflect and learn expose self-improving loop commands (145.624708ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (127.931125ms)
✔ runLoop learns when verification and reflection are ready (466.410625ms)
✔ runCli loop exposes the one-pass self-improvement loop (132.194ms)
✔ runOperation orchestrates safe delivery control loop (209.022208ms)
✔ runCli operate exposes safe operator command with json output (419.369583ms)
✔ recordDecision stores human decisions for the active change (2.461208ms)
✔ runCli decision records decisions and validates input (2.381916ms)
✔ generateReview writes a decision-aware review checklist (150.769416ms)
✔ runCli review exposes decision-aware review checklist (138.979875ms)
✔ getNextRecommendation guides users with no active change (1.744458ms)
✔ getNextRecommendation guides active changes through missing artifacts (5.030834ms)
✔ runCli next prints recommendation and supports json output (4.500916ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (230.53625ms)
✔ generatePlanPrompt includes recorded human decisions (2.858709ms)
✔ runCli prompt prints Plan mode prompt and supports json output (3.992667ms)
✔ generateContextPack writes a portable AI handoff pack (157.292833ms)
✔ generateContextPack flags high-risk auth changes without full proof (101.530708ms)
✔ runCli pack writes and prints the context pack path (75.239541ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (213.494042ms)
✔ runCli memory prints memory summary and supports json output (78.810834ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (74.11275ms)
✔ runCli reason prints reasoning path and supports json output (3.35925ms)
✔ generateUiDashboard writes a single-page pixel dashboard (301.433125ms)
✔ generateUiDashboard shows committed files when working tree is clean (385.713833ms)
✔ generateUiDashboard shows ShipSpec audit trail (73.787292ms)
✔ generateUiDashboard shows self-improving loop state (261.99875ms)
✔ generateUiDashboard shows adaptive reasoning state (73.321ms)
✔ generateUiDashboard shows operator state (344.255709ms)
✔ generateUiDashboard shows human decisions and review state (217.23675ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.234417ms)
✔ runCli ui prints generated dashboard path (97.708667ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (3.547458ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (6.095125ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (3.319541ms)
✔ doctorWorkspace reports repo readiness checks (31.271708ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.494625ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.431291ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.7695ms)
✔ runCli detect and configure print project detection output (1.750625ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (1.61775ms)
✔ runCli ci prints generated GitHub Actions path (1.445958ms)
✔ getSpecStatus reports active change files and required proposal sections (1.84625ms)
✔ validateChange passes for a generated spec (1.880334ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.900583ms)
✔ validateChange --ready requires verification evidence (1.902208ms)
✔ validateChange --ready passes after verification evidence exists (58.651166ms)
✔ runCli spec and validate print spec gate output (2.430625ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (217.862792ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (93.927875ms)
✔ runCli diff prints review-oriented Git and change status (90.222208ms)
✔ verifyChange runs fast checks by default and writes evidence (58.047084ms)
✔ verifyChange --full includes full-only checks (110.607ms)
✔ completeChange blocks until verification evidence exists (2.113291ms)
✔ completeChange writes done report after verification evidence exists (82.347291ms)
✔ completeChange includes changed files in done report when Git is available (102.353333ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (148.70225ms)
✔ runCli report prints the report path (148.758417ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (251.040042ms)
✔ runCli release prints release handoff path (210.22525ms)
ℹ tests 94
ℹ suites 0
ℹ pass 94
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8572.813625
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

✔ initWorkspace creates repo-local delivery folders and default workflow (7.241583ms)
✔ startChange creates an OpenSpec change, task file, and active status (4.416083ms)
✔ startChange writes a richer OpenSpec proposal template (1.91275ms)
✔ runCli dispatches init, start, and status commands (15.357ms)
✔ runCli quickstart prepares the low-ceremony project path (79.9685ms)
✔ runCli quickstart --light avoids agent ceremony (74.6085ms)
✔ runMission prepares an AGI-style mission for a new request (289.835542ms)
✔ runMission continues an active change and prepares review when evidence passes (436.12625ms)
✔ runCli with no args shows the operator guide instead of raw help (71.672166ms)
✔ runCli routes plain text to quickstart (76.453625ms)
✔ runCli share aliases pack (71.174667ms)
✔ runCli ask aliases share (72.295792ms)
✔ runCli fix aliases light quickstart (72.937625ms)
✔ runCli ship runs ready verification, validation, and report (150.598833ms)
✔ runCli supports help and version for an installable CLI (0.363708ms)
✔ runCli supports the AGI-style run command (290.511917ms)
✔ runCli skill path prints source and default install target (0.320291ms)
✔ runCli skill install copies the bundled ShipSpec skill (3.1435ms)
✔ generateExamples creates a node-basic example project with ShipSpec artifacts (1.441625ms)
✔ runSelfTest summarizes command health using an injectable runner (0.254ms)
✔ runCli examples and self-test print summary output (1.332167ms)
✔ generateDesktopApp writes an Electron desktop wrapper around the CLI (1.239666ms)
✔ runCli desktop prints generated desktop app path (0.862334ms)
✔ package is ready for TypeScript core and npm publishing (0.306584ms)
✔ TypeScript adapters describe ShipSpec integration points (0.382166ms)
✔ runCli adapters lists integration points (0.355459ms)
✔ intake creates a ShipSpec request intake record (1.304ms)
✔ contract creates a delivery contract for the active ShipSpec change (1.963667ms)
✔ room creates role files for the active ShipSpec change (3.559167ms)
✔ audit reports ShipSpec delivery trail readiness (3.319042ms)
✔ deliver prepares intake, spec, contract, room, and validation (2.897125ms)
✔ deliver --adaptive prepares reasoning with the ShipSpec package (3.97575ms)
✔ generateReflection writes lightweight readiness critique without leaking evidence output (384.489541ms)
✔ learnFromChange stores governed lessons and project patterns (82.338791ms)
✔ runCli reflect and learn expose self-improving loop commands (129.385417ms)
✔ runLoop runs one safe verification and reflection pass without learning when gaps remain (139.564ms)
✔ runLoop learns when verification and reflection are ready (437.228125ms)
✔ runCli loop exposes the one-pass self-improvement loop (138.677875ms)
✔ runOperation orchestrates safe delivery control loop (217.156167ms)
✔ runCli operate exposes safe operator command with json output (471.691792ms)
✔ recordDecision stores human decisions for the active change (2.422541ms)
✔ runCli decision records decisions and validates input (2.754542ms)
✔ generateReview writes a decision-aware review checklist (151.635167ms)
✔ runCli review exposes decision-aware review checklist (137.21675ms)
✔ getNextRecommendation guides users with no active change (1.335041ms)
✔ getNextRecommendation guides active changes through missing artifacts (4.340584ms)
✔ runCli next prints recommendation and supports json output (3.400166ms)
✔ generatePlanPrompt writes AI planning context from active ShipSpec state (202.7965ms)
✔ generatePlanPrompt includes recorded human decisions (3.0065ms)
✔ runCli prompt prints Plan mode prompt and supports json output (4.328667ms)
✔ generateContextPack writes a portable AI handoff pack (146.747792ms)
✔ generateContextPack flags high-risk auth changes without full proof (87.658958ms)
✔ runCli pack writes and prints the context pack path (66.834666ms)
✔ getMemorySummary reads lessons, patterns, reflections, and loop actions (198.194042ms)
✔ runCli memory prints memory summary and supports json output (75.480125ms)
✔ generateReasoning writes adaptive local reasoning from spec, memory, and project signals (73.4215ms)
✔ runCli reason prints reasoning path and supports json output (3.229375ms)
✔ generateUiDashboard writes a single-page pixel dashboard (293.86175ms)
✔ generateUiDashboard shows committed files when working tree is clean (361.761334ms)
✔ generateUiDashboard shows ShipSpec audit trail (74.630625ms)
✔ generateUiDashboard shows self-improving loop state (201.060917ms)
✔ generateUiDashboard shows adaptive reasoning state (74.287ms)
✔ generateUiDashboard shows operator state (387.690583ms)
✔ generateUiDashboard shows human decisions and review state (249.9095ms)
✔ generateDesktopApp writes a renderer that serializes command refreshes (1.096875ms)
✔ runCli ui prints generated dashboard path (75.457083ms)
✔ generateAgentInstructions creates cross-agent rules, roles, and message board folders (2.615917ms)
✔ postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages (4.922167ms)
✔ runCli agents, message, and inbox expose the multi-agent coordination flow (4.782042ms)
✔ doctorWorkspace reports repo readiness checks (31.127292ms)
✔ detectProject identifies npm, Next, Vitest, and Playwright from package metadata (0.5505ms)
✔ detectProject identifies Vite and Cypress when those dependencies exist (0.386166ms)
✔ configureWorkflow writes checks only for available scripts and marks e2e fullOnly (1.698625ms)
✔ runCli detect and configure print project detection output (1.788209ms)
✔ generateCiWorkflow writes GitHub Actions workflow from configured checks (2.006166ms)
✔ runCli ci prints generated GitHub Actions path (1.669834ms)
✔ getSpecStatus reports active change files and required proposal sections (1.964042ms)
✔ validateChange passes for a generated spec (1.912667ms)
✔ validateChange fails when proposal is missing acceptance criteria (1.774042ms)
✔ validateChange --ready requires verification evidence (1.8125ms)
✔ validateChange --ready passes after verification evidence exists (63.5065ms)
✔ runCli spec and validate print spec gate output (2.683208ms)
✔ getDiffSummary reports branch, staged files, unstaged files, commits, and evidence (232.120292ms)
✔ getDiffSummary scopes Git status to the project folder inside a parent repository (103.619875ms)
✔ runCli diff prints review-oriented Git and change status (98.311542ms)
✔ verifyChange runs fast checks by default and writes evidence (60.433041ms)
✔ verifyChange --full includes full-only checks (115.395833ms)
✔ completeChange blocks until verification evidence exists (2.545542ms)
✔ completeChange writes done report after verification evidence exists (82.984459ms)
✔ completeChange includes changed files in done report when Git is available (100.618375ms)
✔ generateReport writes a PR-ready markdown report with evidence and changed files (156.289625ms)
✔ runCli report prints the report path (154.598875ms)
✔ generateRelease writes release handoff with validation, evidence, report, changed files, and messages (220.295625ms)
✔ runCli release prints release handoff path (189.496ms)
ℹ tests 94
ℹ suites 0
ℹ pass 94
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8365.13075
```

