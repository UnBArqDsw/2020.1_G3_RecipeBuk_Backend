const express = require('express');
const routes = express.Router();

routes.get('/', async (req, res, next) => {
	res.json({
		Server: "Recipe Buk",
		Endpoints: [{
			createUser: {
				type: 'post',
				params: [
					{
						name: 'name',
						type: 'string',
						optional: false
					},

					{
						name: 'email',
						type: 'string',
						optional: false
					},

					{
						name: 'password',
						type: 'string',
						optional: false
					}
				],
			},

			deleteUser: {
				type: 'post',
				params: [
					{
						name: 'email',
						type: 'string',
						optional: false
					},

					{
						name: 'password',
						type: 'string',
						optional: false
					}
				],
			},

			login: {
				type: 'post',
				params: [
					{
						name: 'email',
						type: 'string',
						optional: false
					},

					{
						name: 'password',
						type: 'string',
						optional: false
					}
				],
			},

			logout: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					}
				],
			},

			updateUser: {
				type: 'post',
				params: [
					{
						name: 'info',
						type: 'Array',
						optional: false,
						params: [
							{
								name: 'email',
								type: 'string',
								optional: false
							},

							{
								name: 'name',
								type: 'string',
								optional: false
							}
						]
					},

					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'password',
						type: 'string',
						optional: false
					}
				],
			},

			getFavorites: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					}
				],
			},

			favorite: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'recipeLink',
						type: 'string',
						optional: false
					},
					
					{
						name: 'recipeTitle',
						type: 'string',
						optional: false
					},
					
					{
						name: 'recipeImage',
						type: 'string',
						optional: false
					}
				],
			},
			search: {
				type: 'get',
				params: [
					{
						name: 'query',
						type: 'string',
						optional: false
					}
				],
			},
			addRecipe: {
				type: 'post',
				params: [
					{
						name: 'ingredients',
						type: 'array',
						optional: false,
						example: [
							{
								"name": "name",
								"unit": "unit",
								"quantity": 1
							}
						]
					},
					{
						name: 'auth',
						type: 'string',
						optional: false
					},
					{
						name: 'name',
						type: 'string',
						optional: false
					},
					{
						name: 'time',
						type: 'int',
						optional: false
					},
					{
						name: 'portions',
						type: 'int',
						optional: false
					},
					{
						name: 'visibility',
						type: 'bool',
						optional: false
					},
					{
						name: 'steps',
						type: 'string',
						optional: false
					}
				],
			},
			updateRecipe: {
				type: 'post',
				params: [
					{
						name: 'recipeId',
						type: 'int',
						optional: false
					},
					{
						name: 'ingredients',
						type: 'array',
						optional: false,
						example: [
							{
								"name": "name",
								"unit": "unit",
								"quantity": 1
							}
						]
					},
					{
						name: 'auth',
						type: 'string',
						optional: false
					},
					{
						name: 'name',
						type: 'string',
						optional: false
					},
					{
						name: 'time',
						type: 'int',
						optional: false
					},
					{
						name: 'portions',
						type: 'int',
						optional: false
					},
					{
						name: 'visibility',
						type: 'bool',
						optional: false
					},
					{
						name: 'steps',
						type: 'string',
						optional: false
					}
				],
			},
			deleteRecipe: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},
					{
						name: 'recipeId',
						type: 'int',
						optional: false
					}
				],
			},
			getRecipe: {
				type: 'get',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},
					{
						name: 'recipeId',
						type: 'int',
						optional: false
					}
				],
			},
			getAllRecipes: {
				type: 'get',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					}
				],
			},
			
			createBook: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'title',
						type: 'string',
						optional: false
					},
					
					{
						name: 'description',
						type: 'string',
						optional: false
					},
					
					{
						name: 'visibility',
						type: 'boolean',
						optional: false
					}
				],
			},
			
			deleteBook: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'bookId',
						type: 'int',
						optional: false
					}
				],
			},
			
			getBooks: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					}
				],
			},
			
			getBook: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'bookId',
						type: 'int',
						optional: false
					}
				],
			},
			
			addBookRecipe: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'bookId',
						type: 'int',
						optional: false
					},
					
					{
						name: 'recipeId',
						type: 'int',
						optional: false
					}
				],
			},
			
			deleteBookRecipe: {
				type: 'post',
				params: [
					{
						name: 'auth',
						type: 'string',
						optional: false
					},

					{
						name: 'bookId',
						type: 'int',
						optional: false
					},
					
					{
						name: 'recipeId',
						type: 'int',
						optional: false
					}
				],
			},
		}]
	})
});

module.exports = routes;