const Searcher = require('./Searcher.js');

module.exports = class CompoundSearcher extends Searcher {
	constructor() {
		super();
		this.children = [];
	}

	addChild(child) {
		this.children.push(child);
	}

	getResults() {
		var self = this;
		return new Promise(async function(resolve, reject) {
			let results = [];

			for(let child of self.children) {
				let result = await child.getResults();
				results.push(result);
			}

			resolve(results);
		});
	}
}