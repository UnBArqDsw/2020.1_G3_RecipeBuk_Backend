const express = require('express');
const routes = express.Router();


routes.get('/', async (req, res, next) => {
    res.json({
        Server: "Recipe Buk",
        Endpoints: [{
            User: "/user"
        }]
    })
});

module.exports = routes;