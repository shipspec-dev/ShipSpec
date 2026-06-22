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
| `gsd ui` | Generate a static pixel dashboard under `.gsd/ui/index.html`. |
| `gsd desktop` | Generate an Electron desktop app under `apps/desktop/`. |

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
```

Generate the desktop wrapper from source:

```bash
node bin/gsd.mjs desktop
```

Generate the static dashboard from source:

```bash
node bin/gsd.mjs ui
```
