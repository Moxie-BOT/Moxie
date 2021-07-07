const { readdirSync } = require('fs')
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
    const files = readdirSync('src/listeners/discord')
    for (const file of files) {
      const listener = new (require('../listeners/discord/' + file))(this.client)
      this.client.on(listener.name, (...args) => listener.execute(...args))
    }
  }
}
