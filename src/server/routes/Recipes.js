const httpCodes = require('http-status-codes')

const Util = require('../../utils/Util')
const MainController = require('../../controllers/MainController')

class Recipes {
  constructor (server) {
    this.server = server
  }

  async initRoutes () {
    this.server.get('/recipes', async (req, res, next) => {
      try {
        const ingredients = req.query.i
        if (Util.validateMaxParams(ingredients, 3)) {
          const recipes = await MainController.getInstance().search(ingredients)
          res.status(httpCodes.OK).send(recipes)
        }
      } catch (error) {
        res.status(error.status || httpCodes.BAD_REQUEST).send(error.message || 'Error while searching for recipes.')
      }
    })
  }
}

module.exports = Recipes
