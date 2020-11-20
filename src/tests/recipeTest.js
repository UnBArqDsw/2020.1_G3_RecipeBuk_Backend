const should = chai.should();

const chai = require('chai');
const RecipesRepository = require('../Repository/RecipesRepository');

const should = chai.should();

describe('Recipe', () => {
  it('add new recipe', (done) => {

    RecipesRepository.addRecipe("teste.teste@teste.com", "Bolo de Chocolate", 12, 50, true, "passos adicionados!").then((response) => {
        response.should.be.a('Object').that.has.lengthOf(1);
        response.should.have.property('error').to.be('false');
    });
  }).timeout(10000);
});

