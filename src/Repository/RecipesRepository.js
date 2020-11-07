const db = require('../../db/dbConfig');

function addRecipe(userEmail, recipeName, time, portions, visibility, steps) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO RECIPE(useremail, name, time, portions, visibility, steps) VALUES('${userEmail}', '${recipeName}', ${time}, ${portions}, ${visibility}, '${steps}') RETURNING recipeid`, (err, res) => {
            if(err)
                resolve({error: true});

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

module.exports = { addRecipe, addIngredients, addCategories };