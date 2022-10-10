/* Import the Node Modules */
const path = require ("node:path");
const fsPromises = require ("node:fs/promises");

/* Import the External Modules */
const { app, BrowserWindow, Tray, Menu, ipcMain } = require ("electron");
const NodeID3 = require ("node-id3");

const musicDirectory = "D:/Musics";

let mainWindow = null;
let mainTray = null;

// Initialize the Application
function init() {
	readMusicAll();
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

// Read the Directory Containing the Music
function readMusicAll() {
	let promises = [];

	fsPromises.readdir (musicDirectory).then (async _files => {
		for (const file of _files) {
			if (path.extname(file) == ".mp3")
				promises.push (readAudioTags(path.join(musicDirectory, file)));
		}

		await Promise.all (promises);
		console.log ("All Done! " + promises.length);

		// Event
		mainWindow.webContents.send ("music-all-loaded");
	})
}

function addMusic (_path) {
	readAudioTags (_path)
	let name = _tags["artist"] + " - " + _tags["title"];
	mainWindow.webContents.send ("add-music", name, _path);
	console.log
}

/**
 * Read the Artist, Title & Album from the Path
 * @param { string } The Path of the Audio File
 * @return { promise({ artist=string, title=string, ?album=string }) }
 */
function readAudioTags (_path) {
	return new Promise ((_resolve, _reject) => {
		NodeID3.read (_path, (_error, _tags) => {
			if (_error) throw _error;

			mainWindow.webContents.send ("add-music", _tags["artist"] + " - " + _tags["title"], _path);

			_resolve ({
				artist: _tags["artist"] || "Unknown",
				title: _tags["title"] || "Untitled",
				album: _tags["album"] || null
			});
		});
	});
}

/**
 * @param { string } A Path of the Audio File
 * @return { string } Base64 Data of the Audio
 */
function readAudioData (_path) {
	return new Promise ((_resolve, _reject) => {
		console.log (_path)
		fsPromises.readFile (_path, { encoding: "base64" }).then (_data => {
			_resolve ("data:audio/mpeg;base64," + _data);
		});
	});
}

/* Renderer Event */
ipcMain.on ("minimize-window", () => mainWindow.hide());
ipcMain.on ("close-window", () => mainWindow.close());

ipcMain.handle ("get-music-data", async (_e, _path) => {
	return await readAudioData (_path);
});

/* Application Event */
app.once ("ready", () => init());
app.once ("window-all-closed", () => app.quit());
