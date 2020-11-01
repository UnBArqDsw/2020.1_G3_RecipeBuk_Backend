const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");


routes.post('/createUser', async (req, res, next) => {
    var body = req.body;
    var result = "Sucesso";
    userRepository.addUser(body.name, body.email).then(async () => {
        firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(() => {
            Message = "Usuário registrado!"
        }).catch(e => {
            
            res.status(500).json({
                Message: e
            })
        })

        }).catch(e => {
            res.status(500).json({
                Message: e
            })
        })
    firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(() => {
        Message = "Usuário registrado!"
    }).catch(e => {
        Message = e;
    })
    

});

routes.post('/deleteUser', async (req, res, next) => {
    var body = req.body;
    var result;
    try {
        userRepository.deleteUser(body.email);
        result = "Usuário removido!"
    } catch (e) {
        result = e;
    }
    res.json({
        Message: result
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