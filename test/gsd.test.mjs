import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { promisify } from "node:util";

import {
  configureWorkflow,
  completeChange,
  detectProject,
  doctorWorkspace,
  generateExamples,
  generateDesktopApp,
  generateUiDashboard,
  generateAgentInstructions,
  generateCiWorkflow,
  generateRelease,
  getSpecStatus,
  getDiffSummary,
  getStatus,
  initWorkspace,
  listAgentMessages,
  postAgentMessage,
  runSelfTest,
  generateReport,
  runCli,
  startChange,
  validateChange,
  verifyChange,
} from "../src/gsd.mjs";

const execFileAsync = promisify(execFile);

async function tempRoot() {
  return mkdtemp(join(tmpdir(), "gsd-test-"));
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

test("initWorkspace creates repo-local delivery folders and default workflow", async () => {
  const root = await tempRoot();

  const result = await initWorkspace(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".agent", "memory.md")), true);
  assert.equal(await exists(join(root, ".agent", "rules.md")), true);
  assert.equal(await exists(join(root, ".agent", "decisions")), true);
  assert.equal(await exists(join(root, ".agent", "evidence")), true);
  assert.equal(await exists(join(root, "openspec", "changes")), true);
  assert.equal(await exists(join(root, "openspec", "specs")), true);
  assert.equal(await exists(join(root, ".gsd", "tasks")), true);

  const workflow = JSON.parse(await readFile(join(root, ".gsd", "workflow.json"), "utf8"));
  assert.deepEqual(
    workflow.checks.map((check) => check.name),
    ["lint", "unit", "typecheck", "e2e"],
  );
  assert.equal(workflow.checks.find((check) => check.name === "e2e").fullOnly, true);
});

test("startChange creates an OpenSpec change, task file, and active status", async () => {
  const root = await tempRoot();
  await initWorkspace(root);

  const result = await startChange(root, "Add Login With Google");

  assert.equal(result.ok, true);
  assert.equal(result.change.slug, "add-login-with-google");
  assert.equal(await exists(join(root, "openspec", "changes", "add-login-with-google", "proposal.md")), true);
  assert.equal(await exists(join(root, "openspec", "changes", "add-login-with-google", "tasks.md")), true);
  assert.equal(await exists(join(root, ".gsd", "tasks", "add-login-with-google.md")), true);

  const status = await getStatus(root);
  assert.equal(status.initialized, true);
  assert.equal(status.activeChange.slug, "add-login-with-google");
  assert.equal(status.hasEvidence, false);
});

test("startChange writes a richer OpenSpec proposal template", async () => {
  const root = await tempRoot();
  await initWorkspace(root);

  await startChange(root, "Add Login With Google");

  const proposal = await readFile(join(root, "openspec", "changes", "add-login-with-google", "proposal.md"), "utf8");
  assert.match(proposal, /## Problem/);
  assert.match(proposal, /## User Value/);
  assert.match(proposal, /## Scope/);
  assert.match(proposal, /## Out Of Scope/);
  assert.match(proposal, /## Acceptance Criteria/);
  assert.match(proposal, /## Verification Plan/);
  assert.match(proposal, /## Human Review Questions/);
});

test("runCli dispatches init, start, and status commands", async () => {
  const root = await tempRoot();

  const init = await runCli(["init"], { cwd: root });
  assert.equal(init.exitCode, 0);
  assert.match(init.stdout, /Initialized ShipSpec workspace/);

  const start = await runCli(["start", "Invite Team Members"], { cwd: root });
  assert.equal(start.exitCode, 0);
  assert.match(start.stdout, /invite-team-members/);

  const status = await runCli(["status"], { cwd: root });
  assert.equal(status.exitCode, 0);
  assert.match(status.stdout, /Active change: invite-team-members/);
});

test("runCli supports help and version for an installable CLI", async () => {
  const root = await tempRoot();

  const help = await runCli(["--help"], { cwd: root });
  assert.equal(help.exitCode, 0);
  assert.match(help.stdout, /Usage: gsd <command>/);
  assert.match(help.stdout, /doctor/);

  const version = await runCli(["--version"], { cwd: root });
  assert.equal(version.exitCode, 0);
  assert.match(version.stdout, /0\.3\.0/);
});

test("generateExamples creates a node-basic example project with ShipSpec artifacts", async () => {
  const root = await tempRoot();

  const result = await generateExamples(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, "examples", "node-basic", "package.json")), true);
  assert.equal(await exists(join(root, "examples", "node-basic", "README.md")), true);
  assert.equal(await exists(join(root, "examples", "node-basic", ".gsd", "workflow.json")), true);
  assert.equal(
    await exists(join(root, "examples", "node-basic", "openspec", "changes", "example-change", "proposal.md")),
    true,
  );
  const readme = await readFile(join(root, "examples", "node-basic", "README.md"), "utf8");
  assert.match(readme, /gsd validate/);
  assert.match(readme, /gsd verify --full/);
});

test("runSelfTest summarizes command health using an injectable runner", async () => {
  const root = await tempRoot();
  const commands = [];

  const result = await runSelfTest(root, {
    runner: async (argv) => {
      commands.push(argv.join(" "));
      return { exitCode: argv[0] === "release" ? 1 : 0, stdout: "ok\n", stderr: "" };
    },
  });

  assert.equal(result.ok, false);
  assert.deepEqual(commands, ["doctor", "detect", "spec", "validate", "verify --full", "report", "release"]);
  assert.equal(result.results.find((entry) => entry.command === "release").ok, false);
});

test("runCli examples and self-test print summary output", async () => {
  const root = await tempRoot();

  const examples = await runCli(["examples"], { cwd: root });
  assert.equal(examples.exitCode, 0);
  assert.match(examples.stdout, /examples\/node-basic/);

  const selfTest = await runCli(["self-test"], {
    cwd: root,
    runner: async () => ({ exitCode: 0, stdout: "ok\n", stderr: "" }),
  });
  assert.equal(selfTest.exitCode, 0);
  assert.match(selfTest.stdout, /PASS doctor/);
  assert.match(selfTest.stdout, /PASS release/);
});

test("generateDesktopApp writes an Electron desktop wrapper around the CLI", async () => {
  const root = await tempRoot();

  const result = await generateDesktopApp(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, "apps", "desktop", "package.json")), true);
  assert.equal(await exists(join(root, "apps", "desktop", "main.js")), true);
  assert.equal(await exists(join(root, "apps", "desktop", "preload.js")), true);
  assert.equal(await exists(join(root, "apps", "desktop", "renderer", "index.html")), true);
  assert.equal(await exists(join(root, "apps", "desktop", "renderer", "styles.css")), true);
  assert.equal(await exists(join(root, "apps", "desktop", "renderer", "app.js")), true);

  const main = await readFile(join(root, "apps", "desktop", "main.js"), "utf8");
  assert.match(main, /ipcMain\.handle\('gsd:run'/);
  assert.match(main, /'bin', 'gsd\.mjs'/);
  assert.match(main, /const repoRoot = path\.resolve\(__dirname, '\.\.', '\.\.'\);/);
  assert.match(main, /let projectDir = repoRoot;/);
  assert.match(main, /const nodePath = process\.env\.npm_node_execpath \|\| process\.env\.NODE \|\| 'node';/);
  assert.match(main, /const cliPath = path\.join\(repoRoot, 'bin', 'gsd\.mjs'\);/);
  assert.match(main, /execFile\(nodePath, \[cliPath, \.\.\.args\]/);

  const renderer = await readFile(join(root, "apps", "desktop", "renderer", "index.html"), "utf8");
  assert.match(renderer, /ShipSpec Desktop/);
  assert.match(renderer, /Choose Project/);
});

test("runCli desktop prints generated desktop app path", async () => {
  const root = await tempRoot();

  const result = await runCli(["desktop"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /apps\/desktop/);
});

test("package is ready for TypeScript core and npm publishing", async () => {
  const root = join(import.meta.dirname, "..");

  const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

  assert.equal(packageJson.private, false);
  assert.equal(packageJson.scripts.build, "tsc --noEmit");
  assert.equal(packageJson.scripts.typecheck, "tsc --noEmit && node --check src/gsd.mjs && node --check bin/gsd.mjs && node --check test/gsd.test.mjs");
  assert.equal(packageJson.devDependencies.typescript, "^5.5.0");
  assert.equal(packageJson.devDependencies["@types/node"], "^20.14.0");
  assert.equal(await exists(join(root, "tsconfig.json")), true);
  assert.equal(await exists(join(root, "src", "adapters", "index.ts")), true);
  assert.equal(await exists(join(root, "src", "adapters", "openspec.ts")), true);
  assert.equal(await exists(join(root, "src", "adapters", "superpowers.ts")), true);
  assert.equal(await exists(join(root, "src", "adapters", "github.ts")), true);
  assert.equal(await exists(join(root, "src", "adapters", "project-scripts.ts")), true);
});

test("TypeScript adapters describe ShipSpec integration points", async () => {
  const root = join(import.meta.dirname, "..");

  const index = await readFile(join(root, "src", "adapters", "index.ts"), "utf8");
  const openspec = await readFile(join(root, "src", "adapters", "openspec.ts"), "utf8");
  const superpowers = await readFile(join(root, "src", "adapters", "superpowers.ts"), "utf8");
  const github = await readFile(join(root, "src", "adapters", "github.ts"), "utf8");
  const scripts = await readFile(join(root, "src", "adapters", "project-scripts.ts"), "utf8");

  assert.match(index, /export type ShipSpecAdapter/);
  assert.match(index, /export function listAdapters/);
  assert.match(openspec, /openspec\/changes/);
  assert.match(superpowers, /docs\/superpowers/);
  assert.match(github, /\.github\/workflows/);
  assert.match(scripts, /package\.json scripts/);
});

test("runCli adapters lists integration points", async () => {
  const root = await tempRoot();

  const result = await runCli(["adapters"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /OpenSpec/);
  assert.match(result.stdout, /Superpowers/);
  assert.match(result.stdout, /GitHub/);
  assert.match(result.stdout, /Project scripts/);
  assert.match(result.stdout, /openspec\/changes/);
  assert.match(result.stdout, /docs\/superpowers/);
});

test("intake creates a ShipSpec request intake record", async () => {
  const root = await tempRoot();

  const result = await runCli(["intake", "JIRA-123 Add invoice export"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.gsd\/intake\/jira-123-add-invoice-export\.md/);
  const intake = await readFile(join(root, ".gsd", "intake", "jira-123-add-invoice-export.md"), "utf8");
  assert.match(intake, /# JIRA-123 Add invoice export/);
  assert.match(intake, /## Source/);
  assert.match(intake, /## Open Questions/);
});

test("contract creates a delivery contract for the active ShipSpec change", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Add Invoice Export");

  const result = await runCli(["contract"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.gsd\/contracts\/add-invoice-export\.md/);
  const contract = await readFile(join(root, ".gsd", "contracts", "add-invoice-export.md"), "utf8");
  assert.match(contract, /# Add Invoice Export Contract/);
  assert.match(contract, /## Acceptance Criteria/);
  assert.match(contract, /## Files Likely Affected/);
  assert.match(contract, /## Definition Of Done/);
});

test("room creates role files for the active ShipSpec change", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Add Invoice Export");

  const result = await runCli(["room"], { cwd: root });

  assert.equal(result.exitCode, 0);
  const room = join(root, ".agent", "room", "add-invoice-export");
  assert.equal(await exists(join(room, "planner.md")), true);
  assert.equal(await exists(join(room, "builder.md")), true);
  assert.equal(await exists(join(room, "tester.md")), true);
  assert.equal(await exists(join(room, "reviewer.md")), true);
  assert.equal(await exists(join(room, "release.md")), true);
  assert.equal(await exists(join(room, "handoff.md")), true);
  const handoff = await readFile(join(room, "handoff.md"), "utf8");
  assert.match(handoff, /Add Invoice Export/);
});

test("audit reports ShipSpec delivery trail readiness", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Add Invoice Export");
  await runCli(["intake", "Add Invoice Export"], { cwd: root });
  await runCli(["contract"], { cwd: root });
  await runCli(["room"], { cwd: root });

  const result = await runCli(["audit"], { cwd: root });

  assert.equal(result.exitCode, 1);
  assert.match(result.stdout, /PASS Request intake/);
  assert.match(result.stdout, /PASS Spec/);
  assert.match(result.stdout, /PASS Contract/);
  assert.match(result.stdout, /PASS Agent room/);
  assert.match(result.stdout, /WAIT Evidence/);
  assert.match(result.stdout, /WAIT Done/);
});

test("deliver prepares intake, spec, contract, room, and validation", async () => {
  const root = await tempRoot();

  const result = await runCli(["deliver", "JIRA-123 Add invoice export"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /ShipSpec package prepared/);
  assert.equal(await exists(join(root, ".gsd", "intake", "jira-123-add-invoice-export.md")), true);
  assert.equal(await exists(join(root, "openspec", "changes", "jira-123-add-invoice-export", "proposal.md")), true);
  assert.equal(await exists(join(root, ".gsd", "contracts", "jira-123-add-invoice-export.md")), true);
  assert.equal(await exists(join(root, ".agent", "room", "jira-123-add-invoice-export", "handoff.md")), true);
});

test("generateUiDashboard writes a single-page pixel dashboard", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Pixel Dashboard");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });
  await generateReport(root);
  await generateRelease(root);
  await postAgentMessage(root, "tester", "Pixel dashboard verification is ready.");

  const result = await generateUiDashboard(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".gsd", "ui", "index.html")), true);
  const html = await readFile(join(root, ".gsd", "ui", "index.html"), "utf8");
  assert.match(html, /ShipSpec Pixel Console/);
  assert.match(html, /Pixel Dashboard/);
  assert.match(html, /Spec/);
  assert.match(html, /Verify/);
  assert.match(html, /Release/);
  assert.match(html, /Pixelify Sans/);
  assert.match(html, /tester/);
  assert.match(html, /feature\.js/);
});

test("generateUiDashboard shows committed files when working tree is clean", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Committed UI Files");
  await writeFile(join(root, "package.json"), JSON.stringify({ scripts: { test: "node --test" } }, null, 2));
  await mkdir(join(root, "src"));
  await writeFile(join(root, "src", "feature.js"), "export const shipped = true;\n");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: true });
  await generateReport(root);
  await generateRelease(root);
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: ship committed UI files"], { cwd: root });

  await generateUiDashboard(root);

  const html = await readFile(join(root, ".gsd", "ui", "index.html"), "utf8");
  assert.match(html, /Committed Files/);
  assert.match(html, /src\/feature\.js/);
  assert.doesNotMatch(html, /No Git changes detected/);
});

test("generateUiDashboard shows ShipSpec audit trail", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Dashboard Audit Trail");
  await runCli(["intake", "Dashboard Audit Trail"], { cwd: root });
  await runCli(["contract"], { cwd: root });
  await runCli(["room"], { cwd: root });

  await generateUiDashboard(root);

  const html = await readFile(join(root, ".gsd", "ui", "index.html"), "utf8");
  assert.match(html, /ShipSpec Audit/);
  assert.match(html, /Request intake/);
  assert.match(html, /Contract/);
  assert.match(html, /Agent room/);
});

test("generateDesktopApp writes a renderer that serializes command refreshes", async () => {
  const root = await tempRoot();

  await generateDesktopApp(root);

  const renderer = await readFile(join(root, "apps", "desktop", "renderer", "app.js"), "utf8");
  assert.match(renderer, /let refreshPromise = Promise\.resolve\(\);/);
  assert.match(renderer, /let commandRunning = false;/);
  assert.match(renderer, /function setBusy\(busy\)/);
  assert.match(renderer, /button\.disabled = busy/);
  assert.match(renderer, /refreshPromise = refreshPromise\.then/);
  assert.match(renderer, /if \(commandRunning\) return;/);
});

test("runCli ui prints generated dashboard path", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "CLI UI");

  const result = await runCli(["ui"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.gsd\/ui\/index\.html/);
});

test("generateAgentInstructions creates cross-agent rules, roles, and message board folders", async () => {
  const root = await tempRoot();

  const result = await generateAgentInstructions(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, "AGENTS.md")), true);
  assert.equal(await exists(join(root, "CLAUDE.md")), true);
  assert.equal(await exists(join(root, "GEMINI.md")), true);
  assert.equal(await exists(join(root, ".cursor", "rules", "gsd.mdc")), true);
  assert.equal(await exists(join(root, ".agent", "roles", "planner.md")), true);
  assert.equal(await exists(join(root, ".agent", "roles", "builder.md")), true);
  assert.equal(await exists(join(root, ".agent", "roles", "tester.md")), true);
  assert.equal(await exists(join(root, ".agent", "roles", "reviewer.md")), true);
  assert.equal(await exists(join(root, ".agent", "roles", "release.md")), true);
  assert.equal(await exists(join(root, ".agent", "messages", "README.md")), true);

  const agents = await readFile(join(root, "AGENTS.md"), "utf8");
  assert.match(agents, /Run `gsd spec` before implementation/);
  assert.match(agents, /Run `gsd validate --ready` before review or ship/);
});

test("postAgentMessage writes a role-scoped message and listAgentMessages returns newest messages", async () => {
  const root = await tempRoot();
  await generateAgentInstructions(root);

  const first = await postAgentMessage(root, "planner", "Spec is ready for builder.");
  const second = await postAgentMessage(root, "builder", "Implementation is ready for tester.");

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.equal(await exists(first.messagePath), true);
  assert.equal(await exists(second.messagePath), true);

  const content = await readFile(second.messagePath, "utf8");
  assert.match(content, /Role: builder/);
  assert.match(content, /Implementation is ready for tester/);

  const messages = await listAgentMessages(root);
  assert.equal(messages.length, 2);
  assert.equal(messages[0].role, "builder");
  assert.equal(messages[1].role, "planner");
});

test("runCli agents, message, and inbox expose the multi-agent coordination flow", async () => {
  const root = await tempRoot();

  const agents = await runCli(["agents"], { cwd: root });
  assert.equal(agents.exitCode, 0);
  assert.match(agents.stdout, /Agent instructions generated/);

  const message = await runCli(["message", "reviewer", "Please review the diff."], { cwd: root });
  assert.equal(message.exitCode, 0);
  assert.match(message.stdout, /\.agent\/messages\//);

  const inbox = await runCli(["inbox"], { cwd: root });
  assert.equal(inbox.exitCode, 0);
  assert.match(inbox.stdout, /reviewer/);
  assert.match(inbox.stdout, /Please review the diff/);
});

test("doctorWorkspace reports repo readiness checks", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ scripts: { test: "node --test", "test:e2e": "playwright test" } }, null, 2),
  );
  await execFileAsync("git", ["init"], { cwd: root });

  const result = await doctorWorkspace(root);

  assert.equal(result.ok, true);
  assert.equal(result.checks.find((check) => check.name === "ShipSpec workspace").ok, true);
  assert.equal(result.checks.find((check) => check.name === "Git repository").ok, true);
  assert.equal(result.checks.find((check) => check.name === "Package manifest").ok, true);
  assert.equal(result.checks.find((check) => check.name === "Test script").ok, true);
  assert.equal(result.checks.find((check) => check.name === "E2E script").ok, true);
});

test("detectProject identifies npm, Next, Vitest, and Playwright from package metadata", async () => {
  const root = await tempRoot();
  await writeFile(
    join(root, "package.json"),
    JSON.stringify(
      {
        dependencies: { next: "15.0.0" },
        devDependencies: { vitest: "2.0.0", "@playwright/test": "1.0.0" },
        scripts: {
          lint: "next lint",
          test: "vitest run",
          typecheck: "tsc --noEmit",
          "test:e2e": "playwright test",
        },
      },
      null,
      2,
    ),
  );

  const result = await detectProject(root);

  assert.equal(result.runtime, "node");
  assert.equal(result.packageManager, "npm");
  assert.equal(result.framework, "next");
  assert.equal(result.testRunner, "vitest");
  assert.equal(result.e2e, "playwright");
  assert.equal(result.scripts.lint, true);
  assert.equal(result.scripts.test, true);
  assert.equal(result.scripts.typecheck, true);
  assert.equal(result.scripts.e2e, true);
});

test("detectProject identifies Vite and Cypress when those dependencies exist", async () => {
  const root = await tempRoot();
  await writeFile(
    join(root, "package.json"),
    JSON.stringify(
      {
        devDependencies: { vite: "6.0.0", cypress: "14.0.0" },
        scripts: {
          test: "node --test",
          e2e: "cypress run",
        },
      },
      null,
      2,
    ),
  );

  const result = await detectProject(root);

  assert.equal(result.framework, "vite");
  assert.equal(result.testRunner, "node:test");
  assert.equal(result.e2e, "cypress");
  assert.equal(result.scripts.lint, false);
  assert.equal(result.scripts.typecheck, false);
  assert.equal(result.scripts.e2e, true);
});

test("configureWorkflow writes checks only for available scripts and marks e2e fullOnly", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await writeFile(
    join(root, "package.json"),
    JSON.stringify(
      {
        scripts: {
          lint: "eslint .",
          test: "vitest run",
          "test:e2e": "playwright test",
        },
      },
      null,
      2,
    ),
  );

  const result = await configureWorkflow(root);

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.workflow.checks.map((check) => check.name),
    ["lint", "unit", "e2e"],
  );
  assert.equal(result.workflow.checks.find((check) => check.name === "e2e").command, "npm run test:e2e");
  assert.equal(result.workflow.checks.find((check) => check.name === "e2e").fullOnly, true);
  assert.match(result.warnings.join("\n"), /typecheck/);

  const workflow = JSON.parse(await readFile(join(root, ".gsd", "workflow.json"), "utf8"));
  assert.deepEqual(workflow, result.workflow);
});

test("runCli detect and configure print project detection output", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ scripts: { test: "node --test" }, devDependencies: { vite: "6.0.0" } }, null, 2),
  );

  const detect = await runCli(["detect"], { cwd: root });
  assert.equal(detect.exitCode, 0);
  assert.match(detect.stdout, /Runtime: node/);
  assert.match(detect.stdout, /Framework: vite/);

  const configure = await runCli(["configure"], { cwd: root });
  assert.equal(configure.exitCode, 0);
  assert.match(configure.stdout, /Workflow configured/);
  assert.match(configure.stdout, /unit: npm test/);
});

test("generateCiWorkflow writes GitHub Actions workflow from configured checks", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify(
      {
        checks: [
          { name: "lint", command: "npm run lint", required: true },
          { name: "unit", command: "npm test", required: true },
          { name: "e2e", command: "npm run test:e2e", required: false, fullOnly: true },
        ],
      },
      null,
      2,
    ),
  );

  const result = await generateCiWorkflow(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".github", "workflows", "gsd.yml")), true);
  const workflow = await readFile(join(root, ".github", "workflows", "gsd.yml"), "utf8");
  assert.match(workflow, /name: ShipSpec Delivery/);
  assert.match(workflow, /uses: actions\/checkout@v4/);
  assert.match(workflow, /uses: actions\/setup-node@v4/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run lint/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run test:e2e/);
  assert.match(workflow, /node bin\/gsd\.mjs validate/);
  assert.match(workflow, /node bin\/gsd\.mjs validate --ready/);
});

test("runCli ci prints generated GitHub Actions path", async () => {
  const root = await tempRoot();
  await initWorkspace(root);

  const result = await runCli(["ci"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.github\/workflows\/gsd\.yml/);
});

test("getSpecStatus reports active change files and required proposal sections", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Validate OpenSpec Change");

  const status = await getSpecStatus(root);

  assert.equal(status.activeChange.slug, "validate-openspec-change");
  assert.equal(status.proposal, true);
  assert.equal(status.tasks, true);
  assert.equal(status.acceptanceCriteria, true);
  assert.equal(status.verificationPlan, true);
  assert.equal(status.evidence, false);
});

test("validateChange passes for a generated spec", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Generated Spec");

  const result = await validateChange(root, { ready: false });

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("validateChange fails when proposal is missing acceptance criteria", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Weak Spec");
  await writeFile(join(root, "openspec", "changes", "weak-spec", "proposal.md"), "# Weak Spec\n\n## Intent\n\nWeak\n");

  const result = await validateChange(root, { ready: false });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /Acceptance Criteria/);
  assert.match(result.errors.join("\n"), /Verification Plan/);
});

test("validateChange --ready requires verification evidence", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Ready Gate");

  const result = await validateChange(root, { ready: true });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /Verification evidence/);
});

test("validateChange --ready passes after verification evidence exists", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Ready Gate");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  const result = await validateChange(root, { ready: true });

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("runCli spec and validate print spec gate output", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "CLI Spec");

  const spec = await runCli(["spec"], { cwd: root });
  assert.equal(spec.exitCode, 0);
  assert.match(spec.stdout, /Change: cli-spec/);
  assert.match(spec.stdout, /Acceptance criteria: present/);

  const validate = await runCli(["validate"], { cwd: root });
  assert.equal(validate.exitCode, 0);
  assert.match(validate.stdout, /Spec validation passed/);

  const ready = await runCli(["validate", "--ready"], { cwd: root });
  assert.equal(ready.exitCode, 1);
  assert.match(ready.stdout, /Verification evidence is missing/);
});

test("getDiffSummary reports branch, staged files, unstaged files, commits, and evidence", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
  await initWorkspace(root);
  await writeFile(join(root, "base.js"), "export const base = true;\n");
  await execFileAsync("git", ["add", "base.js"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "chore: baseline"], { cwd: root });
  await startChange(root, "Prepare Review Report");
  await writeFile(join(root, "staged.js"), "export const staged = true;\n");
  await writeFile(join(root, "unstaged.js"), "export const unstaged = true;\n");
  await execFileAsync("git", ["add", "staged.js"], { cwd: root });
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  const summary = await getDiffSummary(root);

  assert.match(summary.branch, /master|main/);
  assert.equal(summary.activeChange.slug, "prepare-review-report");
  assert.equal(summary.hasEvidence, true);
  assert.deepEqual(summary.stagedFiles, ["staged.js"]);
  assert.deepEqual(summary.unstagedFiles, ["unstaged.js"]);
  assert.equal(summary.recentCommits[0].message, "chore: baseline");
});

test("getDiffSummary scopes Git status to the project folder inside a parent repository", async () => {
  const parent = await tempRoot();
  const root = join(parent, "project");
  await mkdir(root);
  await execFileAsync("git", ["init"], { cwd: parent });
  await initWorkspace(root);
  await startChange(root, "Nested Project");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");
  await writeFile(join(parent, "sibling.js"), "export const sibling = true;\n");

  const summary = await getDiffSummary(root);

  assert.deepEqual(summary.unstagedFiles, ["feature.js"]);
});

test("runCli diff prints review-oriented Git and change status", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Review CLI Diff");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");

  const result = await runCli(["diff"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /Active change: review-cli-diff/);
  assert.match(result.stdout, /Evidence: missing/);
  assert.match(result.stdout, /Unstaged files:/);
  assert.match(result.stdout, /feature\.js/);
});

test("verifyChange runs fast checks by default and writes evidence", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Add Audit Log");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify(
      {
        checks: [
          { name: "unit", command: "node -e \"process.exit(0)\"", required: true },
          { name: "e2e", command: "node -e \"process.exit(0)\"", required: true, fullOnly: true },
        ],
      },
      null,
      2,
    ),
  );

  const result = await verifyChange(root, { full: false });

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.checks.map((check) => check.name),
    ["unit"],
  );
  const evidence = await readFile(join(root, ".agent", "evidence", "add-audit-log.md"), "utf8");
  assert.match(evidence, /unit/);
  assert.doesNotMatch(evidence, /e2e/);
});

test("verifyChange --full includes full-only checks", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Checkout Flow");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify(
      {
        checks: [
          { name: "unit", command: "node -e \"process.exit(0)\"", required: true },
          { name: "e2e", command: "node -e \"process.exit(0)\"", required: true, fullOnly: true },
        ],
      },
      null,
      2,
    ),
  );

  const result = await verifyChange(root, { full: true });

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.checks.map((check) => check.name),
    ["unit", "e2e"],
  );
});

test("completeChange blocks until verification evidence exists", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Billing Export");

  const blocked = await completeChange(root);

  assert.equal(blocked.ok, false);
  assert.match(blocked.message, /Run `gsd verify` first/);
});

test("completeChange writes done report after verification evidence exists", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "Billing Export");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  const result = await completeChange(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".gsd", "done", "billing-export.md")), true);
  const report = await readFile(join(root, ".gsd", "done", "billing-export.md"), "utf8");
  assert.match(report, /Billing Export/);
  assert.match(report, /Verification Evidence/);
});

test("completeChange includes changed files in done report when Git is available", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Track Changed Files");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  await completeChange(root);

  const report = await readFile(join(root, ".gsd", "done", "track-changed-files.md"), "utf8");
  assert.match(report, /## Changed Files/);
  assert.match(report, /feature\.js/);
});

test("generateReport writes a PR-ready markdown report with evidence and changed files", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Prepare PR Report");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  const result = await generateReport(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".gsd", "reports", "prepare-pr-report.md")), true);
  const report = await readFile(join(root, ".gsd", "reports", "prepare-pr-report.md"), "utf8");
  assert.match(report, /## Summary/);
  assert.match(report, /## Spec/);
  assert.match(report, /openspec\/changes\/prepare-pr-report/);
  assert.match(report, /## Verification/);
  assert.match(report, /\.agent\/evidence\/prepare-pr-report\.md/);
  assert.match(report, /## Changed Files/);
  assert.match(report, /feature\.js/);
  assert.match(report, /## Reviewer Notes/);
});

test("runCli report prints the report path", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "CLI Report");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });

  const result = await runCli(["report"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.gsd\/reports\/cli-report\.md/);
});

test("generateRelease writes release handoff with validation, evidence, report, changed files, and messages", async () => {
  const root = await tempRoot();
  await execFileAsync("git", ["init"], { cwd: root });
  await initWorkspace(root);
  await startChange(root, "Ship Release Handoff");
  await writeFile(join(root, "feature.js"), "export const feature = true;\n");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });
  await generateReport(root);
  await postAgentMessage(root, "reviewer", "Review is ready for release.");

  const result = await generateRelease(root);

  assert.equal(result.ok, true);
  assert.equal(await exists(join(root, ".gsd", "releases", "ship-release-handoff.md")), true);
  const release = await readFile(join(root, ".gsd", "releases", "ship-release-handoff.md"), "utf8");
  assert.match(release, /# Release: Ship Release Handoff/);
  assert.match(release, /## Summary/);
  assert.match(release, /## Spec/);
  assert.match(release, /openspec\/changes\/ship-release-handoff/);
  assert.match(release, /## Validation/);
  assert.match(release, /Spec validation: pass/);
  assert.match(release, /Ready validation: pass/);
  assert.match(release, /## Verification/);
  assert.match(release, /\.agent\/evidence\/ship-release-handoff\.md/);
  assert.match(release, /## Review Report/);
  assert.match(release, /\.gsd\/reports\/ship-release-handoff\.md/);
  assert.match(release, /## Changed Files/);
  assert.match(release, /feature\.js/);
  assert.match(release, /## Agent Handoffs/);
  assert.match(release, /reviewer: Review is ready for release/);
  assert.match(release, /## Release Notes/);
  assert.match(release, /## Ship Checklist/);
});

test("runCli release prints release handoff path", async () => {
  const root = await tempRoot();
  await initWorkspace(root);
  await startChange(root, "CLI Release");
  await writeFile(
    join(root, ".gsd", "workflow.json"),
    JSON.stringify({ checks: [{ name: "unit", command: "node -e \"process.exit(0)\"", required: true }] }, null, 2),
  );
  await verifyChange(root, { full: false });
  await generateReport(root);

  const result = await runCli(["release"], { cwd: root });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /\.gsd\/releases\/cli-release\.md/);
});
