const Searcher = require('./Searcher.js');

var children;
module.exports = class CompoundSearcher extends Searcher {
	constructor() {
		super();
		this.children = [];
		children = this.children;
	}

	addChild(child) {
		this.children.push(child);
	}

	getResults() {
		return new Promise(async function(resolve, reject) {
			let results = [];

			for(let child of children) {
				let result = await child.getResults();
				results.push(result);
			}

			resolve(results);
		});
	}
}