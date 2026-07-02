# Jira to Codex ShipSpec Demo

This example shows the public ShipSpec story: start from a Jira item, let Agentic RAG find context, hand the mission to Codex, then verify and ship.

Run this from a real project root:

```bash
gsd run "https://example.atlassian.net/browse/AUTH-42"
gsd rag "AUTH-42 login page affected files"
gsd codex
# Codex implements from repo files
gsd ship
gsd share
```

What ShipSpec prepares:

- a mission under `.gsd/missions/`
- a no-copy Codex handoff from `gsd codex`
- a local RAG report with citations under `.gsd/rag/`
- a skill route under `.gsd/routes/` so Codex uses relevant workflows only
- verification evidence and a report after `gsd ship`
