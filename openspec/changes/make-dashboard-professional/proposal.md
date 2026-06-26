# Make dashboard professional

## Intent

Make dashboard professional

## Problem

- The generated `gsd ui` dashboard still looks like a pixel demo rather than a professional developer tool.
- `Pixelify Sans` is hard to read for real workflow information and makes the product feel less trustworthy.
- The first screen is too dense: readiness, evidence, memory, commands, and advanced details compete for attention.

## User Value

- Developers can understand the next action faster without decoding a game-like dashboard.
- ShipSpec looks more credible for teams, managers, and open-source visitors.
- The UI keeps personality through restrained accent colors while improving readability and hierarchy.

## Scope

- Replace the generated dashboard font with a professional system font stack.
- Rename the top screen from Cockpit/Command Center to Mission Control.
- Make the primary recommendation clearer with one main action and two secondary actions.
- Keep readiness, evidence, memory, changed files, and agent inbox available lower on the page.
- Update tests and README wording for the professional UI direction.

## Out Of Scope

- Changing CLI behavior.
- Creating a Figma file without a target Figma URL.
- Rebuilding the Electron desktop renderer.
- Adding new runtime dependencies.

## Acceptance Criteria

- [ ] `gsd ui` output uses professional typography, not Pixelify Sans.
- [ ] The first screen labels the experience as Mission Control.
- [ ] The first screen exposes a clear next step and command actions.
- [ ] Existing detailed workflow, evidence, memory, changed files, and inbox information remains visible.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
