var express = require('express');
var app = express();
const Crawler = require('crawler');

app.get('/', function (req, res) {
  res.send('Recipe Buk');
});

app.get('/tudogostoso', (req, res) => {
    let tg_results = [];
    let tg_crawler = new Crawler({
        maxConnections: 10,
        callback: (error, res, done) => {
            if(error) {
                console.log(error);
            } else {
                var $ = res.$;
                let recipe_cards = $(".recipe-card");
                
                for(var c = 0; c < recipe_cards.length; c += 1) {
                    let recipe_info = recipe_cards[c].children.pop();
                    let recipe_picture = recipe_info.children[0];
                    let recipe_text_info = recipe_info.children[2];
                    
                    let recipe_link = recipe_info.attribs.href;
                    let recipe_title = recipe_text_info.children[3].children[0].data.replace(/\n/g, '');
                    let recipe_img_url = recipe_picture.children[1].attribs.src;

                    tg_results.push({
                        link: recipe_link,
                        title: recipe_title,
                        img_url: recipe_img_url
                    });
                }
            }

            done();
        }
    });

    tg_crawler.queue(`https://www.tudogostoso.com.br/busca?q=${req.query.param}`);
    tg_crawler.on('drain', () => {
        res.json(tg_results);
    });
});

app.listen(3000, function () {
  console.log('Recipe Buk Backend listening on port 3000!');
});
