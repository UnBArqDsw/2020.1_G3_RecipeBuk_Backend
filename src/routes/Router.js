const express = require('express');
const userRoutes = require('./UserRoutes');
const homeRoutes = require('./homeRouter');
const crawlerRoutes = require('./CrawlerRoutes');
const recipesRoutes = require('./recipesRoutes');
const router = express.Router();

router.get('/', (req, res) => {   
    res.json({
        server: "Recipe Buk"
    });
});
module.exports = (app) => {
    app.use('/', [userRoutes],[homeRoutes], [crawlerRoutes], [recipesRoutes]);
};
