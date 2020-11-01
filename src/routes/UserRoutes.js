const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");


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

    userRepository.updateUser(body).then(ret => {
        firebase.auth()
            .signInWithEmailAndPassword(body.oldUser.email, body.newUser.password)
            .then((userCredential) => {
                userCredential.updateEmail(body.newUser.email).then((ret2) => {
                    res.json({
                        Message: ret2
                    })
                }).catch((e) => {
                    res.status(500).json({
                        Message: e
                    })
                });
            }).catch((e) => {
            });
        // console.log('dang', user);

    }).catch(err => {
        console.log('frombs', err)
        res.status(500).json({
            Message: err
        });
    })

});

routes.post('/getFavorites', (req, res) => {
    let favorites = [];

    db.query(`SELECT FAVORITE.recipeLink
                FROM USER_SESSION INNER JOIN USER_ACCOUNT ON USER_ACCOUNT.email = USER_SESSION.userEmail
                INNER JOIN FAVORITE ON FAVORITE.userEmail = USER_ACCOUNT.email
                WHERE USER_SESSION.sessionId = '${req.body.auth}'`, (error, response) => {
        if(error) {
            console.log(error);
            res.json([]);
        }

        else {
            response.rows.forEach(row => favorites.push(row.recipelink));
            res.json(favorites);
        }
    });
});

routes.post('/favorite', (req, res) => {
    db.query(`SELECT userEmail FROM USER_SESSION WHERE sessionId = '${req.body.auth}'`, (error, response) => {
        if(error) {
            console.log(error);
            res.json({error: true});
        }

        else {
            if(response.rows.length) {
                db.query(`INSERT INTO FAVORITE VALUES ('${response.rows[0].useremail}', '${req.body.recipelink}')`, (error, response) => {
                    if(error) {
                        console.log(error);
                        res.json({error: true});
                    }

                    else
                        res.json({error: false});
                });
            }
        }
    });
});

module.exports = routes;