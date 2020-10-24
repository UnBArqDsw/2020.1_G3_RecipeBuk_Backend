import Searcher from './Searcher.js';

module.exports = class DatabaseSearcher extends Searcher {
	constructor(connection, searchTerm) {
		super();
		this.connection = connection;
		this.searchTerm = searchTerm;
	}

	getResults() {
		/*return new Promise((resolve, reject) => {
			let results = [];

			resolve(results);
		});*/
	}
}