const express = require('express');
const routes = express.Router();
const recipeRepository = require('../Repository/RecipesRepository');

routes.post('/addRecipe', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.addRecipe(body.recipeName, body.time, body.yieldi).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Receita Adicionada!"
            })
        }        
    })
});

routes.post('/addStep', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.addStep(body.preparationMode).then(ret => {
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
    
    recipeRepository.addCategory(body.category).then(ret => {
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
    
    recipeRepository.addIngredient(body.ingredient).then(ret => {
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
    
    recipeRepository.addUses(body.unity. body.quantity).then(ret => {
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
});

routes.post('/deleteRecipe', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.deleteRecipe(body.recipeName).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Receita removida!"
            })
        }        
    })
});

routes.post('/deleteStep', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.deleteStep(body.preparationMode).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Passo removido!"
            })
        }        
    })
});

routes.post('/deleteCategory', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.deleteCategory(body.category).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Categoria removida!"
            })
        }        
    })
});

routes.post('/deleteIngredient', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.deleteIngredient(body.ingredient).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Ingrediente removido!"
            })
        }        
    })
});

routes.post('/deleteUses', async (req, res, next) => {
    var body = req.body;
    
    recipeRepository.deleteUses(body.unity).then(ret => {
        if(ret.name == "error"){
            res.status(500).json({
                Message: ret.detail
            })
        } else {
            res.status(200).json({
                Message: "Utilitario removido!"
            })
        }        
    })
});

module.exports = routes;
