require('dotenv/config')
const Server = require('./src/server/Server.js')

const server = new Server()
server.init()

// const Recipe = require('./src/controllers/RecipePuppyController')
// const recipe = new Recipe()
// recipe.searchRecipes('onion,tomato,eggs')

// const Gif = require('./src/controllers/GiphyController')
// const gif = new Gif()
// gif.searchGif('Speedy Egg & Cheese Stack \r\n\r\n')
