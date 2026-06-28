# Calm Mission Control default view

## Intent

Calm Mission Control default view

## Problem

- Mission Control now has professional typography, but the default page still shows too much text at once.
- Advanced evidence, memory, audit, reasoning, and inbox sections make the first screen feel confusing.
- The next useful action is competing with repeated commands and detailed status blocks.

## User Value

- Developers can immediately see the mission, next step, and main actions without scanning a long dashboard.
- Advanced details remain available when needed, but they do not overwhelm the default view.
- The UI feels calmer and more like a focused developer tool.

## Scope

- Keep the Mission Control header and professional typography.
- Keep one compact next-step hero and primary action cards visible by default.
- Add a concise progress summary visible by default.
- Move ship readiness details, evidence receipt, memory, repeated command blocks, workflow, reasoning, audit, changed files, and inbox into collapsed `<details>` sections.
- Preserve command copy buttons and all existing data.

## Out Of Scope

- Changing CLI behavior.
- Removing any evidence, memory, or audit data from the generated HTML.
- Adding JavaScript-heavy navigation or dependencies.

## Acceptance Criteria

- [ ] The default visible dashboard contains a concise next-step area and primary action cards.
- [ ] Advanced sections are collapsed with `<details>` by default.
- [ ] Evidence, memory, workflow, reasoning, audit, changed files, and inbox data remain present in the HTML.
- [ ] Verification evidence is recorded before the change is marked done.

## Verification Plan

- Run `gsd verify` during development.
- Run `gsd verify --full` before release or review.

## Human Review Questions

- Is the scope correct?
- Are there any risky edge cases or constraints the agent should know?
