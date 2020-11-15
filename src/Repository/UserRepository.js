const db = require('../../db/dbConfig');
const User = require('../models/User');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function addUser(name, email, password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, hash) => {
            if(error)
                resolve({error: true, details: 'An error occurred while storing your password.'});

            else {
                const query = {
                    text: 'INSERT INTO USER_ACCOUNT VALUES($1, $2, $3)',
                    values: [email, name, hash]
                };

                db.query(query, (err, res) => {
                    if(err)
                        resolve({error: true, details: 'Error while registering user.'});

                    else
                        resolve({error: false});
                });
            }
        });
    });
}

function deleteUser(email, password) {
    return new Promise((resolve, reject) => {
        let query = {
            text: 'SELECT * FROM USER_ACCOUNT WHERE email = $1',
            values: [email]
        };

        db.query(query, (error, res) => {
            if(error || !res.rowCount)
                resolve({error: true, details: "An error occurred while validating your credentials. Invalid user or user doesn't exist."});

            else {
                bcrypt.compare(password, res.rows[0].password, (err, result) => {
                    if(err)
                        resolve({error: true, details: 'An error occurred while validating your credentials. Invalid or wrong password.'});

                    else {
                        if(result) {
                            query = {
                                text: "DELETE FROM USER_ACCOUNT WHERE email = $1",
                                values: [email],
                            };

                            db.query(query, (err, result) => {
                                if(err)
                                    resolve({error: true, details: 'An error occurred while deleting your account.'});

                                else
                                    resolve({error: false});
                            });
                        }

                        else
                            resolve({error: true, details: 'An error occurred while validating your credentials. Wrong password.'});
                    }
                });
            }
        });
    });
}

function getUser(sessionId) {
    return new Promise((resolve, reject) => {
        let query = {
            text: 'SELECT userEmail FROM USER_SESSION WHERE sessionId = $1',
            values: [sessionId]
        };
        db.query(query, (err, res) => {
            if(err || !res.rowCount)
                resolve({user: null});

            else {
                query = {
                    text: 'SELECT * FROM USER_ACCOUNT WHERE email = $1',
                    values: [res.rows[0].useremail]
                };

                db.query(query, (err, res) => {
                    if(err || !res.rowCount)
                        resolve({user: null});

                    else
                        resolve({user: res.rows[0]});
                });
            }
        });
    });
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        let query = {
            text: 'SELECT * FROM USER_ACCOUNT WHERE email = $1',
            values: [email]
        };

        db.query(query, (error, res) => {
            if(error || !res.rowCount)
                resolve({error: true, details: "An error occurred while logging in. Invalid user or user doesn't exist."});

            else {
                bcrypt.compare(password, res.rows[0].password, (err, result) => {
                    if(err)
                        resolve({error: true, details: 'An error occurred while validating your login. Invalid or wrong password.'});

                    else {
                        if(result) {
                            query = {
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
                                        resolve({error: true, details: 'An error occurred while creating the user session.'});

                                    else
                                        resolve({user_session: uuidv4});
                                }); 
                            });
                        }

                        else
                            resolve({error: true, details: 'An error occurred while validating your login. Wrong password.'});
                    }
                });
            }
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
                resolve({error: true, details: 'An error occurred while disabling the user session.'});
            resolve({error: false});
        });
    });
}

function updateUser(info, auth, password) {
    return new Promise((resolve, reject) => {
        getUser(auth).then((result) => {
            if(!result.user)
                resolve({error: true, details: 'An error occurred while fetching your user. Invalid user session.'});

            else {
                bcrypt.compare(password, result.user.password, (err, res) => {
                    if(err)
                        resolve({error: true, details: 'An error occurred while validating your credentials. Invalid or wrong password.'});

                    else {
                        if(res) {
                            const query = {
                                text: "UPDATE USER_ACCOUNT SET name = $1, email = $2 WHERE email = $3",
                                values: [info.name ? info.name : res.rows[0].name, info.email ? info.email : res.rows[0].email, result.user.email],
                            };

                            db.query(query, (err, result) => {
                                if(err)
                                    resolve({error: true, details: 'An error occurred while updating your account details.'});

                                else
                                    resolve({error: false});
                            });
                        }

                        else
                            resolve({error: true, details: 'An error occurred while validating your credentials. Wrong password.'})
                    }
                });
            }
        });
    });
}

function getFavorites(auth) {
    return new Promise((resolve, reject) => {
        const query = {
            text: `SELECT FAVORITE.recipeLink, FAVORITE.recipeTitle, FAVORITE.recipeImage
                    FROM USER_SESSION INNER JOIN USER_ACCOUNT ON USER_ACCOUNT.email = USER_SESSION.userEmail
                    INNER JOIN FAVORITE ON FAVORITE.userEmail = USER_ACCOUNT.email
                    WHERE USER_SESSION.sessionId = $1`,
            values: [auth]
        };

        db.query(query, (error, response) => {
            if(error) {
                console.log(error);
                resolve([]);
            }

            else
                resolve(response.rows);
        });
    });
}

function favorite(auth, recipeLink, recipeTitle, recipeImage) {
    return new Promise((resolve, reject) => {
        db.query('SELECT userEmail FROM USER_SESSION WHERE sessionId = $1', [auth], (error, response) => {
            if(error) {
                console.log(error);
                resolve({error: true});
            }

            else {
                if(response.rows.length) {
                    db.query('INSERT INTO FAVORITE VALUES ($1, $2, $3, $4)', [response.rows[0].useremail, recipeLink, recipeImage, recipeTitle], (error, response) => {
                        if(error) {
                            if(error.code == 23505) {
                                db.query('DELETE FROM FAVORITE WHERE recipelink = $1', [recipelink], (error, response) => {
                                    if(error)
                                        resolve({error: true, details: 'An error occurred while deleting the favorite.'});

                                    else
                                        resolve({error: false});
                                })
                            }

                            else
                                resolve({error: true, details: 'An error occurred while adding the favorite.'});
                        }

                        else
                            resolve({error: false});
                    });
                }

                else
                    resolve({error: true, details: 'An error occurred while fetching the user.'});
            }
        });
    });
}

module.exports = { addUser, deleteUser, getUser, login, updateUser, getFavorites, favorite, logout };
