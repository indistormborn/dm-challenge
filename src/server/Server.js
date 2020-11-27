const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

class Server {
  async init () {
    const { HTTP_PORT } = process.env || 8080

    const routesDir = fs.readdirSync(path.resolve('src/server/routes'))

    const promises = []
    for (const file of routesDir) {
      const Route = require(path.resolve('src/server/routes', file))
      const route = new Route(app)
      promises.push(route.initRoutes())
    }

    await Promise.all(promises)

    app.listen(HTTP_PORT, () => {
      console.log('Server iniciado na porta', HTTP_PORT)
    })
  }
}

module.exports = Server
