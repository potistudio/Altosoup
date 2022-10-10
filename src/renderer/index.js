// Import ipcRenderer
const { ipcRenderer } = require ("electron");

/* Import External Modules */
const anime = require ("animejs");

document.getElementById ("windowMinimizeButton").addEventListener ("click", () => ipcRenderer.send("minimize-window"));
document.getElementById ("windowCloseButton").addEventListener ("click", () => ipcRenderer.send("close-window"));

ipcRenderer.on ("music-all-loaded", () => {
	anime ({
		targets: ".Loading-Music",
		translateY: -20,
		opacity: 0,
		duration: 1000
	});
});
