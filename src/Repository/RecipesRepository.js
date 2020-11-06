const db = require('../../db/dbConfig');

function addRecipe(userEmail, recipeName, time, portions, visibility, steps) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO RECIPE(useremail, name, time, portions, visibility, steps) VALUES($1, $2, $3, $4, $5, $6) RETURNING recipeid',
            values: [userEmail, recipeName, time, portions, visibility, steps]
        };

        db.query(query, (err, res) => {
            if(err)
                resolve({error: true, details: 'An error occurred while adding the recipe information.'});

            else
                resolve(res.rows[0]);
        });
    });
}

function addIngredients(ingredients, recipeid) {
    return new Promise(async function (resolve, reject) {
        for(let ingredient of ingredients) {
            try {
                const res = await db.query(`INSERT INTO INGREDIENT(name) VALUES($1) RETURNING ingredientid`, [ingredient.name]);
                await db.query('INSERT INTO uses VALUES($1, $2, $3, $4)', [res.rows[0].ingredientid, recipeid, ingredient.unit, ingredient.quantity]);
            } catch(err) {
                resolve({error: true, details: 'An error occurred while adding one of the ingredients.'});
            }
        }

        resolve({error: false, recipeid: recipeid});
    });
}

function addCategories(categories, recipeid) {
    return new Promise(async function (resolve, reject) {
        categories.forEach((category) => {
            if(typeof category != 'number')
                resolve({error: true, details: `An error occurred while adding one of the categories which has an invalid type. Expected Number got ${typeof category}.`});
        });

        for(let category of categories) {
            try {
                await db.query('INSERT INTO categorizes VALUES($1, $2)', [category, recipeid]);
            } catch(err) {
                resolve({error: true, details: 'An error occurred while adding one of the categories.'});
            }
        }

        resolve({error: false});
    });
}

module.exports = { addRecipe, addIngredients, addCategories };