const db = require("../../db/dbConfig");

module.exports = class Recipes {
    constructor(unity, quantity, recipeName, preparationMode, ingredient, time, yield, category){
        this.unity = unity;
        this.quantity = quantity;
        this.recipeName = recipeName;
        this.preparationMode = preparationMode;
        this.ingredient = ingredient;
        this.time = time;
        this.yield = yield;
        this.category = category;
    }

}
module.exports = Recipes;