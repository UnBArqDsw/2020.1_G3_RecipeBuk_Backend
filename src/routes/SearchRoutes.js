const express = require('express');
const routes = express.Router();
const searchController = require('../controller/SearchController');

routes.get('/search', (req, res, next) => {
    searchController.search(req, res, next);
});

module.exports = routes;