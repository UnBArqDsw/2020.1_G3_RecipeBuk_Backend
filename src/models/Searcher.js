module.exports = class Searcher {
	constructor() {
		if(new.target === Search)
			throw new TypeError("Attempt to instance Abstract Class Search");
	}

	//setSearchTerm(searchTerm) {}

	//setPage(page) {}

	getResults() {}
}

			- CompoundSearcher
//Searcher -: - Crawler
			- DatabaseSearcher