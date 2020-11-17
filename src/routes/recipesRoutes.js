const express = require('express');
const routes = express.Router();
const recipesRepository = require('../Repository/RecipesRepository');
const userRepository = require('../Repository/UserRepository');
const Ingredient = require('../models/Ingredient');

routes.post('/addRecipe', async (req, res, next) => {
    let ingredients = [];
    req.body.ingredients.forEach((ingredient) => {
        let i = new Ingredient(ingredient.name, ingredient.unit, ingredient.quantity);
        if(!i.verifyAttributes())
            return res.json({error: true});

        ingredients.push(i);
    });

    if(ingredients.length) {
        userRepository.getUser(req.body.auth).then((response) => {
            if(response.user.email) {
                recipesRepository.addRecipe(response.user.email, req.body.name, req.body.time, req.body.portions, req.body.visibility, req.body.steps).then((response) => {
                    if(response.error)
                        return res.json(response);

                    recipesRepository.addIngredients(req.body.ingredients, response.recipeid).then((response) => {
                        if(response.error)
                            return res.json(response);

                        else if(req.body.categories && req.body.categories.length) {
                            recipesRepository.addCategories(req.body.categories, response.recipeid).then(response => {
                                res.json(response);
                            });
                        }

                        else
                            res.json({error: false});
                    });
                });
            }

            else
                res.json({error: true});
        });
    } else {
        res.status(500).json({
            error: true,
            details: 'Missing ingredients field'
        })
    }
});

routes.post('/deleteRecipe', async (req, res, next) => {
    var body = req.body;
    
    userRepository.getUser(body.auth).then((response) => {
        if(response.user)
            recipesRepository.deleteRecipe(body.recipeid, response.user).then(response => res.json(response));

        else
            res.json({error: true, details: 'An error occurred while fetching the user. User not found.'});
    });
});

routes.get('/getRecipe', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.getRecipe(body.recipeId, body.auth).then(response => {
        if(response.error){
            res.json({
                response
            })
        }
        recipesRepository.getIngredients(body.recipeId).then(ingredients =>{
            res.json({
                response,
                ingredients
            })
        })
    })
});

routes.post('/getAllRecipes', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.getAllRecipes(body.auth).then(response => {
        res.json({
            response
        })
    })
});

module.exports = routes;
