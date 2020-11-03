const db = require('../../db/dbConfig');


async function addUser(name, email) {
    const query = {
        text: "INSERT INTO USER_ACCOUNT(name, email) VALUES($1, $2)",
        values: [name, email],
    }
    var result;
    try{
     result = await db.query(query)
    } catch(err) {
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
    try{
        result = await db.query(query)
    } catch(err) {
        console.error(err)
        result = err;
    }
    return result;
}

function getUser(sessionId) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT userEmail FROM USER_SESSION WHERE sessionId = '${sessionId}'`, (err, res) => {
            if(err)
                resolve({user: null});

            else
                resolve({user: res.rows[0].useremail ? res.rows[0].useremail : null});
        });
    });
}

module.exports = { addUser, deleteUser, getUser};
