const db = require('../../db/dbConfig');
const User = require('../models/User');
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

async function login(email, password){
    let user = new User();
    const query = {
        text: "SELECT * FROM USER_ACCOUNT WHERE email = $1",
        values: [email],
    }
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
        } else {
            console.log(res);
            user.email = res.email;
            user.name = res.name;
            //firebase.auth
        }
    })
    return user;
}

module.exports = { addUser, deleteUser, login};
