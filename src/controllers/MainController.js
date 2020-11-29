const RecipePuppy = require('./RecipePuppyController')
const Giphy = require('./GiphyController.js')
const Util = require('../utils/Util')

class MainController {
  static getInstance () {
    if (!MainController.instance) {
      MainController.instance = new MainController()
    }
    return MainController.instance
  }

  async search (ingredients) {
    await Promise.all([
      Giphy.getInstance().verifyServiceStatus(),
      RecipePuppy.getInstance().verifyServiceStatus()
    ])

    const keywords = Array.isArray(ingredients) ? ingredients : ingredients.split(',')
    const searchedRecipes = await RecipePuppy.getInstance().searchRecipes(ingredients)

    const promises = []
    for (const recipe of searchedRecipes) {
      recipe.title = Util.sanitizeData(recipe.title)
      promises.push(
        Giphy.getInstance().searchGif(recipe.title)
          .then(gif => this.joinResultBodies(recipe, gif))
      )
    }

    const recipes = await Promise.all(promises)
      .then(results => Util.alphabeticOrder(results, 'title'))
    return { keywords, recipes }
  }

  joinResultBodies (recipe, gif) {
    return { ...recipe, gif }
  }
}

module.exports = MainController
