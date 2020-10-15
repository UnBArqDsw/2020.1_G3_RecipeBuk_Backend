
const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");

async function addRecipe(unity, quantity, recipeName, preparationMode, ingredient, time, yield, category) {
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email) VALUES($1, $2)", //Verificar como faz isso aqui, onde adiciona certinho. 
        values: [unity, quantity, recipeName, preparationMode, ingredient, time, yield, category],
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