"use strict";

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gsdDesktop', {
  getProject: () => ipcRenderer.invoke('project:get'),
  selectProject: () => ipcRenderer.invoke('project:select'),
  runGsd: (args) => ipcRenderer.invoke('gsd:run', args),
});
