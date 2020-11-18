const userRepository = require('../Repository/UserRepository');
const bookRepository = require('../Repository/BookRepository');

function createBook(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.createBook(response.user, req.body.title, req.body.description, req.body.visibility).then(response => res.json(response));
			
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
}

function deleteBook(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.deleteBook(response.user, req.body.bookId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
}

function getBooks(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.getBooks(response.user).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
} 

function getBook(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.getBook(response.user, req.body.bookId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
}

function addBookRecipe(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.addBookRecipe(response.user, req.body.bookId, req.body.recipeId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
}

function deleteBookRecipe(req, res, next){
    userRepository.getUser(req.body.auth).then((response) => {
		if(response.user)
			bookRepository.deleteBookRecipe(response.user, req.body.bookId, req.body.recipeId).then(response => res.json(response));
		
		else
			res.json({error: true, description: 'An error occurred while fetching the user. No user found.'});
	});
}

module.exports = { createBook, deleteBook, getBooks, getBook, addBookRecipe, deleteBookRecipe };