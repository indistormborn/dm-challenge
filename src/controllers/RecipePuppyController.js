const request = require('superagent')
const httpCodes = require('http-status-codes')
const { ServiceUnavailable, NotAbleToFindRecipe } = require('../utils/Errors')

class RecipePuppyController {
  static getInstance () {
    if (!RecipePuppyController.instance) {
      RecipePuppyController.instance = new RecipePuppyController()
    }
    return RecipePuppyController.instance
  }

  async searchRecipes (ingredients) {
    try {
      const { RECIPEPUPPY_BASE_URL: url } = process.env

      const response = await request.get(`${url}?i=${ingredients}`)

      return this.parseRecipesBody((JSON.parse(response.text)).results)
    } catch (error) {
      throw new NotAbleToFindRecipe(error.text, error.status)
    }
  }

  async verifyServiceStatus () {
    try {
      const { RECIPEPUPPY_BASE_URL: url } = process.env
      const response = await request.get(url)
      return response.status === httpCodes.OK
    } catch (error) {
      throw new ServiceUnavailable('Recipe Puppy API is not available.', error.status)
    }
  }

  parseRecipesBody (recipesBody) {
    const parsedRecipes = []
    for (const recipe of recipesBody) {
      const { ingredients, href, title } = recipe
      if (ingredients && href && title) {
        parsedRecipes.push({
          title,
          ingredients,
          link: href
        })
      }
    }

    return parsedRecipes
  }
}

module.exports = RecipePuppyController
