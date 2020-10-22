
const db = require('../../db/dbConfig');

async function addRecipe(recipeName, time, yield) {
    const query = {
        text: "INSERT INTO RECIPE(name, time, portions) VALUES($1, $2, $3)", 
        values: [recipeName, time, yield],
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

async function addCategory(ingredient) {
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

async function deleteRecipe(name) {
    const query = {
        text: "DELETE FROM RECIPE WHERE name = $1",
        values: [name],
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

async function deleteStep(instruction) {
    const query = {
        text: "DELETE FROM STEP WHERE instruction = $3",
        values: [instruction],
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

async function deleteCategory(name) {
    const query = {
        text: "DELETE FROM STEP WHERE name = $2",
        values: [name],
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
        text: "DELETE FROM STEP WHERE unity = $3",
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
