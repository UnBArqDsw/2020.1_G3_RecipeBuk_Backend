const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
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


module.exports = routes;