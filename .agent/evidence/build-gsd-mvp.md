# Build GSD MVP Verification Evidence

Mode: full
Generated: 2026-06-17T10:25:02.430Z

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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.383041ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.075ms)
✔ runCli dispatches init, start, and status commands (2.493334ms)
✔ verifyChange runs fast checks by default and writes evidence (54.679709ms)
✔ verifyChange --full includes full-only checks (106.739167ms)
✔ completeChange blocks until verification evidence exists (2.513ms)
✔ completeChange writes done report after verification evidence exists (52.78275ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 305.271
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

✔ initWorkspace creates repo-local delivery folders and default workflow (5.223417ms)
✔ startChange creates an OpenSpec change, task file, and active status (3.112292ms)
✔ runCli dispatches init, start, and status commands (2.517792ms)
✔ verifyChange runs fast checks by default and writes evidence (53.350709ms)
✔ verifyChange --full includes full-only checks (103.726292ms)
✔ completeChange blocks until verification evidence exists (2.796709ms)
✔ completeChange writes done report after verification evidence exists (52.182416ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 301.178459
```

