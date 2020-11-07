module.exports = class Searcher {
	constructor() {
		if(new.target === Searcher)
			throw new TypeError("Attempt to instance Abstract Class Search");
	}

	getResults() {}
}