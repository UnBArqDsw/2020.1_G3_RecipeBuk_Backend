const express = require('express');
const routes = express.Router();
const recipeController = require('../controller/RecipeController')


routes.post('/addRecipe', async (req, res, next) => {
   recipeController.addRecipe(req, res, next)
});

routes.post('/deleteRecipe', async (req, res, next) => {
    recipeController.deleteRecipe(req, res, next);
});

routes.post('/updateRecipe', async (req, res, next) => {
    recipeController.updateRecipe(req, res, next);
});

routes.post('/getRecipe', async (req, res, next) => {
    recipeController.getRecipeById(req, res, next);
});

routes.post('/getAllRecipes', async (req, res, next) => {
    recipeController.getRecipeList(req, res, next);
});

module.exports = routes;
