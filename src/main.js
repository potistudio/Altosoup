/* Import the Node Modules */
const path = require ("node:path");

/* Import the External Modules */
const { app, BrowserWindow, Tray, Menu, ipcMain } = require ("electron");

let mainWindow = null;
let mainTray = null;

// Initialize the Application
function init() {
	createWindow();
	createTray();
}

// Create a Application Window
function createWindow() {
	mainWindow = new BrowserWindow ({
		width: 1280,
		height: 720,
		frame: false,
		transparent: true,
		resizable: false,
		minimizable: false,
		maximizable: false,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.webContents.loadFile (path.join(__dirname, "../static", "index.html"));

	mainWindow.once ("ready-to-show", () => mainWindow.show());
}

// Create a Tray
function createTray() {
	mainTray = new Tray (path.join(__dirname, "../resources/icons", "tray.png"));

	const contextMenu = Menu.buildFromTemplate ([
		{ label: "Show Window", click: () => mainWindow.show() },
		{ label: "Quit", click: () => app.quit() }
	]);

	mainTray.setToolTip ("Altosoup");
	mainTray.setContextMenu (contextMenu);

	mainTray.on ("click", () => mainWindow.show());
}

/* Renderer Event */
ipcMain.on ("minimize-window", () => mainWindow.hide());
ipcMain.on ("close-window", () => mainWindow.close());

/* Application Event */
app.once ("ready", () => init());
app.once ("window-all-closed", () => app.quit());
