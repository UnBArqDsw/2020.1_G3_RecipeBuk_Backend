const db = require('../../db/dbConfig');

function addRecipe(userEmail, recipeName, time, portions, visibility) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO RECIPE(useremail, name, time, portions, visibility) VALUES('${userEmail}', '${recipeName}', ${time}, ${portions}, ${visibility}) RETURNING recipeid`, (err, res) => {
            if(err)
                resolve({error: true});

            else
                resolve(res.rows[0]);
        });
    });
}

async function addIngredients(ingredients, recipeid) {
    return new Promise(async function (resolve, reject) {
        for(let ingredient of ingredients) {
            try {
                let res = await db.query(`INSERT INTO INGREDIENT(name) VALUES('${ingredient.name}') RETURNING ingredientid`);
                res = await db.query(`INSERT INTO uses VALUES(${res.rows[0].ingredientid}, ${recipeid}, '${ingredient.unit}', ${ingredient.quantity})`);
            } catch(err) {
                resolve({error: true});
            }
        }

        resolve({error: false, recipeid: recipeid});
    });
}

async function addStep(preparationMode) {
    const query = {
        text: "INSERT INTO STEP(instruction) VALUES($3)", 
        values: [preparationMode],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Passo adicionado!", res);
            return "Passo adicionado!"
        }
    })
}

async function addCategory(category) {
    const query = {
        text: "INSERT INTO CATEGORY(name) VALUES($2)", 
        values: [category],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Categoria adicionada!", res);
            return "Categoria adicionada!"
        }
    })
}

async function addUses(unity, quantity) {
    const query = {
        text: "INSERT INTO uses(unit, quantity) VALUES($3, $4)", 
        values: [unity, quantity],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Utilitários adicionados!", res);
            return "Utilitários adicionados!"
        }
    })
}

module.exports = { addRecipe, addIngredients };