const db = require('../../db/dbConfig');
const UserRepository = require('./UserRepository');

function addRecipe(userEmail, recipeName, time, portions, visibility, steps) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO RECIPE(useremail, name, time, portions, visibility, steps) VALUES($1, $2, $3, $4, $5, $6) RETURNING recipeid',
            values: [userEmail, recipeName, time, portions, visibility, steps]
        };

        db.query(query, (err, res) => {
            if (err)
                resolve({ error: true, details: 'An error occurred while adding the recipe information.' });

            else
                resolve(res.rows[0]);
        });
    });
}

function getRecipe(recipeId, auth) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * FROM RECIPE WHERE recipeId = $1',
            values: [recipeId]
        };

        db.query(query, (err, res) => {
            if (err)
                resolve({ error: true, details: 'An error occurred while getting the recipe information.' });

            else if(res.rows[0]){
                if (res.rows[0].visibility)
                    resolve({ recipe: res.rows[0] });
                else{
                    UserRepository.getUser(auth).then(response =>{
                        if(!response.user)
                            resolve({ error: true, details: 'User not found'});
                        if(response.user.email == res.rows[0].useremail){
                            resolve({ recipe: res.rows[0] });
                        } else {
                            resolve({ error: true, details: 'This user does not have permission to see this recipe.'});
                        }
                    })
                }
            } else {
                resolve({ error: true, details: 'Recipe not found' });
            }  
        });
    });
}

function addIngredients(ingredients, recipeid) {
    return new Promise(async function (resolve, reject) {
        for (let ingredient of ingredients) {
            try {
                const res = await db.query(`INSERT INTO INGREDIENT(name) VALUES($1) RETURNING ingredientid`, [ingredient.name]);
                await db.query('INSERT INTO uses VALUES($1, $2, $3, $4)', [res.rows[0].ingredientid, recipeid, ingredient.unit, ingredient.quantity]);
            } catch (err) {
                resolve({ error: true, details: 'An error occurred while adding one of the ingredients.' });
            }
        }

        resolve({ error: false, recipeid: recipeid });
    });
}

function addCategories(categories, recipeid) {
    return new Promise(async function (resolve, reject) {
        categories.forEach((category) => {
            if (typeof category != 'number')
                resolve({ error: true, details: `An error occurred while adding one of the categories which has an invalid type. Expected Number got ${typeof category}.` });
        });

        for (let category of categories) {
            try {
                await db.query('INSERT INTO categorizes VALUES($1, $2)', [category, recipeid]);
            } catch (err) {
                resolve({ error: true, details: 'An error occurred while adding one of the categories.' });
            }
        }

        resolve({ error: false });
    });
}

function deleteRecipe(recipeId, recipeOwner) {
    return new Promise((resolve, reject) => {
        let query = {
            text: 'SELECT * FROM RECIPE WHERE recipeId = $1',
            values: [recipeId]
        };

        db.query(query, (err, res) => {
            if (err || !res.rowCount)
                resolve({ error: true, details: 'An error occurred while fetching the recipe.' });

            else {
                if (recipeOwner.email == res.rows[0].useremail) {
                    query = {
                        text: "DELETE FROM RECIPE WHERE recipeId = $1",
                        values: [recipeId],
                    };

                    db.query(query, (err, res) => {
                        if (err)
                            resolve({ error: true, details: 'An error occurred while deleting the recipe.' });

                        else
                            resolve({ error: false });
                    });
                }

                else
                    resolve({ error: true, details: "An error occurred while deleting the recipe. Recipe doesn't belong to provided user." });
            }
        });
    });
}

module.exports = { addRecipe, addIngredients, addCategories, deleteRecipe, getRecipe };

