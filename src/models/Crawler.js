const crawler = require('crawler');

module.exports = class Crawler {
	constructor(search_term) {
		this.search_term = search_term;
        this.search_results = [];
        this.search_crawler = new crawler({
            maxConnections: 10,
            retries: 3,
            retryTimeout: 5000
        });
        this.websites_queue = []
    }

    generate_websites_queue() {
        return;
    }

    getResults() {
        this.generate_websites_queue();

        return new Promise((resolve, reject) => {
            this.search_crawler.queue(this.websites_queue);
            this.search_crawler.on('drain', () => {
                resolve(search_results);
            });
        });
    }
};
