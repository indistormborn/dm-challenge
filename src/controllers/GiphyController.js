const request = require('superagent')
const httpCodes = require('http-status-codes')
const { ServiceUnavailable, NotAbleToFindGiphy } = require('../utils/Errors')

class GiphyController {
  static getInstance () {
    if (!GiphyController.instance) {
      GiphyController.instance = new GiphyController()
    }
    return GiphyController.instance
  }

  async searchGif (term) {
    try {
      const { GIPHY_BASE_URL: url, GIPHY_API_KEY: key } = process.env

      const response = await request.get(`${url}search?api_key=${key}&q=${term}}&limit=1`)

      return this.parseGiphyBody(response.body)
    } catch (error) {
      throw new NotAbleToFindGiphy(JSON.parse(error.response.error.text).message, error.status)
    }
  }

  async verifyServiceStatus () {
    try {
      const { GIPHY_BASE_URL: url, GIPHY_API_KEY: key } = process.env
      const response = await request.get(`${url}search?api_key=${key}&q=&limit=1`)
      return response.status === httpCodes.OK
    } catch (error) {
      throw new ServiceUnavailable('Giphy API is not available.', error.status)
    }
  }

  parseGiphyBody (giphyBody) {
    const { data: resultArray } = giphyBody
    return resultArray[0] ? resultArray[0].url : ''
  }
}

module.exports = GiphyController
