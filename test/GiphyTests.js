require('dotenv/config')

const chai = require('chai')
chai.use(require('chai-json-schema'))
const expect = chai.expect

const Giphy = require('../src/controllers/GiphyController')

const { ServiceUnavailable } = require('../src/utils/Errors')

describe('GiphyController Tests', () => {
  it('verifyServiceStatus with valid request params', async () => {
    const result = await Giphy.getInstance().verifyServiceStatus()
    expect(result).to.be.true
  }).timeout(0)

  it('verifyServiceStatus with invalid request params', async () => {
    const validKey = process.env.GIPHY_API_KEY
    process.env.GIPHY_API_KEY = validKey + 'akd'

    try {
      await Giphy.getInstance().verifyServiceStatus()
    } catch (error) {
      expect(error).to.be.instanceOf(ServiceUnavailable)
      expect(error).to.have.property('message').and.to.be.eq('Giphy API is not available.')
    }

    process.env.GIPHY_API_KEY = validKey
  }).timeout(0)

  it('searchGif with valid parameters', async () => {
    const gif = await Giphy.getInstance().searchGif('Greek Omelete')

    expect(gif).to.be.a('string')
    expect(gif).to.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
  }).timeout(0)
})
