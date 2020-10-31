const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
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
    var body = req.body;
    console.log(body);
    userRepository.login(body.email).then(ret => {
        console.log(typeof (ret))
        if (typeof (ret) == "string") {
            res.status(500).json({
                Message: ret
            })
        } else {
            firebase.auth().signInWithEmailAndPassword(body.email, body.password).then(() => {
                res.json({
                    Message: ret
                })
            }).catch(err => {
                res.status(500).json({
                    Message: err
                })
            });
        }

    }).catch(err => {
        res.status(500).json({
            Message: err
        })
    })

});

routes.post('/updateUser', async (req, res, next) => {
    var body = req.body;
    let userUid;
    console.log(req.body);
    userRepository.updateUser(body).then(ret => {
        admin.auth().getUserByEmail(req.body.oldUser.email)
            .then(function (userRecord) {
                userUid = userRecord.toJSON().uid;
                // console.log('Successfully fetched user data:', userRecord.toJSON());
                admin.auth().updateUser(userUid, {
                    email: req.body.newUser.email,
                    displayName: req.body.newUser.name
                })
                    .then(function (userRecord) {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully updated user', userRecord.toJSON());
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
        console.log('frombs', err)
        res.status(500).json({
            Message: err
        });
    })

});


module.exports = routes;