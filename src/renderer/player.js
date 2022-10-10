class Player {
	#playing = false;
	#ended = false;

	#audioElement = null;
	#gainNode = null;

	constructor() {
		let audioContext = new AudioContext();
		let audioElement = document.createElement ("audio");
		let audioSource = audioContext.createMediaElementSource (audioElement);
		let gainNode = audioContext.createGain();

		audioSource.connect (gainNode);
		gainNode.connect (audioContext.destination);

		this.#audioElement = audioElement;
		this.#gainNode = gainNode;

		audioElement.addEventListener ("ended", () => { this.#ended = true; });
	}

	/**
	 * @param { string } A Base64 Data of the Audio
	 */
	setMusic (_data) {
		this.#playing = false;
		this.#ended = false;
		this.#audioElement.pause();
		this.#audioElement.src = _data;
	}

	// Play the Audio
	play() {
		this.#playing = true;
		this.#audioElement.play();

		document.getElementById ("playButton").children[0].style.visibility = "hidden";
		document.getElementById ("playButton").children[1].style.visibility = "visible";
	}

	// Pause the Playing Audio
	pause() {
		this.#playing = false;
		this.#audioElement.pause();

		document.getElementById ("playButton").children[0].style.visibility = "visible";
		document.getElementById ("playButton").children[1].style.visibility = "hidden";
	}

	get playing () { return this.#playing; }
	get ended () { return this.#ended; }

	set gain (value) { this.#gainNode.gain.value = value; }
	get gain () { return this.#gainNode.gain.value; }
}
