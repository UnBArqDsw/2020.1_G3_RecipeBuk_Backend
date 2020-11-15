const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");
var admin = require('firebase-admin');
const bcrypt = require('bcrypt');

routes.post('/createUser', async (req, res, next) => {
    var body = req.body;

    userRepository.addUser(body.name, body.email, body.password).then(response => res.json(response));
});

routes.post('/deleteUser', async (req, res, next) => {
    var body = req.body;

    userRepository.deleteUser(body.email, body.password).then(response => res.json(response));
});

routes.post('/login', async (req, res, next) => {
    const body = req.body;
    userRepository.login(body.email, body.password).then((response) => {
        res.json(response);
    });
});

routes.post('/logout', async (req, res, next) => {
    userRepository.logout(req.body.auth).then(response => res.json(response));
});

routes.post('/updateUser', async (req, res, next) => {
    userRepository.updateUser(req.body.info, req.body.auth, req.body.password).then(response => res.json(response));
});

routes.post('/getFavorites', (req, res) => {
    userRepository.getFavorites(req.body.auth).then(response => res.json(response));
});

routes.post('/favorite', (req, res) => {
    userRepository.favorite(req.body.auth, req.body.recipeLink, req.body.recipeTitle, req.body.recipeImage).then(response => res.json(response));
});

module.exports = routes;