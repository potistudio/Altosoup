class Player {
	#playing = false;

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
	}

	/**
	 * @param { string } A Base64 Data of the Audio
	 */
	setMusic (_data) {
		this.#playing = false;
		this.#audioElement.pause();
		this.#audioElement.src = _data;
	}

	/**
	 * Play the Audio
	 */
	play() {
		this.#playing = true;
		this.#audioElement.play();
	}

	/**
	 * Pause the Playing Audio
	 */
	pause() {
		this.#playing = false;
		this.#audioElement.pause();
	}

	get playing() { return this.#playing; }

	set gain (value) { this.#gainNode.gain.value = value; }
	get gain () { return this.#gainNode.gain.value; }
}
