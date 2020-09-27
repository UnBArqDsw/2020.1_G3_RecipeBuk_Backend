const crawler = require('crawler');

module.exports = class Crawler {
	constructor(search_term, search_page = 1) {
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
            uri: `https://www.tudogostoso.com.br/busca?q=${this.search_term}&page=${this.search_page}`,
            callback: (error, res, done) => {
                if(error) {
                    console.log(error);
                } else {
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

                    this.search_results.push({name: 'tudogostoso', results: results});
                }

                done();
            }
        });

        //Tudo Receitas
        this.websites_queue.push({
            uri: `https://www.tudoreceitas.com/pesquisa/q/${this.search_term}/pag/${this.search_page}`,
            callback: (error, res, done) => {
                if(error) {
                    console.log(error);
                } else {
                    let $ = res.$;
                    let result_cards = $(".resultado");
                    let results = [];

                    if(this.search_page <= Math.ceil(parseInt($(".titulo--search").text().match(/\d+/)[0])/40)) {
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

                    this.search_results.push({name: 'tudoreceitas', results: results});
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
