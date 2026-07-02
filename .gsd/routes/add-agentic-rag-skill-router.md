# ShipSpec Skill Route

Mission: add-agentic-rag-skill-router

## Routing Rule

- Read Agentic RAG before choosing optional skills.
- Use only skills that match repo evidence, mission text, or retrieved files.
- Do not use random skills just because they are installed.

## Recommended Skills

1. shipspec (required) - Always use the active ShipSpec mission, spec, context pack, and verification workflow.
2. agentic-rag (recommended) - Run `gsd rag "<feature area>"` when file context is weak or the repo has many possible skills.
3. test-driven-development (required) - This is an implementation mission; write or update focused tests before production code.
4. sdach-ai (recommended) - The request looks ticket-driven, so use the delivery item workflow for requirement clarity.
5. codex-security (recommended) - Security-sensitive terms are present, so review auth/data handling risks before shipping.

## Context Priority

1. Run `gsd rag "Add Agentic RAG skill router"` for cited local retrieval.
2. .gsd/packs/add-agentic-rag-skill-router.md
3. .gsd/prompts/add-agentic-rag-skill-router.md

## Likely Files

- skills/shipspec/SKILL.md
- src/gsd.mjs
- test/gsd.test.mjs
- README.md
- CHANGELOG.md
- examples/jira-codex-login/README.md
- examples/jira-codex-login/src/auth/login.js
- examples/node-basic/package.json
