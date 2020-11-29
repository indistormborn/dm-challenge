const RecipePuppy = require('./RecipePuppyController')
const Giphy = require('./GiphyController.js')

class MainController {
  static getInstance () {
    if (!MainController.instance) {
      MainController.instance = new MainController()
    }
    return MainController.instance
  }

  async search (ingredients) {
    const keywords = Array.isArray(ingredients) ? ingredients : ingredients.split(',')
    const searchedRecipes = await RecipePuppy.getInstance().searchRecipes(ingredients)

    const promises = []
    for (const recipe of searchedRecipes) {
      promises.push(
        Giphy.getInstance().searchGif(recipe.title)
          .then(gif => this.joinResultBodies(recipe, gif))
      )
    }

    const recipes = await Promise.all(promises)
    return { keywords, recipes }
  }

  joinResultBodies (recipe, gif) {
    return { ...recipe, gif }
  }
}

module.exports = MainController
