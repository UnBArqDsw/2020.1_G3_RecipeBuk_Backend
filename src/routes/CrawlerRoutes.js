const express = require('express');
const routes = express.Router();
const Crawler = require('../models/Crawler');

routes.get('/search', (req, res) => {
    let crawler = new Crawler(req.query.q, req.query.page);
    crawler.getResults().then((results) => {
        res.json(results);
    }).catch(e => {
        res.status(500).json({
            Message: e
        })
    });
});

module.exports = routes;