import { execFile } from "node:child_process";
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
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

export async function getNextRecommendation(root) {
  await initWorkspace(root);
  const status = await getStatus(root);
  const activeChange = status.activeChange;

  if (!activeChange) {
    return buildNextRecommendation({
      command: 'gsd operate "<request>"',
      reason: "No active change exists yet.",
      otherCommands: ["gsd init", "gsd configure", "gsd status"],
    });
  }

  const slug = activeChange.slug;
  const specStatus = await getSpecStatus(root);
  const validation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const hasReasoning = await exists(join(root, ".gsd", "reasoning", `${slug}.md`));
  const hasOperation = await exists(join(root, ".gsd", "operations", `${slug}.md`));
  const hasPrompt = await exists(join(root, ".gsd", "prompts", `${slug}.md`));
  const hasReview = await exists(join(root, ".gsd", "reviews", `${slug}.md`));
  const hasReport = await exists(join(root, ".gsd", "reports", `${slug}.md`));
  const hasUi = await exists(join(root, ".gsd", "ui", "index.html"));

  if (!validation.ok) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd validate",
      reason: `Spec needs attention: ${validation.errors[0]}`,
      otherCommands: ["gsd spec", "gsd reason", "gsd ui"],
    });
  }
  if (!hasReasoning) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd reason",
      reason: "Adaptive reasoning is missing for the active change.",
      otherCommands: ["gsd prompt", "gsd ui", "gsd status"],
    });
  }
  if (!hasOperation) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd operate",
      reason: "Operation report is missing for the active change.",
      otherCommands: ["gsd prompt", "gsd verify --full", "gsd ui"],
    });
  }
  if (!hasPrompt) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd prompt",
      reason: "AI planning prompt is missing.",
      otherCommands: ["gsd decision", "gsd ui", "gsd status"],
    });
  }
  if (!specStatus.evidence) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd verify --full",
      reason: "Verification evidence is missing.",
      otherCommands: ["gsd prompt", "gsd review", "gsd ui"],
    });
  }
  if (!hasReview) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd review",
      reason: "Decision-aware review checklist is missing.",
      otherCommands: ["gsd validate --ready", "gsd report", "gsd ui"],
    });
  }
  if (!readyValidation.ok) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd validate --ready",
      reason: `Ready validation needs attention: ${readyValidation.errors[0]}`,
      otherCommands: ["gsd verify --full", "gsd review", "gsd ui"],
    });
  }
  if (!hasReport) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd report",
      reason: "Review report is missing.",
      otherCommands: ["gsd review", "gsd release", "gsd ui"],
    });
  }
  if (!hasUi) {
    return buildNextRecommendation({
      activeChange,
      command: "gsd ui",
      reason: "Pixel dashboard is missing.",
      otherCommands: ["gsd status", "gsd report", "gsd release"],
    });
  }

  return buildNextRecommendation({
    activeChange,
    command: "gsd release",
    reason: "Core planning, verification, review, report, and dashboard artifacts are present.",
    otherCommands: ["gsd done", "gsd ui", "gsd status"],
  });
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

export async function generateReview(root) {
  const activeChange = await requireActiveChange(root);
  const summary = await getDiffSummary(root);
  const decisions = await readDecisionEntries(root, activeChange.slug);
  const evidenceSummary = await readEvidenceSummary(root, activeChange.slug);
  const changedFiles = [...new Set([...summary.stagedFiles, ...summary.unstagedFiles, ...(summary.committedFiles ?? [])])];
  const reviewPath = join(root, ".gsd", "reviews", `${activeChange.slug}.md`);

  await mkdir(join(root, ".gsd", "reviews"), { recursive: true });
  await writeFile(reviewPath, buildReviewMarkdown({ activeChange, decisions, changedFiles, evidenceSummary }));

  return {
    ok: true,
    activeChange,
    decisions,
    changedFiles,
    evidenceSummary,
    reviewPath,
    message: `Review written to .gsd/reviews/${activeChange.slug}.md`,
  };
}

export async function generateContextPack(root) {
  const activeChange = await requireActiveChange(root);
  const specStatus = await getSpecStatus(root);
  const validation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const diff = await getDiffSummary(root);
  const evidenceSummary = await readEvidenceSummary(root, activeChange.slug);
  const decisions = await readDecisionEntries(root, activeChange.slug);
  const next = await getNextRecommendation(root);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])];
  const risk = buildRiskSummary({ specStatus, readyValidation, changedFiles, evidenceSummary, next });
  const packPath = join(root, ".gsd", "packs", `${activeChange.slug}.md`);
  const pack = buildContextPackMarkdown({
    activeChange,
    specStatus,
    validation,
    readyValidation,
    diff,
    changedFiles,
    evidenceSummary,
    decisions,
    next,
    risk,
  });

  await mkdir(join(root, ".gsd", "packs"), { recursive: true });
  await writeFile(packPath, pack);

  return {
    ok: true,
    activeChange,
    pack,
    packPath,
    message: `Context pack written to .gsd/packs/${activeChange.slug}.md`,
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
  const promptExists = activeChange ? await exists(join(root, ".gsd", "prompts", `${activeChange.slug}.md`)) : false;
  const loop = activeChange ? await getLoopUiState(root, activeChange.slug) : null;
  const reasoning = activeChange ? await getReasoningUiState(root, activeChange.slug) : null;
  const operation = activeChange ? await getOperationUiState(root, activeChange.slug) : null;
  const decisions = activeChange ? await readDecisionEntries(root, activeChange.slug) : [];
  const review = activeChange ? await getReviewUiState(root, activeChange.slug) : null;
  const next = await getNextRecommendation(root);
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
      promptExists,
      loop,
      reasoning,
      operation,
      decisions,
      review,
      next,
    }),
  );

  return {
    ok: true,
    message: "Pixel dashboard written to .gsd/ui/index.html",
    uiPath,
  };
}

export async function quickstartProject(root, request, options = {}) {
  const title = request.trim();
  if (!title) {
    return {
      ok: false,
      message: "Usage: gsd quickstart [--light] <feature>",
    };
  }

  const initialized = await initWorkspace(root);
  const configured = await configureWorkflow(root);
  const agents = options.light ? { ok: true, message: "Agent instructions skipped in light mode" } : await generateAgentInstructions(root);
  const change = await startChange(root, title);
  const validation = await validateChange(root, { ready: false });
  const ui = await generateUiDashboard(root);
  const next = await getNextRecommendation(root);
  const ok = initialized.ok && configured.ok && agents.ok && change.ok && validation.ok && ui.ok;

  return {
    ok,
    message: [
      `Quickstart ready for ${change.change.slug}`,
      `Mode: ${options.light ? "light" : "standard"}`,
      `Spec: openspec/changes/${change.change.slug}`,
      "Cockpit: .gsd/ui/index.html",
      "Guide: gsd next",
      `Next: ${next.command}`,
    ].join("\n"),
    initialized,
    configured,
    agents,
    change,
    validation,
    ui,
    next,
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

export async function prepareDelivery(root, request, options = {}) {
  const title = request.trim();
  if (!title) {
    return {
      ok: false,
      message: "Usage: gsd deliver [--adaptive] <request title or ticket link>",
    };
  }

  const intake = await createIntake(root, title);
  const change = await startChange(root, title);
  const contract = await generateContract(root);
  const room = await generateAgentRoom(root);
  const reasoning = options.adaptive ? await generateReasoning(root) : null;
  const validation = await validateChange(root, { ready: false });
  const ok = intake.ok && change.ok && contract.ok && room.ok && (!reasoning || reasoning.ok) && validation.ok;
  const preparedMessage = options.adaptive ? "Adaptive ShipSpec package prepared" : "ShipSpec package prepared";

  return {
    ok,
    message: validation.ok ? preparedMessage : `${preparedMessage}, but validation needs attention`,
    intake,
    change,
    contract,
    room,
    reasoning,
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

export async function runMission(root, request = "", options = {}) {
  await initWorkspace(root);

  const title = request.trim();
  const initialStatus = await getStatus(root);
  if (!title && !initialStatus.activeChange) {
    return {
      ok: false,
      phase: "needs-request",
      message: "Usage: gsd run <request>",
    };
  }

  const prepared = title ? await quickstartProject(root, title, { light: options.light ?? false }) : null;
  const activeChange = await requireActiveChange(root);
  const specValidation = await validateChange(root, { ready: false });
  const readyValidation = title ? null : await validateChange(root, { ready: true });
  const reasoning = specValidation.ok ? await generateReasoning(root) : null;
  const prompt = specValidation.ok ? await generatePlanPrompt(root) : null;
  let pack = specValidation.ok ? await generateContextPack(root) : null;
  const report = readyValidation?.ok ? await generateReport(root) : null;
  if (report?.ok) pack = await generateContextPack(root);
  const reflection = !title && readyValidation && !readyValidation.ok ? await generateReflection(root) : null;
  const ui = await generateUiDashboard(root);
  const baseNext = await getNextRecommendation(root);
  const risk = await getRiskSummary(root, baseNext);
  const phase = classifyMissionPhase({ specValidation, readyValidation, risk, hasRequest: Boolean(title) });
  const next = buildMissionNextAction({ phase, activeChange, baseNext, prompt, pack, report, reflection });

  const mission = buildMissionState({
    activeChange,
    phase,
    request: title || activeChange.title,
    risk,
    next,
    specValidation,
    readyValidation,
    artifacts: {
      mission: `.gsd/missions/${activeChange.slug}.md`,
      missionJson: `.gsd/missions/${activeChange.slug}.json`,
      reasoning: reasoning ? `.gsd/reasoning/${activeChange.slug}.md` : null,
      prompt: prompt ? `.gsd/prompts/${activeChange.slug}.md` : null,
      pack: pack ? `.gsd/packs/${activeChange.slug}.md` : null,
      report: report?.ok ? `.gsd/reports/${activeChange.slug}.md` : null,
      reflection: reflection ? `.gsd/reflections/${activeChange.slug}.md` : null,
      ui: ".gsd/ui/index.html",
    },
  });
  const missionFiles = await writeMissionState(root, mission);
  const preparedOk = prepared ? prepared.ok : true;

  return {
    ok: specValidation.ok && ui.ok && preparedOk,
    activeChange,
    phase,
    risk,
    next,
    prepared,
    reasoning,
    prompt,
    pack,
    readyValidation,
    report,
    reflection,
    ui,
    mission,
    missionFiles,
    message: formatMissionResult({ mission, pack, report: null }),
  };
}

export async function runOperation(root, request = "", options = {}) {
  await initWorkspace(root);
  const title = request.trim();

  if (options.dryRun) {
    const status = await getStatus(root);
    const previewChange = title ? { title, slug: slugify(title) } : status.activeChange;
    if (!previewChange) {
      return {
        ok: false,
        dryRun: true,
        message: "Usage: gsd operate [--dry-run] [--json] <request title or ticket link>",
      };
    }

    return {
      ok: true,
      dryRun: true,
      activeChange: previewChange,
      message: "Operation dry run: safe control loop previewed",
      steps: ["gsd deliver --adaptive", "gsd reason", "gsd loop", "gsd ui"],
    };
  }

  const status = await getStatus(root);
  if (!title && !status.activeChange) {
    return {
      ok: false,
      message: "Usage: gsd operate [--dry-run] [--json] <request title or ticket link>",
    };
  }

  const delivery = title ? await prepareDelivery(root, title, { adaptive: true }) : null;
  const activeChange = await requireActiveChange(root);
  const reasoning = delivery?.reasoning ?? (await generateReasoning(root));
  const loop = await runLoop(root);
  const ui = await generateUiDashboard(root);
  const operationPath = join(root, ".gsd", "operations", `${activeChange.slug}.md`);
  const nextAction = loop.nextActions[0] ?? "No next action needed.";
  const operation = {
    operationPath,
    learned: loop.learned,
    nextAction,
  };

  await mkdir(join(root, ".gsd", "operations"), { recursive: true });
  await writeFile(operationPath, buildOperationMarkdown({ activeChange, delivery, reasoning, loop, ui, operation }));

  return {
    ok: loop.ok,
    activeChange,
    delivery,
    reasoning,
    loop,
    ui,
    operation,
    message: loop.ok
      ? `Operation completed and learned from .gsd/operations/${activeChange.slug}.md`
      : `Operation stopped with next action in .gsd/operations/${activeChange.slug}.md`,
  };
}

export async function generatePlanPrompt(root) {
  await initWorkspace(root);
  const activeChange = await requireActiveChange(root);
  const slug = activeChange.slug;
  const promptPath = join(root, ".gsd", "prompts", `${slug}.md`);
  const decisions = await readDecisionEntries(root, slug);
  const contextFiles = [
    `openspec/changes/${slug}/proposal.md`,
    `openspec/changes/${slug}/tasks.md`,
    `.gsd/reasoning/${slug}.md`,
    `.gsd/operations/${slug}.md`,
    `.agent/room/${slug}/handoff.md`,
  ];
  const existingContextFiles = [];

  for (const relativePath of contextFiles) {
    if (await exists(join(root, relativePath))) existingContextFiles.push(relativePath);
  }

  const prompt = buildPlanPromptMarkdown({ activeChange, contextFiles: existingContextFiles, decisions });

  await mkdir(join(root, ".gsd", "prompts"), { recursive: true });
  await writeFile(promptPath, prompt);

  return {
    ok: true,
    activeChange,
    prompt,
    promptPath,
    contextFiles: existingContextFiles,
    decisions,
    message: `Prompt written to .gsd/prompts/${slug}.md`,
  };
}

export async function generateCodexHandoff(root) {
  await initWorkspace(root);
  const activeChange = await requireActiveChange(root);
  const slug = activeChange.slug;

  if (!(await exists(join(root, ".gsd", "prompts", `${slug}.md`)))) {
    await generatePlanPrompt(root);
  }
  if (!(await exists(join(root, ".gsd", "packs", `${slug}.md`)))) {
    await generateContextPack(root);
  }

  const candidateFiles = [
    ".gsd/current.json",
    `.gsd/missions/${slug}.md`,
    `.gsd/prompts/${slug}.md`,
    `.gsd/packs/${slug}.md`,
    `openspec/changes/${slug}/proposal.md`,
    `openspec/changes/${slug}/tasks.md`,
  ];
  const files = [];

  for (const relativePath of candidateFiles) {
    if (await exists(join(root, relativePath))) files.push(relativePath);
  }

  const handoff = buildCodexHandoffMarkdown({ activeChange, files });

  return {
    ok: true,
    activeChange,
    files,
    handoff,
    message: handoff,
  };
}

export async function recordDecision(root, decision) {
  await initWorkspace(root);
  const activeChange = await requireActiveChange(root);
  const text = decision.trim();

  if (!text) {
    return {
      ok: false,
      activeChange,
      message: "Usage: gsd decision <human decision or approval>",
    };
  }

  const decisionPath = join(root, ".gsd", "decisions", `${activeChange.slug}.md`);
  const existing = await readTextIfExists(decisionPath);
  const initialContent = [
    `# Decisions: ${activeChange.title}`,
    "",
    `Change: ${activeChange.slug}`,
    "",
    "## Human Decisions",
    "",
  ].join("\n");
  const content = existing || initialContent;

  await mkdir(join(root, ".gsd", "decisions"), { recursive: true });
  await writeFile(decisionPath, `${content.trimEnd()}\n- ${new Date().toISOString()} Human decision: ${text}\n`);

  return {
    ok: true,
    activeChange,
    decisionPath,
    decision: text,
    message: `Decision recorded in .gsd/decisions/${activeChange.slug}.md`,
  };
}

export async function getMemorySummary(root) {
  await initWorkspace(root);
  const projectMemory = await readTextSnippetIfExists(join(root, ".agent", "memory.md"), 16_000);
  const projectPatterns = await readTextSnippetIfExists(join(root, ".gsd", "patterns", "project.md"), 16_000);
  const lessons = await readMemoryArtifacts(root, join(".gsd", "lessons"));
  const reflections = await readMemoryArtifacts(root, join(".gsd", "reflections"));
  const loops = await readMemoryArtifacts(root, join(".gsd", "loops"));

  return {
    projectMemory,
    projectPatterns,
    lessons,
    reflections,
    loops: loops.map((loop) => ({
      ...loop,
      nextActions: extractMarkdownBulletsAfterHeading(loop.summary, "Next Actions").slice(0, 5),
    })),
  };
}

export async function generateReasoning(root) {
  const activeChange = await requireActiveChange(root);
  const specStatus = await getSpecStatus(root);
  const detection = await detectProject(root);
  const workflow = await readWorkflow(root);
  const memory = await getMemorySummary(root);
  const requiredVerification = buildRequiredVerification(workflow, detection);
  const likelyAffectedAreas = inferAffectedAreas(activeChange.title, detection);
  const risks = inferReasoningRisks({ specStatus, detection, workflow, memory });
  const recommendedWorkflow = [
    "gsd validate",
    "gsd verify --full",
    "gsd reflect",
    "gsd loop",
    "gsd memory",
  ];
  const questions = buildReasoningQuestions({ risks, detection });
  const reasoningPath = join(root, ".gsd", "reasoning", `${activeChange.slug}.md`);
  const result = {
    ok: true,
    activeChange,
    whatMatters: buildWhatMatters(activeChange, specStatus, memory),
    likelyAffectedAreas,
    risks,
    recommendedWorkflow,
    requiredVerification,
    questions,
    reasoningPath,
  };

  await mkdir(join(root, ".gsd", "reasoning"), { recursive: true });
  await writeFile(reasoningPath, buildReasoningMarkdown(result, detection));

  return {
    ...result,
    message: `Reasoning written to .gsd/reasoning/${activeChange.slug}.md`,
  };
}

export async function verifyChange(root, options = {}) {
  const activeChange = await requireActiveChange(root);
  const workflow = await readWorkflow(root);
  const checks = workflow.checks.filter((check) => options.full || !check.fullOnly);
  const skippedChecks = workflow.checks.filter((check) => !options.full && check.fullOnly);
  const results = [];

  for (const check of checks) {
    const result = await runCheck(root, check);
    results.push(result);
    if (!result.ok && check.required) {
      await writeEvidence(root, activeChange, results, options.full, skippedChecks);
      return {
        ok: false,
        message: `Required check failed: ${check.name}`,
        checks: results,
      };
    }
  }

  await writeEvidence(root, activeChange, results, options.full, skippedChecks);
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

export async function runShipFlow(root) {
  const verification = await verifyChange(root, { full: true });
  if (!verification.ok) {
    return {
      ok: false,
      message: [`Ship flow blocked: ${verification.message}`, formatCheckResults(verification.checks)].join("\n"),
      verification,
    };
  }

  const ready = await validateChange(root, { ready: true });
  if (!ready.ok) {
    return {
      ok: false,
      message: ["Ship flow blocked: ready validation failed", formatValidationErrors(ready.errors)].join("\n"),
      verification,
      ready,
    };
  }

  const report = await generateReport(root);
  return {
    ok: report.ok,
    message: ["Ship flow ready", formatCheckResults(verification.checks), "Spec validation passed", report.message].join("\n"),
    verification,
    ready,
    report,
  };
}

const CLEANABLE_SLUGS = new Set(["your-feature", "add-sample-mission"]);

const CLEANABLE_FILE_DIRS = [
  ".agent/evidence",
  ".gsd/contracts",
  ".gsd/done",
  ".gsd/intake",
  ".gsd/loops",
  ".gsd/missions",
  ".gsd/operations",
  ".gsd/packs",
  ".gsd/prompts",
  ".gsd/reasoning",
  ".gsd/reflections",
  ".gsd/releases",
  ".gsd/reports",
  ".gsd/reviews",
  ".gsd/tasks",
];

const CLEANABLE_DIRECTORY_DIRS = ["openspec/changes", ".agent/room"];

export async function cleanWorkspace(root, options = {}) {
  const activeChange = await readJsonIfExists(join(root, ".gsd", "current.json"));
  const activeSlug = activeChange?.slug ?? null;
  const slugs = await collectCleanableSlugs(root);
  const candidates = [];

  for (const slug of [...slugs].sort()) {
    if (slug === activeSlug || !isCleanableSlug(slug)) continue;
    candidates.push(...(await getExistingCleanupCandidates(root, slug)));
  }

  const uniqueCandidates = uniqueCleanupCandidates(candidates);
  const removed = [];

  if (options.apply) {
    for (const candidate of uniqueCandidates) {
      await rm(join(root, candidate.path), { force: true, recursive: candidate.kind === "directory" });
      removed.push(candidate);
    }
  }

  return {
    ok: true,
    applied: Boolean(options.apply),
    activeChange,
    candidates: uniqueCandidates,
    removed,
  };
}

async function collectCleanableSlugs(root) {
  const slugs = new Set();

  for (const relativeDir of CLEANABLE_FILE_DIRS) {
    const dir = join(root, relativeDir);
    if (!(await exists(dir))) continue;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const slug = entry.name.replace(/\.(json|md)$/u, "");
      if (slug !== entry.name) slugs.add(slug);
    }
  }

  for (const relativeDir of CLEANABLE_DIRECTORY_DIRS) {
    const dir = join(root, relativeDir);
    if (!(await exists(dir))) continue;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) slugs.add(entry.name);
    }
  }

  return slugs;
}

function isCleanableSlug(slug) {
  return CLEANABLE_SLUGS.has(slug) || /^test[-_]/u.test(slug);
}

async function getExistingCleanupCandidates(root, slug) {
  const candidates = [];

  for (const relativeDir of CLEANABLE_DIRECTORY_DIRS) {
    const path = `${relativeDir}/${slug}`;
    if (await exists(join(root, path))) candidates.push({ path, kind: "directory" });
  }

  for (const relativeDir of CLEANABLE_FILE_DIRS) {
    for (const extension of [".md", ".json"]) {
      const path = `${relativeDir}/${slug}${extension}`;
      if (await exists(join(root, path))) candidates.push({ path, kind: "file" });
    }
  }

  return candidates;
}

function uniqueCleanupCandidates(candidates) {
  const seen = new Set();
  const unique = [];
  for (const candidate of candidates) {
    if (seen.has(candidate.path)) continue;
    seen.add(candidate.path);
    unique.push(candidate);
  }
  return unique.sort((left, right) => left.path.localeCompare(right.path));
}

function formatCleanResult(result) {
  if (result.candidates.length === 0) {
    return "Nothing to clean. Active change and source files were not touched.";
  }

  const paths = result.candidates.map((candidate) => candidate.path);
  if (!result.applied) {
    return ["Safe cleanup preview:", ...paths.map((path) => `- ${path}`), "", "No files deleted. To clean them, run: gsd clean --apply"].join(
      "\n",
    );
  }

  return ["Cleaned ShipSpec demo/test files:", ...paths.map((path) => `- ${path}`), "", "Active change and source files were kept."].join(
    "\n",
  );
}

export async function runCli(argv, options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const [command, ...rest] = argv;

  try {
    if (!command) {
      return cliResult(0, `${await formatOperatorGuide(cwd)}\n`);
    }

    if (command === "--help" || command === "-h") {
      return cliResult(0, beginnerUsage());
    }

    if (command === "help") {
      return cliResult(0, rest[0] === "advanced" ? usage() : beginnerUsage());
    }

    if (command === "fix") {
      const result = await quickstartProject(cwd, rest.join(" "), { light: true });
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "ask") {
      const result = await generateContextPack(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "advanced") {
      return cliResult(0, usage());
    }

    if (command === "--version" || command === "-v" || command === "version") {
      return cliResult(0, `${VERSION}\n`);
    }

    if (command === "init") {
      const result = await initWorkspace(cwd);
      return cliResult(0, `${result.message}\n`);
    }

    if (command === "quickstart") {
      const light = rest.includes("--light");
      const request = rest.filter((part) => part !== "--light").join(" ");
      const result = await quickstartProject(cwd, request, { light });
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "run") {
      const result = await runMission(cwd, rest.join(" "));
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
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

    if (command === "next") {
      const result = await getNextRecommendation(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(0, `${formatNextRecommendation(result)}\n`);
    }

    if (command === "share") {
      const result = await generateContextPack(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "codex") {
      const result = await generateCodexHandoff(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.handoff}\n`);
    }

    if (command === "ship") {
      const result = await runShipFlow(cwd);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "clean") {
      const result = await cleanWorkspace(cwd, { apply: rest.includes("--apply") });
      return cliResult(result.ok ? 0 : 1, `${formatCleanResult(result)}\n`);
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

    if (command === "review") {
      const result = await generateReview(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
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

    if (command === "memory") {
      const result = await getMemorySummary(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(0, `${formatMemorySummary(result)}\n`);
    }

    if (command === "reason") {
      const result = await generateReasoning(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "operate") {
      const json = rest.includes("--json");
      const dryRun = rest.includes("--dry-run");
      const request = rest.filter((part) => part !== "--json" && part !== "--dry-run").join(" ");
      const result = await runOperation(cwd, request, { dryRun });
      if (json) return cliResult(result.ok ? 0 : 1, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "decision") {
      const result = await recordDecision(cwd, rest.join(" "));
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "prompt") {
      const result = await generatePlanPrompt(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(0, `${result.prompt}\n`);
    }

    if (command === "pack") {
      const result = await generateContextPack(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "deliver") {
      const adaptive = rest.includes("--adaptive");
      const request = rest.filter((part) => part !== "--adaptive").join(" ");
      const result = await prepareDelivery(cwd, request, { adaptive });
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

    if (isPlainTextIntent(command, rest)) {
      const result = await quickstartProject(cwd, [command, ...rest].join(" "), { light: false });
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    return cliResult(1, usage());
  } catch (error) {
    if (isPlainTextIntent(command, rest)) {
      const result = await quickstartProject(cwd, [command, ...rest].join(" "), { light: false });
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }
    return cliResult(1, `${error.message}\n`);
  }
}

async function formatOperatorGuide(root) {
  const status = await getStatus(root);
  const next = await getNextRecommendation(root);
  const activeLine = status.activeChange ? `Active change: ${status.activeChange.slug}` : "Active change: none";
  const risk = await getRiskSummary(root, next);

  return [
    "ShipSpec Operator",
    "",
    activeLine,
    `Next: ${next.command}`,
    `Why: ${next.reason}`,
    `Risk: ${risk.level}`,
    `Risk reason: ${risk.reasons.join("; ")}`,
    "",
    "Main commands:",
    "- gsd run <request>      AGI-style delivery operator",
    "- gsd codex              Print no-copy Codex handoff",
    '- gsd "Feature request"  Start a new feature',
    "- gsd next               Show the next best action",
    "- gsd ship               Verify, validate ready, and report",
    "- gsd share              Create a portable AI context pack",
    "- gsd ui                 Refresh the Cockpit dashboard",
    "",
    "Advanced:",
    "- gsd help advanced      Show every command",
    "",
  ].join("\n");
}

function classifyMissionPhase({ specValidation, readyValidation, risk, hasRequest }) {
  if (!specValidation.ok) return "needs-spec";
  if (risk.level === "high" && readyValidation && !readyValidation.ok) return "blocked-high-risk";
  if (readyValidation?.ok) return "review-ready";
  if (hasRequest) return "planning-ready";
  return "implementation-ready";
}

function buildMissionState({ activeChange, phase, request, risk, next, specValidation, readyValidation, artifacts }) {
  return {
    title: activeChange.title,
    slug: activeChange.slug,
    request,
    phase,
    risk,
    nextAction: {
      command: next.command,
      reason: next.reason,
      otherCommands: next.otherCommands ?? [],
    },
    validation: {
      spec: specValidation.ok ? "pass" : "fail",
      ready: readyValidation ? (readyValidation.ok ? "pass" : "fail") : "not-run",
      errors: [...specValidation.errors, ...(readyValidation?.errors ?? [])],
    },
    artifacts,
    safety: {
      localOnly: true,
      externalActions: false,
      destructiveActions: false,
      deployment: false,
      maxLoops: 1,
    },
    generatedAt: new Date().toISOString(),
  };
}

function buildMissionNextAction({ phase, activeChange, baseNext, prompt, pack, report, reflection }) {
  if (phase === "planning-ready" && prompt) {
    return {
      activeChange,
      command: `open .gsd/prompts/${activeChange.slug}.md`,
      reason: "Mission prompt and context pack are ready for an AI coding pass.",
      otherCommands: pack ? [`open .gsd/packs/${activeChange.slug}.md`, "gsd ui"] : ["gsd ui"],
    };
  }

  if (phase === "review-ready" && report) {
    return {
      activeChange,
      command: `open .gsd/reports/${activeChange.slug}.md`,
      reason: "Verification evidence passed and the review report is ready.",
      otherCommands: pack ? ["gsd share", "gsd ui"] : ["gsd ui"],
    };
  }

  if ((phase === "implementation-ready" || phase === "blocked-high-risk") && reflection) {
    return {
      activeChange,
      command: `open .gsd/reflections/${activeChange.slug}.md`,
      reason: "Mission is not ready yet; review the reflection before continuing.",
      otherCommands: ["gsd verify --full", "gsd ui"],
    };
  }

  return baseNext;
}

async function writeMissionState(root, mission) {
  const missionDir = join(root, ".gsd", "missions");
  const jsonPath = join(missionDir, `${mission.slug}.json`);
  const markdownPath = join(missionDir, `${mission.slug}.md`);

  await mkdir(missionDir, { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(mission, null, 2)}\n`);
  await writeFile(markdownPath, buildMissionMarkdown(mission));

  return { jsonPath, markdownPath };
}

function buildMissionMarkdown(mission) {
  return [
    `# Mission: ${mission.title}`,
    "",
    `Slug: ${mission.slug}`,
    `Phase: ${mission.phase}`,
    `Risk: ${mission.risk.level}`,
    `Generated: ${mission.generatedAt}`,
    "",
    "## Goal",
    "",
    mission.request,
    "",
    "## Next Action",
    "",
    `- Command: ${mission.nextAction.command}`,
    `- Reason: ${mission.nextAction.reason}`,
    "",
    "## Risk Reasons",
    "",
    ...formatBulletList(mission.risk.reasons, "No risk reasons."),
    "",
    "## Artifacts",
    "",
    ...formatArtifactList(mission.artifacts),
    "",
    "## Safety",
    "",
    "- Local files only.",
    "- No external services called.",
    "- No destructive commands run.",
    "- No deployment attempted.",
    "- One controlled loop maximum per run.",
    "",
  ].join("\n");
}

function formatArtifactList(artifacts) {
  return Object.entries(artifacts)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `- ${key}: ${value}`);
}

function formatMissionResult({ mission }) {
  const lines = [
    `Mission: ${mission.slug}`,
    `Phase: ${mission.phase}`,
    `Risk: ${mission.risk.level}`,
    `Next: ${mission.nextAction.command}`,
    `Why: ${mission.nextAction.reason}`,
    `Mission file: ${mission.artifacts.mission}`,
  ];

  if (mission.artifacts.prompt) lines.push(`Prompt: ${mission.artifacts.prompt}`);
  if (mission.artifacts.pack) lines.push(`Pack: ${mission.artifacts.pack}`);
  if (mission.artifacts.report) lines.push(`Report: ${mission.artifacts.report}`);
  if (mission.artifacts.ui) lines.push(`UI: ${mission.artifacts.ui}`);
  lines.push("Codex: gsd codex");

  return lines.join("\n");
}

function buildCodexHandoffMarkdown({ activeChange, files }) {
  return [
    "Use $shipspec and implement the active ShipSpec mission.",
    `Mission: ${activeChange.slug}`,
    "",
    "Read these files from the repo:",
    ...formatBulletList(files, "No ShipSpec files found."),
    "",
    "Do not ask me to paste long context. Use repo files as the source of truth.",
    "Stop before coding if the mission/spec is unclear.",
    "",
    "After implementation, run:",
    "- gsd run",
    "- gsd ship",
    "- gsd share",
  ].join("\n");
}

async function getRiskSummary(root, next = null) {
  const status = await getStatus(root);
  if (!status.activeChange) {
    return { level: "low", reasons: ["no active change"] };
  }

  const specStatus = await getSpecStatus(root);
  const readyValidation = await validateChange(root, { ready: true });
  const diff = await getDiffSummary(root);
  const evidenceSummary = await readEvidenceSummary(root, status.activeChange.slug);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])];
  const recommendation = next ?? (await getNextRecommendation(root));
  return buildRiskSummary({ specStatus, readyValidation, changedFiles, evidenceSummary, next: recommendation });
}

function buildRiskSummary({ specStatus, readyValidation, changedFiles, evidenceSummary, next }) {
  const reasons = [];
  const sensitiveFiles = changedFiles.filter((file) => /(auth|token|security|payment|billing|db|database|migration)/i.test(file));
  const uiFiles = changedFiles.filter((file) => /(ui|app|page|component|css|style|view)/i.test(file));

  if (!specStatus.evidence) reasons.push("Verification evidence missing");
  if (!readyValidation.ok) reasons.push("ready validation failing");
  if (evidenceSummary.some((entry) => /^Skipped:/i.test(entry))) reasons.push("verification skipped checks");
  if (sensitiveFiles.length > 0) reasons.push(`Sensitive area changed: ${sensitiveFiles.slice(0, 3).join(", ")}`);
  if (uiFiles.length > 0) reasons.push("UI changed; consider screenshot or E2E proof");
  if (next?.command && !["gsd release", "gsd done"].includes(next.command)) reasons.push(`next action pending: ${next.command}`);

  let level = "low";
  if (reasons.length > 0) level = "medium";
  if (sensitiveFiles.length > 0 && (!specStatus.evidence || !readyValidation.ok)) level = "high";

  return {
    level,
    reasons: reasons.length ? [...new Set(reasons)] : ["no deterministic risks detected"],
  };
}

function isPlainTextIntent(command, rest) {
  const value = [command, ...rest].join(" ").trim();
  if (!value) return false;
  if (command.startsWith("-")) return false;
  return /\s/.test(value) || /^[A-Z]/.test(command);
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

async function getLoopUiState(root, slug) {
  const loopPath = join(root, ".gsd", "loops", `${slug}.md`);
  const reflectionPath = join(root, ".gsd", "reflections", `${slug}.md`);
  const lessonPath = join(root, ".gsd", "lessons", `${slug}.md`);
  const loopContent = await readTextSnippetIfExists(loopPath, 12_000);

  return {
    loop: Boolean(loopContent),
    reflection: await exists(reflectionPath),
    learned: await exists(lessonPath),
    nextActions: extractMarkdownBulletsAfterHeading(loopContent, "Next Actions").slice(0, 4),
  };
}

async function getReasoningUiState(root, slug) {
  const reasoningPath = join(root, ".gsd", "reasoning", `${slug}.md`);
  const reasoningContent = await readTextSnippetIfExists(reasoningPath, 16_000);

  return {
    present: Boolean(reasoningContent),
    recommendedWorkflow: extractMarkdownBulletsAfterHeading(reasoningContent, "Recommended Workflow").slice(0, 4),
    requiredVerification: extractMarkdownBulletsAfterHeading(reasoningContent, "Required Verification").slice(0, 4),
    risks: extractMarkdownBulletsAfterHeading(reasoningContent, "Risks").slice(0, 3),
  };
}

async function getOperationUiState(root, slug) {
  const operationPath = join(root, ".gsd", "operations", `${slug}.md`);
  const operationContent = await readTextSnippetIfExists(operationPath, 16_000);

  return {
    present: Boolean(operationContent),
    mode: extractMarkdownField(operationContent, "Mode") ?? "missing",
    nextActions: extractMarkdownBulletsAfterHeading(operationContent, "Next Action").slice(0, 3),
    safety: extractMarkdownBulletsAfterHeading(operationContent, "Safety").slice(0, 3),
  };
}

async function readDecisionEntries(root, slug) {
  const decisionPath = join(root, ".gsd", "decisions", `${slug}.md`);
  const decisionContent = await readTextSnippetIfExists(decisionPath, 16_000);
  return extractMarkdownBulletsAfterHeading(decisionContent, "Human Decisions").slice(-6);
}

async function getReviewUiState(root, slug) {
  const reviewPath = join(root, ".gsd", "reviews", `${slug}.md`);
  const reviewContent = await readTextSnippetIfExists(reviewPath, 16_000);

  return {
    present: Boolean(reviewContent),
    checklist: extractMarkdownBulletsAfterHeading(reviewContent, "Reviewer Checklist").slice(0, 5),
    evidence: extractMarkdownBulletsAfterHeading(reviewContent, "Verification Evidence").slice(0, 4),
  };
}

async function readMemoryArtifacts(root, relativeDir) {
  const dir = join(root, relativeDir);
  try {
    const files = (await readdir(dir)).filter((file) => file.endsWith(".md")).sort().reverse().slice(0, 5);
    const artifacts = [];

    for (const file of files) {
      const path = join(dir, file);
      const content = await readTextSnippetIfExists(path, 12_000);
      artifacts.push({
        slug: file.replace(/\.md$/, ""),
        path: join(relativeDir, file),
        title: readMarkdownTitle(content) ?? file.replace(/\.md$/, ""),
        summary: content,
      });
    }

    return artifacts;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function readMarkdownTitle(markdown) {
  const line = markdown.split("\n").find((candidate) => candidate.startsWith("# "));
  return line ? line.slice(2).trim() : null;
}

function extractMarkdownBulletsAfterHeading(markdown, heading) {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (headingIndex === -1) return [];
  const bullets = [];

  for (const line of lines.slice(headingIndex + 1)) {
    if (line.startsWith("## ")) break;
    if (line.startsWith("- ")) bullets.push(line.slice(2).trim());
  }

  return bullets;
}

function extractMarkdownField(markdown, field) {
  if (!markdown) return null;
  const prefix = `${field}:`;
  const line = markdown.split("\n").find((candidate) => candidate.startsWith(prefix));
  return line ? line.slice(prefix.length).trim() : null;
}

async function readEvidenceSummary(root, slug) {
  const evidence = await readTextSnippetIfExists(join(root, ".agent", "evidence", `${slug}.md`));
  if (!evidence) return [];
  const summaryBullets = extractEvidenceSummaryBullets(evidence);
  if (summaryBullets.length > 0) return summaryBullets;

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

function extractEvidenceSummaryBullets(evidence) {
  const lines = evidence.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Summary");
  if (headingIndex === -1) return [];

  const bullets = [];
  let label = "";
  for (const line of lines.slice(headingIndex + 1)) {
    if (line.startsWith("## ")) break;
    if (/^(Verified|Skipped|Risk):$/.test(line.trim())) {
      label = line.trim().replace(/:$/, "");
    } else if (line.startsWith("- ")) {
      bullets.push(label ? `${label}: ${line.slice(2).trim()}` : line.slice(2).trim());
    }
  }
  return bullets;
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

function buildNextRecommendation({ activeChange = null, command, reason, otherCommands }) {
  return {
    ok: true,
    activeChange,
    command,
    reason,
    otherCommands,
  };
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

async function writeEvidence(root, activeChange, results, full, skippedChecks = []) {
  await mkdir(join(root, ".agent", "evidence"), { recursive: true });
  const failedRequired = results.filter((result) => !result.ok && result.required);
  const failedOptional = results.filter((result) => !result.ok && !result.required);
  const lines = [
    `# ${activeChange.title} Verification Evidence`,
    "",
    `Mode: ${full ? "full" : "fast"}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    "Verified:",
    ...(results.length ? results.map((result) => `- ${result.name} ${result.ok ? "passed" : "failed"}`) : ["- No checks were configured."]),
    "",
    "Skipped:",
    ...(skippedChecks.length
      ? skippedChecks.map((check) => `- ${check.name} skipped: full-only check not run in fast mode`)
      : ["- None"]),
    "",
    "Risk:",
    ...(failedRequired.length
      ? failedRequired.map((result) => `- Required check failed: ${result.name}`)
      : failedOptional.length
        ? failedOptional.map((result) => `- Optional check failed: ${result.name}`)
        : skippedChecks.length
          ? ["- Full verification still needed for skipped checks."]
          : ["- No verification risks detected from configured checks."]),
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

function formatNextRecommendation(result) {
  return [
    "Next recommended command:",
    "",
    result.command,
    "",
    `Reason: ${result.reason}`,
    "",
    "Other useful commands:",
    ...result.otherCommands.map((command) => `- ${command}`),
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

function formatMemorySummary(summary) {
  return [
    "Project Memory",
    "",
    summary.projectMemory.trim() ? trimForDisplay(summary.projectMemory, 900) : "No project memory recorded.",
    "",
    "Project Patterns",
    "",
    summary.projectPatterns.trim() ? trimForDisplay(summary.projectPatterns, 900) : "No project patterns recorded.",
    "",
    "Recent Lessons",
    "",
    ...formatArtifactRows(summary.lessons),
    "",
    "Recent Reflections",
    "",
    ...formatArtifactRows(summary.reflections),
    "",
    "Recent Loop Next Actions",
    "",
    ...formatLoopActionRows(summary.loops),
  ].join("\n");
}

function formatArtifactRows(artifacts) {
  if (artifacts.length === 0) return ["- None recorded."];
  return artifacts.map((artifact) => `- ${artifact.slug}: ${artifact.title}`);
}

function formatLoopActionRows(loops) {
  if (loops.length === 0) return ["- None recorded."];
  return loops.flatMap((loop) => {
    const actions = loop.nextActions.length ? loop.nextActions : ["No next action recorded."];
    return [`- ${loop.slug}`, ...actions.map((action) => `  - ${action}`)];
  });
}

function trimForDisplay(value, maxLength) {
  const text = value.trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}\n...`;
}

function buildWhatMatters(activeChange, specStatus, memory) {
  const items = [
    `Deliver \`${activeChange.title}\` against the active ShipSpec contract.`,
    specStatus.acceptanceCriteria
      ? "Keep acceptance criteria aligned with implementation evidence."
      : "Clarify acceptance criteria before implementation goes far.",
    specStatus.verificationPlan ? "Use the recorded verification plan as the minimum bar." : "Add a verification plan.",
  ];

  if (memory.lessons.length > 0) items.push("Apply recent lessons before choosing the workflow path.");
  if (memory.projectPatterns.trim()) items.push("Respect learned project patterns from `.gsd/patterns/project.md`.");
  return items;
}

function inferAffectedAreas(title, detection) {
  const text = title.toLowerCase();
  const areas = [];

  if (/(api|endpoint|route|server|backend|service)/.test(text)) areas.push("API/backend surface");
  if (/(ui|page|screen|component|button|form|frontend)/.test(text)) areas.push("Frontend/UI surface");
  if (/(db|database|sql|migration|schema|model)/.test(text)) areas.push("Database/schema surface");
  if (/(auth|login|permission|token|security)/.test(text)) areas.push("Auth/security surface");
  if (/(checkout|payment|billing|invoice)/.test(text)) areas.push("Revenue or billing-critical flow");
  if (detection.framework !== "unknown") areas.push(`${detection.framework} project conventions`);
  if (areas.length === 0) areas.push("Project files identified by implementation and tests");
  return [...new Set(areas)];
}

function inferReasoningRisks({ specStatus, detection, workflow, memory }) {
  const risks = [];

  if (!specStatus.acceptanceCriteria) risks.push("Acceptance criteria are missing.");
  if (!specStatus.verificationPlan) risks.push("Verification plan is missing.");
  if (!detection.scripts.test) risks.push("Unit test script is missing from package metadata.");
  if (!detection.scripts.e2e) risks.push("E2E script is missing; full verification may not cover user flows.");
  if (workflow.checks.length === 0) risks.push("No workflow checks are configured.");
  if (memory.loops.some((loop) => loop.nextActions.length > 0)) risks.push("Recent loop next actions should be reviewed.");
  if (risks.length === 0) risks.push("No deterministic risks detected from local ShipSpec state.");
  return risks;
}

function buildRequiredVerification(workflow, detection) {
  const commands = workflow.checks.map((check) => check.command);
  if (commands.length === 0) {
    if (detection.scripts.lint) commands.push(`${detection.packageManager} run lint`);
    if (detection.scripts.test) commands.push(`${detection.packageManager} test`);
    if (detection.scripts.typecheck) commands.push(`${detection.packageManager} run typecheck`);
    if (detection.scripts.e2e) commands.push(`${detection.packageManager} run test:e2e`);
  }
  commands.push("gsd verify --full");
  commands.push("gsd validate --ready");
  return [...new Set(commands)];
}

function buildReasoningQuestions({ risks, detection }) {
  const questions = [];

  if (risks.some((risk) => risk.includes("Acceptance criteria"))) {
    questions.push("What user-visible behavior proves this change is complete?");
  }
  if (risks.some((risk) => risk.includes("E2E"))) {
    questions.push("Does this change need browser or end-to-end coverage?");
  }
  if (detection.framework === "unknown") {
    questions.push("Which project conventions should guide implementation?");
  }
  if (questions.length === 0) questions.push("Are there edge cases or rollout constraints not captured in the spec?");
  return questions;
}

function buildReasoningMarkdown(reasoning, detection) {
  return [
    `# Reasoning: ${reasoning.activeChange.title}`,
    "",
    `Change: ${reasoning.activeChange.slug}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## What Matters",
    "",
    ...formatBulletList(reasoning.whatMatters, "No reasoning items."),
    "",
    "## Project Signals",
    "",
    `- Runtime: ${detection.runtime}`,
    `- Package manager: ${detection.packageManager}`,
    `- Framework: ${detection.framework}`,
    `- Test runner: ${detection.testRunner}`,
    `- E2E: ${detection.e2e}`,
    "",
    "## Likely Affected Areas",
    "",
    ...formatBulletList(reasoning.likelyAffectedAreas, "No affected areas inferred."),
    "",
    "## Risks",
    "",
    ...formatBulletList(reasoning.risks, "No deterministic risks detected."),
    "",
    "## Recommended Workflow",
    "",
    ...formatBulletList(reasoning.recommendedWorkflow, "No workflow recommended."),
    "",
    "## Required Verification",
    "",
    ...formatBulletList(reasoning.requiredVerification, "No verification commands detected."),
    "",
    "## Questions",
    "",
    ...formatBulletList(reasoning.questions, "No open questions detected."),
    "",
    "## Safety",
    "",
    "- Reasoning is local-only and deterministic.",
    "- No network calls are made.",
    "- No shell commands are executed.",
    "- No code edits or workflow mutations are performed.",
    "- File reads are bounded to small ShipSpec memory artifacts.",
    "",
  ].join("\n");
}

function buildOperationMarkdown({ activeChange, delivery, reasoning, loop, ui, operation }) {
  return [
    `# Operation: ${activeChange.title}`,
    "",
    "Mode: safe-control-loop",
    `Change: ${activeChange.slug}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Package",
    "",
    delivery
      ? `- ${delivery.message}`
      : "- Existing active change used; no new package was created.",
    "",
    "## Reasoning",
    "",
    `- ${reasoning.message}`,
    "",
    "## Loop",
    "",
    `- Result: ${loop.ok ? "ready" : "needs attention"}`,
    `- Learned: ${operation.learned ? "yes" : "no"}`,
    `- Report: .gsd/loops/${activeChange.slug}.md`,
    "",
    "## Dashboard",
    "",
    `- ${ui.message}`,
    "",
    "## Next Action",
    "",
    ...formatBulletList([operation.nextAction], "No next action needed."),
    "",
    "## Commands",
    "",
    ...formatBulletList(["gsd reason", "gsd loop", "gsd ui", "gsd report"], "No commands recorded."),
    "",
    "## Safety",
    "",
    "- No code edits were made.",
    "- No deployment was attempted.",
    "- No network calls were made by the operate command.",
    "- Human approval is required before implementation or release.",
    "",
  ].join("\n");
}

function buildPlanPromptMarkdown({ activeChange, contextFiles, decisions }) {
  return [
    "Use $shipspec.",
    "",
    `Active change: ${activeChange.title}`,
    `Slug: ${activeChange.slug}`,
    "",
    "You are in AI planning mode. Use ShipSpec as the source of truth and prepare a plan before coding.",
    "",
    "Read these ShipSpec files:",
    "",
    ...formatBulletList(contextFiles, "No ShipSpec context files found."),
    "",
    "Human Decisions:",
    "",
    ...formatBulletList(decisions, "No recorded human decisions yet."),
    "",
    "In AI planning mode:",
    "",
    "- Summarize the requested scope in plain language.",
    "- Identify likely affected files and project areas.",
    "- Propose implementation steps.",
    "- Propose focused tests and verification commands.",
    "- Call out risks, assumptions, and open questions.",
    "- Wait for approval before coding.",
    "",
    "Safety boundaries:",
    "",
    "- Do not deploy.",
    "- Do not access secrets.",
    "- Do not make unrelated refactors.",
    "- Do not edit generated ShipSpec evidence by hand.",
    "- Keep changes scoped to the active ShipSpec change.",
    "",
    "After implementation, verify with:",
    "",
    "- gsd verify --full",
    "- gsd validate --ready",
    "- gsd report",
    "",
  ].join("\n");
}

function buildContextPackMarkdown({
  activeChange,
  specStatus,
  validation,
  readyValidation,
  diff,
  changedFiles,
  evidenceSummary,
  decisions,
  next,
  risk,
}) {
  const proposalPath = `openspec/changes/${activeChange.slug}/proposal.md`;
  const tasksPath = `openspec/changes/${activeChange.slug}/tasks.md`;
  const evidencePath = `.agent/evidence/${activeChange.slug}.md`;
  const reportPath = `.gsd/reports/${activeChange.slug}.md`;

  return [
    "# ShipSpec Context Pack",
    "",
    "Use this as a compact, agent-neutral handoff for implementation, review, or follow-up planning.",
    "",
    "## Active Change",
    "",
    `- Title: ${activeChange.title}`,
    `- Slug: ${activeChange.slug}`,
    `- Branch: ${diff.branch}`,
    "",
    "## Spec Files",
    "",
    `- Proposal: ${proposalPath}`,
    `- Tasks: ${tasksPath}`,
    `- Acceptance criteria: ${specStatus.acceptanceCriteria ? "present" : "missing"}`,
    `- Verification plan: ${specStatus.verificationPlan ? "present" : "missing"}`,
    "",
    "## Validation",
    "",
    `- Spec validation: ${validation.ok ? "pass" : "fail"}`,
    `- Ready validation: ${readyValidation.ok ? "pass" : "fail"}`,
    ...formatContextPackValidationErrors(validation.errors, readyValidation.errors),
    "",
    "## Changed Files",
    "",
    ...formatChangedFiles(changedFiles),
    "",
    "## Evidence Summary",
    "",
    specStatus.evidence ? `- Evidence file: ${evidencePath}` : "- Evidence file: missing",
    ...formatBulletList(evidenceSummary, "No verification evidence summary available."),
    "",
    "## Risk",
    "",
    `- Level: ${risk.level}`,
    ...risk.reasons.map((reason) => `- ${reason}`),
    "",
    "## Human Decisions",
    "",
    ...formatBulletList(decisions, "No recorded human decisions."),
    "",
    "## Next Action",
    "",
    `- Command: ${next.command}`,
    `- Reason: ${next.reason}`,
    ...next.otherCommands.map((command) => `- Also useful: ${command}`),
    "",
    "## Review Report",
    "",
    `- ${reportPath}`,
    "",
    "## AI Instructions",
    "",
    "- Read the spec files before proposing changes.",
    "- Use the changed files and evidence summary to focus review.",
    "- Call out missing verification, skipped checks, and risky affected areas.",
    "- Keep implementation scoped to the active change.",
    "- Do not deploy or access secrets from this pack.",
    "",
  ].join("\n");
}

function formatContextPackValidationErrors(...errorLists) {
  const errors = errorLists.flat().filter(Boolean);
  if (errors.length === 0) return [];
  return ["- Validation gaps:", ...errors.map((error) => `  - ${error}`)];
}

function buildReviewMarkdown({ activeChange, decisions, changedFiles, evidenceSummary }) {
  return [
    `# Review: ${activeChange.title}`,
    "",
    `Change: ${activeChange.slug}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Human Decisions To Verify",
    "",
    ...formatBulletList(decisions, "No recorded human decisions."),
    "",
    "## Changed Files",
    "",
    ...formatChangedFiles(changedFiles),
    "",
    "## Verification Evidence",
    "",
    ...formatBulletList(evidenceSummary, "No verification evidence found. Run `gsd verify --full`."),
    "",
    "## Reviewer Checklist",
    "",
    "- [ ] Confirm implementation follows each recorded human decision.",
    "- [ ] Confirm changed files match the active ShipSpec scope.",
    "- [ ] Confirm tests cover approved behavior and edge cases.",
    "- [ ] Confirm `gsd verify --full` passed.",
    "- [ ] Confirm `gsd validate --ready` passed before release.",
    "",
    "## Safety",
    "",
    "- Review is generated from local ShipSpec state only.",
    "- Human reviewer owns final judgment.",
    "- No code edits, network calls, or deployments are performed.",
    "",
  ].join("\n");
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
  const readiness = [
    ["Spec", model.specStatus.proposal && model.specStatus.tasks, "PASS", "WAIT"],
    ["Reasoning", model.reasoning?.present, "PASS", "WAIT"],
    ["Operation", model.operation?.present, "PASS", "WAIT"],
    ["Decisions", model.decisions?.length > 0, `${model.decisions?.length ?? 0}`, "0"],
    ["Prompt", model.promptExists, "PASS", "WAIT"],
    ["Evidence", model.specStatus.evidence, "PASS", "WAIT"],
    ["Review", model.review?.present, "PASS", "WAIT"],
    ["Report", model.reportExists, "PASS", "WAIT"],
  ];
  const nextActions = model.loop?.nextActions?.length ? model.loop.nextActions : [model.next?.reason ?? "Run gsd next for guidance."];
  const reasoningItems = [
    `Reasoning: ${model.reasoning?.present ? "present" : "missing"}`,
    ...(model.reasoning?.risks?.length ? model.reasoning.risks : ["Risks: none recorded."]),
    ...(model.reasoning?.recommendedWorkflow?.length ? model.reasoning.recommendedWorkflow : ["Run gsd reason to generate adaptive workflow."]),
    ...(model.reasoning?.requiredVerification?.length ? model.reasoning.requiredVerification : []),
  ];
  const operatorItems = [
    `Operation: ${model.operation?.present ? "present" : "missing"}`,
    `Mode: ${model.operation?.mode ?? "missing"}`,
    ...(model.operation?.safety?.length ? model.operation.safety : ["No operation safety notes recorded."]),
  ];
  const reviewItems = [
    `Review: ${model.review?.present ? "present" : "missing"}`,
    `Checklist: ${model.review?.checklist?.length ? "ready" : "missing"}`,
    ...(model.review?.evidence?.length ? model.review.evidence : ["No review evidence summary recorded."]),
  ];
  const commandButtons = [
    model.next?.command ?? "gsd next",
    "gsd validate",
    "gsd verify --full",
    "gsd report",
    "gsd next",
  ].filter((command, index, commands) => commands.indexOf(command) === index);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ShipSpec Cockpit</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600;700&display=swap');
    :root {
      --bg: #10131d;
      --panel: #181e2f;
      --panel-2: #202844;
      --panel-3: #11182a;
      --grid: rgba(255,255,255,.055);
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
    .shell { max-width: 1320px; margin: 0 auto; padding: 24px; }
    header { display: flex; justify-content: space-between; gap: 18px; align-items: start; margin-bottom: 16px; }
    h1, h2, h3, p { margin: 0; }
    h1 { font-size: clamp(32px, 5vw, 58px); line-height: .95; color: var(--green); text-shadow: 4px 4px 0 #000; }
    h2 { font-size: 20px; margin-bottom: 12px; color: var(--blue); }
    h3 { font-size: 16px; margin: 14px 0 8px; color: var(--yellow); }
    .slug { color: var(--muted); margin-top: 8px; font-size: 18px; overflow-wrap: anywhere; }
    .top-meta { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
    .panel {
      background: var(--panel);
      border: 3px solid var(--line);
      box-shadow: 8px 8px 0 #05060b;
      padding: 16px;
    }
    .action {
      background: var(--panel-2);
      border: 3px solid var(--blue);
      box-shadow: 8px 8px 0 #05060b;
      padding: 18px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(220px, .8fr);
      gap: 16px;
      align-items: center;
    }
    .action-label { color: var(--blue); font-size: 17px; margin-bottom: 6px; }
    .action-command { color: var(--yellow); font-size: clamp(24px, 4vw, 42px); line-height: 1; overflow-wrap: anywhere; }
    .reason { color: var(--muted); font-size: 18px; line-height: 1.25; }
    .command-actions { display: grid; gap: 8px; }
    .command-note { color: var(--muted); font-size: 15px; line-height: 1.2; }
    .command-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    button.command-button {
      width: 100%;
      min-height: 44px;
      cursor: pointer;
      font: inherit;
      color: var(--yellow);
      background: var(--panel-3);
      border: 2px solid var(--line);
      box-shadow: 4px 4px 0 #05060b;
      padding: 8px;
      text-align: left;
      overflow-wrap: anywhere;
    }
    button.command-button:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; }
    button.command-button:hover { border-color: var(--yellow); }
    .copy-status { min-height: 18px; color: var(--green); font-size: 14px; }
    .readiness {
      display: grid;
      grid-template-columns: repeat(8, minmax(92px, 1fr));
      gap: 8px;
      margin-bottom: 16px;
    }
    .ready-chip {
      min-height: 62px;
      background: var(--panel);
      border: 2px solid var(--line);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      text-align: center;
    }
    .ready-chip strong { color: var(--muted); font-size: 13px; }
    .chip { display: inline-block; padding: 4px 7px; border: 2px solid currentColor; font-size: 13px; }
    .pass { color: var(--green); }
    .warn { color: var(--yellow); }
    .fail { color: var(--red); }
    .cockpit {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      align-items: start;
    }
    .section { display: grid; gap: 10px; }
    .rows, .messages { display: grid; gap: 8px; }
    .row {
      background: var(--panel-3);
      border: 2px solid var(--line);
      padding: 9px 10px;
      color: var(--text);
      overflow-wrap: anywhere;
      line-height: 1.2;
    }
    .cmd { color: var(--yellow); background: var(--panel-3); border: 2px solid var(--line); padding: 9px 10px; overflow-wrap: anywhere; }
    .messages .row b { color: var(--green); }
    .pipeline { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .stage { background: var(--panel-3); border: 2px solid var(--line); padding: 9px; min-height: 64px; display: grid; align-content: center; gap: 6px; text-align: center; }
    .stage strong { font-size: 14px; }
    .footer { margin-top: 16px; color: var(--muted); font-size: 15px; }
    @media (max-width: 980px) {
      header, .action, .cockpit { grid-template-columns: 1fr; display: grid; }
      .top-meta { justify-content: flex-start; }
      .readiness { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .pipeline { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .shell { padding: 16px; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>ShipSpec Cockpit</h1>
        <p class="slug">${escapeHtml(changeTitle)} / ${escapeHtml(changeSlug)}</p>
      </div>
      <div class="top-meta">
        <span class="chip ${model.validation.ok ? "pass" : "warn"}">Spec ${model.validation.ok ? "PASS" : "WAIT"}</span>
        <span class="chip ${model.readyValidation.ok ? "pass" : "warn"}">Ready ${model.readyValidation.ok ? "PASS" : "WAIT"}</span>
        <span class="chip">Branch ${escapeHtml(model.diff.branch)}</span>
      </div>
    </header>

    <section class="action">
      <div>
        <div class="action-label">Next Command</div>
        <div class="action-command">${escapeHtml(model.next?.command ?? "gsd next")}</div>
      </div>
      <div class="command-actions">
        <div class="reason">Reason: ${escapeHtml(model.next?.reason ?? "Run gsd next for guidance.")}</div>
        <div class="command-note">Copy command, then run it in your terminal.</div>
        <div class="command-grid">
          ${commandButtons.map((command) => `<button class="command-button" type="button" data-command="${escapeHtml(command)}" title="Copy command">${escapeHtml(command)}</button>`).join("")}
        </div>
        <div class="copy-status" role="status" aria-live="polite"></div>
      </div>
    </section>

    <section aria-label="Readiness" class="readiness">
      ${readiness.map(([name, ok, passText, waitText]) => `<div class="ready-chip"><strong>${escapeHtml(name)}</strong><span class="chip ${ok ? "pass" : "warn"}">${escapeHtml(ok ? passText : waitText)}</span></div>`).join("")}
    </section>

    <section class="cockpit">
      <div class="panel section">
        <h2>Workflow</h2>
        <div class="rows">
          <div class="row">Active change: ${escapeHtml(changeSlug)}</div>
          <div class="row">Evidence: ${model.specStatus.evidence ? "present" : "missing"}</div>
          <div class="row">Report: ${model.reportExists ? "present" : "missing"}</div>
          <div class="row">Release: ${model.releaseExists ? "present" : "missing"}</div>
        </div>

        <h3>Pipeline</h3>
        <div class="pipeline">
          ${stages.map(([name, ok]) => `<div class="stage"><strong>${escapeHtml(name)}</strong><span class="chip ${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span></div>`).join("")}
        </div>

        <h3>Self-Improving Loop</h3>
        <div class="rows">
          <div class="row">Loop: ${model.loop?.loop ? "present" : "missing"}</div>
          <div class="row">Reflection: ${model.loop?.reflection ? "present" : "missing"}</div>
          <div class="row">Learn: ${model.loop?.learned ? "learned" : "skipped"}</div>
        </div>

        <h3>Next Actions</h3>
        <div class="rows">
          ${nextActions.map((action) => `<div class="row">${escapeHtml(action)}</div>`).join("")}
        </div>

        <h3>ShipSpec Audit</h3>
        <div class="rows">
          ${model.audit.checks.map((check) => `<div class="row">${check.ok ? "PASS" : "WAIT"} ${escapeHtml(check.name)}</div>`).join("")}
        </div>
      </div>

      <div class="panel section">
        <h2>Human + AI Context</h2>
        <h3>Human Decisions</h3>
        <div class="rows">
          ${(model.decisions?.length ? model.decisions : ["No recorded human decisions."]).map((decision) => `<div class="row">${escapeHtml(decision)}</div>`).join("")}
        </div>

        <h3>Adaptive Reasoning</h3>
        <div class="rows">
          ${reasoningItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
        </div>

        <h3>Operator</h3>
        <div class="rows">
          ${operatorItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
        </div>
      </div>

      <div class="panel section">
        <h2>Ship Evidence</h2>
        <h3>Review</h3>
        <div class="rows">
          ${reviewItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
        </div>

        <h3>${changedFilesTitle}</h3>
        <div class="rows">
          ${(changedFiles.length ? changedFiles : [changedFilesEmptyText]).map((file) => `<div class="row">${escapeHtml(file)}</div>`).join("")}
        </div>

        <h3>Agent Inbox</h3>
        <div class="messages">
          ${(model.messages.length ? model.messages.slice(0, 6) : [{ role: "system", text: "No agent messages yet." }]).map((message) => `<div class="row"><b>${escapeHtml(message.role)}</b>: ${escapeHtml(message.text)}</div>`).join("")}
        </div>

        <h3>ShipSpec Files</h3>
        <div class="rows">
          <div class="row">Contract: ${model.audit.checks.find((check) => check.name === "Contract")?.ok ? "present" : "missing"}</div>
          <div class="row">Agent room: ${model.audit.checks.find((check) => check.name === "Agent room")?.ok ? "present" : "missing"}</div>
        </div>
      </div>
    </section>

    <p class="footer">Generated by ShipSpec. Static single-page dashboard. Refresh with <span class="cmd">gsd ui</span>.</p>
  </main>
  <script>
    const commandButtons = [...document.querySelectorAll("[data-command]")];
    const copyStatus = document.querySelector(".copy-status");

    async function copyCommand(command) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(command);
        return;
      }

      const field = document.createElement("textarea");
      field.value = command;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    commandButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const command = button.dataset.command;
        try {
          await copyCommand(command);
          copyStatus.textContent = \`Copied: \${command}\`;
        } catch {
          copyStatus.textContent = "Copy failed. Select the command text instead.";
        }
      });
    });
  </script>
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

function beginnerUsage() {
  return [
    "ShipSpec",
    "",
    "Main:",
    "  gsd",
    "  gsd run <request>",
    "  gsd codex",
    '  gsd "Feature request"',
    "  gsd fix <small fix>",
    "  gsd ship",
    "  gsd share",
    "  gsd ask",
    "  gsd ui",
    "",
    "Common:",
    "  gsd next",
    "  gsd verify --full",
    "  gsd report",
    "",
    "More:",
    "  gsd help advanced",
    "",
  ].join("\n");
}

function usage() {
  return [
    "Usage: gsd <command>",
    "",
    "Daily path:",
    "  init",
    "  run [request]",
    '  "feature request"',
    "  quickstart [--light] <feature>",
    "  configure",
    "  start <change title>",
    "  next [--json]",
    "  ui",
    "",
    "Verification:",
    "  spec",
    "  validate [--ready]",
    "  verify [--full]",
    "  diff",
    "",
    "AI workflow:",
    "  codex",
    "  deliver <request>",
    "  intake <request>",
    "  contract",
    "  room",
    "  reason [--json]",
    "  operate [--dry-run] [--json] <request>",
    "  decision <human decision>",
    "  prompt [--json]",
    "  pack [--json]",
    "  share",
    "  review [--json]",
    "",
    "Self-improvement:",
    "  reflect",
    "  learn",
    "  loop",
    "  memory [--json]",
    "",
    "Handoff:",
    "  ship",
    "  report",
    "  release",
    "  done",
    "",
    "Project tools:",
    "  status",
    "  doctor",
    "  detect",
    "  ci",
    "  agents",
    "  message <role> <message>",
    "  inbox",
    "  examples",
    "  self-test",
    "  adapters",
    "  skill <path|install>",
    "  audit",
    "  desktop",
    "  clean [--apply]",
    "",
  ].join("\n");
}
