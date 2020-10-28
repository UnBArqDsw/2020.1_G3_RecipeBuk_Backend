const db = require('../../db/dbConfig');
const User = require('../models/User')

async function addUser(name, email) {
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email) VALUES($1, $2)",
        values: [name, email],
    }
    var result;
    try {
        result = await db.query(query)
    } catch (err) {
        console.error(err);
        result = err;
    }
    return result
}

async function deleteUser(email) {
    const query = {
        text: "DELETE FROM USER_ACCOUNT WHERE email = $1",
        values: [email],
    }
    var result;
    try {
        result = await db.query(query)
    } catch (err) {
        console.error(err)
        result = err;
    }
    return result;
}

async function login(email) {

    const query = {
        text: "SELECT * FROM USER_ACCOUNT WHERE email = $1",
        values: [email],
    }
    try {
        result = await db.query(query);
    } catch (err) {
        console.error(err)
        return err;
    }
    if (result.rowCount > 0) {
        let user = new User(result.rows[0].email, result.rows[0].name);
        return user;
    } else {
        return "Usuário não encontrado"
    }


}

async function updateUser(email,name) {

    const query = {
        text: "UPDATE USER_ACCOUNT SET name = $1 WHERE email = $2",
        values: [name,email],
    }
    try {
        result = await db.query(query);
        console.log(result);
        const query2 = {
            text: "SELECT * FROM USER_ACCOUNT WHERE email = $1",
            values: [email],
        }
        try {
            result = await db.query(query2);
            console.log(result.rows[0].name)
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err)
        return err;
    }
    if (result.rowCount > 0) {
        let user = new User(email, name);
        return user;
    } else {
        return "Usuário não encontrado"
    }


}

module.exports = { addUser, deleteUser, login, updateUser };
