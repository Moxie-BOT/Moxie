const Logger = require('../utils/Logger')

module.exports = class ReadyListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'ready'
  }

  execute () {
    Logger.info(`${this.client.user.username} is now online!`)
  }
}
