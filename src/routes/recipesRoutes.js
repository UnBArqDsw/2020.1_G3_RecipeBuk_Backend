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
            if(response.user) {
                recipesRepository.addRecipe(response.user, req.body.name, req.body.time, req.body.portions, req.body.visibility).then((response) => {
                    if(response.error)
                        return res.json(response);

                    recipesRepository.addIngredients(req.body.ingredients, response.recipeid).then((response) => {
                        if(response.error)
                            return res.json(response);
                        res.json({error: false});
                    });
                });
            }

            else
                res.json({error: true});
        });
    }
});

/*routes.post('/addStep', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.addStep(body.preparationMode).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Passo Adicionado!"
            })
        }        
    })
});

routes.post('/addCategory', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.addCategory(body.category).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Categoria Adicionada!"
            })
        }        
    })

});


routes.post('/addIngredient', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.addIngredient(body.ingredient).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Ingrediente Adicionado!"
            })
        }        
    })
});

routes.post('/addUses', async (req, res, next) => {
    var body = req.body;
    
    recipesRepository.addUses(body.unity. body.quantity).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Utilitarios Adicionados!"
            })
        }        
    })
});*/

module.exports = routes;
