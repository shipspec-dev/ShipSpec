# Add safe ShipSpec clean command

## Intent

Add safe ShipSpec clean command

## Problem

- Users create fake or trial missions while learning ShipSpec, such as `your-feature`, `add-sample-mission`, or `test-*`.
- Those generated prompts, packs, missions, reports, and OpenSpec files can make the repo feel noisy.

## User Value

- Developers can safely discover cleanup candidates without deleting useful work.
- Repos stay easier to review because dummy ShipSpec artifacts can be removed intentionally.

## Scope

- Add `gsd clean` preview mode.
- Add `gsd clean --apply` to remove only safe dummy mission artifacts.
- Detect dummy slugs such as `your-feature`, `add-sample-mission`, and `test-*`.
- Never remove the active change.
- Never remove source code or unrelated project files.
- Include the command in advanced help and README maintenance docs.

## Out Of Scope

- Do not clean real completed mission history automatically.
- Do not delete source files, package files, screenshots, or app assets.
- Do not run Git commands automatically.

## Acceptance Criteria

- [ ] `gsd clean` lists cleanup candidates without deleting files.
- [ ] `gsd clean --apply` deletes safe dummy mission artifacts.
- [ ] Active change artifacts are never listed or deleted.
- [ ] The command reports when nothing is safe to clean.
- [ ] README and advanced help document the command as maintenance, not core flow.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
