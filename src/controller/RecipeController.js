const recipesRepository = require('../Repository/RecipesRepository');
const userRepository = require('../Repository/UserRepository');
const Ingredient = require('../models/Ingredient');

function addRecipe(req, res, next) {
    let ingredients = [];
    req.body.ingredients.forEach((ingredient) => {
        let i = new Ingredient(ingredient.name, ingredient.unit, ingredient.quantity);
        if (!i.verifyAttributes())
            return res.json({ error: true });

        ingredients.push(i);
    });

    if (ingredients.length) {
        userRepository.getUser(req.body.auth).then((response) => {
            if (response.user.email) {
                recipesRepository.addRecipe(response.user.email, req.body.name, req.body.time, req.body.portions, req.body.visibility, req.body.steps).then((response) => {
                    if (response.error)
                        return res.json(response);

                    recipesRepository.addIngredients(req.body.ingredients, response.recipeid).then((response) => {
                        if (response.error)
                            return res.json(response);

                        else if (req.body.categories && req.body.categories.length) {
                            recipesRepository.addCategories(req.body.categories, response.recipeid).then(response => {
                                res.json(response);
                            });
                        }

                        else
                            res.json({ error: false });
                    });
                });
            }

            else
                res.json({ error: true });
        });
    } else {
        res.status(500).json({
            error: true,
            details: 'Missing ingredients field'
        })
    }
}

function updateRecipe(req, res, next) {
    var body = req.body;

    userRepository.getUser(body.auth).then(async (response) => {
        if (response.user)
            if (await recipesRepository.removeIngredients(body.recipeId))
                if (!(await recipesRepository.updateRecipe(body.name, body.time, body.portions, body.visibility, body.steps, body.recipeId, response.user)).error)
                    if (!(await recipesRepository.addIngredients(body.ingredients, body.recipeId)).error) {
                        console.log('fuckme')
                        res.json({ error: false });
                        return;
                    }
        res.json({ error: true, details: 'An error occurred while fetching the user. User not found.' });
    });
}

function deleteRecipe(req, res, next) {
    var body = req.body;

    userRepository.getUser(body.auth).then((response) => {
        if (response.user)
            recipesRepository.deleteRecipe(body.recipeid, response.user).then(response => res.json(response));

        else
            res.json({ error: true, details: 'An error occurred while fetching the user. User not found.' });
    });
}

function getRecipeById(req, res, next) {
    var body = req.body;

    recipesRepository.getRecipe(body.recipeId, body.auth).then(response => {
        if (response.error) {
            res.json({
                response
            })
        }
        recipesRepository.getIngredients(body.recipeId).then(ingredients => {
            res.json({
                response,
                ingredients
            })
        })
    })
}

function getRecipeList(req, res, next) {
    var body = req.body;

    recipesRepository.getAllRecipes(body.auth).then(response => res.json(response));

}

module.exports = { addRecipe, deleteRecipe, getRecipeById, getRecipeList, updateRecipe };