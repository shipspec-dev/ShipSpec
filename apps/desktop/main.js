"use strict";

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
