class Util {
  static validateMaxParams (params, max) {
    params = Array.isArray(params) ? params : params.split(',')
    return !(params.length < max)
  }
}

module.exports = Util
