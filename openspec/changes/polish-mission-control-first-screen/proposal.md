# Polish Mission Control first screen

## Intent

Make the Mission Control first screen feel like a focused command center instead of a report page.

## Problem

- The next-action card still leaves too much empty vertical space.
- Long file paths dominate the first viewport.
- The progress strip repeats readiness information that already exists in the summary.
- The dashboard still asks users to read too much before knowing what to do next.

## User Value

- Developers can open `gsd ui` and immediately see the next command, current mission, and ship readiness.
- New users see fewer competing panels and less workflow noise.
- Full evidence, progress, and file details remain available without taking over the first screen.

## Scope

- Reduce the first-screen next-action panel to the height its content needs.
- Move progress details into advanced details instead of showing them as a full first-screen section.
- Render likely files with short display labels first and preserve full paths in titles/details.
- Keep workflow commands collapsed by default.
- Update tests and README copy for the cleaner Mission Control layout.

## Out Of Scope

- No new desktop app shell.
- No command behavior changes.
- No changes to verification semantics, readiness scoring, or generated artifact locations.

## Acceptance Criteria

- [ ] The next-action card does not use large fixed or minimum heights.
- [ ] The first viewport has no always-visible progress section.
- [ ] Progress details are available inside advanced details.
- [ ] Likely files show compact filenames first while preserving full paths.
- [ ] Workflow commands remain collapsed by default.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
