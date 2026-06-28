# ShipSpec

ShipSpec helps humans and AI agents ship software with less confusion.

It keeps the important delivery facts inside your repo:

- what you are building
- what the AI should read
- what checks passed
- what is ready for review

The command is short:

```bash
gsd
```

## Fast Start

From any project folder:

```bash
gsd run "Add user profile page"
gsd codex
```

Then open Codex and use the output from `gsd codex`.

To open the visual Mission Control dashboard immediately:

```bash
gsd run --open "Add user profile page"
```

After the feature is implemented:

```bash
gsd ship
gsd share
```

That is the main flow.

`gsd run` is Mission Autopilot. It prepares the mission, prompt, context pack, reasoning, likely files, risk level, and dashboard in one step, then prints the next short action.

## Daily Flow

```bash
cd /path/to/project
gsd run "Your feature"
gsd codex

# AI or human implements

gsd ship
gsd share
```

Useful extras:

```bash
gsd ui       # refresh the local dashboard and show how to open it
gsd ui --open # refresh and open Mission Control
gsd next     # see next suggested action
gsd clean    # preview demo/test files that can be removed
```

`gsd ui` shows ShipSpec Mission Control: a focused local dashboard with the next best step, Codex handoff, checks, and progress first. Evidence, memory, workflow, and audit details stay available in collapsed advanced sections. Use `gsd ui --open` when you want ShipSpec to open it for you.

For small fixes:

```bash
gsd fix "Navbar spacing"
```

## AI Handoff

`gsd codex` avoids copy-pasting long prompts. It tells Codex to read the ShipSpec files from the repo:

```bash
gsd codex
```

For other AI tools, use:

```bash
gsd share
```

ShipSpec's basic idea:

```text
request -> AI context -> implementation -> verification -> review notes
```

## Install

```bash
npm install
npm run install:local
gsd --help
```

Requirements:

- Node.js 20 or newer
- npm
- Git, recommended

## What ShipSpec Creates

ShipSpec writes local workflow files:

- `.gsd/` for missions, prompts, reports, evidence summaries, and UI
- `.agent/` for agent notes, roles, memory, and messages
- `openspec/` for proposals and task checklists

Commit these files when you want delivery history in Git.

## When Not To Use ShipSpec

Skip ShipSpec for:

- tiny throwaway scripts
- one-line changes
- experiments where speed matters more than traceability

## Core Commands

Most people only need these:

```bash
gsd
gsd run "Feature request"
gsd codex
gsd ship
gsd share
gsd ui
```

| Command | Purpose |
| --- | --- |
| `gsd` | Show next action. |
| `gsd run "Feature"` | Start or continue work. |
| `gsd codex` | Hand work to Codex without long paste. |
| `gsd ship` | Verify and write review report. |
| `gsd share` | Create AI context pack. |
| `gsd ui` | Refresh the local dashboard and show open instructions. |
| `gsd ui --open` | Refresh and open Mission Control. |

Use `gsd next` when you want ShipSpec to explain the next best action.

Shortcuts:

```bash
gsd fix "Navbar spacing"  # light quickstart for small fixes
gsd ask                   # same as gsd share
```

`gsd --help` shows the beginner surface. `gsd help advanced` shows every command.

<details>
<summary>Advanced command reference</summary>

The full command set is still available for teams that want explicit control.

### Daily Path

| Command | Purpose |
| --- | --- |
| `gsd` | Show the ShipSpec Operator with next action and the small command menu. |
| `gsd run "Feature request"` | Start or continue an AGI-style delivery mission with reasoning, risk, prompt, pack, and UI artifacts. |
| `gsd init` | Create `.gsd/`, `.agent/`, and `openspec/` folders. |
| `gsd quickstart [--light] "Feature name"` | Initialize, configure, start a spec, validate it, and generate Mission Control. Standard mode also writes agent instructions; light mode skips them. |
| `gsd configure` | Detect existing package scripts and write `.gsd/workflow.json`. |
| `gsd start "Feature name"` | Create an active change with proposal and tasks. |
| `gsd status` | Show initialization, active change, and evidence status. |
| `gsd next [--json]` | Recommend the next ShipSpec command from current project state. |
| `gsd ui` | Generate the static ShipSpec Mission Control dashboard under `.gsd/ui/index.html`. |

### Verification

| Command | Purpose |
| --- | --- |
| `gsd spec` | Show proposal, tasks, acceptance criteria, verification plan, and evidence status. |
| `gsd validate` | Block weak specs before implementation continues. |
| `gsd verify` | Run configured fast checks and save evidence. |
| `gsd verify --full` | Run all checks, including full-only E2E checks. |
| `gsd validate --ready` | Require both spec quality and verification evidence. |
| `gsd diff` | Summarize branch, changed files, evidence, and recent commits. |

### AI Workflow

| Command | Purpose |
| --- | --- |
| `gsd deliver <request>` | Prepare intake, spec, contract, room, and validation in one command. |
| `gsd codex` | Print a no-copy Codex handoff for the active ShipSpec mission. |
| `gsd intake <request>` | Create a local request intake record. |
| `gsd contract` | Create the active change implementation contract. |
| `gsd room` | Create role-based agent room files for the active change. |
| `gsd reason [--json]` | Generate local adaptive reasoning from spec, workflow, project signals, and memory. |
| `gsd operate [--dry-run] [--json] <request>` | Run the safe delivery control loop and write an operation report without editing code. |
| `gsd decision <human decision>` | Record a human approval or product choice for the active change. |
| `gsd prompt [--json]` | Generate an AI planning prompt from the active ShipSpec change. |
| `gsd pack [--json]` | Generate a compact, agent-neutral context pack with spec, diff, evidence, decisions, risks, and next action. |
| `gsd share` | Alias for `gsd pack`, optimized for the small command surface. |
| `gsd review [--json]` | Generate a decision-aware review checklist from local ShipSpec state. |

### Self-Improvement

| Command | Purpose |
| --- | --- |
| `gsd reflect` | Write a local readiness critique with gaps, risks, and next actions. |
| `gsd learn` | Save governed lessons and project patterns from the current change. |
| `gsd loop` | Run one safe verify, reflect, and learn pass without editing code. |
| `gsd memory [--json]` | Inspect project memory, patterns, lessons, reflections, and loop actions. |

### Handoff

| Command | Purpose |
| --- | --- |
| `gsd report` | Write a PR-ready review report under `.gsd/reports/`. |
| `gsd release` | Write a release handoff under `.gsd/releases/`. |
| `gsd done` | Write a final done report with evidence, changed files, and risks. |
| `gsd ship` | Run `verify --full`, `validate --ready`, and `report` as one ready-to-review flow. |

### Project Tools

| Command | Purpose |
| --- | --- |
| `gsd doctor` | Check whether the repo has basics needed for reliable delivery. |
| `gsd detect` | Detect runtime, package manager, framework, tests, and E2E tooling. |
| `gsd agents` | Write agent role instructions and message-board folders. |
| `gsd message <role> <message>` | Post a handoff note for a role. |
| `gsd inbox` | Read recent agent handoff notes. |
| `gsd ci` | Generate a GitHub Actions workflow from configured checks. |
| `gsd examples` | Generate example projects. |
| `gsd self-test` | Run ShipSpec health checks. |
| `gsd adapters` | List the OpenSpec, Superpowers, GitHub, and project-script integration points. |
| `gsd skill path` | Show the bundled ShipSpec skill source and default Codex install target. |
| `gsd skill install` | Install the bundled ShipSpec skill into the local Codex skills directory. |
| `gsd audit` | Show the ShipSpec trail from intake through done. |
| `gsd desktop` | Generate an Electron desktop app under `apps/desktop/`. |
| `gsd clean [--apply]` | Preview or delete demo/test ShipSpec files. Keeps your active change and source code. |

</details>

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

## ShipSpec Mission Control

Generate a single-page dashboard:

```bash
gsd ui
```

Open:

```bash
.gsd/ui/index.html
```

Mission Control is a static HTML dashboard for the active change. It uses professional system typography and shows:

- next recommended command and reason
- readiness chips for spec, reasoning, operation, decisions, prompt, evidence, review, and report
- workflow status, self-improving loop state, next actions, and audit trail
- human decisions, adaptive reasoning, operator safety notes, review evidence, changed files, and agent inbox

Command buttons in the static dashboard are safe by design. They copy commands such as `gsd validate`, `gsd verify --full`, `gsd report`, and `gsd next` to your clipboard; they do not execute shell commands from the browser.

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
