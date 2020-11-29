const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

class Server {
  async init () {
    try {
      const app = express()

      app.use(cors())

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
        console.log('Server running on', HTTP_PORT)
      })
    } catch (error) {
      console.error('Error while running server', error)
    }
  }
}

module.exports = Server
