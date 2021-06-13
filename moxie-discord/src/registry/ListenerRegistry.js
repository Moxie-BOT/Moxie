const { readdirSync } = require('fs')
const Client = require('../Client')
const Logger = require('../utils/Logger')

module.exports = class ListenerRegistry {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client

    this.load()
  }

  load () {
    Logger.info('Initializing events')
    const files = readdirSync('moxie-discord/src/listeners')
    for (const file of files) {
      const listener = new (require('../listeners/' + file))(this.client)
      this.client.on(listener.name, (...args) => listener.execute(...args))
    }
  }
}
