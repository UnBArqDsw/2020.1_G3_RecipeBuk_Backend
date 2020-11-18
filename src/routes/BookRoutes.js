const express = require('express');
const routes = express.Router();
const bookController = require('../controller/BookController');

routes.post('/createBook', (req, res, next) => {
	bookController.createBook(req, res, next);
});

routes.post('/deleteBook', (req, res, next) => {
	bookController.deleteBook(req, res);
});

routes.post('/getBooks', (req, res, next) => {
	bookController.getBooks(req, res, next);
});

routes.post('/getBook', (req, res, next) => {
	bookController.getBook(req, res, next);
});

routes.post('/addBookRecipe', (req, res, next) => {
	bookController.addBookRecipe(req, res, next);
});

routes.post('/deleteBookRecipe', (req, res, next) => {
	bookController.deleteBookRecipe(req, res, next);
});

module.exports = routes;