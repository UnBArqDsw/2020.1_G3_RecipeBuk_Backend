const db = require('../../db/dbConfig');

async function addUser(email, passwordHash, birthDate, name){
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email, password_hash, birthdate) VALUES($1, $2, $3, $4)",
        values: [name, email, passwordHash, birthDate],
    }
    db.query(query, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            return err;
        } else {
            console.log("Usuário adicionado!", res);
            return res;
        }
    })
}

async function deleteUser(){
    var ueum = "ueum"
    return ueum;
}

module.exports = {addUser, deleteUser};
