const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');


routes.post('/createUser', async (req, res, next) => {
    var body = req.body;
    var result = "Sucesso";
    userRepository.addUser(body.name, body.email).then(async () => {
        result = await userRepository.registerUser(body.email, body.password);
        console.log(result)
        res.json({
            Message: result
        })

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

routes.post('/login', async (req, res, next) => {
    var body = req.body;
    var result;
     userRepository.signIn(body.email, body.password).then((res) => {
        res.json({
            Message: res
        })
    }).catch(err => {
        result = err;
        res.json({
            Message: err
        })
    });


});

routes.get('/signOut', async (req, res, next) => {
    var body = req.body;
    var result;
     userRepository.signOut(body.email, body.password).then((res) => [
        res.json({
            Message: res
        })
    ]).catch(err => {
        result = err;
        res.json({
            Message: err
        })
    });
});

module.exports = routes;