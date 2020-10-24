const Searcher = require('./Searcher.js');
const crawler = require('crawler');

module.exports = class Crawler extends Searcher {
	constructor(search_term, search_page = 1) {
		super();
		this.search_term = search_term;
        this.search_results = [];
        this.search_crawler = new crawler({
            maxConnections: 10,
            retries: 3,
            retryTimeout: 5000
        });
        this.search_page = search_page;
        this.websites_queue = []
    }

    generate_websites_queue() {
        //Tudo Gostoso
        this.websites_queue.push({
            uri: `https://www.tudogostoso.com.br/busca?q=${encodeURIComponent(this.search_term)}&page=${encodeURIComponent(this.search_page)}`,
            callback: (error, res, done) => {
                if(error) {
					this.search_results.push({name: 'TudoGostoso', error: 503, results: []});
                } else {
					try {
						let $ = res.$;
						let recipe_cards = $(".recipe-card");
						let results = [];
						
						for(var c = 0; c < recipe_cards.length; c += 1) {
							let recipe_info = recipe_cards[c].children.pop();
							let recipe_picture = recipe_info.children[0];
							let recipe_text_info = recipe_info.children[2];
							
							let recipe_link = recipe_info.attribs.href;
							let recipe_title = recipe_text_info.children[3].children[0].data.replace(/\n/g, '');
							let recipe_img_url = recipe_picture.children[1].attribs.src;

							results.push({
								link: 'https://www.tudogostoso.com.br' + recipe_link,
								title: recipe_title,
								img_url: recipe_img_url
							});
						}

						this.search_results.push({name: 'TudoGostoso', results: results});
					}
					
					catch(e) {
						this.search_results.push({name: 'TudoGostoso', error: 500, results: []});
					}
				}

                done();
            }
        });

        //Tastemade
        this.websites_queue.push({
            uri: `https://www.tastemade.com.br/pesquisa?q=${encodeURIComponent(this.search_term)}&${encodeURIComponent(this.search_page)}`,
            callback: (error, res, done) => {
                if(error){
					this.search_results.push({name: 'Tastemade', error: 503, results: []});
                } else {
					try {
						let $ = res.$;
						let recipe = $(".cFSrYV");
						let results_tastemade = [];

						for(var c = 0; c < recipe.length; c+=1){
							let recipe_info = recipe[c].children;
					
			
							let recipe_text_info = recipe_info[1].children[0];


							let recipe_link = `https://www.tastemade.com.br${recipe_info[0].children[0].attribs.href}`;
							let recipe_title = recipe_text_info.children[0].children[0].data;

							results_tastemade.push({
								link: recipe_link,
								title: recipe_title,
								img_url: 'https://www.callinvest.com.br/wp-content/uploads/2017/08/indisponivel.png',
							});
						}
						this.search_results.push({name: 'Tastemade', results: results_tastemade});
					}
					
					catch(e) {
						this.search_results.push({name: 'Tastemade', error: 500, results: []});
					}
                }
              done();
            }
        });
      
        //Tudo Receitas
        this.websites_queue.push({
            uri: `https://www.tudoreceitas.com/pesquisa/q/${encodeURIComponent(this.search_term)}/pag/${encodeURIComponent(this.search_page)}`,
            callback: (error, res, done) => {
                if(error) {
					this.search_results.push({name: 'TudoReceitas', error: 503, results: []});
                } else {
					try {
						let $ = res.$;
						let result_cards = $(".resultado");
						let results = [];

						if(this.search_page <= Math.ceil(parseInt($(".titulo--search").text().replace(/\./g, '').match(/\d+/)[0])/40)) {
							for(var c = 0; c < result_cards.length; c += 1) {
								let recipe_text_info = result_cards[c].children[3];
								let recipe_picture = result_cards[c].children[1];
								
								let recipe_link = recipe_text_info.attribs.href;
								let recipe_title = recipe_text_info.children[0].data;
								let recipe_img_url = recipe_picture.children[1].attribs['data-imagen'];

								results.push({
									link: recipe_link,
									title: recipe_title,
									img_url: recipe_img_url
								});
							}
						}

						this.search_results.push({name: 'TudoReceitas', results: results});
					}
					
					catch(e) {
						this.search_results.push({name: 'TudoReceitas', error: 500, results: []});
					}
                }
                done();
            }
        });
    }

    getResults() {
        this.generate_websites_queue();

        return new Promise((resolve, reject) => {
            this.search_crawler.queue(this.websites_queue);
            this.search_crawler.on('drain', () => {
                resolve(this.search_results);
            });
        });
    }
};
