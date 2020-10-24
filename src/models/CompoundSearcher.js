import Searcher from './Searcher.js';

module.exports = class CompoundSearcher extends Searcher {
	constructor() {
		super();
		this.children = [];
	}

	addChild(child) {
		children.push(child);
	}

	getResults() {
		return new Promise((resolve, reject) => {
			let results = [];

			children.forEach((child) => {
				child.getResults().then(result => results.push(result));
			});

			resolve(results);
		});
	}
}

			- CompoundSearcher
//Searcher -: - Crawler
			- DatabaseSearcher