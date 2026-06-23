import { execFile } from "node:child_process";
import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const VERSION = "0.4.0";
const PACKAGE_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const DEFAULT_WORKFLOW = {
  checks: [
    { name: "lint", command: "npm run lint", required: true },
    { name: "unit", command: "npm test", required: true },
    { name: "typecheck", command: "npm run typecheck", required: true },
    { name: "e2e", command: "npm run test:e2e", required: false, fullOnly: true },
  ],
};

export async function initWorkspace(root) {
  await mkdir(join(root, ".agent", "decisions"), { recursive: true });
  await mkdir(join(root, ".agent", "evidence"), { recursive: true });
  await mkdir(join(root, "openspec", "changes"), { recursive: true });
  await mkdir(join(root, "openspec", "specs"), { recursive: true });
  await mkdir(join(root, ".gsd", "tasks"), { recursive: true });
  await mkdir(join(root, ".gsd", "done"), { recursive: true });
  await mkdir(join(root, ".gsd", "reports"), { recursive: true });

  await writeIfMissing(join(root, ".agent", "memory.md"), "# Project Memory\n\n");
  await writeIfMissing(
    join(root, ".agent", "rules.md"),
    "# Agent Rules\n\n- Create a spec before implementation.\n- Verify before claiming done.\n",
  );
  await writeIfMissing(join(root, ".gsd", "workflow.json"), `${JSON.stringify(DEFAULT_WORKFLOW, null, 2)}\n`);

  return {
    ok: true,
    message: "Initialized ShipSpec workspace",
  };
}

export async function startChange(root, title) {
  await initWorkspace(root);

  const slug = slugify(title);
  const changeDir = join(root, "openspec", "changes", slug);
  await mkdir(changeDir, { recursive: true });

  const change = {
    title,
    slug,
    startedAt: new Date().toISOString(),
  };

  await writeFile(
    join(changeDir, "proposal.md"),
    [
      `# ${title}`,
      "",
      "## Intent",
      "",
      title,
      "",
      "## Problem",
      "",
      "- Describe the user or developer problem this change solves.",
      "",
      "## User Value",
      "",
      "- Explain who benefits and what becomes easier, safer, or faster.",
      "",
      "## Scope",
      "",
      "- Define the behavior, files, or workflows expected to change.",
      "",
      "## Out Of Scope",
      "",
      "- List related work that should not be included in this change.",
      "",
      "## Acceptance Criteria",
      "",
      "- [ ] The expected behavior is implemented.",
      "- [ ] Existing behavior that should not change is preserved.",
      "- [ ] Verification evidence is recorded before the change is marked done.",
      "",
      "## Verification Plan",
      "",
      "- Run `gsd verify` during development.",
      "- Run `gsd verify --full` before release or review.",
      "",
      "## Human Review Questions",
      "",
      "- Is the scope correct?",
      "- Are there any risky edge cases or constraints the agent should know?",
      "",
    ].join("\n"),
  );
  await writeFile(
    join(changeDir, "tasks.md"),
    `# ${title} Tasks\n\n- [ ] Clarify scope\n- [ ] Write implementation plan\n- [ ] Implement changes\n- [ ] Verify evidence\n`,
  );
  await writeFile(
    join(root, ".gsd", "tasks", `${slug}.md`),
    `# ${title} Delivery Checklist\n\n- [ ] Spec reviewed\n- [ ] Plan reviewed\n- [ ] Code implemented\n- [ ] Verification evidence recorded\n- [ ] Done report written\n`,
  );
  await writeFile(join(root, ".gsd", "current.json"), `${JSON.stringify(change, null, 2)}\n`);

  return {
    ok: true,
    message: `Started change ${slug}`,
    change,
  };
}

export async function getStatus(root) {
  const initialized = await exists(join(root, ".gsd", "workflow.json"));
  const activeChange = await readJsonIfExists(join(root, ".gsd", "current.json"));
  const hasEvidence = activeChange
    ? await exists(join(root, ".agent", "evidence", `${activeChange.slug}.md`))
    : false;

  return {
    initialized,
    activeChange,
    hasEvidence,
  };
}

export async function doctorWorkspace(root) {
  const packageJson = await readJsonIfExists(join(root, "package.json"));
  const workflow = await readJsonIfExists(join(root, ".gsd", "workflow.json"));
  const checks = [
    {
    name: "ShipSpec workspace",
      ok: await exists(join(root, ".gsd", "workflow.json")),
      detail: ".gsd/workflow.json",
    },
    {
      name: "OpenSpec folders",
      ok: (await exists(join(root, "openspec", "changes"))) && (await exists(join(root, "openspec", "specs"))),
      detail: "openspec/changes and openspec/specs",
    },
    {
      name: "Git repository",
      ok: await isGitRepository(root),
      detail: "git rev-parse --is-inside-work-tree",
    },
    {
      name: "Package manifest",
      ok: Boolean(packageJson),
      detail: "package.json",
    },
    {
      name: "Test script",
      ok: Boolean(packageJson?.scripts?.test),
      detail: "package.json scripts.test",
    },
    {
      name: "E2E script",
      ok: hasE2eScript(packageJson),
      detail: "package.json script containing e2e",
    },
    {
      name: "Workflow checks",
      ok: Array.isArray(workflow?.checks) && workflow.checks.length > 0,
      detail: ".gsd/workflow.json checks",
    },
  ];

  return {
    ok: checks.every((check) => check.ok),
    checks,
  };
}

export async function detectProject(root) {
  const packageJson = await readJsonIfExists(join(root, "package.json"));
  const scripts = packageJson?.scripts ?? {};
  const dependencies = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };

  return {
    runtime: packageJson ? "node" : "unknown",
    packageManager: await detectPackageManager(root),
    framework: detectFramework(dependencies, scripts),
    testRunner: detectTestRunner(dependencies, scripts),
    e2e: detectE2e(dependencies, scripts),
    scripts: {
      lint: Boolean(scripts.lint),
      test: Boolean(scripts.test),
      typecheck: Boolean(scripts.typecheck),
      e2e: findE2eScriptName(scripts) !== null,
    },
  };
}

export async function configureWorkflow(root) {
  await initWorkspace(root);
  const packageJson = await readJsonIfExists(join(root, "package.json"));
  const scripts = packageJson?.scripts ?? {};
  const packageManager = await detectPackageManager(root);
  const workflow = { checks: [] };
  const warnings = [];

  if (scripts.lint) workflow.checks.push({ name: "lint", command: `${packageManager} run lint`, required: true });
  else warnings.push("Missing lint script; lint check was not configured.");

  if (scripts.test) workflow.checks.push({ name: "unit", command: `${packageManager} test`, required: true });
  else warnings.push("Missing test script; unit check was not configured.");

  if (scripts.typecheck) {
    workflow.checks.push({ name: "typecheck", command: `${packageManager} run typecheck`, required: true });
  } else {
    warnings.push("Missing typecheck script; typecheck check was not configured.");
  }

  const e2eScript = findE2eScriptName(scripts);
  if (e2eScript) {
    workflow.checks.push({
      name: "e2e",
      command: `${packageManager} run ${e2eScript}`,
      required: false,
      fullOnly: true,
    });
  } else {
    warnings.push("Missing E2E script; full verification will skip E2E.");
  }

  await mkdir(join(root, ".gsd"), { recursive: true });
  await writeFile(join(root, ".gsd", "workflow.json"), `${JSON.stringify(workflow, null, 2)}\n`);

  return {
    ok: true,
    workflow,
    warnings,
  };
}

export async function generateCiWorkflow(root) {
  await initWorkspace(root);
  const workflow = await readWorkflow(root);
  const workflowPath = join(root, ".github", "workflows", "gsd.yml");
  await mkdir(join(root, ".github", "workflows"), { recursive: true });
  await writeFile(workflowPath, buildGitHubActionsWorkflow(workflow));

  return {
    ok: true,
    message: "GitHub Actions workflow written to .github/workflows/gsd.yml",
    workflowPath,
  };
}

export async function generateAgentInstructions(root) {
  await initWorkspace(root);
  await mkdir(join(root, ".agent", "roles"), { recursive: true });
  await mkdir(join(root, ".agent", "messages"), { recursive: true });
  await mkdir(join(root, ".cursor", "rules"), { recursive: true });

  const sharedInstructions = buildSharedAgentInstructions();
  await writeFile(join(root, "AGENTS.md"), sharedInstructions);
  await writeFile(join(root, "CLAUDE.md"), sharedInstructions);
  await writeFile(join(root, "GEMINI.md"), sharedInstructions);
  await writeFile(join(root, ".cursor", "rules", "gsd.mdc"), `---\nalwaysApply: true\n---\n\n${sharedInstructions}`);
  await writeFile(join(root, ".agent", "messages", "README.md"), buildMessageBoardReadme());

  for (const role of AGENT_ROLES) {
    await writeFile(join(root, ".agent", "roles", `${role.name}.md`), buildRoleInstructions(role));
  }

  return {
    ok: true,
    message: "Agent instructions generated",
  };
}

export async function postAgentMessage(root, role, text) {
  await generateAgentInstructions(root);
  const safeRole = slugify(role || "agent") || "agent";
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/[:.]/g, "-")}-${safeRole}.md`;
  const messagePath = join(root, ".agent", "messages", filename);
  await writeFile(
    messagePath,
    [`# Agent Message`, "", `Role: ${safeRole}`, `Created: ${timestamp}`, "", "## Message", "", text, ""].join("\n"),
  );

  return {
    ok: true,
    message: `Message written to .agent/messages/${filename}`,
    messagePath,
  };
}

export async function listAgentMessages(root) {
  const messagesDir = join(root, ".agent", "messages");
  if (!(await exists(messagesDir))) return [];
  const files = (await readdir(messagesDir)).filter((file) => file.endsWith(".md") && file !== "README.md").sort().reverse();
  const messages = [];

  for (const file of files) {
    const content = await readFile(join(messagesDir, file), "utf8");
    messages.push({
      file,
      role: readMetadataLine(content, "Role") ?? "unknown",
      created: readMetadataLine(content, "Created") ?? "",
      text: extractMessageText(content),
    });
  }

  return messages;
}

export async function getSpecStatus(root) {
  const activeChange = await readJsonIfExists(join(root, ".gsd", "current.json"));
  if (!activeChange) {
    return {
      activeChange: null,
      proposal: false,
      tasks: false,
      acceptanceCriteria: false,
      verificationPlan: false,
      evidence: false,
    };
  }

  const proposalPath = join(root, "openspec", "changes", activeChange.slug, "proposal.md");
  const tasksPath = join(root, "openspec", "changes", activeChange.slug, "tasks.md");
  const proposal = await readTextIfExists(proposalPath);

  return {
    activeChange,
    proposal: Boolean(proposal),
    tasks: await exists(tasksPath),
    acceptanceCriteria: hasMarkdownHeading(proposal, "Acceptance Criteria"),
    verificationPlan: hasMarkdownHeading(proposal, "Verification Plan"),
    evidence: await exists(join(root, ".agent", "evidence", `${activeChange.slug}.md`)),
  };
}

export async function validateChange(root, options = {}) {
  const status = await getSpecStatus(root);
  const errors = [];

  if (!status.activeChange) errors.push("Active change is missing. Run `gsd start <title>` first.");
  if (status.activeChange && !status.proposal) errors.push("Proposal file is missing.");
  if (status.activeChange && !status.tasks) errors.push("Tasks file is missing.");
  if (status.activeChange && !status.acceptanceCriteria) errors.push("Acceptance Criteria section is missing.");
  if (status.activeChange && !status.verificationPlan) errors.push("Verification Plan section is missing.");
  if (options.ready && !status.evidence) errors.push("Verification evidence is missing. Run `gsd verify` first.");

  return {
    ok: errors.length === 0,
    errors,
    status,
  };
}

export async function getDiffSummary(root) {
  const status = await getStatus(root);
  const gitStatus = await readGitStatus(root);

  return {
    branch: await getGitBranch(root),
    activeChange: status.activeChange,
    hasEvidence: status.hasEvidence,
    stagedFiles: gitStatus.stagedFiles,
    unstagedFiles: gitStatus.unstagedFiles,
    committedFiles: await getLatestCommitFiles(root),
    recentCommits: await getRecentCommits(root),
  };
}

export async function generateReport(root) {
  const activeChange = await requireActiveChange(root);
  const summary = await getDiffSummary(root);
  const evidenceRelativePath = `.agent/evidence/${activeChange.slug}.md`;
  const hasEvidence = await exists(join(root, evidenceRelativePath));
  const changedFiles = [...new Set([...summary.stagedFiles, ...summary.unstagedFiles])];
  const reportPath = join(root, ".gsd", "reports", `${activeChange.slug}.md`);

  await mkdir(join(root, ".gsd", "reports"), { recursive: true });
  await writeFile(
    reportPath,
    [
      `# ${activeChange.title} PR Report`,
      "",
      "## Summary",
      "",
      `Prepared review report for \`${activeChange.slug}\`.`,
      "",
      "## Spec",
      "",
      `openspec/changes/${activeChange.slug}`,
      "",
      "## Verification",
      "",
      hasEvidence ? `- Evidence: ${evidenceRelativePath}` : "- Evidence: missing. Run `gsd verify` before review.",
      "",
      "## Changed Files",
      "",
      ...formatChangedFiles(changedFiles),
      "",
      "## Risks",
      "",
      "- Review changed files and verification evidence before merge.",
      "",
      "## Reviewer Notes",
      "",
      "- Confirm the spec, implementation, and verification evidence agree.",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Report written to .gsd/reports/${activeChange.slug}.md`,
    reportPath,
  };
}

export async function generateRelease(root) {
  const activeChange = await requireActiveChange(root);
  const specValidation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const summary = await getDiffSummary(root);
  const messages = await listAgentMessages(root);
  const releasePath = join(root, ".gsd", "releases", `${activeChange.slug}.md`);
  const reportRelativePath = `.gsd/reports/${activeChange.slug}.md`;
  const evidenceRelativePath = `.agent/evidence/${activeChange.slug}.md`;

  await mkdir(join(root, ".gsd", "releases"), { recursive: true });
  await writeFile(
    releasePath,
    [
      `# Release: ${activeChange.title}`,
      "",
      "## Summary",
      "",
      `Release handoff for \`${activeChange.slug}\`.`,
      "",
      "## Spec",
      "",
      `openspec/changes/${activeChange.slug}`,
      "",
      "## Validation",
      "",
      `- Spec validation: ${specValidation.ok ? "pass" : "fail"}`,
      `- Ready validation: ${readyValidation.ok ? "pass" : "fail"}`,
      ...formatReleaseValidationErrors(specValidation.errors, readyValidation.errors),
      "",
      "## Verification",
      "",
      readyValidation.status.evidence
        ? evidenceRelativePath
        : "Missing verification evidence. Run `gsd verify --full` before shipping.",
      "",
      "## Review Report",
      "",
      (await exists(join(root, reportRelativePath))) ? reportRelativePath : "Missing review report. Run `gsd report`.",
      "",
      "## Changed Files",
      "",
      ...formatChangedFiles([...new Set([...summary.stagedFiles, ...summary.unstagedFiles])]),
      "",
      "## Agent Handoffs",
      "",
      ...formatReleaseMessages(messages),
      "",
      "## Release Notes",
      "",
      `- Prepared ${activeChange.title} for release review.`,
      "- Review the linked spec, verification evidence, and report before shipping.",
      "",
      "## Ship Checklist",
      "",
      "- [ ] Spec reviewed",
      "- [ ] Evidence reviewed",
      "- [ ] Report reviewed",
      "- [ ] Risks accepted",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Release handoff written to .gsd/releases/${activeChange.slug}.md`,
    releasePath,
  };
}

export async function generateExamples(root) {
  const exampleRoot = join(root, "examples", "node-basic");
  await mkdir(join(exampleRoot, ".gsd"), { recursive: true });
  await mkdir(join(exampleRoot, "openspec", "changes", "example-change"), { recursive: true });

  await writeFile(
    join(exampleRoot, "package.json"),
    `${JSON.stringify(
      {
        name: "gsd-node-basic-example",
        version: "0.4.0",
        type: "module",
        private: true,
        scripts: {
          lint: "node --check index.mjs",
          test: "node --test",
          typecheck: "node --check index.mjs",
          "test:e2e": "node --test",
        },
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(join(exampleRoot, "index.mjs"), "export function hello() {\n  return 'hello from gsd';\n}\n");
  await writeFile(
    join(exampleRoot, "README.md"),
    [
      "# Node Basic ShipSpec Example",
      "",
      "This example shows a minimal Node project using ShipSpec delivery artifacts.",
      "",
      "Try:",
      "",
      "```bash",
      "gsd spec",
      "gsd validate",
      "gsd verify --full",
      "gsd report",
      "gsd release",
      "```",
      "",
    ].join("\n"),
  );
  await writeFile(
    join(exampleRoot, ".gsd", "workflow.json"),
    `${JSON.stringify(
      {
        checks: [
          { name: "lint", command: "npm run lint", required: true },
          { name: "unit", command: "npm test", required: true },
          { name: "typecheck", command: "npm run typecheck", required: true },
          { name: "e2e", command: "npm run test:e2e", required: false, fullOnly: true },
        ],
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    join(exampleRoot, ".gsd", "current.json"),
    `${JSON.stringify({ title: "Example Change", slug: "example-change", startedAt: new Date().toISOString() }, null, 2)}\n`,
  );
  await writeFile(
    join(exampleRoot, "openspec", "changes", "example-change", "proposal.md"),
    [
      "# Example Change",
      "",
      "## Intent",
      "",
      "Demonstrate a minimal GSD change.",
      "",
      "## Acceptance Criteria",
      "",
      "- [ ] Example validates successfully.",
      "",
      "## Verification Plan",
      "",
      "- Run `gsd verify --full`.",
      "",
    ].join("\n"),
  );
  await writeFile(
    join(exampleRoot, "openspec", "changes", "example-change", "tasks.md"),
    "# Example Change Tasks\n\n- [ ] Review the example workflow\n",
  );

  return {
    ok: true,
    message: "Examples written to examples/node-basic",
    exampleRoot,
  };
}

export async function runSelfTest(root, options = {}) {
  const runner = options.runner ?? ((argv) => runCli(argv, { cwd: root }));
  const commands = [
    ["doctor"],
    ["detect"],
    ["spec"],
    ["validate"],
    ["verify", "--full"],
    ["report"],
    ["release"],
  ];
  const results = [];

  for (const argv of commands) {
    const result = await runner(argv);
    results.push({
      command: argv.join(" "),
      ok: result.exitCode === 0,
      exitCode: result.exitCode,
    });
  }

  return {
    ok: results.every((result) => result.ok),
    results,
  };
}

export function getShipSpecSkillPath() {
  return join(PACKAGE_ROOT, "skills", "shipspec");
}

export function getDefaultCodexSkillsRoot() {
  return join(homedir(), ".codex", "skills");
}

export async function installShipSpecSkill(options = {}) {
  const sourcePath = options.sourcePath ?? getShipSpecSkillPath();
  const skillsRoot = options.skillsRoot ?? getDefaultCodexSkillsRoot();
  const targetPath = join(skillsRoot, "shipspec");

  await assertDirectoryExists(sourcePath, "ShipSpec skill source was not found");
  await mkdir(skillsRoot, { recursive: true });
  await cp(sourcePath, targetPath, { recursive: true, force: true });

  return {
    ok: true,
    sourcePath,
    targetPath,
    message: `ShipSpec skill installed to ${targetPath}`,
  };
}

export async function generateDesktopApp(root) {
  const appRoot = join(root, "apps", "desktop");
  const rendererRoot = join(appRoot, "renderer");
  await mkdir(rendererRoot, { recursive: true });

  await writeFile(join(appRoot, "package.json"), `${JSON.stringify(buildDesktopPackageJson(), null, 2)}\n`);
  await writeFile(join(appRoot, "main.js"), buildDesktopMainJs());
  await writeFile(join(appRoot, "preload.js"), buildDesktopPreloadJs());
  await writeFile(join(rendererRoot, "index.html"), buildDesktopIndexHtml());
  await writeFile(join(rendererRoot, "styles.css"), buildDesktopStylesCss());
  await writeFile(join(rendererRoot, "app.js"), buildDesktopRendererJs());

  return {
    ok: true,
    message: "Desktop app written to apps/desktop",
    appRoot,
  };
}

export async function generateUiDashboard(root) {
  await initWorkspace(root);
  const status = await getStatus(root);
  const specStatus = await getSpecStatus(root);
  const validation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const diff = await getDiffSummary(root);
  const messages = await listAgentMessages(root);
  const audit = await getAuditTrail(root);
  const activeChange = status.activeChange;
  const reportExists = activeChange ? await exists(join(root, ".gsd", "reports", `${activeChange.slug}.md`)) : false;
  const releaseExists = activeChange ? await exists(join(root, ".gsd", "releases", `${activeChange.slug}.md`)) : false;
  const uiPath = join(root, ".gsd", "ui", "index.html");

  await mkdir(join(root, ".gsd", "ui"), { recursive: true });
  await writeFile(
    uiPath,
    buildUiHtml({
      activeChange,
      specStatus,
      validation,
      readyValidation,
      diff,
      messages,
      audit,
      reportExists,
      releaseExists,
    }),
  );

  return {
    ok: true,
    message: "Pixel dashboard written to .gsd/ui/index.html",
    uiPath,
  };
}

export async function createIntake(root, request) {
  await initWorkspace(root);
  const title = request.trim();
  if (!title) {
    return {
      ok: false,
      message: "Usage: gsd intake <request title or ticket link>",
    };
  }

  const slug = slugify(title);
  const intakePath = join(root, ".gsd", "intake", `${slug}.md`);
  await mkdir(join(root, ".gsd", "intake"), { recursive: true });
  await writeFile(
    intakePath,
    [
      `# ${title}`,
      "",
      "## Source",
      "",
      isLikelyUrl(title) ? title : "- Local request",
      "",
      "## Problem",
      "",
      "- Describe the request, ticket, or user problem.",
      "",
      "## Expected Outcome",
      "",
      "- Define what should be true when this work is complete.",
      "",
      "## Open Questions",
      "",
      "- Confirm scope before implementation if the request is ambiguous.",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Intake written to .gsd/intake/${slug}.md`,
    slug,
    intakePath,
  };
}

export async function generateContract(root) {
  const activeChange = await requireActiveChange(root);
  const contractPath = join(root, ".gsd", "contracts", `${activeChange.slug}.md`);
  await mkdir(join(root, ".gsd", "contracts"), { recursive: true });
  await writeFile(
    contractPath,
    [
      `# ${activeChange.title} Contract`,
      "",
      "## Acceptance Criteria",
      "",
      "- [ ] The active ShipSpec proposal acceptance criteria are satisfied.",
      "- [ ] The implementation stays inside the validated scope.",
      "",
      "## Files Likely Affected",
      "",
      "- List expected source, test, documentation, or configuration files before coding.",
      "",
      "## Test Plan",
      "",
      "- Run `gsd verify --full` before review or release.",
      "",
      "## Definition Of Done",
      "",
      "- [ ] Spec validates with `gsd validate`.",
      "- [ ] Verification evidence exists.",
      "- [ ] Review report exists.",
      "- [ ] Release handoff exists.",
      "- [ ] Done report exists.",
      "",
      "## Risks",
      "",
      "- Record risky assumptions, migrations, edge cases, or rollback notes.",
      "",
      "## Approval Gates",
      "",
      "- [ ] Human approved scope.",
      "- [ ] Human approved release readiness.",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Contract written to .gsd/contracts/${activeChange.slug}.md`,
    contractPath,
  };
}

export async function generateAgentRoom(root) {
  const activeChange = await requireActiveChange(root);
  const roomRoot = join(root, ".agent", "room", activeChange.slug);
  await mkdir(roomRoot, { recursive: true });

  const roles = [
    ["planner", "Owns scope clarity, acceptance criteria, and open questions."],
    ["builder", "Owns implementation inside the validated ShipSpec contract."],
    ["tester", "Owns verification evidence and regression coverage."],
    ["reviewer", "Owns changed-file review, risks, and handoff quality."],
    ["release", "Owns release notes, rollout concerns, and final readiness."],
  ];

  for (const [role, duty] of roles) {
    await writeFile(
      join(roomRoot, `${role}.md`),
      [`# ${activeChange.title} ${titleCase(role)}`, "", `Duty: ${duty}`, "", "## Notes", "", "- Pending.", ""].join("\n"),
    );
  }

  await writeFile(
    join(roomRoot, "handoff.md"),
    [
      `# ${activeChange.title} Handoff`,
      "",
      "## Current State",
      "",
      "- ShipSpec room created.",
      "",
      "## Next Agent",
      "",
      "- Planner confirms contract, then builder implements.",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Agent room written to .agent/room/${activeChange.slug}`,
    roomRoot,
  };
}

export async function getAuditTrail(root) {
  const status = await getStatus(root);
  const activeChange = status.activeChange;
  const specStatus = await getSpecStatus(root);
  const slug = activeChange?.slug;

  const checks = [
    ["Request intake", slug ? await exists(join(root, ".gsd", "intake", `${slug}.md`)) : false],
    ["Spec", Boolean(specStatus.activeChange && specStatus.proposal && specStatus.tasks)],
    ["Contract", slug ? await exists(join(root, ".gsd", "contracts", `${slug}.md`)) : false],
    ["Agent room", slug ? await exists(join(root, ".agent", "room", slug, "handoff.md")) : false],
    ["Evidence", slug ? await exists(join(root, ".agent", "evidence", `${slug}.md`)) : false],
    ["Report", slug ? await exists(join(root, ".gsd", "reports", `${slug}.md`)) : false],
    ["Release", slug ? await exists(join(root, ".gsd", "releases", `${slug}.md`)) : false],
    ["Done", slug ? await exists(join(root, ".gsd", "done", `${slug}.md`)) : false],
  ].map(([name, ok]) => ({ name, ok }));

  return {
    ok: checks.every((check) => check.ok),
    activeChange,
    checks,
  };
}

export async function prepareDelivery(root, request) {
  const title = request.trim();
  if (!title) {
    return {
      ok: false,
      message: "Usage: gsd deliver <request title or ticket link>",
    };
  }

  const intake = await createIntake(root, title);
  const change = await startChange(root, title);
  const contract = await generateContract(root);
  const room = await generateAgentRoom(root);
  const validation = await validateChange(root, { ready: false });

  return {
    ok: intake.ok && change.ok && contract.ok && room.ok && validation.ok,
    message: validation.ok ? "ShipSpec package prepared" : "ShipSpec package prepared, but validation needs attention",
    intake,
    change,
    contract,
    room,
    validation,
  };
}

export async function generateReflection(root) {
  const activeChange = await requireActiveChange(root);
  const specValidation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const summary = await getDiffSummary(root);
  const audit = await getAuditTrail(root);
  const messages = await listAgentMessages(root);
  const evidenceSummary = await readEvidenceSummary(root, activeChange.slug);
  const reportExists = await exists(join(root, ".gsd", "reports", `${activeChange.slug}.md`));
  const releaseExists = await exists(join(root, ".gsd", "releases", `${activeChange.slug}.md`));
  const doneExists = await exists(join(root, ".gsd", "done", `${activeChange.slug}.md`));
  const gaps = buildReflectionGaps({ specValidation, readyValidation, audit, reportExists, releaseExists, doneExists });
  const nextActions = buildReflectionNextActions(gaps);
  const reflectionPath = join(root, ".gsd", "reflections", `${activeChange.slug}.md`);

  await mkdir(join(root, ".gsd", "reflections"), { recursive: true });
  await writeFile(
    reflectionPath,
    [
      `# Reflection: ${activeChange.title}`,
      "",
      `Change: ${activeChange.slug}`,
      `Readiness: ${gaps.length === 0 ? "ready" : "needs attention"}`,
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Summary",
      "",
      gaps.length === 0
        ? "- No ShipSpec gaps detected from local evidence."
        : "- ShipSpec found gaps that should be resolved before shipping.",
      `- Changed files detected: ${summary.stagedFiles.length + summary.unstagedFiles.length}`,
      `- Agent messages reviewed: ${messages.length}`,
      "",
      "## Gaps",
      "",
      ...formatBulletList(gaps, "No gaps detected."),
      "",
      "## Verification",
      "",
      ...formatBulletList(evidenceSummary, "No verification evidence summary available."),
      "",
      "## Security",
      "",
      "- Reflection is local-only and does not call network services.",
      "- No shell commands were executed by reflection.",
      "- Raw verification logs are not copied into reflection output.",
      "- Workflow changes are suggestions only; human approval is required.",
      "",
      "## Next Actions",
      "",
      ...formatBulletList(nextActions, "Proceed to review or release handoff."),
      "",
    ].join("\n"),
  );

  return {
    ok: gaps.length === 0,
    message: `Reflection written to .gsd/reflections/${activeChange.slug}.md${
      gaps.length === 0 ? "" : " and needs attention"
    }`,
    reflectionPath,
    gaps,
    nextActions,
  };
}

export async function learnFromChange(root) {
  const activeChange = await requireActiveChange(root);
  const reflection = await generateReflection(root);
  const lessonPath = join(root, ".gsd", "lessons", `${activeChange.slug}.md`);
  const patternsPath = join(root, ".gsd", "patterns", "project.md");
  const memoryPath = join(root, ".agent", "memory.md");
  const patternSection = [
    `## Learned from ${activeChange.title}`,
    "",
    `- Change: ${activeChange.slug}`,
    `- Readiness: ${reflection.ok ? "ready" : "needs attention"}`,
    `- Primary next action: ${reflection.nextActions[0] ?? "Continue normal review."}`,
    "- Human approval required before changing workflow rules.",
    "",
  ].join("\n");
  const memorySection = [
    "## ShipSpec Lessons",
    "",
    `- ${activeChange.slug}: ${reflection.nextActions[0] ?? "No next action recorded."}`,
    "",
  ].join("\n");

  await mkdir(join(root, ".gsd", "lessons"), { recursive: true });
  await mkdir(join(root, ".gsd", "patterns"), { recursive: true });
  await mkdir(join(root, ".agent"), { recursive: true });
  await writeFile(
    lessonPath,
    [
      `# Lesson: ${activeChange.title}`,
      "",
      `Change: ${activeChange.slug}`,
      `Reflection: .gsd/reflections/${activeChange.slug}.md`,
      "",
      "## What ShipSpec Learned",
      "",
      ...formatBulletList(reflection.nextActions, "No lesson needed."),
      "",
      "## Governance",
      "",
      "- Human approval required before changing project workflow, CI, or skills.",
      "- Lessons are advisory and auditable.",
      "",
    ].join("\n"),
  );
  await appendUniqueSection(patternsPath, "# Project Patterns\n\n", `Learned from ${activeChange.title}`, patternSection);
  await appendUniqueSection(memoryPath, "# Project Memory\n\n", activeChange.slug, memorySection);

  return {
    ok: true,
    message: `Lesson written to .gsd/lessons/${activeChange.slug}.md`,
    lessonPath,
    patternsPath,
    memoryPath,
  };
}

export async function runLoop(root) {
  const activeChange = await requireActiveChange(root);
  const verification = await verifyChange(root, { full: true });
  const reflection = await generateReflection(root);
  const learned = verification.ok && reflection.ok;
  const lesson = learned ? await learnFromChange(root) : null;
  const loopPath = join(root, ".gsd", "loops", `${activeChange.slug}.md`);
  const nextActions = verification.ok
    ? reflection.nextActions
    : [`Fix failing verification: ${verification.message}`, ...reflection.nextActions];

  await mkdir(join(root, ".gsd", "loops"), { recursive: true });
  await writeFile(
    loopPath,
    [
      `# Loop: ${activeChange.title}`,
      "",
      "Mode: one-pass",
      `Change: ${activeChange.slug}`,
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Verification",
      "",
      `- Result: ${verification.ok ? "pass" : "fail"}`,
      `- Message: ${verification.message}`,
      "",
      "## Reflection",
      "",
      `- Result: ${reflection.ok ? "ready" : "needs attention"}`,
      `- Reflection: .gsd/reflections/${activeChange.slug}.md`,
      "",
      "## Learning",
      "",
      learned
        ? `- Lesson: .gsd/lessons/${activeChange.slug}.md`
        : "- Learn skipped because reflection still has gaps or verification failed.",
      "",
      "## Next Actions",
      "",
      ...formatBulletList(nextActions, "No next action needed."),
      "",
      "## Safety",
      "",
      "- No code edits were made.",
      "- No deployment was attempted.",
      "- No network calls were made by the loop command.",
      "- The loop ran one pass only.",
      "- Human approval is required for workflow changes.",
      "",
    ].join("\n"),
  );

  return {
    ok: learned,
    learned,
    message: learned
      ? `Loop completed and learned from .gsd/loops/${activeChange.slug}.md`
      : `Loop stopped with next actions in .gsd/loops/${activeChange.slug}.md`,
    loopPath,
    verification,
    reflection,
    lesson,
    nextActions,
  };
}

export async function verifyChange(root, options = {}) {
  const activeChange = await requireActiveChange(root);
  const workflow = await readWorkflow(root);
  const checks = workflow.checks.filter((check) => options.full || !check.fullOnly);
  const results = [];

  for (const check of checks) {
    const result = await runCheck(root, check);
    results.push(result);
    if (!result.ok && check.required) {
      await writeEvidence(root, activeChange, results, options.full);
      return {
        ok: false,
        message: `Required check failed: ${check.name}`,
        checks: results,
      };
    }
  }

  await writeEvidence(root, activeChange, results, options.full);
  return {
    ok: results.every((result) => result.ok || !result.required),
    message: "Verification evidence written",
    checks: results,
  };
}

export async function completeChange(root) {
  const activeChange = await requireActiveChange(root);
  const evidencePath = join(root, ".agent", "evidence", `${activeChange.slug}.md`);

  if (!(await exists(evidencePath))) {
    return {
      ok: false,
      message: "Run `gsd verify` first so the done report can include evidence.",
    };
  }

  await mkdir(join(root, ".gsd", "done"), { recursive: true });
  const evidenceRelativePath = `.agent/evidence/${activeChange.slug}.md`;
  const reportPath = join(root, ".gsd", "done", `${activeChange.slug}.md`);
  const changedFiles = await getChangedFiles(root);
  await writeFile(
    reportPath,
    [
      `# ${activeChange.title} Done Report`,
      "",
      "## Change",
      "",
      `openspec/changes/${activeChange.slug}`,
      "",
      "## Verification Evidence",
      "",
      evidenceRelativePath,
      "",
      "## Changed Files",
      "",
      ...formatChangedFiles(changedFiles),
      "",
      "## Risks",
      "",
      "- Review the evidence file before release.",
      "",
    ].join("\n"),
  );

  return {
    ok: true,
    message: `Done report written to .gsd/done/${activeChange.slug}.md`,
    reportPath,
  };
}

export async function runCli(argv, options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const [command, ...rest] = argv;

  try {
    if (!command || command === "--help" || command === "-h" || command === "help") {
      return cliResult(0, usage());
    }

    if (command === "--version" || command === "-v" || command === "version") {
      return cliResult(0, `${VERSION}\n`);
    }

    if (command === "init") {
      const result = await initWorkspace(cwd);
      return cliResult(0, `${result.message}\n`);
    }

    if (command === "start") {
      const title = rest.join(" ").trim();
      if (!title) return cliResult(1, "Usage: gsd start <change title>\n");
      const result = await startChange(cwd, title);
      return cliResult(0, `${result.message}\nSpec: openspec/changes/${result.change.slug}\n`);
    }

    if (command === "status") {
      const status = await getStatus(cwd);
      if (!status.initialized) return cliResult(0, "ShipSpec workspace is not initialized\n");
      if (!status.activeChange) return cliResult(0, "ShipSpec workspace initialized\nActive change: none\n");
      return cliResult(
        0,
        `ShipSpec workspace initialized\nActive change: ${status.activeChange.slug}\nEvidence: ${
          status.hasEvidence ? "present" : "missing"
        }\n`,
      );
    }

    if (command === "doctor") {
      const result = await doctorWorkspace(cwd);
      return cliResult(result.ok ? 0 : 1, `${formatDoctor(result.checks)}\n`);
    }

    if (command === "detect") {
      const result = await detectProject(cwd);
      return cliResult(0, `${formatDetection(result)}\n`);
    }

    if (command === "configure") {
      const result = await configureWorkflow(cwd);
      return cliResult(0, `Workflow configured\n${formatWorkflow(result.workflow)}\n${formatWarnings(result.warnings)}\n`);
    }

    if (command === "ci") {
      const result = await generateCiWorkflow(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "agents") {
      const result = await generateAgentInstructions(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "message") {
      const [role, ...messageParts] = rest;
      const text = messageParts.join(" ").trim();
      if (!role || !text) return cliResult(1, "Usage: gsd message <role> <message>\n");
      const result = await postAgentMessage(cwd, role, text);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "inbox") {
      const messages = await listAgentMessages(cwd);
      return cliResult(0, `${formatAgentInbox(messages)}\n`);
    }

    if (command === "spec") {
      const result = await getSpecStatus(cwd);
      return cliResult(result.activeChange ? 0 : 1, `${formatSpecStatus(result)}\n`);
    }

    if (command === "validate") {
      const result = await validateChange(cwd, { ready: rest.includes("--ready") });
      return cliResult(
        result.ok ? 0 : 1,
        result.ok ? "Spec validation passed\n" : `Spec validation failed\n${formatValidationErrors(result.errors)}\n`,
      );
    }

    if (command === "diff") {
      const result = await getDiffSummary(cwd);
      return cliResult(0, `${formatDiffSummary(result)}\n`);
    }

    if (command === "report") {
      const result = await generateReport(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "release") {
      const result = await generateRelease(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "examples") {
      const result = await generateExamples(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "self-test") {
      const result = await runSelfTest(cwd, { runner: options.runner });
      return cliResult(result.ok ? 0 : 1, `${formatSelfTest(result.results)}\n`);
    }

    if (command === "adapters") {
      return cliResult(0, `${formatAdapters(listIntegrationAdapters())}\n`);
    }

    if (command === "skill") {
      const [subcommand] = rest;
      if (subcommand === "path") {
        return cliResult(
          0,
          [`Skill source: ${getShipSpecSkillPath()}`, `Default install target: ${join(getDefaultCodexSkillsRoot(), "shipspec")}`].join(
            "\n",
          ) + "\n",
        );
      }
      if (subcommand === "install") {
        const result = await installShipSpecSkill({ skillsRoot: options.skillsRoot });
        return cliResult(0, `${result.message}\nRestart Codex to load the skill.\n`);
      }
      return cliResult(1, "Usage: gsd skill <path|install>\n");
    }

    if (command === "intake") {
      const result = await createIntake(cwd, rest.join(" "));
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "contract") {
      const result = await generateContract(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "room") {
      const result = await generateAgentRoom(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "audit") {
      const result = await getAuditTrail(cwd);
      return cliResult(result.ok ? 0 : 1, `${formatAuditTrail(result)}\n`);
    }

    if (command === "reflect") {
      const result = await generateReflection(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "learn") {
      const result = await learnFromChange(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "loop") {
      const result = await runLoop(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "deliver") {
      const result = await prepareDelivery(cwd, rest.join(" "));
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "desktop") {
      const result = await generateDesktopApp(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "ui") {
      const result = await generateUiDashboard(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "verify") {
      const result = await verifyChange(cwd, { full: rest.includes("--full") });
      return cliResult(result.ok ? 0 : 1, `${result.message}\n${formatCheckResults(result.checks)}\n`);
    }

    if (command === "done") {
      const result = await completeChange(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    return cliResult(1, usage());
  } catch (error) {
    return cliResult(1, `${error.message}\n`);
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function isGitRepository(root) {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], { cwd: root });
    return stdout.trim() === "true";
  } catch {
    return false;
  }
}

async function assertDirectoryExists(path, message) {
  try {
    const info = await stat(path);
    if (!info.isDirectory()) throw new Error(message);
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(message);
    throw error;
  }
}

async function detectPackageManager(root) {
  if (await exists(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (await exists(join(root, "yarn.lock"))) return "yarn";
  if (await exists(join(root, "bun.lockb"))) return "bun";
  if (await exists(join(root, "package.json"))) return "npm";
  return "unknown";
}

function detectFramework(dependencies, scripts) {
  if (dependencies.next || hasScriptValue(scripts, "next")) return "next";
  if (dependencies.vite || hasScriptValue(scripts, "vite")) return "vite";
  if (dependencies.react || dependencies["react-dom"]) return "react";
  return "unknown";
}

function detectTestRunner(dependencies, scripts) {
  if (dependencies.vitest || hasScriptValue(scripts, "vitest")) return "vitest";
  if (dependencies.jest || hasScriptValue(scripts, "jest")) return "jest";
  if (hasScriptValue(scripts, "node --test")) return "node:test";
  return "unknown";
}

function detectE2e(dependencies, scripts) {
  if (dependencies["@playwright/test"] || dependencies.playwright || hasScriptValue(scripts, "playwright")) {
    return "playwright";
  }
  if (dependencies.cypress || hasScriptValue(scripts, "cypress")) return "cypress";
  return "none";
}

function hasScriptValue(scripts, needle) {
  return Object.values(scripts).some((command) => String(command).toLowerCase().includes(needle));
}

function hasE2eScript(packageJson) {
  if (!packageJson?.scripts) return false;
  return Object.entries(packageJson.scripts).some(([name, command]) =>
    `${name} ${command}`.toLowerCase().includes("e2e"),
  );
}

const AGENT_ROLES = [
  {
    name: "planner",
    duty: "Clarify intent, maintain OpenSpec proposal quality, and keep implementation scope explicit.",
  },
  {
    name: "builder",
    duty: "Implement only the validated scope and keep changes aligned with the active ShipSpec change.",
  },
  {
    name: "tester",
    duty: "Run verification, inspect evidence, and report failures with reproduction details.",
  },
  {
    name: "reviewer",
    duty: "Review diffs, risks, spec alignment, and missing tests before handoff.",
  },
  {
    name: "release",
    duty: "Prepare final report, release notes, and ship-readiness summary after ready validation.",
  },
];

function buildSharedAgentInstructions() {
  return [
    "# ShipSpec Agent Instructions",
    "",
    "Use ShipSpec as the shared delivery protocol for humans and AI agents.",
    "",
    "## Required Workflow",
    "",
    "- Always check active ShipSpec change before editing.",
    "- Run `gsd spec` before implementation.",
    "- Run `gsd validate` before coding.",
    "- Run `gsd verify --full` before claiming done.",
    "- Run `gsd validate --ready` before review or ship.",
    "- Include `.gsd/reports/<change>.md` in review handoff.",
    "- Use `.agent/messages/` for agent-to-agent handoff notes.",
    "",
    "## Collaboration Rules",
    "",
    "- Planner owns spec clarity.",
    "- Builder owns scoped implementation.",
    "- Tester owns verification evidence.",
    "- Reviewer owns risk and diff review.",
    "- Release owns final handoff.",
    "",
  ].join("\n");
}

function buildMessageBoardReadme() {
  return [
    "# Agent Message Board",
    "",
    "Agents post handoff notes here with `gsd message <role> <message>`.",
    "",
    "Read recent notes with `gsd inbox` before starting work.",
    "",
  ].join("\n");
}

function buildRoleInstructions(role) {
  return [
    `# ${titleCase(role.name)} Agent`,
    "",
    role.duty,
    "",
    "## Before Work",
    "",
    "- Run `gsd inbox`.",
    "- Run `gsd spec`.",
    "- Run `gsd validate`.",
    "",
    "## After Work",
    "",
    "- Post a message with `gsd message <role> <handoff>`.",
    "",
  ].join("\n");
}

function readMetadataLine(content, key) {
  const line = content.split("\n").find((candidate) => candidate.startsWith(`${key}: `));
  return line ? line.slice(key.length + 2).trim() : null;
}

function extractMessageText(content) {
  const marker = "## Message";
  const index = content.indexOf(marker);
  if (index === -1) return "";
  return content.slice(index + marker.length).trim();
}

function findE2eScriptName(scripts) {
  const entry = Object.entries(scripts).find(([name, command]) => `${name} ${command}`.toLowerCase().includes("e2e"));
  return entry?.[0] ?? null;
}

async function writeIfMissing(path, content) {
  if (await exists(path)) return;
  await writeFile(path, content);
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

async function readJsonIfExists(path) {
  if (!(await exists(path))) return null;
  return JSON.parse(await readFile(path, "utf8"));
}

async function readTextIfExists(path) {
  if (!(await exists(path))) return "";
  return readFile(path, "utf8");
}

async function readTextSnippetIfExists(path, maxBytes = 24_000) {
  const content = await readTextIfExists(path);
  return content.slice(0, maxBytes);
}

async function readEvidenceSummary(root, slug) {
  const evidence = await readTextSnippetIfExists(join(root, ".agent", "evidence", `${slug}.md`));
  if (!evidence) return [];

  const lines = evidence.split("\n");
  const checks = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      current = { name: line.slice(4).trim(), result: "unknown", required: "unknown" };
      checks.push(current);
    } else if (current && line.startsWith("Result: ")) {
      current.result = line.slice("Result: ".length).trim();
    } else if (current && line.startsWith("Required: ")) {
      current.required = line.slice("Required: ".length).trim();
    }
  }

  return checks.map((check) => `${check.result === "pass" ? "PASS" : "CHECK"} ${check.name} (required: ${check.required})`);
}

function buildReflectionGaps({ specValidation, readyValidation, audit, reportExists, releaseExists, doneExists }) {
  const gaps = [];

  for (const error of specValidation.errors) gaps.push(`Spec gap: ${error}`);
  for (const error of readyValidation.errors) gaps.push(`Readiness gap: ${error}`);
  for (const check of audit.checks.filter((entry) => !entry.ok)) gaps.push(`${check.name} artifact is missing.`);
  if (!reportExists) gaps.push("Report artifact is missing.");
  if (!releaseExists) gaps.push("Release handoff is missing.");
  if (!doneExists) gaps.push("Done report is missing.");

  return [...new Set(gaps)];
}

function buildReflectionNextActions(gaps) {
  if (gaps.length === 0) return ["Proceed to review or release handoff."];

  const actions = [];
  if (gaps.some((gap) => gap.includes("Verification evidence"))) actions.push("Run `gsd verify --full` and review failed checks.");
  if (gaps.some((gap) => gap.includes("Report"))) actions.push("Run `gsd report` after verification evidence is current.");
  if (gaps.some((gap) => gap.includes("Release"))) actions.push("Run `gsd release` when review evidence is ready.");
  if (gaps.some((gap) => gap.includes("Done"))) actions.push("Run `gsd done` only after release handoff is complete.");
  if (gaps.some((gap) => gap.includes("Spec"))) actions.push("Improve proposal, tasks, acceptance criteria, or verification plan.");
  if (actions.length === 0) actions.push("Resolve the listed ShipSpec gaps before shipping.");
  return [...new Set(actions)];
}

function formatBulletList(items, emptyText) {
  if (!items.length) return [`- ${emptyText}`];
  return items.map((item) => `- ${item}`);
}

async function appendUniqueSection(path, initialContent, marker, section) {
  const existing = await readTextIfExists(path);
  const content = existing || initialContent;
  if (content.includes(marker)) return;
  await writeFile(path, `${content.trimEnd()}\n\n${section}`);
}

function hasMarkdownHeading(markdown, heading) {
  if (!markdown) return false;
  const pattern = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, "im");
  return pattern.test(markdown);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function requireActiveChange(root) {
  const activeChange = await readJsonIfExists(join(root, ".gsd", "current.json"));
  if (!activeChange) {
    throw new Error("No active change. Run `gsd start <title>` first.");
  }
  return activeChange;
}

async function readWorkflow(root) {
  const workflowPath = join(root, ".gsd", "workflow.json");
  if (!(await exists(workflowPath))) {
    await initWorkspace(root);
  }
  return JSON.parse(await readFile(workflowPath, "utf8"));
}

async function runCheck(root, check) {
  try {
    const { stdout, stderr } = await execFileAsync("sh", ["-c", check.command], {
      cwd: root,
      timeout: check.timeoutMs ?? 120_000,
    });
    return {
      name: check.name,
      command: check.command,
      required: check.required !== false,
      ok: true,
      exitCode: 0,
      output: `${stdout}${stderr}`.trim(),
    };
  } catch (error) {
    return {
      name: check.name,
      command: check.command,
      required: check.required !== false,
      ok: false,
      exitCode: error.code ?? 1,
      output: `${error.stdout ?? ""}${error.stderr ?? ""}`.trim(),
    };
  }
}

async function getChangedFiles(root) {
  const status = await readGitStatus(root);
  return [...new Set([...status.stagedFiles, ...status.unstagedFiles])];
}

async function readGitStatus(root) {
  try {
    const prefix = await getGitPrefix(root);
    const { stdout } = await execFileAsync("git", ["status", "--porcelain", "--untracked-files=all", "--", "."], {
      cwd: root,
    });
    const stagedFiles = [];
    const unstagedFiles = [];

    for (const line of stdout.split("\n").filter(Boolean)) {
      const x = line[0];
      const y = line[1];
      const file = normalizeGitStatusPath(line.slice(3), prefix);
      if (!file || isInternalDeliveryFile(file)) continue;
      if (x !== " " && x !== "?") stagedFiles.push(file);
      if (y !== " " || x === "?") unstagedFiles.push(file);
    }

    return {
      stagedFiles,
      unstagedFiles,
    };
  } catch {
    return {
      stagedFiles: [],
      unstagedFiles: [],
    };
  }
}

async function getGitPrefix(root) {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--show-prefix"], { cwd: root });
    return stdout.trim();
  } catch {
    return "";
  }
}

async function getGitBranch(root) {
  try {
    const { stdout } = await execFileAsync("git", ["branch", "--show-current"], { cwd: root });
    return stdout.trim() || "detached";
  } catch {
    return "unavailable";
  }
}

async function getRecentCommits(root) {
  try {
    const { stdout } = await execFileAsync("git", ["log", "--oneline", "-5"], { cwd: root });
    return stdout
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, ...message] = line.split(" ");
        return {
          hash,
          message: message.join(" "),
        };
      });
  } catch {
    return [];
  }
}

async function getLatestCommitFiles(root) {
  try {
    const prefix = await getGitPrefix(root);
    const { stdout } = await execFileAsync("git", ["show", "--name-only", "--format=", "HEAD"], { cwd: root });
    return stdout
      .split("\n")
      .map((file) => normalizeGitStatusPath(file.trim(), prefix))
      .filter(Boolean)
      .filter((file) => !isInternalDeliveryFile(file));
  } catch {
    return [];
  }
}

function normalizeGitStatusPath(value, prefix = "") {
  const path = value.replace(/^"|"$/g, "").replace(/^.* -> /, "");
  if (prefix && path.startsWith(prefix)) {
    return path.slice(prefix.length);
  }
  return path;
}

function isInternalDeliveryFile(file) {
  return file.startsWith(".agent/") || file.startsWith(".gsd/") || file.startsWith("openspec/");
}

async function writeEvidence(root, activeChange, results, full) {
  await mkdir(join(root, ".agent", "evidence"), { recursive: true });
  const lines = [
    `# ${activeChange.title} Verification Evidence`,
    "",
    `Mode: ${full ? "full" : "fast"}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Checks",
    "",
  ];

  for (const result of results) {
    lines.push(`### ${result.name}`);
    lines.push("");
    lines.push(`Command: \`${result.command}\``);
    lines.push(`Result: ${result.ok ? "pass" : "fail"}`);
    lines.push(`Required: ${result.required ? "yes" : "no"}`);
    if (result.output) {
      lines.push("");
      lines.push("```text");
      lines.push(result.output);
      lines.push("```");
    }
    lines.push("");
  }

  await writeFile(join(root, ".agent", "evidence", `${activeChange.slug}.md`), `${lines.join("\n")}\n`);
}

function formatCheckResults(checks) {
  return checks
    .map((check) => `${check.ok ? "PASS" : "FAIL"} ${check.name}: ${check.command}`)
    .join("\n");
}

function formatChangedFiles(changedFiles) {
  if (changedFiles.length === 0) {
    return ["- No Git changes detected, or Git is unavailable."];
  }
  return changedFiles.map((file) => `- ${file}`);
}

function formatDoctor(checks) {
  return checks.map((check) => `${check.ok ? "PASS" : "WARN"} ${check.name}: ${check.detail}`).join("\n");
}

function formatDetection(result) {
  return [
    `Runtime: ${result.runtime}`,
    `Package manager: ${result.packageManager}`,
    `Framework: ${result.framework}`,
    `Test runner: ${result.testRunner}`,
    `E2E: ${result.e2e}`,
    "Scripts:",
    `  lint: ${result.scripts.lint ? "present" : "missing"}`,
    `  test: ${result.scripts.test ? "present" : "missing"}`,
    `  typecheck: ${result.scripts.typecheck ? "present" : "missing"}`,
    `  e2e: ${result.scripts.e2e ? "present" : "missing"}`,
  ].join("\n");
}

function formatWorkflow(workflow) {
  if (workflow.checks.length === 0) return "No checks configured.";
  return workflow.checks.map((check) => `${check.name}: ${check.command}`).join("\n");
}

function formatWarnings(warnings) {
  if (warnings.length === 0) return "Warnings: none";
  return ["Warnings:", ...warnings.map((warning) => `- ${warning}`)].join("\n");
}

function buildGitHubActionsWorkflow(workflow) {
  const fastChecks = workflow.checks.filter((check) => !check.fullOnly);
  const fullOnlyChecks = workflow.checks.filter((check) => check.fullOnly);
  const lines = [
    "name: ShipSpec Delivery",
    "",
    "on:",
    "  pull_request:",
    "  push:",
    "    branches:",
    "      - main",
    "",
    "jobs:",
    "  verify:",
    "    runs-on: ubuntu-latest",
    "    steps:",
    "      - name: Checkout",
    "        uses: actions/checkout@v4",
    "      - name: Setup Node",
    "        uses: actions/setup-node@v4",
    "        with:",
    "          node-version: 20",
    "          cache: npm",
    "      - name: Install dependencies",
    "        run: npm ci",
    "      - name: Validate spec",
    "        run: node bin/gsd.mjs validate",
  ];

  for (const check of fastChecks) {
    lines.push(`      - name: ${titleCase(check.name)}`);
    lines.push(`        run: ${check.command}`);
  }

  for (const check of fullOnlyChecks) {
    lines.push(`      - name: ${titleCase(check.name)} (full)`);
    lines.push(`        run: ${check.command}`);
  }

  lines.push("      - name: Validate ready gate");
  lines.push("        run: node bin/gsd.mjs validate --ready");
  lines.push("");

  return `${lines.join("\n")}`;
}

function titleCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function formatSpecStatus(status) {
  return [
    `Change: ${status.activeChange?.slug ?? "none"}`,
    `Proposal: ${status.proposal ? "present" : "missing"}`,
    `Tasks: ${status.tasks ? "present" : "missing"}`,
    `Acceptance criteria: ${status.acceptanceCriteria ? "present" : "missing"}`,
    `Verification plan: ${status.verificationPlan ? "present" : "missing"}`,
    `Evidence: ${status.evidence ? "present" : "missing"}`,
  ].join("\n");
}

function formatValidationErrors(errors) {
  return errors.map((error) => `- ${error}`).join("\n");
}

function formatDiffSummary(summary) {
  return [
    `Branch: ${summary.branch}`,
    `Active change: ${summary.activeChange?.slug ?? "none"}`,
    `Evidence: ${summary.hasEvidence ? "present" : "missing"}`,
    "",
    "Staged files:",
    ...formatChangedFiles(summary.stagedFiles),
    "",
    "Unstaged files:",
    ...formatChangedFiles(summary.unstagedFiles),
    "",
    "Recent commits:",
    ...(summary.recentCommits.length === 0
      ? ["- No commits detected, or Git is unavailable."]
      : summary.recentCommits.map((commit) => `- ${commit.hash} ${commit.message}`)),
  ].join("\n");
}

function formatAgentInbox(messages) {
  if (messages.length === 0) return "No agent messages.";
  return messages.map((message) => `${message.created} ${message.role}: ${message.text}`).join("\n");
}

function formatSelfTest(results) {
  return results.map((result) => `${result.ok ? "PASS" : "FAIL"} ${result.command}`).join("\n");
}

function listIntegrationAdapters() {
  return [
    {
      name: "OpenSpec",
      summary: "Change proposals and task checklists.",
      paths: ["openspec/changes", "openspec/specs"],
    },
    {
      name: "Superpowers",
      summary: "Planning, TDD, and verification discipline.",
      paths: ["docs/superpowers/plans", "docs/superpowers/specs"],
    },
    {
      name: "GitHub",
      summary: "CI, review reports, and release handoffs.",
      paths: [".github/workflows", ".gsd/reports", ".gsd/releases"],
    },
    {
      name: "Project scripts",
      summary: "package.json scripts used for verification.",
      paths: ["package.json scripts", ".gsd/workflow.json"],
    },
  ];
}

function formatAdapters(adapters) {
  return adapters
    .map((adapter) => [`${adapter.name}: ${adapter.summary}`, `  Paths: ${adapter.paths.join(", ")}`].join("\n"))
    .join("\n\n");
}

function formatAuditTrail(result) {
  const lines = [
    `Change: ${result.activeChange?.slug ?? "none"}`,
    "",
    ...result.checks.map((check) => `${check.ok ? "PASS" : "WAIT"} ${check.name}`),
  ];
  return lines.join("\n");
}

function buildDesktopPackageJson() {
  return {
    name: "gsd-desktop",
    version: "0.4.0",
    private: true,
    main: "main.js",
    scripts: {
      start: "electron .",
    },
    devDependencies: {
      electron: "^42.4.1",
    },
  };
}

function buildDesktopMainJs() {
  return `"use strict";

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { execFile } = require('node:child_process');
const path = require('node:path');

let mainWindow;
const repoRoot = path.resolve(__dirname, '..', '..');
let projectDir = repoRoot;
const nodePath = process.env.npm_node_execpath || process.env.NODE || 'node';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 900,
    minHeight: 620,
    backgroundColor: '#11131f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function runGsd(args) {
  return new Promise((resolve) => {
    const cliPath = path.join(repoRoot, 'bin', 'gsd.mjs');
    execFile(nodePath, [cliPath, ...args], { cwd: projectDir }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        exitCode: error ? error.code ?? 1 : 0,
        stdout,
        stderr,
        projectDir,
      });
    });
  });
}

ipcMain.handle('project:select', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Choose ShipSpec project folder',
  });

  if (!result.canceled && result.filePaths[0]) {
    projectDir = result.filePaths[0];
  }

  return { projectDir };
});

ipcMain.handle('project:get', async () => ({ projectDir }));
ipcMain.handle('gsd:run', async (_event, args) => runGsd(args));

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
`;
}

function buildDesktopPreloadJs() {
  return `"use strict";

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gsdDesktop', {
  getProject: () => ipcRenderer.invoke('project:get'),
  selectProject: () => ipcRenderer.invoke('project:select'),
  runGsd: (args) => ipcRenderer.invoke('gsd:run', args),
});
`;
}

function buildDesktopIndexHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ShipSpec Desktop</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>ShipSpec Desktop</h1>
        <p id="projectPath">No project selected</p>
      </div>
      <button id="chooseProject">Choose Project</button>
    </header>

    <section class="grid">
      <div class="panel hero">
        <h2>Pipeline</h2>
        <div id="pipeline" class="pipeline"></div>
      </div>
      <div class="panel">
        <h2>Actions</h2>
        <div class="actions">
          <button data-command="status">Status</button>
          <button data-command="validate">Validate</button>
          <button data-command="verify --full">Verify Full</button>
          <button data-command="report">Report</button>
          <button data-command="release">Release</button>
          <button data-command="ui">Refresh UI</button>
        </div>
      </div>
    </section>

    <section class="grid lower">
      <div class="panel">
        <h2>Agent Inbox</h2>
        <pre id="inbox">Loading...</pre>
      </div>
      <div class="panel">
        <h2>Command Output</h2>
        <pre id="output">Ready.</pre>
      </div>
    </section>
  </main>
  <script src="./app.js"></script>
</body>
</html>
`;
}

function buildDesktopStylesCss() {
  return `@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600;700&display=swap');

:root {
  --bg: #11131f;
  --panel: #1b2033;
  --panel-2: #232944;
  --grid: rgba(255,255,255,.06);
  --text: #f8f4d8;
  --muted: #aeb7d8;
  --green: #67f58c;
  --yellow: #ffd166;
  --blue: #64d2ff;
  --line: #3c456c;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Pixelify Sans', ui-monospace, monospace;
  background:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    var(--bg);
  background-size: 18px 18px;
  color: var(--text);
}
.shell { padding: 28px; max-width: 1180px; margin: 0 auto; }
header { display: flex; justify-content: space-between; align-items: start; gap: 18px; margin-bottom: 20px; }
h1 { margin: 0; font-size: 54px; color: var(--green); text-shadow: 4px 4px 0 #000; }
h2 { margin: 0 0 14px; color: var(--blue); }
p { margin: 8px 0 0; color: var(--muted); }
button {
  font: inherit;
  color: var(--text);
  background: #11172a;
  border: 3px solid var(--line);
  box-shadow: 5px 5px 0 #05060b;
  padding: 10px 12px;
  cursor: pointer;
}
button:hover { color: var(--green); transform: translate(1px, 1px); box-shadow: 4px 4px 0 #05060b; }
.grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; }
.lower { margin-top: 18px; }
.panel {
  background: var(--panel);
  border: 3px solid var(--line);
  box-shadow: 8px 8px 0 #05060b;
  padding: 18px;
}
.pipeline { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.stage { background: var(--panel-2); border: 2px solid var(--line); padding: 14px; min-height: 78px; }
.stage b { display: block; margin-bottom: 8px; }
.pass { color: var(--green); }
.wait { color: var(--yellow); }
.actions { display: grid; gap: 10px; }
pre {
  margin: 0;
  min-height: 210px;
  max-height: 320px;
  overflow: auto;
  white-space: pre-wrap;
  background: #11172a;
  border: 2px solid var(--line);
  padding: 12px;
  color: var(--text);
}
@media (max-width: 900px) {
  header, .grid { grid-template-columns: 1fr; display: grid; }
  h1 { font-size: 38px; }
}
`;
}

function buildDesktopRendererJs() {
  return `const stages = ['Spec', 'Validate', 'Verify', 'Report', 'Release', 'Ready'];
const output = document.querySelector('#output');
const inbox = document.querySelector('#inbox');
const projectPath = document.querySelector('#projectPath');
const pipeline = document.querySelector('#pipeline');
const actionButtons = [...document.querySelectorAll('[data-command]')];
let refreshPromise = Promise.resolve();
let commandRunning = false;

function setBusy(busy) {
  actionButtons.forEach((button) => {
    button.disabled = busy;
  });
  document.querySelector('#chooseProject').disabled = busy;
}

function renderPipeline(text = '') {
  const lower = text.toLowerCase();
  pipeline.innerHTML = stages.map((stage) => {
    const key = stage.toLowerCase();
    const passed = lower.includes(key) && (lower.includes('pass') || lower.includes('present'));
    return '<div class="stage"><b>' + stage + '</b><span class="' + (passed ? 'pass' : 'wait') + '">' + (passed ? 'PASS' : 'READY') + '</span></div>';
  }).join('');
}

async function run(args) {
  if (commandRunning) return;
  commandRunning = true;
  setBusy(true);
  output.textContent = 'Running: gsd ' + args.join(' ') + '\\n';
  try {
    const result = await window.gsdDesktop.runGsd(args);
    output.textContent += (result.stdout || '') + (result.stderr || '');
    projectPath.textContent = result.projectDir;
    return result;
  } finally {
    commandRunning = false;
    setBusy(false);
  }
}

async function refresh() {
  refreshPromise = refreshPromise.then(async () => {
    const project = await window.gsdDesktop.getProject();
    projectPath.textContent = project.projectDir;
    const spec = await window.gsdDesktop.runGsd(['spec']);
    renderPipeline(spec.stdout || '');
    const inboxResult = await window.gsdDesktop.runGsd(['inbox']);
    inbox.textContent = inboxResult.stdout || 'No messages.';
  });
  return refreshPromise;
}

document.querySelector('#chooseProject').addEventListener('click', async () => {
  await window.gsdDesktop.selectProject();
  await refresh();
});

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', async () => {
    await run(button.dataset.command.split(' '));
    await refresh();
  });
});

refresh();
`;
}

function formatReleaseValidationErrors(specErrors, readyErrors) {
  const errors = [...specErrors, ...readyErrors];
  if (errors.length === 0) return [];
  return ["- Validation errors:", ...errors.map((error) => `  - ${error}`)];
}

function formatReleaseMessages(messages) {
  if (messages.length === 0) return ["- No agent handoff messages recorded."];
  return messages.slice(0, 10).map((message) => `- ${message.created} ${message.role}: ${message.text}`);
}

function buildUiHtml(model) {
  const changeTitle = model.activeChange?.title ?? "No active change";
  const changeSlug = model.activeChange?.slug ?? "none";
  const workingTreeFiles = [...new Set([...model.diff.stagedFiles, ...model.diff.unstagedFiles])];
  const committedFiles = [...new Set(model.diff.committedFiles ?? [])];
  const changedFiles = workingTreeFiles.length > 0 ? workingTreeFiles : committedFiles;
  const changedFilesTitle = workingTreeFiles.length > 0 ? "Changed Files" : "Committed Files";
  const changedFilesEmptyText =
    model.diff.recentCommits.length > 0 ? "No project files detected in latest commit." : "No Git changes detected.";
  const stages = [
    ["Spec", model.specStatus.proposal && model.specStatus.tasks],
    ["Validate", model.validation.ok],
    ["Verify", model.specStatus.evidence],
    ["Report", model.reportExists],
    ["Release", model.releaseExists],
    ["Ready", model.readyValidation.ok],
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ShipSpec Pixel Console</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600;700&display=swap');
    :root {
      --bg: #11131f;
      --panel: #1b2033;
      --panel-2: #232944;
      --grid: rgba(255,255,255,.06);
      --text: #f8f4d8;
      --muted: #aeb7d8;
      --green: #67f58c;
      --yellow: #ffd166;
      --red: #ff5d73;
      --blue: #64d2ff;
      --line: #3c456c;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Pixelify Sans', ui-monospace, monospace;
      background:
        linear-gradient(var(--grid) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid) 1px, transparent 1px),
        var(--bg);
      background-size: 18px 18px;
      color: var(--text);
      min-height: 100vh;
    }
    .shell { max-width: 1180px; margin: 0 auto; padding: 28px; }
    header { display: flex; justify-content: space-between; gap: 18px; align-items: start; margin-bottom: 22px; }
    h1, h2, p { margin: 0; }
    h1 { font-size: clamp(30px, 5vw, 56px); line-height: .95; color: var(--green); text-shadow: 4px 4px 0 #000; }
    h2 { font-size: 20px; margin-bottom: 14px; color: var(--blue); }
    .slug { color: var(--muted); margin-top: 10px; font-size: 18px; }
    .grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; }
    .panel {
      background: var(--panel);
      border: 3px solid var(--line);
      box-shadow: 8px 8px 0 #05060b;
      padding: 18px;
    }
    .pipeline { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; }
    .stage {
      min-height: 84px;
      background: var(--panel-2);
      border: 2px solid var(--line);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      text-align: center;
    }
    .stage strong { font-size: 15px; }
    .chip { display: inline-block; padding: 5px 7px; border: 2px solid currentColor; font-size: 13px; }
    .pass { color: var(--green); }
    .warn { color: var(--yellow); }
    .fail { color: var(--red); }
    .commands, .files, .messages { display: grid; gap: 9px; }
    .cmd, .row {
      background: #11172a;
      border: 2px solid var(--line);
      padding: 10px;
      color: var(--text);
      overflow-wrap: anywhere;
    }
    .cmd { color: var(--yellow); }
    .messages .row b { color: var(--green); }
    .split { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
    .footer { margin-top: 18px; color: var(--muted); font-size: 15px; }
    @media (max-width: 840px) {
      header, .grid, .split { grid-template-columns: 1fr; display: grid; }
      .pipeline { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .shell { padding: 18px; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>ShipSpec Pixel Console</h1>
        <p class="slug">${escapeHtml(changeTitle)} / ${escapeHtml(changeSlug)}</p>
      </div>
      <div class="panel">
        <h2>Quest Commands</h2>
        <div class="commands">
          ${["gsd validate", "gsd verify --full", "gsd report", "gsd release", "gsd inbox"].map((command) => `<div class="cmd">${command}</div>`).join("")}
        </div>
      </div>
    </header>

    <section class="grid">
      <div class="panel">
        <h2>Pipeline</h2>
        <div class="pipeline">
          ${stages.map(([name, ok]) => `<div class="stage"><strong>${name}</strong><span class="chip ${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span></div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h2>Status</h2>
        <div class="files">
          <div class="row">Branch: ${escapeHtml(model.diff.branch)}</div>
          <div class="row">Evidence: ${model.specStatus.evidence ? "present" : "missing"}</div>
          <div class="row">Report: ${model.reportExists ? "present" : "missing"}</div>
          <div class="row">Release: ${model.releaseExists ? "present" : "missing"}</div>
        </div>
      </div>
    </section>

    <section class="split">
      <div class="panel">
        <h2>${changedFilesTitle}</h2>
        <div class="files">
          ${(changedFiles.length ? changedFiles : [changedFilesEmptyText]).map((file) => `<div class="row">${escapeHtml(file)}</div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h2>Agent Inbox</h2>
        <div class="messages">
          ${(model.messages.length ? model.messages.slice(0, 6) : [{ role: "system", text: "No agent messages yet." }]).map((message) => `<div class="row"><b>${escapeHtml(message.role)}</b>: ${escapeHtml(message.text)}</div>`).join("")}
        </div>
      </div>
    </section>

    <section class="split">
      <div class="panel">
        <h2>ShipSpec Audit</h2>
        <div class="files">
          ${model.audit.checks.map((check) => `<div class="row">${check.ok ? "PASS" : "WAIT"} ${escapeHtml(check.name)}</div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h2>ShipSpec Files</h2>
        <div class="files">
          <div class="row">Contract: ${model.audit.checks.find((check) => check.name === "Contract")?.ok ? "present" : "missing"}</div>
          <div class="row">Agent room: ${model.audit.checks.find((check) => check.name === "Agent room")?.ok ? "present" : "missing"}</div>
        </div>
      </div>
    </section>

    <p class="footer">Generated by ShipSpec. Static single-page dashboard. Refresh with <span class="cmd">gsd ui</span>.</p>
  </main>
</body>
</html>
`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isLikelyUrl(value) {
  return /^https?:\/\//i.test(value);
}

function cliResult(exitCode, stdout) {
  return {
    exitCode,
    stdout,
    stderr: "",
  };
}

function usage() {
  return [
    "Usage: gsd <command>",
    "",
    "Commands:",
    "  init",
    "  start <change title>",
    "  status",
    "  doctor",
    "  detect",
    "  configure",
    "  ci",
    "  agents",
    "  message <role> <message>",
    "  inbox",
    "  spec",
    "  validate [--ready]",
    "  diff",
    "  report",
    "  release",
    "  examples",
    "  self-test",
    "  adapters",
    "  skill <path|install>",
    "  intake <request>",
    "  contract",
    "  room",
    "  audit",
    "  reflect",
    "  learn",
    "  loop",
    "  deliver <request>",
    "  desktop",
    "  ui",
    "  verify [--full]",
    "  done",
    "",
  ].join("\n");
}
