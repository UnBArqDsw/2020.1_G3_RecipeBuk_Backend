const db = require("../../db/dbConfig");

module.exports = class User {
    constructor(email, passwordHash, birthDate, name){
        this.email = email;
        this.passwordHash = passwordHash;
        this.birthDate = birthDate;
        this.name = name;
    }

}
module.exports = User;