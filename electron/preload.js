const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('recorder', {
    start: () => ipcRenderer.invoke('record:start'),
    stop: () => ipcRenderer.invoke('record:stop')
});

console.log("Preload script loaded");