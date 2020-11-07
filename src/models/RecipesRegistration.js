const db = require("../../db/dbConfig");

module.exports = class RecipesRegistration {
    constructor(unity, quantity, recipeName, preparationMode, ingredient, time, yieldi, category){
        this.unity = unity;
        this.quantity = quantity;
        this.recipeName = recipeName;
        this.preparationMode = preparationMode;
        this.ingredient = ingredient;
        this.time = time;
        this.yieldi = yieldi;
        this.category = category;
    }

}
module.exports = RecipesRegistration;