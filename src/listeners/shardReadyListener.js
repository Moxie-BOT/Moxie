const Logger = require('../utils/Logger')

module.exports = class shardReadyListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'shardReady'
  }

  execute (id) {
    Logger.info(`Shard ${id} is now ready!`)
  }
}
