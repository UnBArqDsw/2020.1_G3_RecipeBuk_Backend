const chai = require('chai');
const Crawler = require('../models/Ingredient');

const should = chai.should();

describe('Ingredient', () => {
  it('should get results', (done) => {
	let test_recipes = new Ingredient('bolo');git 
	
	test_crawler.getResults().then((results) => {
		results.should.be.a('Array').that.has.lengthOf(3);
		
		results.forEach((result) => {
			result.should.have.property('name').to.be.oneOf(['TudoGostoso', 'Tastemade', 'TudoReceitas']);
			
			if(result.error) {
				result.error.should.be.a('Number').that.is.oneOf([500, 503]);
				result.should.have.property('results').that.is.an('Array').that.has.lengthOf(0);
				
				if(result.error == 500)
					console.log(`\x1b[31mInternal Server Error: An error has occurred while handling ${result.name} information.\n\x1b[31mThis can be a result of the website changing their page structure.`);
				
				else
					console.log(`\x1b[31mService Unavailable: An error has occurred while crawling ${result.name} information.\n\x1b[31mThis can be a connection problem or a bad URL.`);
			}
			
			else {
				result.should.have.property('results').that.is.an('Array');
				result.results[0].should.have.property('link').that.is.a('String').that.includes('http');
				result.results[0].should.have.property('title').that.is.a('String');
				result.results[0].should.have.property('img_url').that.is.a('String').that.includes('http');
			}
		});

		done();
	});
  }).timeout(10000);
});
