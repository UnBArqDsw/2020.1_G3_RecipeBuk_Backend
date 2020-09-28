const db = require("./db/dbConfig");

var express = require('express');
var app = express();
const Crawler = require('./src/models/Crawler');

app.get('/', function (req, res) {
  res.send('Recipe Buk');
});

app.get('/search', (req, res) => {
    let crawler = new Crawler(req.query.q, req.query.page);
    crawler.getResults().then((results) => {
        res.json(results);
    });
});

app.listen(3000, function () {
  console.log('Recipe Buk Backend listening on port 3000!');
});
