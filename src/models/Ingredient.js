module.exports = class Ingredient {
    constructor(name, unit, quantity) {
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
    }

    verifyAttributes() {
    	if(typeof this.name != 'string' || this.name.length < 1)
    		return 0;

    	if(typeof this.unit != 'string')
    		return 0;

    	if(typeof this.quantity != 'number' || this.quantity <= 0)
    		return 0;

    	return 1;
    }
}