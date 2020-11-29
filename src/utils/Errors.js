const httpStatus = require('http-status-codes')

class ServiceUnavailable extends Error {
  constructor (message) {
    super()
    this.message = message
    this.name = 'ServiceUnavailableError'
    this.status = httpStatus.SERVICE_UNAVAILABLE
  }
}

class NotAbleToFindGiphy extends Error {
  constructor (message, status) {
    super()
    this.message = message || 'Unable to find Giphy. Try again later.'
    this.name = 'NotAbleToFindGiphyError'
    this.status = status || httpStatus.BAD_REQUEST
  }
}

class NotAbleToFindRecipe extends Error {
  constructor (message, status) {
    super()
    this.message = message || 'Unable to find Recipe. Try again later.'
    this.name = 'NotAbleToFindRecipeError'
    this.status = status || httpStatus.BAD_REQUEST
  }
}

class InvalidNumberOfIngredients extends Error {
  constructor (message, status) {
    super()
    this.message = message || 'Invalid number of parameters.'
    this.name = 'InvalidNumberOfIngredientsError'
    this.status = status || httpStatus.UNPROCESSABLE_ENTITY
  }
}

module.exports = { ServiceUnavailable, NotAbleToFindGiphy, NotAbleToFindRecipe, InvalidNumberOfIngredients }
