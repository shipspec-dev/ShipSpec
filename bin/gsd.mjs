#!/usr/bin/env node
import { runCli } from "../src/gsd.mjs";

const result = await runCli(process.argv.slice(2), { cwd: process.cwd() });
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exitCode = result.exitCode;
