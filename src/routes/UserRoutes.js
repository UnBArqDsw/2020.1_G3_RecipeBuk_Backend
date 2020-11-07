const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");
var admin = require('firebase-admin');


routes.post('/createUser', async (req, res, next) => {
    var body = req.body;
    userRepository.addUser(body.name, body.email).then(ret => {
        if (ret.name == "error") {
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(() => {

                res.status(200).json({
                    Message: "Usuário registrado!"
                })
            }).catch(e => {
                userRepository.deleteUser(body.email);
                res.status(500).json({
                    Message: e
                })
            })
        }
    }).catch(e => {
        res.status(500).json({
            Message: e
        })
    })
});

routes.post('/deleteUser', async (req, res, next) => {
    var body = req.body;

    userRepository.deleteUser(body.email).then(ret => {
        if (ret.name == "error") {
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Usuário removido"
            })
        }
    })

});

routes.post('/login', async (req, res, next) => {
    const body = req.body;
    firebase.auth().signInWithEmailAndPassword(body.email, body.password).then(() => {
        userRepository.login(body.email).then((response) => {
            res.json(response);
        });
    }).catch((error) => {
        res.json({error: error.code});
    });
});

routes.post('/logout', async (req, res, next) => {
    userRepository.logout(req.body.auth).then(response => res.json(response));
});

routes.post('/updateUser', async (req, res, next) => {
    var body = req.body;
    let userUid;
    userRepository.updateUser(body).then(ret => {
        admin.auth().getUserByEmail(req.body.oldUser.email)
            .then(function (userRecord) {
                userUid = userRecord.toJSON().uid;

                admin.auth().updateUser(userUid, {
                    email: req.body.newUser.email,
                    displayName: req.body.newUser.name
                })
                    .then(function (userRecord) {

                        res.json({
                            Message: ret
                        })
                    })
                    .catch(function (error) {
                        console.log('Error updating user:', error);
                    });
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
            });

    }).catch(err => {
        console.log(err)
        res.status(500).json({
            Message: err
        });
    })

});

routes.post('/getFavorites', (req, res) => {
    userRepository.getFavorites(req.body.auth).then(response => res.json(response));
});

routes.post('/favorite', (req, res) => {
    userRepository.favorite(req.body.auth, req.body.recipelink).then(response => res.json(response));
});

module.exports = routes;