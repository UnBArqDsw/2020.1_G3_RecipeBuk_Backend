const db = require('../../db/dbConfig');

function createBook(user, title, description, visibility) {
	return new Promise((resolve, reject) => {
		const query = {
			text: "INSERT INTO RECIPE_BOOK(userEmail, title, description, visibility) VALUES($1, $2, $3, $4)",
			values: [user.email, title, description, visibility]
		};
		
		db.query(query, (err, res) => {
			if(err)
				resolve({error: true, description: 'An error occurred while creating your recipe book.'});
			else
				resolve({error: false});
		});
	});
}

function deleteBook(user, bookId) {
	return new Promise((resolve, reject) => {
		let query = {
			text: "SELECT * from RECIPE_BOOK WHERE bookId = $1",
			values: [bookId]
		};
		
		db.query(query, (err, res) => {
			if(err || !res.rowCount)
				resolve({error: true, description: 'An error occurred while fetching the book.'});
				
			else {
				if(res.rows[0].useremail != user.email)
					resolve({error: true, description: 'An error has occurred while deleting the book. Permission denied.'});
				
				else {
					query = {
						text: "DELETE FROM RECIPE_BOOK WHERE bookId = $1",
						values: [bookId]
					};
					
					db.query(query, (err, res) => {
						if(err)
							resolve({error: true, description: 'An error occurred while deleting the recipe book.'});
							
						else
							resolve({error: false});						
					});
				}
			}
		});
	});
}

function getBooks(user) {
	return new Promise((resolve, reject) => {
		const query = {
			text: "SELECT bookId, title, description, visibility FROM RECIPE_BOOK WHERE userEmail = $1",
			values: [user.email]
		};
		
		db.query(query, (err, res) => {
			if(err)
				resolve({error: true, description: 'An error occurred while fetching your books.'});
				
			else
				resolve(res.rows);
		});
	});
}

function getBook(user, bookId) {
	return new Promise((resolve, reject) => {
		let query = {
			text: "SELECT * from RECIPE_BOOK WHERE bookId = $1",
			values: [bookId]
		};
		
		db.query(query, (err, res) => {
			if(err || !res.rowCount)
				resolve({error: true, description: 'An error occurred while fetching the book.'});
				
			else {
				if(res.rows[0].useremail != user.email && !res.rows[0].visibility)
					resolve({error: true, description: 'An error has occurred while fetching the book. Permission denied.'});
				
				else {
					const book = res.rows[0];
					query = {
						text: "SELECT RECIPE.recipeid, RECIPE.name, RECIPE.time, RECIPE.portions, RECIPE.visibility FROM contains RIGHT JOIN RECIPE ON RECIPE.recipeId = contains.recipeId WHERE bookId = $1",
						values: [bookId]
					};
					
					db.query(query, (err, res) => {
						if(err)
							resolve({error: true, description: 'An error has occurred while fetching the book recipes.'});
							
						else
							resolve({error: false, bookid: book.bookid, title: book.title, description: book.description, visibility: book.visibility, recipes: res.rows});							
					});
				}
			}
		});
	});
}

function addBookRecipe(user, bookId, recipeId) {
	return new Promise((resolve, reject) => {
		let query = {
			text: "SELECT * from RECIPE_BOOK WHERE bookId = $1",
			values: [bookId]
		};
		
		db.query(query, (err, res) => {
			if(err || !res.rowCount)
				resolve({error: true, description: 'An error occurred while fetching the book.'});
				
			else {
				if(res.rows[0].useremail != user.email)
					resolve({error: true, description: 'An error has occurred while fetching the book. Permission denied.'});
				
				else {
					query = {
						text: "SELECT * FROM RECIPE WHERE recipeId = $1",
						values: [recipeId]
					};
					
					db.query(query, (err, res) => {
						if(res.rows[0].useremail != user.email && !res.rows[0].visibility)
							resolve({error: true, description: 'An error has occurred while fetching the recipe. Permission denied.'});
							
						else {
							query = {
								text: "INSERT INTO contains VALUES($1, $2)",
								values: [recipeId, bookId]
							};
							
							db.query(query, (err, res) => {
								if(err)
									resolve({error: true, description: 'An error occurred while ading the recipe to the book.'});
								
								else
									resolve({error: false});
							});
						}
					});
				}
			}
		});
	});
}

function deleteBookRecipe(user, bookId, recipeId) {
	return new Promise((resolve, reject) => {
		let query = {
			text: "SELECT * FROM RECIPE_BOOK WHERE bookId = $1",
			values: [bookId]
		};
		
		db.query(query, (err, res) => {
			if(err || !res.rowCount)
				resolve({error: true, description: 'An error occurred while fetching the book.'});
				
			else {
				if(res.rows[0].useremail != user.email)
					resolve({error: true, description: 'An error has occurred while fetching the book. Permission denied.'});
				
				else {
					query = {
						text: "DELETE FROM contains WHERE recipeId = $1 AND bookId = $2",
						values: [recipeId, bookId]
					};
					
					db.query(query, (err, res) => {
						if(err)
							resolve({error: true, description: 'An error occurred while deleting the recipe from the book.'});
							
						else
							resolve({error: false});
					});
				}
			}
		});
	});
}


module.exports = { createBook, deleteBook, getBooks, getBook, addBookRecipe, deleteBookRecipe };
