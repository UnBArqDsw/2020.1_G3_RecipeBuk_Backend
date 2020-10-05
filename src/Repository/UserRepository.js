const db = require('../../db/dbConfig');
require("firebase/auth");
var firebase = require("firebase/app");

async function addUser(name, email) {
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email) VALUES($1, $2)",
        values: [name, email],
    }
    try{
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            
        } else {
            console.log("Usuário adicionado!", res);
        }
    })
    } catch(err) {

    }
}

async function registerUser(email, password) {
    var errorMessage;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        return "Usuário registrado!"
    }).catch(function (error) {
        var errorCode = error.code;
         errorMessage = error.message;

        return errorMessage;
    });
    
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

async function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        console.log("Usuário logado")
        return "Usuário logado"
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        return errorMessage;
    });
}

async function signOut() {
    firebase.auth().signOut().then(function () {
        console.log('sign out successful')
        return "sign out successful"
    }).catch(function (error) {
        console.log(error)
        return error
    });
}

module.exports = { addUser, deleteUser, registerUser, signIn, signOut };
