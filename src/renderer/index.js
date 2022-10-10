// Import ipcRenderer
const { ipcRenderer } = require ("electron");

/* Import External Modules */
const anime = require ("animejs");

const player = new Player();

document.getElementById ("windowMinimizeButton").addEventListener ("click", () => ipcRenderer.send("minimize-window"));
document.getElementById ("windowCloseButton").addEventListener ("click", () => ipcRenderer.send("close-window"));

const playButton = document.getElementById ("playButton").addEventListener ("click", () => {
	playButton.children[0].style.visibility = "hidden";
	playButton.children[1].style.visibility = "visible";
});

function addMusicElement (_name, _path) {
	let element = document.createElement ("div");
	element.classList.add ("List-Element");

	let text = document.createElement ("span");
	text.innerText = _name;
	console.log (_path)

	element.addEventListener ("click", async () => {
		player.setMusic (await ipcRenderer.invoke("get-music-data", _path));
		player.play();
	});

	element.appendChild (text);
	document.getElementById ("musicList").appendChild (element);
}

ipcRenderer.on ("music-all-loaded", () => {
	anime ({
		targets: ".Loading-Music",
		translateY: -20,
		opacity: 0,
		duration: 1000
	});
});

ipcRenderer.on ("add-music", (_e, _name, _path) => addMusicElement (_name, _path));
