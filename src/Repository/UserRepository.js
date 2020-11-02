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

async function updateUser(users) {
    console.log('body', users);
    let result;
    const query = {
        text: "UPDATE USER_ACCOUNT SET name = $1, email = $2 WHERE email = $3",
        values: [users.newUser.name, users.newUser.email, users.oldUser.email],
    }
    try {
        result = await db.query(query);
        console.log(result);
        const query2 = {
            text: "SELECT * FROM USER_ACCOUNT WHERE email = $1",
            values: [users.newUser.email],
        }
        try {
            const result2 = await db.query(query2);
            console.log(result2)
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err)
        return err;
    }
    console.log('asdasdasd', result);
    if (result.rowCount > 0) {
        let user = new User(users.newUser.email, users.newUser.name);
        return user;
    } else {
        return "Usuário não encontrado"
    }


}

function getFavorites(auth) {
    return new Promise((resolve, reject) => {
        let favorites = [];

        db.query(`SELECT FAVORITE.recipeLink
                    FROM USER_SESSION INNER JOIN USER_ACCOUNT ON USER_ACCOUNT.email = USER_SESSION.userEmail
                    INNER JOIN FAVORITE ON FAVORITE.userEmail = USER_ACCOUNT.email
                    WHERE USER_SESSION.sessionId = '${auth}'`, (error, response) => {
            if(error) {
                console.log(error);
                resolve([]);
            }

            else {
                response.rows.forEach(row => favorites.push(row.recipelink));
                resolve(favorites);
            }
        });
    });
}

function favorite(auth, recipelink) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT userEmail FROM USER_SESSION WHERE sessionId = '${auth}'`, (error, response) => {
            if(error) {
                console.log(error);
                resolve({error: true});
            }

            else {
                if(response.rows.length) {
                    db.query(`INSERT INTO FAVORITE VALUES ('${response.rows[0].useremail}', '${recipelink}')`, (error, response) => {
                        if(error) {
                            if(error.code == 23505) {
                                db.query(`DELETE FROM FAVORITE WHERE recipelink = '${recipelink}'`, (error, response) => {
                                    if(error) {
                                        console.log(error);
                                        resolve({error: true});
                                    }

                                    else
                                        resolve({error: false});
                                })
                            }

                            else {
                                console.log(error);
                                resolve({error: true});
                            }
                        }

                        else
                            resolve({error: false});
                    });
                }

                else
                    resolve({error: true});
            }
        });
    });
}

module.exports = { addUser, deleteUser, login, updateUser, getFavorites, favorite };
