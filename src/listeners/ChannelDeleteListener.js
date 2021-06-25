const EmbedBuilder = require('../utils/EmbedBuilder')
module.exports = class channelDeleteListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'channelDelete'
  }

  /**
     *
     * @param {Channel} channel
     * @returns {Promise<void>}
     */
  async execute (channel) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.channel.id === channel.id) collector.stop('Channel Delete')
    })

    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.id === channel.id) collector.stop('Channel Delete')
    })

    const cachedGuild = await this.client.guildCache.get(channel.guild.id)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = channel.guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder(channel.guild)
      .setTitle('Canal deletado')
      .setColor('RED')
    channelLog.createMessage({ embed })
  }
}
