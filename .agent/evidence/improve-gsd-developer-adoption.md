# Improve GSD Developer Adoption Verification Evidence

Mode: full
Generated: 2026-06-17T10:36:58.711Z

## Checks

### lint

Command: `npm run lint`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 lint
> node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### unit

Command: `npm test`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 test
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (5.571666ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.178459ms)
✔ startChange writes a richer OpenSpec proposal template (2.500333ms)
✔ runCli dispatches init, start, and status commands (2.000541ms)
✔ runCli supports help and version for an installable CLI (0.201333ms)
✔ doctorWorkspace reports repo readiness checks (35.152958ms)
✔ verifyChange runs fast checks by default and writes evidence (58.720292ms)
✔ verifyChange --full includes full-only checks (106.815459ms)
✔ completeChange blocks until verification evidence exists (2.308084ms)
✔ completeChange writes done report after verification evidence exists (65.142541ms)
✔ completeChange includes changed files in done report when Git is available (84.214042ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 450.368375
```

### typecheck

Command: `npm run typecheck`
Result: pass
Required: yes

```text
> gsd-agent-delivery-kit@0.1.0 typecheck
> node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs
```

### e2e

Command: `npm run test:e2e`
Result: pass
Required: no

```text
> gsd-agent-delivery-kit@0.1.0 test:e2e
> node --test

✔ initWorkspace creates repo-local delivery folders and default workflow (5.481375ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.179ms)
✔ startChange writes a richer OpenSpec proposal template (2.672166ms)
✔ runCli dispatches init, start, and status commands (2.054667ms)
✔ runCli supports help and version for an installable CLI (0.192ms)
✔ doctorWorkspace reports repo readiness checks (33.660083ms)
✔ verifyChange runs fast checks by default and writes evidence (61.200917ms)
✔ verifyChange --full includes full-only checks (105.0865ms)
✔ completeChange blocks until verification evidence exists (2.30425ms)
✔ completeChange writes done report after verification evidence exists (66.884042ms)
✔ completeChange includes changed files in done report when Git is available (94.178125ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 463.928333
```

