const Logger = require('../utils/Logger')

module.exports = class shardDisconnectListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'shardDisconnect'
  }

  execute (id, error) {
    Logger.error(`Shard ${id} down! ${error.stack}`)
  }
}
