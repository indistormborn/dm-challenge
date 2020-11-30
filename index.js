require('dotenv/config')
const Server = require('./src/server/Server.js')

const server = new Server()
server.init()
