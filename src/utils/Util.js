class Util {
  static validateMaxParams (params, max) {
    params = Array.isArray(params) ? params : params.split(',')
    return !(params.length < max)
  }

  static alphabeticOrder (array, property = null) {
    if (array.every(element => typeof element === 'object') && property) {
      return array.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      return array.sort()
    }
  }

  static sanitizeData (string) {
    return string
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/\r/g, '')
  }
}

module.exports = Util
