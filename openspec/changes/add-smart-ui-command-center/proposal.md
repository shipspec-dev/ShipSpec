# Add Smart UI command center

## Intent

Add Smart UI command center

## Problem

- The current dashboard shows many panels before users understand what to do next.
- Spectra is strong as a visual spec manager, so ShipSpec needs a different UI advantage.
- ShipSpec should feel like an AI delivery command center: next action, readiness, evidence, and memory first.

## User Value

- Developers can open `gsd ui` and immediately see what to do next.
- Nontechnical teammates can understand whether a change is ready to ship.
- ShipSpec becomes action-first instead of document-first.

## Scope

- Add a top-level Command Center section to `gsd ui`.
- Show three primary actions: Start / Continue, Hand to AI, and Ship.
- Show a simple ship readiness score with the reason and next command.
- Show a memory summary with common files, checks, and ship pattern.
- Show a delivery timeline and evidence receipt.
- Keep the existing detailed dashboard sections lower on the page.

## Out Of Scope

- Do not add a new desktop app.
- Do not execute shell commands from the browser.
- Do not copy Spectra's spec-browser layout.
- Do not change CLI behavior beyond `gsd ui` output.

## Acceptance Criteria

- [ ] `gsd ui` starts with a ShipSpec Command Center.
- [ ] The UI shows Start / Continue, Hand to AI, and Ship actions.
- [ ] The UI shows a ship readiness score, reason, and next command.
- [ ] The UI shows memory summary, timeline, and evidence receipt.
- [ ] Existing detailed dashboard information remains available.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
