class Recipes {
  constructor (server) {
    this.server = server
  }

  async initRoutes () {
    this.server.get('/recipes', (req, res, next) => {
      res.send('TESTE DEU CERTO')
    })
  }
}

module.exports = Recipes
