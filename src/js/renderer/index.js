"use strict";
const { ipcRenderer } = require("electron");
document.getElementById("windowCloseButton")?.addEventListener("click", () => ipcRenderer.send("close-window"));
document.getElementById("windowMaximizeButton")?.addEventListener("click", () => ipcRenderer.send("resize-window"));
document.getElementById("windowMinimizeButton")?.addEventListener("click", () => ipcRenderer.send("minimize-window"));
