const EmbedBuilder = require('../utils/EmbedBuilder')

module.exports = class guildBanAddListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'guildBanAdd'
  }

  /**
   *
   * @param {Guild} guild
   * @param {User} user
   * @returns {Promise<void>}
   */
  async execute (guild, user) {
    const cachedGuild = await this.client.guildCache.get(guild.id)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder()
      .setTitle('Usuário banido')
      .setColor('RED')
      .setDescription(`${user.username}#${user.discriminator} (\`${user.id}\`)`)
      .setThumbnail(user.dynamicAvatarURL())
    channelLog.createMessage({ embed })
  }
}
