// Import the Node Modules
const path = require ("node:path");

// Import the External Modules
const { app, BrowserWindow, ipcMain } = require ("electron");

/**
 * @type { BrowserWindow }
 */
let mainWindow = null;

/**
 * Initialize the Application
 * @use { function }
 */
function init() {
	createWindow();
}

/**
 * Create a Application Window
 * @use { function }
 */
function createWindow() {
	mainWindow = new BrowserWindow ({
		width: 1280,
		height: 720,
		frame: false,
		transparent: true,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.webContents.loadFile (path.join(__dirname, "../static", "index.html"));

	mainWindow.once ("ready-to-show", () => mainWindow.show());
}

ipcMain.on ("minimize-window", () => mainWindow.hide());
ipcMain.on ("close-window", () => mainWindow.close());

app.once ("ready", () => init());
app.once ("window-all-closed", () => app.quit());
