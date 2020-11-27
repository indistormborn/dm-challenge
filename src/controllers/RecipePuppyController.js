const request = require('superagent')
const httpCodes = require('http-status-codes')

class RecipePuppyController {
  static instance

  static getInstance () {
    if (!RecipePuppyController.instance) {
      RecipePuppyController.instance = new RecipePuppyController()
    }
    return RecipePuppyController.instance
  }

  async searchRecipe(ingredients) {
    try {
      const { RECIPEPUPPY_BASE_URL: url } = process.env;
      const response = await request.get(`${url}?i=${ingredients}`);
      
      return response.text;
    } catch (error) {
      throw {
        message: "Ocorreu um erro ao buscar pela receita.",
        status: error.status
      }
    }
  }

  async verifyServiceStatus() {
    try {
      const { RECIPEPUPPY_BASE_URL: url } = process.env
      const response = await request.get(url)
      return response.status === httpCodes.OK;
    } catch (error) {
      return false
    }
  }
}

module.exports = RecipePuppyController
