const express = require('express');
const userRoutes = require('./UserRoutes');
const homeRoutes = require('./homeRouter');
const recipesRoutes = require('./recipesRoutes');
const searchRoutes = require('./SearchRoutes');
const bookRoutes = require('./BookRoutes');
const router = express.Router();

router.get('/', (req, res) => {   
    res.json({
        server: "Recipe Buk"
    });
});
module.exports = (app) => {
    app.use('/', [userRoutes], [homeRoutes], [searchRoutes], [recipesRoutes], [bookRoutes]);
};
