const chai = require('chai');
const Crawler = require('../models/Crawler');

const should = chai.should();

describe('Crawler', () => {
  it('should get results', (done) => {
	let test_crawler = new Crawler('bolo');
	
	test_crawler.getResults().then((results) => {
		results.should.be.a('Array').that.has.lengthOf(4);
		
		results.forEach((result) => {
			result.should.have.property('name').to.be.oneOf(['tudogostoso', 'tastemade', 'tudoreceitas', 'Gshow']);
			
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
