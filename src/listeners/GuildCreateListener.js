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
     * @param {Guild} guild
     */
  async execute (guild) {
    await this.client.guildCache.add(guild.id)
  }
}
