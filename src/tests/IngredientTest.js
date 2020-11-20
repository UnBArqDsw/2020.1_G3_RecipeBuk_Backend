const chai = require('chai');
const Crawler = require('../models/Ingredient');

describe('Ingredient', () => {
  it('should get results', (done) => {
	let test_ingredient = new Crawler('quantidade');
	
	test_ingredients.getResults().then((results) => {
		results.should.be.a('Array').that.has.lengthOf(3);
			
	});
  }).timeout(10000);
});
