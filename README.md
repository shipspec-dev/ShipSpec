# ShipSpec

ShipSpec is a repo-local delivery workflow for AI-assisted software development. It turns a feature idea into a spec, task checklist, validation gate, verification evidence, review report, release handoff, and done report.

The command is intentionally short:

```bash
gsd
```

## What It Helps With

- Start a feature with a clear spec and task checklist.
- Block weak specs before implementation goes too far.
- Run fast checks during development and full checks before review.
- Save verification evidence for humans, reviewers, and AI agents.
- Generate review, release, and done notes from the same project state.
- Coordinate planner, builder, tester, reviewer, and release handoffs.

## Demo Project

Pixel Quest Board is a small demo that shows ShipSpec coordinating a real feature:

```text
Spec -> Codex implementation -> full verification -> evidence -> report -> done dashboard
```

Demo repo:

https://github.com/ewent404/PixelQuestBoard

## Requirements

- Node.js 20 or newer
- npm
- Git, recommended for diff and review summaries

## Install For Local Development

From this repository:

```bash
npm install
npm run install:local
gsd --help
```

You can also run the CLI without linking:

```bash
node bin/gsd.mjs --help
```

## Use ShipSpec In A Project

Go to the project you want to manage:

```bash
cd /path/to/your/project
```

First-time setup:

```bash
gsd init
gsd configure
gsd agents
```

Start a feature:

```bash
gsd start "Add user profile page"
gsd spec
gsd validate
```

Implement your code normally, then verify:

```bash
gsd verify
gsd verify --full
gsd validate --ready
```

Prepare review and release notes:

```bash
gsd diff
gsd report
gsd release
gsd done
```

## ShipSpec Workflow Package

For AI-assisted work, ShipSpec can prepare a complete implementation package before coding starts:

```bash
gsd deliver "JIRA-123 Add invoice export"
```

That creates:

- request intake under `.gsd/intake/`
- OpenSpec-style proposal and tasks under `openspec/changes/`
- implementation contract under `.gsd/contracts/`
- role-based agent room under `.agent/room/`
- validation output from `gsd validate`

You can also run each step directly:

```bash
gsd intake "JIRA-123 Add invoice export"
gsd start "JIRA-123 Add invoice export"
gsd contract
gsd room
gsd audit
```

The intended agent workflow is:

```text
Request -> ShipSpec package -> Codex implementation -> verification -> report -> release -> done
```

## Codex Skill

ShipSpec includes a Codex skill at:

```text
skills/shipspec/
```

The skill teaches Codex when to use ShipSpec for feature requests, task links, spec validation, agent coordination, verification evidence, and handoff preparation.

Install or copy that folder into your Codex skills directory, then ask Codex to use ShipSpec:

```bash
gsd skill install
```

```text
Use $shipspec to implement JIRA-123 Add invoice export.
```

To inspect where the bundled skill lives and where it installs:

```bash
gsd skill path
```

The skill keeps the CLI as the engine:

```text
ShipSpec CLI -> ShipSpec skill -> agent workflow -> verified handoff
```

## Daily Feature Flow

```bash
cd /path/to/your/project
gsd start "Add checkout discounts"
gsd validate

# implement the feature

gsd verify --full
gsd validate --ready
gsd report
gsd release
gsd done
```

## Generated Project State

ShipSpec writes workflow state inside the project where you run it:

- `.gsd/` stores workflow config, active change state, reports, releases, and done reports.
- `.agent/` stores agent memory, rules, roles, messages, decisions, and evidence.
- `openspec/` stores change proposals and task checklists.

These files are meant to make delivery visible and reviewable. Commit them when your team wants the workflow history in Git.

## Command Reference

| Command | Purpose |
| --- | --- |
| `gsd init` | Create `.gsd/`, `.agent/`, and `openspec/` folders. |
| `gsd configure` | Detect existing package scripts and write `.gsd/workflow.json`. |
| `gsd start "Feature name"` | Create an active change with proposal and tasks. |
| `gsd status` | Show initialization, active change, and evidence status. |
| `gsd doctor` | Check whether the repo has basics needed for reliable delivery. |
| `gsd detect` | Detect runtime, package manager, framework, tests, and E2E tooling. |
| `gsd agents` | Write agent role instructions and message-board folders. |
| `gsd message <role> <message>` | Post a handoff note for a role. |
| `gsd inbox` | Read recent agent handoff notes. |
| `gsd spec` | Show proposal, tasks, acceptance criteria, verification plan, and evidence status. |
| `gsd validate` | Block weak specs before implementation continues. |
| `gsd verify` | Run configured fast checks and save evidence. |
| `gsd verify --full` | Run all checks, including full-only E2E checks. |
| `gsd validate --ready` | Require both spec quality and verification evidence. |
| `gsd diff` | Summarize branch, changed files, evidence, and recent commits. |
| `gsd report` | Write a PR-ready review report under `.gsd/reports/`. |
| `gsd release` | Write a release handoff under `.gsd/releases/`. |
| `gsd done` | Write a final done report with evidence, changed files, and risks. |
| `gsd ci` | Generate a GitHub Actions workflow from configured checks. |
| `gsd examples` | Generate example projects. |
| `gsd self-test` | Run ShipSpec health checks. |
| `gsd adapters` | List the OpenSpec, Superpowers, GitHub, and project-script integration points. |
| `gsd skill path` | Show the bundled ShipSpec skill source and default Codex install target. |
| `gsd skill install` | Install the bundled ShipSpec skill into the local Codex skills directory. |
| `gsd intake <request>` | Create a local request intake record. |
| `gsd contract` | Create the active change implementation contract. |
| `gsd room` | Create role-based agent room files for the active change. |
| `gsd audit` | Show the ShipSpec trail from intake through done. |
| `gsd deliver <request>` | Prepare intake, spec, contract, room, and validation in one command. |
| `gsd ui` | Generate a static pixel dashboard under `.gsd/ui/index.html`. |
| `gsd desktop` | Generate an Electron desktop app under `apps/desktop/`. |

## Adapters

ShipSpec connects tools through a small adapter model. The current adapters are:

- OpenSpec: `openspec/changes` proposals and task checklists.
- Superpowers: `docs/superpowers` planning, TDD, and verification discipline.
- GitHub: generated CI, review reports, and release handoffs.
- Project scripts: `package.json` scripts used by `gsd verify`.

List them from any project:

```bash
gsd adapters
```

## Desktop App

Generate the desktop app:

```bash
gsd desktop
```

Run it:

```bash
cd apps/desktop
npm install
npm start
```

The desktop app keeps the CLI as the engine. It lets you choose a project folder, run core commands, read agent inbox messages, and view command output.

## Static Pixel Dashboard

Generate a single-page dashboard:

```bash
gsd ui
```

Open:

```bash
.gsd/ui/index.html
```

Regenerate it after workflow state changes:

```bash
gsd ui
```

## Important Remarks

- ShipSpec does not replace your test runner. It runs your existing scripts and records evidence.
- `gsd verify` is for fast development checks.
- `gsd verify --full` is for complete verification, including E2E checks when configured.
- The CLI command remains `gsd` for speed and compatibility.
- The desktop app is a wrapper around the CLI, not a separate workflow engine.
- If a command reports missing spec or evidence, run the command it suggests before continuing.

## Development

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The core adapter layer is written in TypeScript under `src/adapters/`. The current CLI wrapper remains `bin/gsd.mjs`, so existing `gsd` usage keeps working while the internals move toward typed modules.

Generate the desktop wrapper from source:

```bash
node bin/gsd.mjs desktop
```

Generate the static dashboard from source:

```bash
node bin/gsd.mjs ui
```

## Publishing Notes

The package is prepared for npm publishing as `shipspec`, with the executable command exposed as `gsd`.

Before publishing:

```bash
npm test
npm run typecheck
npm publish --access public
```
