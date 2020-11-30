require('dotenv/config')

const chai = require('chai')
chai.use(require('chai-json-schema'))
const expect = chai.expect

const Recipe = require('../src/controllers/RecipePuppyController')

const { ServiceUnavailable } = require('../src/utils/Errors')

const parsedRecipesSchema = require('./schemas/parsed_recipes.json')

describe('RecipePuppyController Tests', () => {
  it('verifyServiceStatus with valid request params', async () => {
    const result = await Recipe.getInstance().verifyServiceStatus()
    expect(result).to.be.true
  })

  it('verifyServiceStatus with invalid request params', async () => {
    const validUrl = process.env.RECIPEPUPPY_BASE_URL
    process.env.RECIPEPUPPY_BASE_URL = validUrl + 'J=akd'

    try {
      await Recipe.getInstance().verifyServiceStatus()
    } catch (error) {
      expect(error).to.be.instanceOf(ServiceUnavailable)
      expect(error).to.have.property('message').and.to.be.eq('Recipe Puppy API is not available.')
    }

    process.env.RECIPEPUPPY_BASE_URL = validUrl
  })

  it('searchRecipes with valid parameters', async () => {
    const recipes = await Recipe.getInstance().searchRecipes('tomato,eggs,onions')

    expect(recipes).to.be.jsonSchema(parsedRecipesSchema)
  })
})
