# Mission Autopilot v1

## Intent

Make `gsd run "<request>"` feel like the main ShipSpec operator command: it should prepare the mission, identify likely relevant files, estimate risk, refresh the UI, and print a short next-step handoff.

## Problem

- ShipSpec has powerful artifacts, but users can still feel they must remember too many commands.
- `gsd run` already creates useful mission context, but its output is still artifact-heavy and does not tell the user which project files are likely relevant.
- `gsd ui` shows status, but the first-screen mission summary does not include likely files for AI or human review.

## User Value

- Developers get one main command for starting work.
- AI agents get better local context without long copy/paste.
- Reviewers can see likely affected files and risk earlier, before implementation starts.

## Scope

- Add a lightweight likely-file detector using local signals only:
  - changed files
  - recent committed files
  - smart memory common files
  - project entry files
  - request keywords
- Store likely files in mission JSON/markdown and context packs.
- Include likely files in the Codex handoff when present.
- Show likely files in Mission Control's first-screen mission summary.
- Simplify `gsd run` output for new requests to:
  - mission ready line
  - next command
  - UI command
  - Codex command
  - risk
  - likely files
- Preserve existing artifacts and advanced command behavior.

## Out Of Scope

- No network calls to Jira, GitHub, or arbitrary URLs.
- No code editing, deployment, or automatic PR creation from `gsd run`.
- No semantic code indexing or embeddings.
- No new top-level CLI command.

## Acceptance Criteria

- [ ] `gsd run "<request>"` generates mission, prompt, pack, reasoning, and UI artifacts as before.
- [ ] Mission JSON and markdown include a `likelyFiles` list.
- [ ] Context pack includes a "Likely Files" section.
- [ ] Codex handoff includes likely project files when available.
- [ ] Mission Control shows likely files in the current mission summary.
- [ ] `gsd run` output is shorter and points to `gsd codex` and `gsd ui --open`.
- [ ] Existing review-ready `gsd run` behavior remains useful.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Add focused tests for Mission Autopilot likely files and short output.
- Run focused tests during development.
- Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
