const express = require('express');
const routes = express.Router();
const CompoundSearcher = require('../models/CompoundSearcher');
const Crawler = require('../models/Crawler');
const DatabaseSearcher = require('../models/DatabaseSearcher');

routes.get('/search', (req, res) => {
	let searcher = new CompoundSearcher();
	searcher.addChild(new Crawler(req.query.q, req.query.page));
	searcher.addChild(new DatabaseSearcher(null, req.query.q));

    searcher.getResults().then((results) => {
        res.json(results[0].length ? results[0] : results[1]);
    }).catch(e => {
        res.status(500).json({
            Message: e
        })
    });
});

module.exports = routes;