# Add auto review before ship

## Intent

Add auto review before ship

## Problem

- `gsd ship` proves checks pass and writes a report, but it does not automatically prepare reviewer-focused notes.
- Users must remember to run `gsd review` separately before shipping.
- This adds one more command to remember and makes the ship handoff less complete.

## User Value

- Developers get a review checklist every time they run the main ship command.
- Reviewers can inspect risks, changed files, evidence, and human decisions without asking for another artifact.
- ShipSpec becomes more powerful without adding another user-facing command.

## Scope

- Update `gsd ship` to run auto review after full verification and ready validation pass.
- Write `.gsd/reviews/<change>.md` as part of the ship flow.
- Include a short `Auto review` summary in `gsd ship` output.
- Keep blocked ship behavior unchanged when verification or ready validation fails.
- Include the review artifact in the generated report when present.

## Out Of Scope

- Do not add a new top-level command.
- Do not make auto review call external AI services.
- Do not block shipping on subjective review notes.
- Do not change configured project checks.

## Acceptance Criteria

- [ ] `gsd ship` generates `.gsd/reviews/<change>.md` when verification and ready validation pass.
- [ ] `gsd ship` output includes a short auto-review summary and review path.
- [ ] `gsd ship` still writes verification evidence and the normal report.
- [ ] Failed verification or ready validation still blocks before report/review handoff.
- [ ] Existing behavior that should not change is preserved.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
