const express = require('express');
const routes = express.Router();
const CompoundSearcher = require('../models/CompoundSearcher');
const Crawler = require('../models/Crawler');
const DatabaseSearcher = require('../models/DatabaseSearcher');
const db = require('../../db/dbConfig');

routes.get('/search', (req, res) => {
	let searcher = new CompoundSearcher();

    if(req.query.internal != undefined)
	   searcher.addChild(new Crawler(req.query.q, req.query.page));

    if(req.query.thirdparty != undefined)
	   searcher.addChild(new DatabaseSearcher(db, req.query.q));

    searcher.getResults().then((results) => {
        res.json(results);
    }).catch(e => {
        res.status(500).json({
            Message: e
        })
    });
});

module.exports = routes;