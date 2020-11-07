const db = require("../../db/dbConfig");

module.exports = class User {
    constructor(email, name){
        this.email = email;
        this.name = name;
    }

}
