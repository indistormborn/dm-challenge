require('dotenv/config')

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
chai.use(require('chai-json-schema'))
const expect = chai.expect

const Server = require('../src/server/Server')
const results = require('./schemas/result.json')

const httpCodes = require('http-status-codes')

let server;
describe('Server Tests', () => {
  before(async () => {
    const newServer = new Server()
    await newServer.init()
    server = newServer.getServer()
  })

  it('Request to index page should return challenge message', async () => {
    const result = await chai.request(server).get('/')
    
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.OK)
    expect(result).to.have.property('text')
    .to.be.a('string')
    .and.to.be.eq('Delivery Much Challenge')
  })

  it('Should get one ingredient recipes', async () => {
    const result = await chai.request(server).get('/recipes?i=eggs')
    
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.OK)
    expect(result).to.have.property('body')
    .to.be.an('object')
    .and.to.be.jsonSchema(results)

  }).timeout(10000)

  it('Should get two ingredient recipes', async () => {
    const result = await chai.request(server).get('/recipes?i=eggs,avocado')
    
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.OK)
    expect(result).to.have.property('body')
    .to.be.an('object')
    .and.to.be.jsonSchema(results)

  }).timeout(10000)

  it('Should get three ingredient recipes', async () => {
    const result = await chai.request(server).get('/recipes?i=eggs,avocado,tomato')
    
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.OK)
    expect(result).to.have.property('body')
    .to.be.an('object')
    .and.to.be.jsonSchema(results)

  }).timeout(10000)

  it('Should not get four ingredient recipes', async () => {
    const result = await chai.request(server).get('/recipes?i=eggs,avocado,tomato,sausage')
    
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.UNPROCESSABLE_ENTITY)
    expect(result).to.have.property('text').and.to.be.eq('Invalid number of parameters.')

  })

  it('Should return error message if "i" parameter is not passed', async () => {
    const result = await chai.request(server).get('/recipes')
  
    expect(result).to.have.property('status').and.to.be.eq(httpCodes.UNPROCESSABLE_ENTITY)
    expect(result).to.have.property('text').and.to.be.eq('Invalid number of parameters.')

  })
})