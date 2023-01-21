const path = require ("node:path");
const { app, BrowserWindow, ipcMain } = require ("electron");

let mainWindow: typeof BrowserWindow = null;

function createWindow(): void {
	mainWindow = new BrowserWindow ({
		width: 1280,
		height: 720,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.loadFile (path.join(__dirname, "../../../static", "index.html"));
	mainWindow.once ("ready-to-show", () => mainWindow.show());
}

ipcMain.on ("close-window", () => mainWindow.close());
ipcMain.on ("resize-window", () => {
	if (mainWindow.isMaximized())
		mainWindow.unmaximize();
	else
		mainWindow.maximize();
});
ipcMain.on ("minimize-window", () => mainWindow.minimize());

app.once ("ready", () => createWindow());
app.once ("window-all-closed", () => app.quit());