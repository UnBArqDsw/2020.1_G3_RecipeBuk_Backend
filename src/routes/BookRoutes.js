const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const bookRepository = require('../Repository/BookRepository');

routes.post('/createBook', (req, res) => {
    userRepository.getUser(req.body.auth).then((user) => {
        if(user) {
            bookRepository.createBook(user, req.body.title, req.body.description. req.body.visibility);
        }
    });
});

routes.post('/deleteBook', (req, res) => {
    userRepository.getUser(req.body.auth).then((user) => {
        if(user) {
            bookRepository.deleteBook(user, req.body.bookId);
        }
    });
});

routes.post('/getBooks', (req, res) => {
    userRepository.getUser(req.body.auth).then((user) => {
        if(user) {
            bookRepository.getBooks(user);
        }
    });
});

routes.post('/addBookRecipe', (req, res) => {
    userRepository.getUser(req.body.auth).then((user) => {
        if(user) {
            bookRepository.addBookRecipe(user, req.body.bookId, req.body.recipeId);
        }
    });
});

module.exports = routes;