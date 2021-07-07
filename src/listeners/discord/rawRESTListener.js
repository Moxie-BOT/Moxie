const Logger = require('../../utils/Logger')

module.exports = class rawRESTListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'rawREST'
  }

  execute (request) {
    Logger.debug(`Request info - METHOD: ${request.method}, ROUTE: ${request.route}`)
  }
}
