const db = require('../../db/dbConfig');

function addRecipe(userEmail, recipeName, time, portions, visibility, steps) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO RECIPE(useremail, name, time, portions, visibility, steps) VALUES('${userEmail}', '${recipeName}', ${time}, ${portions}, ${visibility}, '${steps}') RETURNING recipeid`, (err, res) => {
            if(err) {
                console.log(err)
                resolve({error: true});
            }

            else
                resolve(res.rows[0]);
        });
    });
}

function addIngredients(ingredients, recipeid) {
    return new Promise(async function (resolve, reject) {
        for(let ingredient of ingredients) {
            try {
                const res = await db.query(`INSERT INTO INGREDIENT(name) VALUES('${ingredient.name}') RETURNING ingredientid`);
                await db.query(`INSERT INTO uses VALUES(${res.rows[0].ingredientid}, ${recipeid}, '${ingredient.unit}', ${ingredient.quantity})`);
            } catch(err) {
                resolve({error: true});
            }
        }

        resolve({error: false, recipeid: recipeid});
    });
}

function addCategories(categories, recipeid) {
    return new Promise(async function (resolve, reject) {
        categories.forEach((category) => {
            if(typeof category != 'number')
                resolve({error: true});
        });

        for(let category of categories) {
            try {
                await db.query(`INSERT INTO categorizes VALUES(${category}, ${recipeid})`);
            } catch(err) {
                resolve({error: true});
            }
        }

        resolve({error: false});
    });
}

function deleteRecipe(recipeId, recipeOwner) {
    return new Promise((resolve, reject) => {
        let query = {
            text: 'SELECT * FROM RECIPE WHERE recipeId = $1',
            values: [recipeId]
        };

        db.query(query, (err, res) => {
            if(err || !res.rowCount)
                resolve({error: true, details: 'An error occurred while fetching the recipe.'});

            else {
                if(recipeOwner.email == res.rows[0].useremail) {
                    query = {
                        text: "DELETE FROM RECIPE WHERE recipeId = $1",
                        values: [recipeId],
                    };

                    db.query(query, (err, res) => {
                        if(err)
                            resolve({error: true, details: 'An error occurred while deleting the recipe.'});

                        else
                            resolve({error: false});
                    });
                }

                else
                    resolve({error: true, details: "An error occurred while deleting the recipe. Recipe doesn't belong to provided user."});
            }
        });
    });
}

module.exports = { addRecipe, addIngredients, addCategories, deleteRecipe };

