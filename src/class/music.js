module.exports = class Music {
	#path = "";
	#artist = "";
	#title = "";
	#album = "";

	constructor (_path, _artist, _title, _album) {
		this.#path = _path;
		this.#album = _album;
		this.#title = _title;
		this.#album = _album;
	}

	get path () { return this.#path; }
	set path (value) { this.#path = value; }
}
