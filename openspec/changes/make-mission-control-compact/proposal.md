# Make Mission Control Compact

## Intent

Make Mission Control feel like a compact app cockpit instead of a report page.

## Problem

- The current first screen still has too much visual weight.
- The next-step card is too tall and leaves empty space.
- Workflow command cards are too prominent.
- Long likely-file paths can dominate the first viewport.

## User Value

- Developers can read the next action faster.
- New users see one command first instead of a wall of workflow options.
- Details remain available without crowding the default view.

## Scope

- Make the first viewport a compact mission cockpit with next command, reason, mission status, and readiness signals.
- Keep workflow commands collapsed by default in a lower-density drawer.
- Show at most three likely files in the first viewport and move the full list to advanced details.
- Reduce oversized panel heights and empty space.
- Update tests and README wording for the compact Mission Control behavior.

## Out Of Scope

- Replacing the static HTML dashboard with a frontend framework.
- Adding charts, animations, or external assets.
- Changing ShipSpec workflow semantics.
- Changing CLI command behavior.

## Acceptance Criteria

- [ ] The first-screen next-step panel is compact and does not reserve large empty height.
- [ ] Workflow commands are rendered inside a collapsed details drawer by default.
- [ ] First-screen likely files show no more than three entries plus a count/advanced hint when needed.
- [ ] Full likely files remain visible in advanced details.
- [ ] Progress/readiness remains visible without a large report layout.
- [ ] Existing UI command copy buttons and advanced evidence sections remain available.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
