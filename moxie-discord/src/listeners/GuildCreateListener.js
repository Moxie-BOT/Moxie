const Eris = require('eris')
const Client = require('../Client')

module.exports = class GuildCreateListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'guildCreate'
  }

  /**
     *
     * @param {Eris.Guild} guild
     */
  async execute (guild) {
    await this.client.guildCache.add(guild.id)
  }
}
