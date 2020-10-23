const express = require('express');
const routes = express.Router();
const RecipesResgistration = require('../models/RecipesRegistration');

routes.post('/addRecipe', async (req, res, next) => {
    var body = req.body;
    
    RecipesRepository.addRecipe(body.recipeName, body.time, body.yeld).then(ret => {
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
    
    RecipesRepository.addStep(body.preparationMode).then(ret => {
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
    
    RecipesRepository.addCategory(body.category).then(ret => {
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
    
    RecipesRepository.addIngredient(body.ingredient).then(ret => {
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
    
    RecipesRepository.addUses(body.unity. body.quantity).then(ret => {
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
    
    RecipesRepository.deleteRecipe(body.recipeName).then(ret => {
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
    
    RecipesRepository.deleteStep(body.preparationMode).then(ret => {
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
    
    RecipesRepository.deleteCategory(body.category).then(ret => {
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
    
    RecipesRepository.deleteIngredient(body.ingredient).then(ret => {
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
    
    RecipesRepository.deleteUses(body.unity).then(ret => {
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
