const chai = require('chai');
const Crawler = require('../models/Crawler');

const should = chai.should();

describe('Crawler', () => {
  it('should get results', (done) => {
	let test_crawler = new Crawler('bolo');
	
	test_crawler.getResults().then((results) => {
		results.should.be.a('Array').that.has.lengthOf(4);
		results[0].should.be.a('Object');
		results[0].should.have.property('name').to.be.oneOf(['tudogostoso', 'tastemade', 'tudoreceitas', 'Gshow']);
		results[0].should.have.property('results');
		done();
	});
  }).timeout(10000);
});
