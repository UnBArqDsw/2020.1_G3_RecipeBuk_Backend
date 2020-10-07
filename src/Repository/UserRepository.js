const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");

async function addUser(name, email) {
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email) VALUES($1, $2)",
        values: [name, email],
    }
    
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
            
        } else {
            console.log("Usuário adicionado!", res);
            return "Usuário adicionado!"
        }
    })

}

async function deleteUser(email) {
    const query = {
        text: "DELETE FROM USER_ACCOUNT WHERE email = $1",
        values: [email],
    }
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
        } else {
            console.log("Usuário removido!", res);
            return res;
        }
    })
}


module.exports = { addUser, deleteUser};
