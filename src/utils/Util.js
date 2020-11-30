const { InvalidNumberOfIngredients } = require('../utils/Errors')

class Util {
  static validateMaxParams (params, max) {
    if (!params || !max) {
      throw new InvalidNumberOfIngredients()
    }

    params = Array.isArray(params) ? params : params.split(',')

    if (params.length > max) {
      throw new InvalidNumberOfIngredients()
    }

    return true
  }

  static alphabeticOrder (array, property = null) {
    if (array.every(element => typeof element === 'object') && property) {
      return array.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      return array.sort()
    }
  }

  static sanitizeData (string) {
    return string
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/\r/g, '')
  }
}

module.exports = Util
