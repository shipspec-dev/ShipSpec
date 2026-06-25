# Review: Add auto review before ship

Change: add-auto-review-before-ship
Generated: 2026-06-25T06:55:58.453Z

## Human Decisions To Verify

- No recorded human decisions.

## Changed Files

- src/gsd.mjs
- test/gsd.test.mjs

## Verification Evidence

- Verified: lint passed
- Verified: unit passed
- Verified: typecheck passed
- Verified: e2e passed
- Skipped: None
- Risk: No verification risks detected from configured checks.

## Reviewer Checklist

- [ ] Confirm implementation follows each recorded human decision.
- [ ] Confirm changed files match the active ShipSpec scope.
- [ ] Confirm tests cover approved behavior and edge cases.
- [ ] Confirm `gsd verify --full` passed.
- [ ] Confirm `gsd validate --ready` passed before release.

## Safety

- Review is generated from local ShipSpec state only.
- Human reviewer owns final judgment.
- No code edits, network calls, or deployments are performed.
