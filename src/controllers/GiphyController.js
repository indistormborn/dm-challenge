const { saveCookies } = require('superagent')
const request = require('superagent')
const httpCodes = require('http-status-codes')

class GiphyController {
  static instance

  static getInstance () {
    if (!GiphyController.instance) {
      GiphyController.instance = new GiphyController()
    }
    return GiphyController.instance
  }

  async searchGif(term) {
    try {
      const { GIPHY_BASE_URL: url, GIPHY_API_KEY: key } = process.env;

      await this.verifyServiceStatus()

      const response = await request.get(`${url}search?api_key=${key}&q=${term}}&limit=1`);

      return this.parseGiphyBody(response.body)
    } catch (error) {
      throw {
        message: "Ocorreu um erro ao buscar pelo gif.",
        status: error.status
      }
    }
  }

  async verifyServiceStatus() {
    try {
      const { GIPHY_BASE_URL: url, GIPHY_API_KEY: key } = process.env
      const response = await request.get(`${url}search?api_key=${key}&q=&limit=1`)
      return response.status === httpCodes.OK;
    } catch (error) {
      throw error;
    }
  }

  parseGiphyBody (giphyBody) {
    const { data: result_array } = giphyBody
    return result_array[0] ? result_array[0].url : ""
  }
}

module.exports = GiphyController
