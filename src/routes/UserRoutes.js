const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');

routes.get('/user', async (req, res, next) => {
    res.json({
        Message: "ok"
    })
});

module.exports = routes;