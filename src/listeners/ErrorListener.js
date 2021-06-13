const Logger = require('../utils/Logger')

module.exports = class ClientErrorListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'error'
  }

  async execute (err) {
    Logger.error(err.stack)
  }
}
