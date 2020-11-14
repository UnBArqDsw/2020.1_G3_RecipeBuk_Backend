const express = require('express');
const routes = express.Router();
const userRepository = require('../Repository/UserRepository');
const bookRepository = require('../Repository/BookRepository');

routes.post('/createBook', (req, res) => {
	userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.createBook(response.user, req.body.title, req.body.description, req.body.visibility).then(response => res.json(response));
			
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
});

routes.post('/deleteBook', (req, res) => {
	userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.deleteBook(response.user, req.body.bookId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
});

routes.post('/getBooks', (req, res) => {
	userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.getBooks(response.user).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
});

routes.post('/getBook', (req, res) => {
	userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.getBook(response.user, req.body.bookId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
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