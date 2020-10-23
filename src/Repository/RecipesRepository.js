
const db = require('../../db/dbConfig');

async function addRecipe(recipeName, time, yieldi) {
    const query = {
        text: "INSERT INTO RECIPE(name, time, portions) VALUES($1, $2, $3)", 
        values: [recipeName, time, yieldi],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Receita adicionada!", res);
            return "Receita adicionada!"
        }
    })
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

async function addIngredient(ingredient) {
    const query = {
        text: "INSERT INTO INGREDIENT(name) VALUES($2)", 
        values: [ingredient],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Ingrediente adicionado!", res);
            return "Ingrediente adicionado!"
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

async function deleteRecipe(recipeName) {
    const query = {
        text: "DELETE FROM RECIPE WHERE recipeName = $1",
        values: [recipeName],
    }
    var result;
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}

async function deleteStep(preparationMode) {
    const query = {
        text: "DELETE FROM STEP WHERE preparationMode = $3",
        values: [preparationMode],
    }
    var result;
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}

async function deleteCategory(category) {
    const query = {
        text: "DELETE FROM CATEGORY WHERE category = $2",
        values: [category],
    }
    var result;
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}

async function deleteIngredient(ingredient) {
    const query = {
        text: "DELETE FROM INGREDIENT WHERE ingredient = $2",
        values: [ingredient],
    }
    var result;
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}

async function deleteUses(unity) {
    const query = {
        text: "DELETE FROM uses WHERE unity = $3",
        values: [unity],
    }
    var result;
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}


module.exports = { addRecipe, addStep, addCategory, addIngredient, addUses, deleteRecipe, deleteStep, deleteCategory, deleteIngredient, deleteUses};