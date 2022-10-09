// Import ipcRenderer
const { ipcRenderer } = require ("electron");

document.getElementById ("windowMinimizeButton").addEventListener ("click", () => ipcRenderer.send("minimize-window"));
document.getElementById ("windowCloseButton").addEventListener ("click", () => ipcRenderer.send("close-window"));
