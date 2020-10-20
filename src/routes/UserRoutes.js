const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
require("firebase/auth");
var firebase = require("firebase/app");


routes.post('/createUser', async (req, res, next) => {
    var body = req.body;
    userRepository.addUser(body.name, body.email).then( ret => {
        if(ret.name == "error"){
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
        if(ret.name == "error"){
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


module.exports = routes;