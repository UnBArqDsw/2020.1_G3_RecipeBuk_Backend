const Searcher = require('./Searcher.js');

module.exports = class DatabaseSearcher extends Searcher {
	constructor(connection, searchTerm) {
		super();
		this.connection = connection;
		this.searchTerm = searchTerm;
	}

	getResults() {
		return new Promise((resolve, reject) => {
			this.connection.query("SELECT recipeId, name, time, portions FROM recipe WHERE visibility = TRUE", (err, res) => {
				if(err) {
					console.log(err);
					resolve([]);
				}

				else {
					let results = [];

					res.rows.forEach((row) => {
						results.push({
							link: `/recipes/${row.recipeid}`,
							title: row.name,
							img_url: 'https://www.callinvest.com.br/wp-content/uploads/2017/08/indisponivel.png'
						});
					});

					resolve({name: 'recipebuk', results: results});
				}
			});
		});
	}
}