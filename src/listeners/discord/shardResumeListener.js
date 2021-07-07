const Logger = require('../../utils/Logger')

module.exports = class shardResumeListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'shardResume'
  }

  execute (id) {
    Logger.info(`Shard ${id} resume!`)
  }
}
