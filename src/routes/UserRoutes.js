const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
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

    userRepository.login(body.email).then(ret => {
        console.log(typeof(ret))
        if(typeof(ret) == "string"){
            res.status(500).json({
                Message: ret                
            })
        } else {
            firebase.auth().signInWithEmailAndPassword(body.email, body.password).then(() =>{
                res.json({
                    Message: ret
                })
            }).catch( err =>{
                res.status(500).json({
                    Message: err
                })
            });
        }

    }).catch(err=>{
        res.status(500).json({
            Message: err
        })
    }) 

});

routes.post('/updateUser', async (req, res, next) => {
    var body = req.body;

    userRepository.updateUser(body.email,body.name).then(ret => {
        if(typeof(ret) == "string"){
            res.status(500).json({
                Message: ret                
            })
        } else {
            res.json({
                Message: ret
            })
        }

    }).catch(err=>{
        res.status(500).json({
            Message: err
        })
    }) 

});


module.exports = routes;