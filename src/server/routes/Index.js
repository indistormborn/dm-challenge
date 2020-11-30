const httpCodes = require('http-status-codes')

class Index {
  constructor (server) {
    this.server = server
  }

  async initRoutes () {
    this.server.get('/', (req, res, next) => {
      res.status(httpCodes.OK).send('Delivery Much Challenge')
    })
  }
}

module.exports = Index
