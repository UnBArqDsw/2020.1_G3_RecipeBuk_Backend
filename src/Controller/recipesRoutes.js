const express = require('express');
const Recipes = require('../models/RecipesRegistration');
const routes = express.Router();
const RecipesResgistration = require('../models/RecipesRegistration');

routes.get('/recipesRegistration', (req, res) => {
    let recipes = new RecipesResgistration(req.query.q, req.query.page);
    crawler.getResults().then((results) => {
        res.json(results);
    }).catch(e => {
        res.status(500).json({
            Message: e
        })
    });
});

module.exports = routes;
