const db = require('../../db/dbConfig');
const User = require('../models/User');
const uuid = require('uuid');

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

function getUser(sessionId) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT userEmail FROM USER_SESSION WHERE sessionId = $1',
            values: [sessionId]
        };
        db.query(query, (err, res) => {
            if(err || !res.rowCount)
                resolve({user: null});

            else
                resolve({user: res.rows[0].useremail});
        });
    });
}

function login(email) {
    return new Promise((resolve, reject) => {
        let query = {
            text: "SELECT * FROM USER_SESSION WHERE userEmail = $1 ORDER BY expirationDate ASC",
            values: [email]
        };

        db.query(query, async (error, res) => {
            let rows = res.rows;
            while(rows.length > 4) {
                let row = rows.shift();
                await db.query('DELETE FROM USER_SESSION WHERE sessionId = $1', [row.sessionid]);
            }

            const uuidv4 = uuid.v4().replace(/-/g, '');
            let date = new Date();
            date.setDate(date.getDate() + 7);
            query = {
                text: "INSERT INTO USER_SESSION VALUES($1, $2, $3)",
                values: [uuidv4, email, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]
            }

            db.query(query, (error, res) => {
                if(error)
                    resolve({error: true});

                else
                    resolve({user_session: uuidv4});
            }); 
        });
    });
}

function logout(userSession) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'DELETE FROM USER_SESSION WHERE sessionId = $1',
            values: [userSession]
        };

        db.query(query, (err, res) => {
            if(err)
                resolve({error: true});
            resolve({error: false});
        });
    });
}

async function updateUser(users) {
    let result;
    const query = {
        text: "UPDATE USER_ACCOUNT SET name = $1, email = $2 WHERE email = $3",
        values: [users.newUser.name, users.newUser.email, users.oldUser.email],
    }
    try {
        result = await db.query(query);
        const query2 = {
            text: "SELECT * FROM USER_ACCOUNT WHERE email = $1",
            values: [users.newUser.email],
        }
        try {
            const result2 = await db.query(query2);
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err)
        return err;
    }
    if (result.rowCount > 0) {
        let user = new User(users.newUser.email, users.newUser.name);
        return user;
    } else {
        return "Usuário não encontrado"
    }


}

function getFavorites(auth) {
    return new Promise((resolve, reject) => {
        const query = {
            text: `SELECT FAVORITE.recipeLink
                    FROM USER_SESSION INNER JOIN USER_ACCOUNT ON USER_ACCOUNT.email = USER_SESSION.userEmail
                    INNER JOIN FAVORITE ON FAVORITE.userEmail = USER_ACCOUNT.email
                    WHERE USER_SESSION.sessionId = $1`,
            values: [auth]
        };
        let favorites = [];

        db.query(query, (error, response) => {
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
        db.query('SELECT userEmail FROM USER_SESSION WHERE sessionId = $1', [auth], (error, response) => {
            if(error) {
                console.log(error);
                resolve({error: true});
            }

            else {
                if(response.rows.length) {
                    db.query('INSERT INTO FAVORITE VALUES ($1, $2)', [response.rows[0].useremail, recipelink], (error, response) => {
                        if(error) {
                            if(error.code == 23505) {
                                db.query('DELETE FROM FAVORITE WHERE recipelink = $1', [recipelink], (error, response) => {
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

module.exports = { addUser, deleteUser, getUser, login, updateUser, getFavorites, favorite, logout };
