# Add smarter project memory

## Intent

Add smarter project memory

## Problem

- ShipSpec currently records lessons, but the memory is mostly freeform text.
- Future `gsd run` and `gsd codex` handoffs cannot easily reuse concrete project patterns.
- Developers need ShipSpec to remember useful delivery facts without adding more commands.

## User Value

- Future AI handoffs include project-specific habits automatically.
- Developers can quickly see common files, checks, risks, and ship patterns with `gsd memory`.
- ShipSpec feels more adaptive because it learns from previous completed work.

## Scope

- Upgrade `gsd learn` to write structured memory under `.gsd/memory/<change>.json`.
- Extract common changed files, verification checks, report/review/done paths, risks, and the ship pattern from local ShipSpec artifacts.
- Upgrade `gsd memory` to show a short smart-memory summary.
- Include the smart-memory summary in `gsd codex` handoff text.
- Keep memory local, deterministic, and auditable.

## Out Of Scope

- Do not call external AI services.
- Do not change project workflow checks automatically.
- Do not make memory required for shipping.
- Do not add a new top-level command.

## Acceptance Criteria

- [ ] `gsd learn` writes `.gsd/memory/<change>.json` with changed files, checks, risks, and artifact paths.
- [ ] `gsd memory` displays common files, checks, recent risks, and ship pattern in a short summary.
- [ ] `gsd codex` includes the memory summary when memory exists.
- [ ] Existing lesson, pattern, reflection, and loop memory still works.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
