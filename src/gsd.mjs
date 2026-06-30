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
  const workflowChecks = Array.isArray(workflow?.checks) ? workflow.checks : [];
  const checks = [
    buildDoctorCheck({
      name: "ShipSpec workspace",
      ok: await exists(join(root, ".gsd", "workflow.json")),
      detail: ".gsd/workflow.json",
      action: "Run `gsd init`.",
      command: "gsd init",
      fail: true,
    }),
    buildDoctorCheck({
      name: "OpenSpec folders",
      ok: (await exists(join(root, "openspec", "changes"))) && (await exists(join(root, "openspec", "specs"))),
      detail: "openspec/changes and openspec/specs",
      action: "Run `gsd init` to create spec folders.",
      command: "gsd init",
      fail: true,
    }),
    buildDoctorCheck({
      name: "Git repository",
      ok: await isGitRepository(root),
      detail: "git rev-parse --is-inside-work-tree",
      action: "Initialize git or run ShipSpec inside a repository.",
      command: "git init",
    }),
    buildDoctorCheck({
      name: "Package manifest",
      ok: Boolean(packageJson),
      detail: "package.json",
      action: "Create package.json or run inside your project root.",
    }),
    buildDoctorCheck({
      name: "Test script",
      ok: Boolean(packageJson?.scripts?.test),
      detail: "package.json scripts.test",
      action: "Run `gsd configure` after adding scripts.",
    }),
    buildDoctorCheck({
      name: "E2E script",
      ok: hasE2eScript(packageJson),
      detail: "package.json script containing e2e",
      action: "Add an E2E script when user flows need browser coverage.",
    }),
    buildDoctorCheck({
      name: "Workflow checks",
      ok: workflowChecks.length > 0,
      detail: ".gsd/workflow.json checks",
      action: "Run `gsd configure` after adding scripts.",
      command: "gsd configure",
    }),
    buildDoctorCheck({
      name: "ShipSpec skill",
      ok: await exists(getShipSpecSkillPath()),
      detail: getShipSpecSkillPath(),
      action: "Reinstall the package or run from a complete ShipSpec checkout.",
      fail: true,
    }),
  ];
  const nextFixes = checks.filter((check) => check.severity !== "pass").map((check) => check.action).filter(Boolean);

  return {
    ok: !checks.some((check) => check.severity === "fail"),
    checks,
    nextFixes: [...new Set(nextFixes)],
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
      reason: "Mission Control dashboard is missing.",
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
  const reviewRelativePath = `.gsd/reviews/${activeChange.slug}.md`;
  const hasEvidence = await exists(join(root, evidenceRelativePath));
  const hasReview = await exists(join(root, reviewRelativePath));
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
      "## Auto Review",
      "",
      hasReview ? `- Review: ${reviewRelativePath}` : "- Review: missing. Run `gsd review` before review.",
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
  const riskReview = buildPreShipRiskReview({ changedFiles, evidenceSummary, decisions });
  const reviewPath = join(root, ".gsd", "reviews", `${activeChange.slug}.md`);

  await mkdir(join(root, ".gsd", "reviews"), { recursive: true });
  await writeFile(reviewPath, buildReviewMarkdown({ activeChange, decisions, changedFiles, evidenceSummary, riskReview }));

  return {
    ok: true,
    activeChange,
    decisions,
    changedFiles,
    evidenceSummary,
    riskReview,
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
  const likelyFiles = await inferLikelyFiles(root, activeChange, { diff, changedFiles });
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
    likelyFiles,
  });

  await mkdir(join(root, ".gsd", "packs"), { recursive: true });
  await writeFile(packPath, pack);

  return {
    ok: true,
    activeChange,
    pack,
    packPath,
    likelyFiles,
    message: `Context pack written to .gsd/packs/${activeChange.slug}.md`,
  };
}

export async function generateAgenticContext(root) {
  await initWorkspace(root);
  const activeChange = await requireActiveChange(root);
  const ragReportPath = join(root, ".gsd", "rag", `${activeChange.slug}.md`);
  const ragReportExists = await exists(ragReportPath);
  const specStatus = await getSpecStatus(root);
  const validation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  const diff = await getDiffSummary(root);
  const evidenceSummary = await readEvidenceSummary(root, activeChange.slug);
  const next = await getNextRecommendation(root);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])];
  const memory = await getMemorySummary(root);
  const risk = buildRiskSummary({ specStatus, readyValidation, changedFiles, evidenceSummary, next });
  const likelyFiles = await inferLikelyFiles(root, activeChange, { diff, changedFiles, memory });
  const sources = await buildAgenticContextSources(root, activeChange, likelyFiles, changedFiles, memory);
  const quality = buildContextQuality({ sources, validation, readyValidation, memory, evidenceSummary, risk, next });
  const connectorSignals = buildConnectorSignals({ sources, memory, evidenceSummary });
  const retrievalLoop = buildRetrievalLoop({ activeChange, sources, quality });
  const learningSignals = buildLearningRetrievalSignals(memory);
  const contextPath = join(root, ".gsd", "context", `${activeChange.slug}.md`);
  const context = buildAgenticContextMarkdown({
    activeChange,
    validation,
    readyValidation,
    diff,
    sources,
    memory,
    risk,
    next,
    evidenceSummary,
    quality,
    connectorSignals,
    retrievalLoop,
    learningSignals,
    ragReportPath: ragReportExists ? `.gsd/rag/${activeChange.slug}.md` : null,
  });

  await mkdir(join(root, ".gsd", "context"), { recursive: true });
  await writeFile(contextPath, context);

  return {
    ok: true,
    activeChange,
    context,
    contextPath,
    sources,
    quality,
    connectorSignals,
    retrievalLoop,
    learningSignals,
    ragReportPath: ragReportExists ? ragReportPath : null,
    risk,
    message: `Agentic context written to .gsd/context/${activeChange.slug}.md`,
  };
}

export async function generateLocalRag(root, query, options = {}) {
  await initWorkspace(root);
  const activeChange = await requireActiveChange(root);
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return {
      ok: false,
      message: "Usage: gsd rag <query>",
    };
  }

  const diff = await getDiffSummary(root);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])];
  const memory = await getMemorySummary(root);
  const index = await buildLocalRagIndex(root, activeChange);
  const citations = await rankLocalRagDocuments(root, {
    activeChange,
    query: normalizedQuery,
    documents: index.documents,
    changedFiles,
    memory,
  });
  const quality = buildLocalRagQuality({ citations, memory });
  const refinementSteps = buildLocalRagRefinementSteps({ citations, quality });
  const reportPath = join(root, ".gsd", "rag", `${activeChange.slug}.md`);
  const indexPath = join(root, ".gsd", "rag", "index.json");
  const report = buildLocalRagMarkdown({
    activeChange,
    query: normalizedQuery,
    citations,
    quality,
    refinementSteps,
    memory,
    exclusions: index.exclusions,
  });

  await mkdir(join(root, ".gsd", "rag"), { recursive: true });
  await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  await writeFile(reportPath, report);

  return {
    ok: true,
    activeChange,
    query: normalizedQuery,
    report,
    reportPath,
    indexPath,
    citations,
    quality,
    refinementSteps,
    exclusions: index.exclusions,
    message: `Full Agentic RAG report written to .gsd/rag/${activeChange.slug}.md`,
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

async function buildDashboardModel(root) {
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
  const memory = await getMemorySummary(root);
  const next = await getNextRecommendation(root);
  const likelyFiles = activeChange ? await inferLikelyFiles(root, activeChange, { diff }) : [];

  return {
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
    memory,
    next,
    likelyFiles,
  };
}

export async function generateUiDashboard(root) {
  const model = await buildDashboardModel(root);
  const uiPath = join(root, ".gsd", "ui", "index.html");

  await mkdir(join(root, ".gsd", "ui"), { recursive: true });
  await writeFile(uiPath, buildUiHtml(model));

  return {
    ok: true,
    message: "ShipSpec Mission Control written to .gsd/ui/index.html",
    uiPath,
  };
}

export async function generateAppDashboard(root) {
  const model = await buildDashboardModel(root);
  const appPath = join(root, ".gsd", "app", "index.html");

  await mkdir(join(root, ".gsd", "app"), { recursive: true });
  await writeFile(appPath, buildAppHtml(model));

  return {
    ok: true,
    message: "ShipSpec App written to .gsd/app/index.html",
    appPath,
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
      "Mission Control: .gsd/ui/index.html",
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
  const structuredMemoryPath = join(root, ".gsd", "memory", `${activeChange.slug}.json`);
  const patternsPath = join(root, ".gsd", "patterns", "project.md");
  const memoryPath = join(root, ".agent", "memory.md");
  const structuredMemory = await buildStructuredMemory(root, activeChange, reflection);
  const patternSection = [
    `## Learned from ${activeChange.title}`,
    "",
    `- Change: ${activeChange.slug}`,
    `- Readiness: ${reflection.ok ? "ready" : "needs attention"}`,
    `- Primary next action: ${reflection.nextActions[0] ?? "Continue normal review."}`,
    `- Common files: ${structuredMemory.changedFiles.slice(0, 5).join(", ") || "No changed files recorded."}`,
    `- Checks: ${structuredMemory.checks.map((check) => check.name).join(", ") || "No checks recorded."}`,
    `- Ship pattern: ${structuredMemory.shipPattern}`,
    "- Human approval required before changing workflow rules.",
    "",
  ].join("\n");
  const memorySection = [
    "## ShipSpec Lessons",
    "",
    `- ${activeChange.slug}: ${reflection.nextActions[0] ?? "No next action recorded."}`,
    `- ${activeChange.slug} files: ${structuredMemory.changedFiles.slice(0, 5).join(", ") || "No changed files recorded."}`,
    `- ${activeChange.slug} checks: ${structuredMemory.checks.map((check) => check.name).join(", ") || "No checks recorded."}`,
    "",
  ].join("\n");

  await mkdir(join(root, ".gsd", "lessons"), { recursive: true });
  await mkdir(join(root, ".gsd", "memory"), { recursive: true });
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
  await writeFile(structuredMemoryPath, `${JSON.stringify(structuredMemory, null, 2)}\n`);
  await appendUniqueSection(patternsPath, "# Project Patterns\n\n", `Learned from ${activeChange.title}`, patternSection);
  await appendUniqueSection(memoryPath, "# Project Memory\n\n", activeChange.slug, memorySection);

  return {
    ok: true,
    message: `Lesson written to .gsd/lessons/${activeChange.slug}.md`,
    lessonPath,
    structuredMemoryPath,
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
  const context = specValidation.ok ? await generateAgenticContext(root) : null;
  const report = readyValidation?.ok ? await generateReport(root) : null;
  if (report?.ok) pack = await generateContextPack(root);
  const reflection = !title && readyValidation && !readyValidation.ok ? await generateReflection(root) : null;
  const ui = await generateUiDashboard(root);
  const baseNext = await getNextRecommendation(root);
  const risk = await getRiskSummary(root, baseNext);
  const likelyFiles = await inferLikelyFiles(root, activeChange);
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
    likelyFiles,
    artifacts: {
      mission: `.gsd/missions/${activeChange.slug}.md`,
      missionJson: `.gsd/missions/${activeChange.slug}.json`,
      reasoning: reasoning ? `.gsd/reasoning/${activeChange.slug}.md` : null,
      prompt: prompt ? `.gsd/prompts/${activeChange.slug}.md` : null,
      pack: pack ? `.gsd/packs/${activeChange.slug}.md` : null,
      context: context ? `.gsd/context/${activeChange.slug}.md` : null,
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
    context,
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
  const context = await generateAgenticContext(root);
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
  await writeFile(operationPath, buildOperationMarkdown({ activeChange, delivery, reasoning, context, loop, ui, operation }));

  return {
    ok: loop.ok,
    activeChange,
    delivery,
    reasoning,
    context,
    loop,
    ui,
    operation,
    message: loop.ok
      ? `Operation completed and learned from .gsd/operations/${activeChange.slug}.md`
      : `Operation stopped with next action in .gsd/operations/${activeChange.slug}.md`,
  };
}

export async function runAutopilot(root) {
  await initWorkspace(root);
  const status = await getStatus(root);
  const doctor = await doctorWorkspace(root);
  const memory = await getMemorySummary(root);
  const health = summarizeDoctorForAutopilot(doctor);
  const memorySignal = buildAutopilotMemorySignal(memory);

  if (!status.activeChange) {
    return {
      ok: false,
      status: "no-mission",
      command: 'gsd run "Feature"',
      reason: "No active ShipSpec mission exists.",
      changedFiles: [],
      health,
      memorySignal,
      ui: null,
      reportPath: null,
      message: formatAutopilotResult({
        status: "no-mission",
        command: 'gsd run "Feature"',
        reason: "No active ShipSpec mission exists.",
        changedFiles: [],
        health,
        memorySignal,
      }),
    };
  }

  const activeChange = status.activeChange;
  const diff = await getDiffSummary(root);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles])].filter(isAutopilotImplementationFile);
  const evidenceExists = await exists(join(root, ".agent", "evidence", `${activeChange.slug}.md`));
  const reportExists = await exists(join(root, ".gsd", "reports", `${activeChange.slug}.md`));
  const specValidation = await validateChange(root, { ready: false });
  const readyValidation = await validateChange(root, { ready: true });
  let autopilotStatus = "implementation-needed";
  let command = "gsd codex";
  let reason = "Mission is prepared; hand it to AI for implementation.";

  if (!specValidation.ok) {
    autopilotStatus = "spec-needed";
    command = "gsd validate";
    reason = specValidation.errors[0] ?? "Spec needs attention.";
  } else if (changedFiles.length > 0 && !evidenceExists) {
    autopilotStatus = "verification-needed";
    command = "gsd ship";
    reason = "Project files changed and verification evidence is missing.";
  } else if (evidenceExists && reportExists && readyValidation.ok) {
    autopilotStatus = "review-ready";
    command = `open .gsd/reports/${activeChange.slug}.md`;
    reason = "Verification evidence and review report are ready.";
  } else if (evidenceExists && !reportExists) {
    autopilotStatus = "report-needed";
    command = "gsd ship";
    reason = "Verification evidence exists; run ship to refresh review and report artifacts.";
  }

  const ui = await generateUiDashboard(root);
  const reportPath = join(root, ".gsd", "autopilot", `${activeChange.slug}.md`);
  const result = {
    ok: true,
    activeChange,
    status: autopilotStatus,
    command,
    reason,
    changedFiles,
    health,
    memorySignal,
    ui,
    reportPath,
  };

  await mkdir(join(root, ".gsd", "autopilot"), { recursive: true });
  await writeFile(reportPath, buildAutopilotMarkdown(result));

  return {
    ...result,
    message: formatAutopilotResult(result),
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
  const memory = await getMemorySummary(root);

  if (!(await exists(join(root, ".gsd", "prompts", `${slug}.md`)))) {
    await generatePlanPrompt(root);
  }
  if (!(await exists(join(root, ".gsd", "packs", `${slug}.md`)))) {
    await generateContextPack(root);
  }
  if (!(await exists(join(root, ".gsd", "context", `${slug}.md`)))) {
    await generateAgenticContext(root);
  }

  const candidateFiles = [
    ".gsd/current.json",
    `.gsd/missions/${slug}.md`,
    `.gsd/prompts/${slug}.md`,
    `.gsd/packs/${slug}.md`,
    `.gsd/context/${slug}.md`,
    `openspec/changes/${slug}/proposal.md`,
    `openspec/changes/${slug}/tasks.md`,
  ];
  const files = [];

  for (const relativePath of candidateFiles) {
    if (await exists(join(root, relativePath))) files.push(relativePath);
  }

  const likelyFiles = await inferLikelyFiles(root, activeChange);
  const handoff = buildCodexHandoffMarkdown({ activeChange, files, memory, likelyFiles });

  return {
    ok: true,
    activeChange,
    files,
    likelyFiles,
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
  const structured = await readStructuredMemoryArtifacts(root);
  const smartMemory = summarizeStructuredMemory(structured);

  return {
    projectMemory,
    projectPatterns,
    structured,
    smartMemory,
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

  const review = await generateReview(root);
  const report = await generateReport(root);
  return {
    ok: report.ok,
    message: [
      "Ship flow ready",
      formatCheckResults(verification.checks),
      "Spec validation passed",
      "Auto review:",
      `- Review: .gsd/reviews/${review.activeChange.slug}.md`,
      `Pre-ship review: ${review.riskReview.summary}`,
      report.message,
    ].join("\n"),
    verification,
    ready,
    review,
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
      const result = await runAutopilot(cwd);
      const startHint = result.status === "no-mission" ? '\nTry: gsd "Feature"\n' : "\n";
      return cliResult(0, `${result.message}${startHint}`);
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
      const open = rest.includes("--open");
      const request = rest.filter((part) => part !== "--open").join(" ");
      const result = await runMission(cwd, request);
      if (result.ok && open) await openUiDashboard(cwd, options);
      const openMessage = result.ok && open ? "\nOpened: .gsd/ui/index.html" : "";
      return cliResult(result.ok ? 0 : 1, `${result.message}${openMessage}\n`);
    }

    if (command === "autopilot") {
      const result = await runAutopilot(cwd);
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

    if (command === "context") {
      const result = await generateAgenticContext(cwd);
      if (rest.includes("--json")) return cliResult(0, `${JSON.stringify(result, null, 2)}\n`);
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    if (command === "rag") {
      const json = rest.includes("--json");
      const query = rest.filter((part) => part !== "--json").join(" ");
      const result = await generateLocalRag(cwd, query);
      if (json) return cliResult(result.ok ? 0 : 1, `${JSON.stringify(result, null, 2)}\n`);
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
      return cliResult(result.ok ? 0 : 1, `${formatDoctor(result)}\n`);
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
      const open = rest.includes("--open");
      const result = await generateUiDashboard(cwd);
      if (result.ok && open) await openUiDashboard(cwd, options);
      return cliResult(result.ok ? 0 : 1, `${formatUiResult(result, { opened: result.ok && open })}\n`);
    }

    if (command === "app") {
      const open = rest.includes("--open");
      const result = await generateAppDashboard(cwd);
      if (result.ok && open) await openAppDashboard(cwd, options);
      return cliResult(result.ok ? 0 : 1, `${formatAppResult(result, { opened: result.ok && open })}\n`);
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
      const result = await runMission(cwd, [command, ...rest].join(" "));
      return cliResult(result.ok ? 0 : 1, `${result.message}\n`);
    }

    return cliResult(1, usage());
  } catch (error) {
    if (isPlainTextIntent(command, rest)) {
      const result = await runMission(cwd, [command, ...rest].join(" "));
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
    "- gsd context            Create an Agentic Context Pack",
    "- gsd ui                 Refresh the Mission Control dashboard",
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

function buildMissionState({ activeChange, phase, request, risk, next, specValidation, readyValidation, likelyFiles, artifacts }) {
  return {
    title: activeChange.title,
    slug: activeChange.slug,
    request,
    phase,
    risk,
    likelyFiles,
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
    "## Likely Files",
    "",
    ...formatBulletList(mission.likelyFiles, "No likely files inferred."),
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
  if (mission.phase === "planning-ready") {
    return [
      `Mission ready: ${mission.slug}`,
      "Next: gsd codex",
      "UI: gsd ui --open",
      "Codex: gsd codex",
      "Context: gsd context",
      `Risk: ${mission.risk.level}`,
      "Likely files:",
      ...formatBulletList(mission.likelyFiles?.slice(0, 5) ?? [], "No likely files inferred yet."),
      `Mission file: ${mission.artifacts.mission}`,
      mission.artifacts.prompt ? `Prompt: ${mission.artifacts.prompt}` : null,
      mission.artifacts.pack ? `Pack: ${mission.artifacts.pack}` : null,
      mission.artifacts.context ? `Context: ${mission.artifacts.context}` : null,
    ].filter(Boolean).join("\n");
  }

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
  if (mission.artifacts.context) lines.push(`Context: ${mission.artifacts.context}`);
  if (mission.artifacts.report) lines.push(`Report: ${mission.artifacts.report}`);
  if (mission.artifacts.ui) lines.push(`UI: ${mission.artifacts.ui}`);
  if (mission.artifacts.ui) lines.push("Open dashboard: gsd ui --open");
  lines.push("Codex: gsd codex");

  return lines.join("\n");
}

function formatAutopilotResult(result) {
  const statusLabel = result.status.replace(/-/g, " ");
  const lines = [
    `Autopilot status: ${statusLabel}`,
    `Next: ${result.command}`,
    `Why: ${result.reason}`,
  ];

  if (result.health?.status !== "ready") lines.push(`Health: ${result.health.label}`);
  if (result.memorySignal) lines.push(`Memory: ${result.memorySignal}`);
  if (result.status === "implementation-needed") lines.push("After implementation: gsd autopilot");
  if (result.status === "verification-needed") lines.push("After verification: gsd autopilot");
  if (result.changedFiles?.length) {
    lines.push("Changed files:", ...result.changedFiles.slice(0, 8).map((file) => `- ${file}`));
  }
  if (result.status !== "no-mission") lines.push("UI: gsd ui --open");

  return lines.join("\n");
}

function buildAutopilotMarkdown(result) {
  return [
    `# Autopilot: ${result.activeChange.title}`,
    "",
    `Status: ${result.status}`,
    `Next: ${result.command}`,
    `Reason: ${result.reason}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Changed Files",
    "",
    ...formatChangedFiles(result.changedFiles),
    "",
    "## Health",
    "",
    result.health ? `- ${result.health.label}` : "- No health summary recorded.",
    "",
    "## Memory Signals",
    "",
    result.memorySignal ? `- ${result.memorySignal}` : "- No smart memory signals recorded.",
    "",
    "## Safety",
    "",
    "- No code edits were made by autopilot.",
    "- No deployment attempted.",
    "- No network calls were made.",
    "- No destructive commands were run.",
    "",
    "## UI",
    "",
    result.ui?.ok ? "- Mission Control refreshed at .gsd/ui/index.html" : "- Mission Control was not refreshed.",
    "",
  ].join("\n");
}

function summarizeDoctorForAutopilot(doctor) {
  if (doctor.checks.some((check) => check.severity === "fail")) {
    return {
      status: "blocked",
      label: "blocking setup issues found; run gsd doctor",
    };
  }
  if (doctor.checks.some((check) => check.severity === "warn")) {
    return {
      status: "warning",
      label: "warnings found; run gsd doctor",
    };
  }
  return {
    status: "ready",
    label: "ready",
  };
}

function buildAutopilotMemorySignal(memory) {
  const commonFile = memory?.smartMemory?.commonFiles?.[0];
  const check = memory?.smartMemory?.checks?.[0];
  const risk = memory?.smartMemory?.recentRisks?.[0];

  if (commonFile) return `common files include ${commonFile}`;
  if (check) return `usual verification includes ${check}`;
  if (risk) return `recent risk: ${risk}`;
  return "";
}

function buildCodexHandoffMarkdown({ activeChange, files, memory, likelyFiles }) {
  const memoryLines = formatCodexMemoryLines(memory);
  return [
    "Use $shipspec and implement the active ShipSpec mission.",
    `Mission: ${activeChange.slug}`,
    "",
    "Read these files from the repo:",
    ...formatBulletList(files, "No ShipSpec files found."),
    "",
    ...(likelyFiles.length ? ["Likely project files:", ...formatBulletList(likelyFiles.slice(0, 8), "No likely project files inferred."), ""] : []),
    ...(memoryLines.length ? ["Project memory:", ...memoryLines, ""] : []),
    "Do not ask me to paste long context. Use repo files as the source of truth.",
    "Stop before coding if the mission/spec is unclear.",
    "",
    "After implementation, run:",
    "- gsd run",
    "- gsd ship",
    "- gsd share",
  ].join("\n");
}

function formatCodexMemoryLines(memory) {
  if (!memory?.smartMemory) return [];
  const lines = [];
  if (memory.smartMemory.commonFiles.length) lines.push(`- Common files: ${memory.smartMemory.commonFiles.slice(0, 5).join(", ")}`);
  if (memory.smartMemory.checks.length) lines.push(`- Checks: ${memory.smartMemory.checks.slice(0, 5).join(", ")}`);
  if (memory.smartMemory.recentRisks.length) lines.push(`- Recent risks: ${memory.smartMemory.recentRisks.slice(0, 3).join("; ")}`);
  if (memory.smartMemory.shipPatterns.length) lines.push(`- Ship pattern: ${memory.smartMemory.shipPatterns[0]}`);
  return lines;
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
  if (evidenceSummary.some((entry) => evidenceEntryHasProblem(entry))) reasons.push("verification skipped checks");
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

async function inferLikelyFiles(root, activeChange, options = {}) {
  if (!activeChange) return [];

  const diff = options.diff ?? (await getDiffSummary(root));
  const changedFiles = options.changedFiles ?? [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])];
  const memory = options.memory ?? (await getMemorySummary(root));
  const projectFiles = await listProjectFiles(root);
  const tokens = buildIntentTokens(`${activeChange.title} ${activeChange.slug}`);
  const scores = new Map();

  const addScore = (file, score) => {
    if (!isLikelyFileCandidate(file)) return;
    scores.set(file, (scores.get(file) ?? 0) + score);
  };

  for (const file of changedFiles) addScore(file, 120);
  for (const file of diff.committedFiles ?? []) addScore(file, 80);
  for (const file of memory.smartMemory?.commonFiles ?? []) addScore(file, 55);

  for (const file of projectFiles) {
    const score = scorePathForIntent(file, tokens, activeChange.slug);
    if (score > 0) addScore(file, score);
  }

  return [...scores.entries()]
    .sort(([fileA, scoreA], [fileB, scoreB]) => scoreB - scoreA || fileA.localeCompare(fileB))
    .map(([file]) => file)
    .slice(0, 8);
}

async function listProjectFiles(root, prefix = "", depth = 0) {
  if (depth > 5) return [];

  let entries = [];
  try {
    entries = await readdir(join(root, prefix), { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (shouldSkipProjectPath(relativePath, entry.isDirectory())) continue;

    if (entry.isDirectory()) {
      files.push(...(await listProjectFiles(root, relativePath, depth + 1)));
      continue;
    }

    if (isLikelyFileCandidate(relativePath)) files.push(relativePath);
  }

  return files.slice(0, 500);
}

function buildIntentTokens(value) {
  const stopWords = new Set(["add", "new", "the", "a", "an", "and", "or", "to", "for", "with", "page", "feature", "mission", "v1"]);
  return [...new Set(value.toLowerCase().split(/[^a-z0-9]+/u).filter((token) => token.length > 2 && !stopWords.has(token)))];
}

function scorePathForIntent(file, tokens, slug) {
  const normalized = file.toLowerCase();
  const compact = normalized.replace(/[^a-z0-9]+/gu, "-");
  let score = 0;

  if (slug && compact.includes(slug)) score += 90;
  for (const token of tokens) {
    if (normalized.includes(token)) score += 25;
    if (basename(normalized).includes(token)) score += 15;
  }
  if (/^(src|app|pages|components|lib|test|tests)\//u.test(normalized)) score += 6;
  if (/(^|\/)(index|main|app|server|route|page|component)\.[cm]?[jt]sx?$/u.test(normalized)) score += 4;

  return score;
}

function shouldSkipProjectPath(relativePath, isDirectory) {
  const parts = relativePath.split("/");
  if (parts.some((part) => [".git", ".gsd", ".agent", "openspec", "node_modules", "dist", "build", "coverage", ".next", ".turbo"].includes(part))) {
    return true;
  }
  if (isDirectory) return false;
  return /\.(png|jpe?g|gif|webp|ico|svg|pdf|zip|gz|tgz|lock)$/iu.test(relativePath);
}

function isLikelyFileCandidate(file) {
  if (!file || shouldSkipProjectPath(file, false)) return false;
  if (!isAutopilotImplementationFile(file)) return false;
  return !/(^|\/)(package-lock\.json|npm-shrinkwrap\.json)$/u.test(file);
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

async function buildStructuredMemory(root, activeChange, reflection) {
  const diff = await getDiffSummary(root);
  const changedFiles = [...new Set([...diff.stagedFiles, ...diff.unstagedFiles, ...(diff.committedFiles ?? [])])].sort();
  const evidencePath = `.agent/evidence/${activeChange.slug}.md`;
  const reviewPath = `.gsd/reviews/${activeChange.slug}.md`;
  const reportPath = `.gsd/reports/${activeChange.slug}.md`;
  const donePath = `.gsd/done/${activeChange.slug}.md`;
  const evidence = await readTextSnippetIfExists(join(root, evidencePath), 24_000);
  const checks = extractEvidenceChecks(evidence);
  const evidenceSummary = extractEvidenceSummaryBullets(evidence);
  const risks = [
    ...evidenceSummary.filter((item) => item.startsWith("Risk:")).map((item) => item.replace(/^Risk:\s*/u, "")),
    ...reflection.gaps,
  ].filter(Boolean);

  return {
    slug: activeChange.slug,
    title: activeChange.title,
    learnedAt: new Date().toISOString(),
    changedFiles,
    checks,
    risks: [...new Set(risks)],
    artifacts: {
      evidence: (await exists(join(root, evidencePath))) ? evidencePath : null,
      review: (await exists(join(root, reviewPath))) ? reviewPath : null,
      report: (await exists(join(root, reportPath))) ? reportPath : null,
      done: (await exists(join(root, donePath))) ? donePath : null,
    },
    shipPattern: await buildShipPattern({ reviewPath, reportPath, donePath }, root),
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

async function readStructuredMemoryArtifacts(root) {
  const dir = join(root, ".gsd", "memory");
  try {
    const files = (await readdir(dir)).filter((file) => file.endsWith(".json")).sort().reverse().slice(0, 20);
    const memories = [];

    for (const file of files) {
      const memory = await readJsonIfExists(join(dir, file));
      if (memory) memories.push(memory);
    }

    return memories;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function summarizeStructuredMemory(memories) {
  const commonFiles = rankByFrequency(memories.flatMap((memory) => memory.changedFiles ?? [])).slice(0, 8);
  const checks = rankByFrequency(memories.flatMap((memory) => (memory.checks ?? []).map((check) => check.name))).slice(0, 8);
  const recentRisks = [
    ...new Set(memories.flatMap((memory) => memory.risks ?? []).filter(isUsefulMemoryRisk)),
  ].slice(0, 6);
  const shipPatterns = [...new Set(memories.map((memory) => memory.shipPattern).filter(Boolean))].slice(0, 3);

  return {
    commonFiles,
    checks,
    recentRisks,
    shipPatterns,
    recentChanges: memories.slice(0, 5).map((memory) => ({
      slug: memory.slug,
      title: memory.title,
      artifacts: memory.artifacts ?? {},
    })),
  };
}

function isUsefulMemoryRisk(risk) {
  return (
    Boolean(risk) &&
    !risk.includes("No verification risks") &&
    !risk.includes("artifact is missing") &&
    !risk.includes("handoff is missing")
  );
}

function rankByFrequency(values) {
  const counts = new Map();
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([value]) => value);
}

function extractEvidenceChecks(evidence) {
  const checks = [];
  let current = null;

  for (const line of evidence.split("\n")) {
    if (line.startsWith("### ")) {
      current = { name: line.slice(4).trim(), command: "", result: "unknown", required: "unknown" };
      checks.push(current);
    } else if (current && line.startsWith("Command: `")) {
      current.command = line.slice("Command: `".length).replace(/`$/u, "");
    } else if (current && line.startsWith("Result: ")) {
      current.result = line.slice("Result: ".length).trim();
    } else if (current && line.startsWith("Required: ")) {
      current.required = line.slice("Required: ".length).trim();
    }
  }

  return checks;
}

async function buildShipPattern(paths, root) {
  const steps = ["verify"];
  if (await exists(join(root, paths.reviewPath))) steps.push("review");
  if (await exists(join(root, paths.reportPath))) steps.push("report");
  if (await exists(join(root, paths.donePath))) steps.push("done");
  return steps.join(" -> ");
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

function isAutopilotImplementationFile(file) {
  const generatedSetupFiles = new Set(["AGENTS.md", "CLAUDE.md", "GEMINI.md", ".cursor/rules/gsd.mdc"]);
  return !generatedSetupFiles.has(file);
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

function buildDoctorCheck({ name, ok, detail, action, command = null, fail = false }) {
  return {
    name,
    ok,
    severity: ok ? "pass" : fail ? "fail" : "warn",
    detail,
    action,
    command,
  };
}

function formatDoctor(result) {
  const checks = result.checks ?? result;
  const nextFixes = result.nextFixes ?? checks.filter((check) => check.severity !== "pass").map((check) => check.action).filter(Boolean);
  const status = checks.some((check) => check.severity === "fail")
    ? "needs setup"
    : checks.some((check) => check.severity === "warn")
      ? "usable with warnings"
      : "ready";
  const rows = checks.map((check) => {
    const label = check.severity === "fail" ? "FAIL" : check.severity === "warn" ? "WARN" : "PASS";
    const action = check.severity === "pass" || !check.action ? "" : `\n  Fix: ${check.action}`;
    return `${label} ${check.name}: ${check.detail}${action}`;
  });

  return [
    "ShipSpec Doctor",
    "",
    `Overall: ${status}`,
    "",
    ...rows,
    "",
    "Next fixes:",
    ...(nextFixes.length ? nextFixes.map((fix) => `- ${fix}`) : ["- None. ShipSpec is ready."]),
  ].join("\n");
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
    "Smart Memory",
    "",
    ...formatSmartMemoryRows(summary.smartMemory),
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

function formatSmartMemoryRows(smartMemory) {
  if (!smartMemory || smartMemory.recentChanges.length === 0) {
    return ["- No smart memory recorded."];
  }

  return [
    `- Common files: ${smartMemory.commonFiles.length ? smartMemory.commonFiles.join(", ") : "None recorded."}`,
    `- Checks: ${smartMemory.checks.length ? smartMemory.checks.join(", ") : "None recorded."}`,
    `- Recent risks: ${smartMemory.recentRisks.length ? smartMemory.recentRisks.join("; ") : "None recorded."}`,
    `- Ship pattern: ${smartMemory.shipPatterns[0] ?? "None recorded."}`,
  ];
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

function buildOperationMarkdown({ activeChange, delivery, reasoning, context, loop, ui, operation }) {
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
    "## Agentic Context",
    "",
    `- Context: .gsd/context/${activeChange.slug}.md`,
    `- Quality: ${context.quality.level} (${context.quality.score}%)`,
    ...formatBulletList(context.quality.warnings, "No context quality warnings."),
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
  likelyFiles,
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
    "## Likely Files",
    "",
    ...formatBulletList(likelyFiles, "No likely files inferred."),
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

async function buildAgenticContextSources(root, activeChange, likelyFiles, changedFiles, memory) {
  const projectFiles = await listProjectFiles(root);
  const tokens = buildIntentTokens(`${activeChange.title} ${activeChange.slug}`);
  const candidates = new Map();

  const addCandidate = (path, score, reason) => {
    if (!isLikelyFileCandidate(path)) return;
    const existing = candidates.get(path) ?? { path, score: 0, reasons: [] };
    existing.score += score;
    existing.reasons.push(reason);
    candidates.set(path, existing);
  };

  for (const file of likelyFiles) addCandidate(file, 120, "likely-file");
  for (const file of changedFiles) addCandidate(file, 90, "changed-file");
  for (const file of memory.smartMemory?.commonFiles ?? []) addCandidate(file, 45, "project-memory");

  for (const file of projectFiles) {
    const score = scorePathForIntent(file, tokens, activeChange.slug);
    if (score > 0) addCandidate(file, score, "intent-match");
  }

  const sources = [...candidates.values()]
    .map((source) => ({
      ...source,
      reasons: [...new Set(source.reasons)],
    }))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, 10);

  for (const source of sources) {
    source.snippet = await buildSourceSnippet(root, source.path, tokens);
  }

  return sources;
}

async function buildLocalRagIndex(root, activeChange) {
  const discovered = await walkLocalRagFiles(root);
  const documents = [];

  for (const file of discovered.files) {
    const absolutePath = join(root, file.path);
    const content = await readTextSnippetIfExists(absolutePath, 24_000);
    if (!content.trim()) continue;
    documents.push({
      path: file.path,
      kind: inferLocalRagKind(file.path),
      size: file.size,
      title: inferLocalRagTitle(file.path, content),
      summary: summarizeLocalRagContent(content),
    });
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    activeChange: activeChange.slug,
    documents,
    exclusions: discovered.exclusions,
  };
}

async function walkLocalRagFiles(root, prefix = "", depth = 0, state = { files: [], exclusions: [] }) {
  if (depth > 6) return state;

  let entries = [];
  try {
    entries = await readdir(join(root, prefix), { withFileTypes: true });
  } catch {
    return state;
  }

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const exclusion = getLocalRagExclusion(relativePath, entry.isDirectory());
    if (exclusion) {
      if (!entry.isDirectory() || shouldRecordRagDirectoryExclusion(relativePath)) {
        state.exclusions.push({ path: relativePath, reason: exclusion });
      }
      if (entry.isDirectory() && shouldRecordRagDirectoryExclusion(relativePath)) {
        await collectExcludedRagDescendants(root, relativePath, exclusion, state);
      }
      continue;
    }

    if (entry.isDirectory()) {
      await walkLocalRagFiles(root, relativePath, depth + 1, state);
      continue;
    }

    const fileStat = await stat(join(root, relativePath));
    const sizeExclusion = getLocalRagFileSizeExclusion(fileStat.size);
    if (sizeExclusion) {
      state.exclusions.push({ path: relativePath, reason: sizeExclusion });
      continue;
    }

    state.files.push({ path: relativePath, size: fileStat.size });
  }

  return {
    files: state.files.slice(0, 750),
    exclusions: state.exclusions.slice(0, 50),
  };
}

async function collectExcludedRagDescendants(root, prefix, reason, state, depth = 0) {
  if (depth > 3 || state.exclusions.length >= 50) return;

  let entries = [];
  try {
    entries = await readdir(join(root, prefix), { withFileTypes: true });
  } catch {
    return;
  }
  if (entries.length > 12) return;

  for (const entry of entries) {
    const relativePath = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) {
      await collectExcludedRagDescendants(root, relativePath, reason, state, depth + 1);
    } else {
      state.exclusions.push({ path: relativePath, reason });
    }
    if (state.exclusions.length >= 50) return;
  }
}

function getLocalRagExclusion(relativePath, isDirectory) {
  const parts = relativePath.split("/");
  const noisyPart = parts.find((part) =>
    [".git", "node_modules", "dist", "build", "coverage", ".next", ".turbo", ".cache", ".parcel-cache"].includes(part),
  );
  if (noisyPart) return `excluded noisy ${isDirectory ? "directory" : "path"}: ${noisyPart}`;
  if (parts[0] === ".gsd" && [".gsd/rag", ".gsd/ui", ".gsd/app"].some((prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}/`))) {
    return "excluded generated ShipSpec output";
  }
  if (!isDirectory && /(^|\/)\.env(\.|$)/u.test(relativePath)) return "secret/env file excluded";
  if (!isDirectory && /(^|\/)(secret|secrets|credentials|private-key)\.(json|txt|pem|key|env)$/iu.test(relativePath)) {
    return "secret credential file excluded";
  }
  if (!isDirectory && /\.(png|jpe?g|gif|webp|ico|svg|pdf|zip|gz|tgz|lock|mp4|mov|woff2?|ttf)$/iu.test(relativePath)) {
    return "binary or generated artifact excluded";
  }
  return "";
}

function shouldRecordRagDirectoryExclusion(relativePath) {
  return /(^|\/)(node_modules|dist|build|coverage)$/u.test(relativePath);
}

function getLocalRagFileSizeExclusion(size) {
  return size > 512_000 ? "large file excluded" : "";
}

function inferLocalRagKind(path) {
  if (path.startsWith("openspec/")) return "spec";
  if (path.startsWith(".agent/")) return "agent";
  if (path.startsWith(".gsd/")) return "shipspec";
  if (isTestLikePath(path)) return "test";
  if (/^(src|app|pages|components|lib)\//u.test(path)) return "source";
  if (/README|docs\//iu.test(path)) return "docs";
  return "project";
}

function inferLocalRagTitle(path, content) {
  const firstHeading = content.split(/\r?\n/u).find((line) => /^#\s+/u.test(line));
  return firstHeading ? firstHeading.replace(/^#\s+/u, "").trim().slice(0, 120) : basename(path);
}

function summarizeLocalRagContent(content) {
  return content
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(" ")
    .slice(0, 360);
}

async function rankLocalRagDocuments(root, { activeChange, query, documents, changedFiles, memory }) {
  const tokens = buildIntentTokens(`${query} ${activeChange.title} ${activeChange.slug}`);
  const changed = new Set(changedFiles);
  const memoryFiles = new Set(memory.smartMemory?.commonFiles ?? []);
  const citations = [];

  for (const document of documents) {
    const content = await readTextSnippetIfExists(join(root, document.path), 24_000);
    const scored = scoreLocalRagDocument(document, content, { tokens, activeChange, changed, memoryFiles });
    if (scored.score > 0) citations.push(scored);
  }

  return citations.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, 8);
}

function scoreLocalRagDocument(document, content, { tokens, activeChange, changed, memoryFiles }) {
  const lowerPath = document.path.toLowerCase();
  const lowerContent = content.toLowerCase();
  const reasons = [];
  let score = scorePathForIntent(document.path, tokens, activeChange.slug);

  if (score > 0) reasons.push("path-intent-match");
  if (changed.has(document.path)) {
    score += 45;
    reasons.push("git-change");
  }
  if (memoryFiles.has(document.path)) {
    score += 35;
    reasons.push("learned-memory");
  }
  if (document.kind === "source") {
    score += 16;
    reasons.push("source-file");
  }
  if (document.kind === "test") {
    score += 14;
    reasons.push("test-file");
  }
  if (document.kind === "spec" || document.kind === "shipspec") {
    score += 8;
    reasons.push("shipspec-artifact");
  }

  let contentTokenHits = 0;
  for (const token of tokens) {
    const contentMatches = countTokenOccurrences(lowerContent, token);
    if (contentMatches > 0) {
      contentTokenHits += 1;
      score += Math.min(contentMatches * 8, 32);
      reasons.push(`content:${token}`);
    }
    if (lowerPath.includes(token)) {
      score += 12;
      reasons.push(`path:${token}`);
    }
  }
  if (document.kind === "source" && contentTokenHits >= 2) {
    score += 220;
    reasons.push("implementation-evidence");
  }
  if (document.kind === "test" && contentTokenHits >= 2) {
    score += 180;
    reasons.push("test-evidence");
  }

  return {
    path: document.path,
    kind: document.kind,
    score,
    reasons: [...new Set(reasons)],
    snippet: buildRagSnippet(content, tokens),
  };
}

function countTokenOccurrences(content, token) {
  return content.split(token).length - 1;
}

function buildRagSnippet(content, tokens) {
  const lines = content.split(/\r?\n/u);
  const matches = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    const lower = line.toLowerCase();
    if (tokens.some((token) => lower.includes(token))) {
      matches.push(`${index + 1}: ${line.slice(0, 180)}`);
    }
    if (matches.length >= 4) break;
  }
  if (matches.length) return matches.join("\n");
  return lines
    .map((line, index) => `${index + 1}: ${line.trim()}`)
    .filter((line) => !line.endsWith(":"))
    .slice(0, 4)
    .join("\n");
}

function buildLocalRagQuality({ citations, memory }) {
  const hasSource = citations.some((citation) => citation.kind === "source");
  const hasTest = citations.some((citation) => citation.kind === "test");
  const hasMemory = hasMemorySignals(memory);
  const checks = [
    { name: "Citations", ok: citations.length > 0, points: citations.length ? 35 : 0, detail: `${citations.length} citation${citations.length === 1 ? "" : "s"} ranked.` },
    { name: "Source coverage", ok: hasSource, points: hasSource ? 20 : 0, detail: hasSource ? "Source file evidence found." : "No source file evidence found." },
    { name: "Test coverage", ok: hasTest, points: hasTest ? 20 : 0, detail: hasTest ? "Test file evidence found." : "No test file evidence found." },
    { name: "Learning signals", ok: hasMemory, points: hasMemory ? 15 : 0, detail: hasMemory ? "Project memory is available." : "No learned memory yet." },
    { name: "Safe local mode", ok: true, points: 10, detail: "No remote retrieval or secret indexing is used." },
  ];
  const score = checks.reduce((total, check) => total + check.points, 0);

  return {
    score,
    level: score >= 75 ? "strong" : score >= 45 ? "usable" : "weak",
    checks,
    warnings: checks.filter((check) => !check.ok).map((check) => check.detail),
  };
}

function buildLocalRagRefinementSteps({ citations, quality }) {
  const steps = [];
  if (quality.level === "weak") steps.push("Broaden the query or create source/test files, then rerun `gsd rag`.");
  if (!citations.some((citation) => citation.kind === "test")) steps.push("Find or add the nearest test file before implementation.");
  if (!citations.some((citation) => citation.kind === "source")) steps.push("Inspect source directories manually because no source citation ranked.");
  steps.push("Use the top citations first, inspect adjacent files second, then refresh with `gsd context`.");
  return steps;
}

function buildLocalRagMarkdown({ activeChange, query, citations, quality, refinementSteps, memory, exclusions }) {
  return [
    "# Full Agentic RAG",
    "",
    `Change: ${activeChange.slug}`,
    `Query: ${query}`,
    `Quality: ${quality.level} (${quality.score}%)`,
    "",
    "## Quality Checks",
    "",
    ...formatQualityChecks(quality.checks),
    "",
    "## Ranked Citations",
    "",
    ...formatRagCitations(citations),
    "",
    "## Learning Signals",
    "",
    ...formatBulletList(buildLearningRetrievalSignals(memory), "No learning signals recorded."),
    "",
    "## Refinement Steps",
    "",
    ...formatBulletList(refinementSteps, "No refinement needed."),
    "",
    "## Safety Exclusions",
    "",
    ...formatBulletList(exclusions.slice(0, 20).map((entry) => `${entry.path}: ${entry.reason}`), "No files were excluded."),
    "",
  ].join("\n");
}

function formatRagCitations(citations) {
  if (!citations.length) return ["- No citations found."];
  return citations.flatMap((citation, index) => [
    `### ${index + 1}. ${citation.path}`,
    "",
    `- Kind: ${citation.kind}`,
    `- Score: ${citation.score}`,
    `- Reasons: ${citation.reasons.join(", ") || "none"}`,
    "",
    "```text",
    citation.snippet,
    "```",
    "",
  ]);
}

async function buildSourceSnippet(root, relativePath, tokens) {
  const content = await readTextSnippetIfExists(join(root, relativePath), 16_000);
  if (!content.trim()) return "No readable snippet.";

  const lines = content.split(/\r?\n/u);
  const matched = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    const lower = line.toLowerCase();
    if (tokens.some((token) => lower.includes(token))) {
      matched.push(`${index + 1}: ${line.slice(0, 180)}`);
    }
    if (matched.length >= 3) break;
  }

  if (matched.length) return matched.join("\n");
  return lines
    .map((line, index) => `${index + 1}: ${line.trim()}`)
    .filter((line) => !line.endsWith(":"))
    .slice(0, 3)
    .join("\n");
}

function buildContextQuality({ sources, validation, readyValidation, memory, evidenceSummary, risk, next }) {
  const checks = [
    {
      name: "Ranked local sources",
      ok: sources.length > 0,
      points: sources.length > 0 ? 25 : 0,
      detail: sources.length > 0 ? `${sources.length} local source file${sources.length === 1 ? "" : "s"} ranked.` : "No local source files found.",
    },
    {
      name: "Spec gate",
      ok: validation.ok,
      points: validation.ok ? 15 : 0,
      detail: validation.ok ? "Spec validation passes." : "Spec validation has gaps.",
    },
    {
      name: "Project memory",
      ok: hasMemorySignals(memory),
      points: hasMemorySignals(memory) ? 10 : 0,
      detail: hasMemorySignals(memory) ? "Prior ShipSpec memory is available." : "No learned project memory yet.",
    },
    {
      name: "Test signals",
      ok: sources.some((source) => isTestLikePath(source.path)),
      points: sources.some((source) => isTestLikePath(source.path)) ? 15 : 0,
      detail: sources.some((source) => isTestLikePath(source.path)) ? "A likely test source is ranked." : "No likely test source ranked.",
    },
    {
      name: "Verification evidence",
      ok: evidenceSummary.length > 0 || readyValidation.ok,
      points: evidenceSummary.length > 0 || readyValidation.ok ? 15 : 0,
      detail: evidenceSummary.length > 0 ? "Verification evidence summary is present." : "Verification evidence is not ready yet.",
    },
    {
      name: "Risk posture",
      ok: risk.level !== "high",
      points: risk.level !== "high" ? 10 : 0,
      detail: risk.level === "high" ? "High-risk change needs explicit review." : `Risk level is ${risk.level}.`,
    },
    {
      name: "Operator next step",
      ok: Boolean(next.command),
      points: next.command ? 10 : 0,
      detail: next.command ? `Next command is ${next.command}.` : "No next command was inferred.",
    },
  ];
  const score = checks.reduce((total, check) => total + check.points, 0);
  const warnings = checks.filter((check) => !check.ok).map((check) => check.detail);

  return {
    score,
    level: score >= 75 ? "strong" : score >= 45 ? "usable" : "weak",
    checks,
    warnings,
  };
}

function hasMemorySignals(memory) {
  return Boolean(
    memory.lessons?.length ||
      memory.patterns?.length ||
      memory.reflections?.length ||
      memory.smartMemory?.commonFiles?.length ||
      memory.smartMemory?.checks?.length ||
      memory.smartMemory?.shipPatterns?.length,
  );
}

function isTestLikePath(path) {
  return /(^|\/)(test|tests|__tests__)\/|(\.|-)(test|spec)\.[cm]?[jt]sx?$/iu.test(path);
}

function buildConnectorSignals({ sources, memory, evidenceSummary }) {
  return [
    {
      name: "Local repo",
      status: sources.length ? "active" : "empty",
      detail: sources.length ? `${sources.length} ranked local source file${sources.length === 1 ? "" : "s"}.` : "No local source files ranked yet.",
    },
    {
      name: "ShipSpec memory",
      status: hasMemorySignals(memory) ? "active" : "empty",
      detail: hasMemorySignals(memory) ? "Learned project signals are available." : "Run `gsd learn` after shipped work to improve future retrieval.",
    },
    {
      name: "Verification evidence",
      status: evidenceSummary.length ? "active" : "missing",
      detail: evidenceSummary.length ? "Evidence can guide the evaluation loop." : "Run `gsd verify --full` after implementation.",
    },
    {
      name: "External connectors",
      status: "not configured",
      detail: "Jira, logs, docs, and design connectors can be added later without changing the local context contract.",
    },
  ];
}

function buildRetrievalLoop({ activeChange, sources, quality }) {
  const loop = [
    `Round 1: derive intent from "${activeChange.title}" and ${activeChange.slug}.`,
    "Round 2: rank likely files from local project structure, Git state, and ShipSpec memory.",
    "Round 3: read top sources, then inspect adjacent files only when the quality score is weak or the task is unclear.",
  ];

  if (quality.level === "weak") {
    loop.push("Next refinement: create or identify source/test files, then rerun `gsd context`.");
  } else if (!sources.some((source) => isTestLikePath(source.path))) {
    loop.push("Next refinement: locate the closest test file before implementation.");
  } else {
    loop.push("Next refinement: use ranked sources directly, then refresh context after code changes.");
  }

  return loop;
}

function buildLearningRetrievalSignals(memory) {
  return [
    `Common files: ${memory.smartMemory?.commonFiles?.slice(0, 5).join(", ") || "None recorded."}`,
    `Common checks: ${memory.smartMemory?.checks?.slice(0, 5).join(", ") || "None recorded."}`,
    `Recent risks: ${memory.smartMemory?.recentRisks?.slice(0, 3).join("; ") || "None recorded."}`,
    `Ship pattern: ${memory.smartMemory?.shipPatterns?.[0] ?? "None recorded."}`,
  ];
}

function formatQualityChecks(checks) {
  return checks.map((check) => `- ${check.ok ? "PASS" : "WARN"} ${check.name}: ${check.detail}`);
}

function formatConnectorSignals(signals) {
  return signals.map((signal) => `- ${signal.name}: ${signal.status} - ${signal.detail}`);
}

function buildAgenticContextMarkdown({
  activeChange,
  validation,
  readyValidation,
  diff,
  sources,
  memory,
  risk,
  next,
  evidenceSummary,
  quality,
  connectorSignals,
  retrievalLoop,
  learningSignals,
  ragReportPath,
}) {
  const memorySignals = [
    `Common files: ${memory.smartMemory?.commonFiles?.slice(0, 5).join(", ") || "None recorded."}`,
    `Common checks: ${memory.smartMemory?.checks?.slice(0, 5).join(", ") || "None recorded."}`,
    `Recent risks: ${memory.smartMemory?.recentRisks?.slice(0, 3).join("; ") || "None recorded."}`,
    `Ship pattern: ${memory.smartMemory?.shipPatterns?.[0] ?? "None recorded."}`,
  ];
  const evaluationHints = [
    validation.ok ? "Spec validation currently passes." : "Fix spec validation before implementation.",
    readyValidation.ok ? "Ready validation passes; focus on review/release evidence." : "Ready validation has gaps; implementation should refresh verification evidence.",
    risk.level === "high" ? "High risk: require explicit human review before ship." : `Risk level: ${risk.level}.`,
    "After coding, run `gsd verify --full`, `gsd review`, and `gsd validate --ready`.",
  ];

  return [
    "# Agentic Context Pack",
    "",
    "Local Agentic RAG-style context for an AI coding pass. Generated from repo files and ShipSpec artifacts only.",
    "",
    "## Mission",
    "",
    `- Title: ${activeChange.title}`,
    `- Slug: ${activeChange.slug}`,
    `- Branch: ${diff.branch}`,
    `- Next command: ${next.command}`,
    `- Next reason: ${next.reason}`,
    "",
    "## Retrieval Strategy",
    "",
    "- Decompose the request into intent tokens from the title and slug.",
    "- Rank local files using likely-file inference, Git changes, project memory, and path/token matches.",
    "- Read top ranked sources first, then inspect adjacent code only when needed.",
    "- Use ShipSpec evidence and validation gaps as the evaluation loop.",
    "",
    "## Context Quality",
    "",
    `- Score: ${quality.score}%`,
    `- Level: ${quality.level}`,
    ...formatQualityChecks(quality.checks),
    "",
    "## Connector Signals",
    "",
    ...formatConnectorSignals(connectorSignals),
    "",
    "## Retrieval Loop",
    "",
    ...formatBulletList(retrievalLoop, "No retrieval loop recorded."),
    "",
    "## Learning Retrieval",
    "",
    ...formatBulletList(learningSignals, "No learning retrieval signals recorded."),
    "",
    "## Operator Next Step",
    "",
    `- Command: ${next.command}`,
    `- Reason: ${next.reason}`,
    ...formatBulletList(quality.warnings, "Context quality is sufficient for the next AI pass."),
    "",
    "## Full Agentic RAG",
    "",
    ...(ragReportPath
      ? [`- Report: ${ragReportPath}`, "- Use `gsd rag \"your question\"` to refresh full local retrieval."]
      : ["- No full RAG report yet. Run `gsd rag \"your question\"` for cited local retrieval."]),
    "",
    "## Ranked Local Sources",
    "",
    ...formatAgenticSources(sources),
    "",
    "## Memory Signals",
    "",
    ...formatBulletList(memorySignals, "No memory signals recorded."),
    "",
    "## Evidence Signals",
    "",
    ...formatBulletList(evidenceSummary, "No verification evidence summary available yet."),
    "",
    "## Risk Signals",
    "",
    `- Level: ${risk.level}`,
    ...risk.reasons.map((reason) => `- ${reason}`),
    "",
    "## Evaluation Hints",
    "",
    ...formatBulletList(evaluationHints, "No evaluation hints."),
    "",
    "## AI Handoff",
    "",
    "- Read the active proposal and tasks before coding.",
    "- Start from the ranked sources above.",
    "- Keep edits scoped to the active change.",
    "- If retrieved context is weak, inspect neighboring files before editing.",
    "- Do not deploy or access secrets from this context pack.",
    "",
  ].join("\n");
}

function formatAgenticSources(sources) {
  if (!sources.length) return ["- No local sources ranked."];
  return sources.flatMap((source, index) => [
    `### ${index + 1}. ${source.path}`,
    "",
    `- Score: ${source.score}`,
    `- Signals: ${source.reasons.join(", ")}`,
    "",
    "```text",
    source.snippet,
    "```",
    "",
  ]);
}

function formatContextPackValidationErrors(...errorLists) {
  const errors = errorLists.flat().filter(Boolean);
  if (errors.length === 0) return [];
  return ["- Validation gaps:", ...errors.map((error) => `  - ${error}`)];
}

function buildPreShipRiskReview({ changedFiles, evidenceSummary, decisions }) {
  const sensitiveFiles = changedFiles.filter((file) => /(auth|token|security|payment|billing|db|database|migration)/i.test(file));
  const uiFiles = changedFiles.filter((file) => /(ui|app|page|component|css|style|view)/i.test(file));
  const warnings = [];
  const manualChecks = [];

  if (sensitiveFiles.length) {
    warnings.push(`Sensitive files changed: ${sensitiveFiles.slice(0, 5).join(", ")}`);
    manualChecks.push("Confirm auth, token, payment, or data access behavior manually.");
  }
  if (uiFiles.length) {
    warnings.push("UI-facing files changed; screenshot or E2E proof may be needed.");
    manualChecks.push("Confirm the visible user flow still renders correctly.");
  }
  if (evidenceSummary.length === 0) warnings.push("No verification evidence summary found.");
  if (evidenceSummary.some((entry) => evidenceEntryHasProblem(entry))) {
    warnings.push("Verification evidence contains skipped, missing, or failed checks.");
  }
  if (decisions.length === 0) manualChecks.push("Confirm there are no missing human product decisions.");

  return {
    summary: warnings.length ? `${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : "no deterministic warnings",
    warnings,
    manualChecks,
  };
}

function evidenceEntryHasProblem(entry) {
  const normalized = String(entry).toLowerCase();
  if (/skipped:\s*none/.test(normalized)) return false;
  if (/risk:\s*no verification risks/.test(normalized)) return false;
  if (/verified:.*\bpassed\b/.test(normalized)) return false;
  return /\b(skipped|missing|failed|fail|risk)\b/.test(normalized);
}

function buildReviewMarkdown({ activeChange, decisions, changedFiles, evidenceSummary, riskReview }) {
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
    "## Risk Review",
    "",
    ...formatBulletList(riskReview?.warnings ?? [], "No deterministic risk warnings from local changed files."),
    "",
    "## Manual Checks",
    "",
    ...formatBulletList(riskReview?.manualChecks ?? [], "No extra manual checks inferred."),
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
  return `:root {
  --bg: #11131f;
  --panel: #1b2033;
  --panel-2: #232944;
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
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
}
.shell { padding: 28px; max-width: 1180px; margin: 0 auto; }
header { display: flex; justify-content: space-between; align-items: start; gap: 18px; margin-bottom: 20px; }
h1 { margin: 0; font-size: 44px; color: var(--text); letter-spacing: 0; }
h2 { margin: 0 0 14px; color: var(--blue); }
p { margin: 8px 0 0; color: var(--muted); }
button {
  font: inherit;
  color: var(--text);
  background: #11172a;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
}
button:hover { color: var(--green); border-color: var(--blue); }
.grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; }
.lower { margin-top: 18px; }
.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 18px 50px rgba(0,0,0,.26);
  padding: 18px;
}
.pipeline { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.stage { background: var(--panel-2); border: 1px solid var(--line); border-radius: 8px; padding: 14px; min-height: 78px; }
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
  border: 1px solid var(--line);
  border-radius: 8px;
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

function compactFileLabel(file) {
  const normalized = String(file).replaceAll("\\", "/");
  const parts = normalized.split("/").filter(Boolean);
  return parts.at(-1) ?? normalized;
}

function buildAppHtml(model) {
  const changeTitle = model.activeChange?.title ?? "No active mission";
  const changeSlug = model.activeChange?.slug ?? "none";
  const files = model.likelyFiles?.length ? model.likelyFiles : ["No likely files inferred yet."];
  const primaryCommands = [
    "gsd operate",
    "gsd codex",
    "gsd verify --full",
    "gsd ship",
  ];
  const readinessSignals = [
    ["Spec", model.specStatus.proposal && model.specStatus.tasks],
    ["Validation", model.validation.ok],
    ["Evidence", model.specStatus.evidence],
    ["Review", model.review?.present],
    ["Report", model.reportExists],
    ["Ready", model.readyValidation.ok],
  ];
  const readinessPassed = readinessSignals.filter(([, ok]) => ok).length;
  const readinessScore = Math.round((readinessPassed / readinessSignals.length) * 100);
  const readinessReason = model.readyValidation.ok
    ? "Ready to ship."
    : model.readyValidation.errors?.[0] ?? model.next?.reason ?? "Run gsd next for guidance.";
  const evidenceRows = [
    ["Change", changeSlug],
    ["Branch", model.diff.branch],
    ["Evidence", model.specStatus.evidence ? "present" : "missing"],
    ["Review", model.review?.present ? "present" : "missing"],
    ["Report", model.reportExists ? "present" : "missing"],
    ["Release", model.releaseExists ? "present" : "missing"],
  ];
  const memory = model.memory?.smartMemory ?? {};
  const memoryRows = [
    `Common files: ${memory.commonFiles?.slice(0, 5).join(", ") || "None recorded."}`,
    `Checks: ${memory.checks?.slice(0, 5).join(", ") || "None recorded."}`,
    `Ship pattern: ${memory.shipPatterns?.[0] ?? "None recorded."}`,
  ];
  const messages = model.messages.length ? model.messages.slice(0, 8) : [{ role: "system", text: "No agent messages yet." }];
  const visibleFiles = files.slice(0, 5);
  const nextActions = [
    [model.next?.command ?? "gsd next", model.next?.reason ?? "Run gsd next for guidance."],
    ["gsd codex", "Give Codex the prepared mission context."],
    ["gsd verify --full", "Collect full verification evidence."],
    ["gsd ship", "Review, report, and prepare the handoff."],
  ].filter(([command], index, actions) => actions.findIndex(([other]) => other === command) === index);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ShipSpec App</title>
  <style>
    :root {
      --bg: #080d19;
      --shell: #0d1424;
      --panel: #121b2e;
      --panel-2: #0b1220;
      --line: rgba(148, 163, 184, .2);
      --text: #e8eef8;
      --muted: #9aa8bd;
      --subtle: #64748b;
      --blue: #38bdf8;
      --green: #36d981;
      --yellow: #f6c453;
      --red: #fb7185;
      --shadow: rgba(0, 0, 0, .32);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      background: linear-gradient(135deg, #07111f 0%, #0a1020 45%, #080b16 100%);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    button, input { font: inherit; }
    .app {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 168px minmax(0, 1fr) 260px;
      gap: 14px;
      padding: 16px;
    }
    .sidebar, .main, .inspector {
      background: rgba(18, 27, 46, .82);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: 0 22px 60px var(--shadow);
    }
    .sidebar { padding: 14px; display: grid; align-content: start; gap: 14px; }
    .sidebar.rail { position: sticky; top: 16px; min-height: calc(100vh - 32px); }
    .brand h1 { margin: 0; font-size: 18px; line-height: 1.05; }
    .brand p { margin: 6px 0 0; color: var(--muted); font-size: 12px; line-height: 1.35; }
    .nav { display: grid; gap: 8px; }
    .tab-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border: 1px solid transparent;
      border-radius: 8px;
      background: transparent;
      color: var(--muted);
      padding: 9px 10px;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
    }
    .tab-button[aria-selected="true"] {
      color: var(--text);
      border-color: rgba(56, 189, 248, .38);
      background: rgba(56, 189, 248, .1);
    }
    .main { padding: 16px; overflow: hidden; }
    .topbar {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      align-items: start;
      margin-bottom: 16px;
    }
    .title h2 { margin: 0; font-size: 28px; line-height: 1.1; }
    .title p { margin: 6px 0 0; color: var(--muted); }
    .command-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 14px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      border: 1px solid currentColor;
      border-radius: 999px;
      padding: 5px 9px;
      color: var(--yellow);
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }
    .pass { color: var(--green); }
    .warn { color: var(--yellow); }
    .fail { color: var(--red); }
    .next-action {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 14px;
      align-items: center;
      padding: 16px;
      border: 1px solid rgba(56, 189, 248, .32);
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(56, 189, 248, .13), rgba(54, 217, 129, .07));
      margin-bottom: 16px;
    }
    .label { color: var(--blue); font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
    .next-action h3 { margin: 6px 0 0; font-size: 18px; }
    .command {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel-2);
      color: var(--green);
      padding: 10px 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      cursor: pointer;
      text-align: left;
      overflow-wrap: anywhere;
    }
    .command.primary {
      min-height: 46px;
      color: var(--yellow);
      font-weight: 800;
    }
    .home-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr);
      gap: 12px;
    }
    .next-actions { display: grid; gap: 8px; }
    .next-actions-card {
      grid-row: span 2;
      background: linear-gradient(135deg, rgba(56, 189, 248, .12), rgba(11, 18, 32, .72));
    }
    .action-row {
      display: grid;
      grid-template-columns: minmax(0, 150px) minmax(0, 1fr);
      gap: 10px;
      align-items: center;
    }
    .action-row .command { color: var(--green); }
    .note { margin: 4px 0 0; color: var(--muted); line-height: 1.35; }
    .activity-feed .row strong { color: var(--green); }
    .home-files .file-path { display: none; }
    .home-files .file-row { display: block; }
    .home-files .row { padding: 10px 11px; }
    .copy-status {
      min-height: 18px;
      color: var(--green);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .section {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(11, 18, 32, .62);
      padding: 14px;
    }
    .section h3 { margin: 0 0 10px; font-size: 16px; }
    .rows { display: grid; gap: 8px; }
    .row {
      border: 1px solid var(--line);
      border-radius: 7px;
      background: var(--panel-2);
      padding: 9px 10px;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }
    .file-tools { display: flex; gap: 10px; margin-bottom: 10px; }
    .search {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel-2);
      color: var(--text);
      padding: 10px 12px;
    }
    .file-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }
    .file-name { font-weight: 800; }
    .file-path { color: var(--muted); font-size: 13px; }
    .inspector { padding: 16px; display: grid; align-content: start; gap: 14px; }
    .inspector.compact { padding: 14px; gap: 12px; }
    .inspector.compact .section { padding: 12px; }
    .inspector.compact .signal { padding: 8px 9px; font-size: 13px; }
    .score {
      display: flex;
      align-items: baseline;
      gap: 8px;
      color: var(--green);
      font-size: 42px;
      font-weight: 900;
      line-height: 1;
    }
    .score span { color: var(--muted); font-size: 13px; }
    .signal {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: var(--panel-2);
      padding: 9px 10px;
    }
    @media (max-width: 980px) {
      .app { grid-template-columns: 1fr; }
      .grid, .next-action, .home-grid, .command-strip { grid-template-columns: 1fr; }
      .sidebar.rail { position: static; min-height: auto; }
    }
  </style>
</head>
<body>
  <div class="app" data-app="shipspec-react-mission-control">
    <aside class="sidebar rail">
      <div class="brand">
        <h1>ShipSpec App ready</h1>
        <p>Mission Control from local ShipSpec state.</p>
      </div>
      <nav class="nav" aria-label="Mission Control sections">
        ${["Mission", "Files", "Evidence", "Agents", "Memory"].map((name, index) => `<button class="tab-button" type="button" data-tab="${escapeHtml(name.toLowerCase())}" aria-selected="${index === 0 ? "true" : "false"}"><span>${escapeHtml(name)}</span><span>${index === 0 ? "on" : ""}</span></button>`).join("")}
      </nav>
    </aside>

    <main class="main">
      <div class="topbar">
        <div class="title">
          <h2>${escapeHtml(changeTitle)}</h2>
          <p>${escapeHtml(changeSlug)} / ${escapeHtml(model.diff.branch)}</p>
        </div>
        <span class="pill ${model.readyValidation.ok ? "pass" : "warn"}">Ready ${model.readyValidation.ok ? "PASS" : "WAIT"}</span>
      </div>

      <div class="copy-status" role="status" aria-live="polite"></div>
      <section class="command-strip" aria-label="Primary commands">
        ${primaryCommands.map((command) => `<button class="command primary" type="button" data-command="${escapeHtml(command)}">${escapeHtml(command)}</button>`).join("")}
      </section>

      <section class="next-action" aria-label="Next action">
        <div>
          <div class="label">Next action</div>
          <h3>${escapeHtml(model.next?.reason ?? "Run gsd next for guidance.")}</h3>
        </div>
        <button class="command" type="button" data-command="${escapeHtml(model.next?.command ?? "gsd next")}">${escapeHtml(model.next?.command ?? "gsd next")}</button>
      </section>

      <section class="tab-panel active" data-panel="mission">
        <div class="home-grid">
          <div class="section next-actions-card">
            <div class="next-actions">
              <h3>Next actions</h3>
              <div class="rows">
                ${nextActions.map(([command, reason]) => `<div class="row action-row"><button class="command" type="button" data-command="${escapeHtml(command)}">${escapeHtml(command)}</button><span>${escapeHtml(reason)}</span></div>`).join("")}
              </div>
            </div>
          </div>
          <div class="section">
            <h3>Mission</h3>
            <div class="rows">
              <div class="row">Change: ${escapeHtml(changeSlug)}</div>
              <div class="row">Spec: ${model.specStatus.proposal && model.specStatus.tasks ? "ready" : "needs work"}</div>
              <div class="row">Prompt: ${model.promptExists ? "present" : "missing"}</div>
            </div>
          </div>
          <div class="section">
            <div class="home-files">
              <h3>Likely files</h3>
              <div class="rows">
                ${visibleFiles.map((file) => `<div class="row file-row" data-file="${escapeHtml(file.toLowerCase())}"><span class="file-name">${escapeHtml(compactFileLabel(file))}</span><span class="file-path">${escapeHtml(file)}</span></div>`).join("")}
              </div>
            </div>
          </div>
          <div class="section">
            <div class="activity-feed">
              <h3>Activity</h3>
              <div class="rows">
                ${messages.slice(0, 4).map((message) => `<div class="row"><strong>${escapeHtml(message.role)}</strong>: ${escapeHtml(message.text)}</div>`).join("")}
              </div>
            </div>
          </div>
          <div class="section">
            <h3>Blocker</h3>
            <p class="note">${escapeHtml(readinessReason)}</p>
          </div>
        </div>
      </section>

      <section class="tab-panel" data-panel="files">
        <div class="section">
          <h3>Files</h3>
          <div class="file-tools">
            <input class="search" type="search" placeholder="Search likely files" aria-label="Search likely files">
          </div>
          <div class="rows file-list">
            ${files.map((file) => `<div class="row file-row" data-file="${escapeHtml(file.toLowerCase())}"><span class="file-name">${escapeHtml(compactFileLabel(file))}</span><span class="file-path">${escapeHtml(file)}</span></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="tab-panel" data-panel="evidence">
        <div class="grid">
          ${evidenceRows.map(([label, value]) => `<div class="section"><div class="label">${escapeHtml(label)}</div><h3>${escapeHtml(value)}</h3></div>`).join("")}
        </div>
      </section>

      <section class="tab-panel" data-panel="agents">
        <div class="section">
          <h3>Agent inbox</h3>
          <div class="rows">
            ${messages.map((message) => `<div class="row"><strong>${escapeHtml(message.role)}</strong>: ${escapeHtml(message.text)}</div>`).join("")}
          </div>
        </div>
      </section>

      <section class="tab-panel" data-panel="memory">
        <div class="section">
          <h3>Memory</h3>
          <div class="rows">
            ${memoryRows.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
          </div>
        </div>
      </section>
    </main>

    <aside class="inspector compact">
      <div class="section">
        <div class="label">Readiness</div>
        <div class="score">${readinessScore}% <span>ready</span></div>
        <p>${escapeHtml(readinessReason)}</p>
      </div>
      <div class="section">
        <h3>Checklist</h3>
        <div class="rows">
          ${readinessSignals.map(([name, ok]) => `<div class="signal"><span>${escapeHtml(name)}</span><strong class="${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</strong></div>`).join("")}
        </div>
      </div>
    </aside>
  </div>
  <script>
    const tabs = [...document.querySelectorAll("[data-tab]")];
    const panels = [...document.querySelectorAll("[data-panel]")];
    const search = document.querySelector(".search");
    const fileRows = [...document.querySelectorAll("[data-file]")];
    const copyStatus = document.querySelector(".copy-status");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.dataset.tab;
        tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
      });
    });

    search?.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      fileRows.forEach((row) => {
        row.hidden = term.length > 0 && !row.dataset.file.includes(term);
      });
    });

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

    document.querySelectorAll("[data-command]").forEach((button) => {
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
  const readinessSignals = [
    ["Spec", model.specStatus.proposal && model.specStatus.tasks],
    ["Validation", model.validation.ok],
    ["Evidence", model.specStatus.evidence],
    ["Review", model.review?.present],
    ["Report", model.reportExists],
    ["Ready", model.readyValidation.ok],
  ];
  const readinessPassed = readinessSignals.filter(([, ok]) => ok).length;
  const readinessScore = Math.round((readinessPassed / readinessSignals.length) * 100);
  const readinessReason = model.readyValidation.ok
    ? "Ready to ship."
    : model.readyValidation.errors?.[0] ?? model.next?.reason ?? "Run gsd next for guidance.";
  const promptCommand = model.activeChange ? `open .gsd/prompts/${model.activeChange.slug}.md` : "gsd prompt";
  const commandCenterActions = [
    ["Give to Codex", "gsd codex", "Send the prepared mission context to Codex."],
    ["Open Prompt", promptCommand, "Review the implementation brief before coding."],
    ["Run Checks", "gsd verify --full", "Collect verification evidence for this mission."],
    ["Ship", "gsd ship", "Verify, review, and write the ship report."],
  ];
  const smartMemory = model.memory?.smartMemory ?? {};
  const memoryRows = [
    `Common files: ${smartMemory.commonFiles?.slice(0, 4).join(", ") || "None recorded."}`,
    `Checks: ${smartMemory.checks?.slice(0, 4).join(", ") || "None recorded."}`,
    `Ship pattern: ${smartMemory.shipPatterns?.[0] ?? "None recorded."}`,
  ];
  const evidenceReceiptRows = [
    ["Change", changeSlug],
    ["Branch", model.diff.branch],
    ["Evidence", model.specStatus.evidence ? "present" : "missing"],
    ["Review", model.review?.present ? "present" : "missing"],
    ["Report", model.reportExists ? "present" : "missing"],
    ["Release", model.releaseExists ? "present" : "missing"],
  ];
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
  const likelyFiles = model.likelyFiles ?? [];
  const likelyPreview = likelyFiles.length ? likelyFiles.slice(0, 3) : ["No likely files inferred yet."];
  const likelyPreviewRows = likelyPreview.map((file) => ({
    label: likelyFiles.length ? compactFileLabel(file) : file,
    fullPath: likelyFiles.length ? file : "",
  }));
  const likelyOverflow = Math.max(0, likelyFiles.length - likelyPreview.length);
  const fullLikelyFiles = likelyFiles.length ? likelyFiles : ["No likely files inferred yet."];
  const compactReadinessSignals = [
    ["Spec", model.specStatus.proposal && model.specStatus.tasks],
    ["Evidence", model.specStatus.evidence],
    ["Report", model.reportExists],
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ShipSpec Mission Control</title>
  <style>
    :root {
      --bg: #0b1020;
      --surface: #0f172a;
      --panel: #111827;
      --panel-2: #172033;
      --panel-3: #0b1220;
      --text: #e5edf7;
      --muted: #94a3b8;
      --subtle: #64748b;
      --green: #3ddc84;
      --yellow: #f8c14a;
      --red: #fb7185;
      --blue: #38bdf8;
      --line: rgba(148, 163, 184, .22);
      --shadow: rgba(0, 0, 0, .28);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top left, rgba(56, 189, 248, .12), transparent 32rem), var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    .shell { max-width: 1180px; margin: 0 auto; padding: 28px 24px; }
    header { display: flex; justify-content: space-between; gap: 18px; align-items: start; margin-bottom: 18px; }
    h1, h2, h3, p { margin: 0; }
    h1 { font-size: clamp(30px, 4vw, 48px); line-height: 1; letter-spacing: 0; color: var(--text); }
    h2 { font-size: 20px; margin-bottom: 12px; color: var(--text); }
    h3 { font-size: 15px; margin: 14px 0 8px; color: var(--text); }
    .slug { color: var(--muted); margin-top: 10px; font-size: 16px; overflow-wrap: anywhere; }
    .top-meta { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: 0 18px 50px var(--shadow);
      padding: 16px;
    }
    .command-center { margin-bottom: 16px; }
    .center-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: start;
      margin-bottom: 14px;
    }
    .center-head p { color: var(--muted); font-size: 15px; line-height: 1.45; }
    .mission-hero {
      display: grid;
      grid-template-columns: minmax(0, 1.3fr) minmax(220px, .7fr);
      gap: 14px;
      margin-bottom: 14px;
    }
    .cockpit-shell {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(250px, .72fr) minmax(190px, .48fr);
      gap: 12px;
      align-items: start;
      margin-bottom: 14px;
    }
    .next-card {
      background: linear-gradient(135deg, rgba(56, 189, 248, .14), rgba(61, 220, 132, .08));
      border: 1px solid rgba(56, 189, 248, .34);
      border-radius: 8px;
      padding: 18px;
    }
    .next-card.compact {
      display: grid;
      align-content: start;
      gap: 10px;
    }
    .eyebrow {
      color: var(--blue);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .next-title { font-size: 20px; line-height: 1.25; margin-bottom: 0; max-width: 720px; }
    .next-command {
      display: inline-flex;
      max-width: 100%;
      margin-top: 2px;
      color: var(--green);
      background: rgba(11, 18, 32, .78);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 10px 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow-wrap: anywhere;
      align-self: start;
    }
    .status-card {
      display: grid;
      gap: 10px;
      align-content: start;
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
    }
    .likely-preview {
      display: grid;
      gap: 6px;
    }
    .likely-note {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.35;
    }
    .file-list-drawer {
      border: 1px solid var(--line);
      border-radius: 6px;
      background: rgba(11, 18, 32, .48);
      overflow: hidden;
    }
    .file-list-drawer summary {
      cursor: pointer;
      padding: 8px 10px;
      color: var(--blue);
      font-size: 13px;
      font-weight: 800;
      list-style-position: inside;
    }
    .file-list-drawer .rows {
      padding: 0 10px 10px;
    }
    .file-row {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .primary-actions {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 14px;
    }
    .command-drawer {
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 8px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .command-drawer summary {
      cursor: pointer;
      padding: 13px 14px;
      color: var(--blue);
      font-weight: 800;
      list-style-position: inside;
    }
    .command-drawer summary:hover { background: rgba(148, 163, 184, .07); }
    .workflow-actions {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      padding: 0 14px 14px;
    }
    .workflow-command {
      display: grid;
      gap: 8px;
      align-content: start;
      min-height: 96px;
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
    }
    .workflow-command h3 { margin: 0; font-size: 15px; color: var(--text); }
    .workflow-command p { color: var(--muted); font-size: 14px; line-height: 1.4; }
    .workflow-command .command-button { align-self: end; }
    .action-card {
      display: grid;
      gap: 8px;
      align-content: start;
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
    }
    .action-card h3 { margin: 0; font-size: 15px; color: var(--text); }
    .action-card p { color: var(--muted); font-size: 14px; line-height: 1.4; }
    .action-card .command-button { align-self: end; }
    .progress-panel {
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
    }
    .readiness-strip {
      display: grid;
      align-content: start;
      gap: 10px;
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
    }
    .readiness-score {
      display: flex;
      align-items: baseline;
      gap: 8px;
      color: var(--green);
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
    }
    .readiness-score span {
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
    }
    .readiness-mini {
      display: grid;
      gap: 8px;
    }
    .mini-signal {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 8px 10px;
      color: var(--text);
      font-size: 14px;
    }
    .progress-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .progress-head h2 { margin: 0; }
    .progress-head p { color: var(--muted); font-size: 14px; line-height: 1.4; }
    .progress-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 8px;
    }
    .command-center-grid {
      display: grid;
      grid-template-columns: 1.05fr .95fr;
      gap: 10px;
    }
    .score-panel {
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
    }
    .score-grid {
      display: grid;
      grid-template-columns: 126px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
    }
    .score-number {
      display: grid;
      place-items: center;
      min-height: 92px;
      color: var(--green);
      background: var(--panel-3);
      border: 1px solid rgba(61, 220, 132, .52);
      border-radius: 8px;
      font-size: 34px;
      line-height: 1;
      font-weight: 800;
    }
    .signal-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 8px; }
    .signal {
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 6px;
      font-size: 13px;
      text-align: center;
      color: var(--muted);
    }
    .timeline {
      margin-top: 10px;
      color: var(--yellow);
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 10px;
      overflow-wrap: anywhere;
    }
    .receipt-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .receipt-item {
      background: var(--panel-3);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 8px;
      min-height: 52px;
      overflow-wrap: anywhere;
    }
    .receipt-item strong { display: block; color: var(--blue); font-size: 12px; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .06em; }
    .memory-list { display: grid; gap: 8px; margin-bottom: 12px; }
    .action {
      background: var(--panel-2);
      border: 1px solid rgba(56, 189, 248, .38);
      border-radius: 8px;
      box-shadow: 0 18px 50px var(--shadow);
      padding: 18px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(220px, .8fr);
      gap: 16px;
      align-items: center;
    }
    .action-label { color: var(--blue); font-size: 14px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: .06em; }
    .action-command { color: var(--green); font-size: clamp(22px, 4vw, 36px); line-height: 1.1; overflow-wrap: anywhere; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .reason { color: var(--muted); font-size: 15px; line-height: 1.45; }
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
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 8px;
      text-align: left;
      overflow-wrap: anywhere;
    }
    button.command-button:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
    button.command-button:hover { border-color: var(--blue); color: var(--text); }
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
      border: 1px solid var(--line);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      text-align: center;
    }
    .ready-chip strong { color: var(--muted); font-size: 12px; }
    .chip { display: inline-block; padding: 5px 8px; border: 1px solid currentColor; border-radius: 999px; font-size: 12px; font-weight: 700; }
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
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 9px 10px;
      color: var(--text);
      overflow-wrap: anywhere;
      line-height: 1.2;
    }
    .cmd { color: var(--yellow); background: var(--panel-3); border: 1px solid var(--line); border-radius: 6px; padding: 9px 10px; overflow-wrap: anywhere; }
    .messages .row b { color: var(--green); }
    .pipeline { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .stage { background: var(--panel-3); border: 1px solid var(--line); border-radius: 6px; padding: 9px; min-height: 64px; display: grid; align-content: center; gap: 6px; text-align: center; }
    .stage strong { font-size: 14px; }
    .advanced {
      display: grid;
      gap: 10px;
      margin-bottom: 16px;
    }
    .advanced > h2 { margin: 0 0 2px; }
    .advanced-section {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: 0 18px 50px var(--shadow);
      overflow: hidden;
    }
    .advanced-section summary {
      cursor: pointer;
      padding: 14px 16px;
      color: var(--text);
      font-weight: 800;
      list-style-position: inside;
    }
    .advanced-section summary:hover { background: rgba(148, 163, 184, .07); }
    .advanced-body {
      display: grid;
      gap: 14px;
      padding: 0 16px 16px;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    .detail-grid.three {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .footer { margin-top: 16px; color: var(--muted); font-size: 15px; }
    @media (max-width: 980px) {
      header, .action, .cockpit { grid-template-columns: 1fr; display: grid; }
      .top-meta { justify-content: flex-start; }
      .mission-hero, .cockpit-shell { grid-template-columns: 1fr; }
      .center-head, .command-center-grid { grid-template-columns: 1fr; display: grid; }
      .primary-actions, .workflow-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .progress-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .score-grid { grid-template-columns: 1fr; }
      .signal-grid, .receipt-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .readiness { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .pipeline { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .detail-grid, .detail-grid.three { grid-template-columns: 1fr; }
      .shell { padding: 16px; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>ShipSpec Mission Control</h1>
        <p class="slug">${escapeHtml(changeTitle)} / ${escapeHtml(changeSlug)}</p>
      </div>
      <div class="top-meta">
        <span class="chip ${model.validation.ok ? "pass" : "warn"}">Spec ${model.validation.ok ? "PASS" : "WAIT"}</span>
        <span class="chip ${model.readyValidation.ok ? "pass" : "warn"}">Ready ${model.readyValidation.ok ? "PASS" : "WAIT"}</span>
        <span class="chip">Branch ${escapeHtml(model.diff.branch)}</span>
      </div>
    </header>

    <section class="command-center panel">
      <div class="center-head">
        <div>
          <h2>Mission dashboard</h2>
          <p>Calm mode: one next step first, deeper workflow details only when you open them.</p>
        </div>
        <span class="chip ${model.readyValidation.ok ? "pass" : "warn"}">Readiness Score ${readinessScore}%</span>
      </div>

      <div class="cockpit-shell">
        <div class="next-card compact">
          <div class="eyebrow">Next best step</div>
          <div class="next-title">${escapeHtml(model.next?.reason ?? "Run gsd next for guidance.")}</div>
          <div class="next-command">${escapeHtml(model.next?.command ?? "gsd next")}</div>
        </div>
        <div class="status-card">
          <div class="eyebrow">Current mission</div>
          <h2>${escapeHtml(changeTitle)}</h2>
          <p class="reason">${escapeHtml(changeSlug)}</p>
          <span class="chip ${model.validation.ok ? "pass" : "warn"}">Spec ${model.validation.ok ? "ready" : "needs work"}</span>
          <h3>Likely Files</h3>
          <div class="likely-preview">
            ${likelyPreviewRows.map((file) => `<div class="row file-row"${file.fullPath ? ` title="${escapeHtml(file.fullPath)}"` : ""}>${escapeHtml(file.label)}</div>`).join("")}
          </div>
          ${likelyOverflow > 0 ? `<p class="likely-note">${likelyFiles.length} likely files. Open full list below.</p>` : ""}
          <details class="file-list-drawer">
            <summary>Full file list</summary>
            <div class="rows">
              ${fullLikelyFiles.map((file) => `<div class="row">${escapeHtml(file)}</div>`).join("")}
            </div>
          </details>
        </div>
        <div class="readiness-strip">
          <div class="eyebrow">Readiness</div>
          <div class="readiness-score">${readinessScore}% <span>ready</span></div>
          <p class="reason">${escapeHtml(readinessReason)}</p>
          <div class="readiness-mini">
            ${compactReadinessSignals.map(([name, ok]) => `<div class="mini-signal"><span>${escapeHtml(name)}</span><span class="${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span></div>`).join("")}
          </div>
        </div>
      </div>

      <details class="command-drawer">
        <summary>Show workflow commands</summary>
        <div class="workflow-actions">
          ${commandCenterActions.map(([label, command, description]) => `<article class="workflow-command">
            <h3>${escapeHtml(label)}</h3>
            <p>${escapeHtml(description)}</p>
            <button class="command-button" type="button" data-command="${escapeHtml(command)}" title="Copy command">${escapeHtml(command)}</button>
          </article>`).join("")}
        </div>
      </details>

    </section>

    <section class="advanced" aria-label="Advanced details">
      <h2>Advanced details</h2>

      <details class="advanced-section">
        <summary>Progress and readiness</summary>
        <div class="advanced-body">
          <div class="progress-panel">
            <div class="progress-head">
              <div>
                <h2>Progress</h2>
                <p>${escapeHtml(readinessReason)}</p>
              </div>
              <span class="chip ${model.readyValidation.ok ? "pass" : "warn"}">${readinessScore}% ready</span>
            </div>
            <div class="progress-grid">
              ${readinessSignals.map(([name, ok]) => `<div class="signal"><span class="${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span> ${escapeHtml(name)}</div>`).join("")}
            </div>
          </div>

          <div class="score-grid">
            <div class="score-number" aria-label="Readiness Score">${readinessScore}%</div>
            <div>
              <h3>Readiness Score</h3>
              <p class="reason">${escapeHtml(readinessReason)}</p>
              <div class="signal-grid">
                ${readinessSignals.map(([name, ok]) => `<div class="signal"><span class="${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span> ${escapeHtml(name)}</div>`).join("")}
              </div>
            </div>
          </div>

          <div>
            <h3>Next Command</h3>
            <div class="command-actions">
              <div class="reason">Reason: ${escapeHtml(model.next?.reason ?? "Run gsd next for guidance.")}</div>
              <div class="command-note">Copy command, then run it in your terminal.</div>
              <div class="command-grid">
                ${commandButtons.map((command) => `<button class="command-button" type="button" data-command="${escapeHtml(command)}" title="Copy command">${escapeHtml(command)}</button>`).join("")}
              </div>
              <div class="copy-status" role="status" aria-live="polite"></div>
            </div>
          </div>

          <div>
            <h3>Delivery Timeline</h3>
            <div class="timeline">request -> handoff -> verify -> review -> report -> learn</div>
          </div>
        </div>
      </details>

      <details class="advanced-section">
        <summary>Evidence and memory</summary>
        <div class="advanced-body">
          <div class="detail-grid">
            <div>
              <h3>Evidence Receipt</h3>
              <div class="receipt-grid">
                ${evidenceReceiptRows.map(([label, value]) => `<div class="receipt-item"><strong>${escapeHtml(label)}</strong>${escapeHtml(value)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>Memory Summary</h3>
              <div class="memory-list">
                ${memoryRows.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
              </div>
            </div>
          </div>

          <div class="detail-grid">
            <div>
              <h3>${changedFilesTitle}</h3>
              <div class="rows">
                ${(changedFiles.length ? changedFiles : [changedFilesEmptyText]).map((file) => `<div class="row">${escapeHtml(file)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>Agent Inbox</h3>
              <div class="messages">
                ${(model.messages.length ? model.messages.slice(0, 6) : [{ role: "system", text: "No agent messages yet." }]).map((message) => `<div class="row"><b>${escapeHtml(message.role)}</b>: ${escapeHtml(message.text)}</div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="advanced-section">
        <summary>Workflow and audit</summary>
        <div class="advanced-body">
          <div class="detail-grid">
            <div>
              <h3>Workflow</h3>
              <div class="rows">
                <div class="row">Active change: ${escapeHtml(changeSlug)}</div>
                <div class="row">Evidence: ${model.specStatus.evidence ? "present" : "missing"}</div>
                <div class="row">Report: ${model.reportExists ? "present" : "missing"}</div>
                <div class="row">Release: ${model.releaseExists ? "present" : "missing"}</div>
              </div>
            </div>
            <div>
              <h3>Self-Improving Loop</h3>
              <div class="rows">
                <div class="row">Loop: ${model.loop?.loop ? "present" : "missing"}</div>
                <div class="row">Reflection: ${model.loop?.reflection ? "present" : "missing"}</div>
                <div class="row">Learn: ${model.loop?.learned ? "learned" : "skipped"}</div>
              </div>
            </div>
          </div>

          <h3>Pipeline</h3>
          <div class="pipeline">
            ${stages.map(([name, ok]) => `<div class="stage"><strong>${escapeHtml(name)}</strong><span class="chip ${ok ? "pass" : "warn"}">${ok ? "PASS" : "WAIT"}</span></div>`).join("")}
          </div>

          <div class="detail-grid">
            <div>
              <h3>Next Actions</h3>
              <div class="rows">
                ${nextActions.map((action) => `<div class="row">${escapeHtml(action)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>ShipSpec Audit</h3>
              <div class="rows">
                ${model.audit.checks.map((check) => `<div class="row">${check.ok ? "PASS" : "WAIT"} ${escapeHtml(check.name)}</div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="advanced-section">
        <summary>AI context and ship evidence</summary>
        <div class="advanced-body">
          <h2>Human + AI Context</h2>
          <div class="detail-grid three">
            <div>
              <h3>Human Decisions</h3>
              <div class="rows">
                ${(model.decisions?.length ? model.decisions : ["No recorded human decisions."]).map((decision) => `<div class="row">${escapeHtml(decision)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>Adaptive Reasoning</h3>
              <div class="rows">
                ${reasoningItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>Operator</h3>
              <div class="rows">
                ${operatorItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
              </div>
            </div>
          </div>

          <div class="detail-grid">
            <div>
              <h3>Ship Evidence</h3>
              <div class="rows">
                ${reviewItems.map((item) => `<div class="row">${escapeHtml(item)}</div>`).join("")}
              </div>
            </div>
            <div>
              <h3>ShipSpec Files</h3>
              <div class="rows">
                <div class="row">Contract: ${model.audit.checks.find((check) => check.name === "Contract")?.ok ? "present" : "missing"}</div>
                <div class="row">Agent room: ${model.audit.checks.find((check) => check.name === "Agent room")?.ok ? "present" : "missing"}</div>
              </div>
            </div>
          </div>
        </div>
      </details>
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

async function openPath(path, options = {}) {
  if (options.opener) {
    await options.opener(path);
    return;
  }

  if (process.platform === "darwin") {
    await execFileAsync("open", [path]);
    return;
  }

  if (process.platform === "win32") {
    await execFileAsync("cmd", ["/c", "start", "", path]);
    return;
  }

  await execFileAsync("xdg-open", [path]);
}

async function openUiDashboard(root, options = {}) {
  const uiPath = join(root, ".gsd", "ui", "index.html");
  await openPath(uiPath, options);
  return uiPath;
}

async function openAppDashboard(root, options = {}) {
  const appPath = join(root, ".gsd", "app", "index.html");
  await openPath(appPath, options);
  return appPath;
}

function formatUiResult(result, options = {}) {
  const lines = [
    "ShipSpec Mission Control ready",
    "",
    "UI: .gsd/ui/index.html",
    "",
    "Open it:",
    "  open .gsd/ui/index.html",
    "",
    "Or run:",
    "  gsd ui --open",
  ];

  if (options.opened) lines.push("", "Opened: .gsd/ui/index.html");
  if (!result.ok) lines.unshift(result.message);
  return lines.join("\n");
}

function formatAppResult(result, options = {}) {
  const lines = [
    "ShipSpec App ready",
    "",
    "App: .gsd/app/index.html",
    "",
    "Open it:",
    "  open .gsd/app/index.html",
    "",
    "Or run:",
    "  gsd app --open",
  ];

  if (options.opened) lines.push("", "Opened: .gsd/app/index.html");
  if (!result.ok) lines.unshift(result.message);
  return lines.join("\n");
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
    '  gsd "Feature"',
    "  gsd autopilot",
    "  gsd codex",
    "  gsd run <request>",
    "  gsd fix <small fix>",
    "  gsd ship",
    "  gsd doctor",
    "  gsd share",
    "  gsd ask",
    "  gsd rag <query>",
    "  gsd ui",
    "  gsd ui --open",
    "  gsd app",
    "  gsd app --open",
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
    "  run [--open] [request]",
    "  autopilot",
    '  "feature request"',
    "  quickstart [--light] <feature>",
    "  configure",
    "  start <change title>",
    "  next [--json]",
    "  ui [--open]",
    "  app [--open]",
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
  "  context [--json]",
  "  rag [--json] <query>",
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
