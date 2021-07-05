const EmbedBuilder = require('../utils/EmbedBuilder')

module.exports = class MessageDeleteListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageDelete'
  }

  /**
     *
     * @param {Message} message
     * @returns {Promise<void>}
     */
  async execute (message) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.id === message.id) {
        collector.stop('Message Delete')
      }
    })

    const cachedGuild = await this.client.guildCache.get(message.guildID)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = message.channel.guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder()
      .setTitle('🗑 Mensagem deletada')
      .setColor('RED')
    embed.addField('Conteúdo', `${message.content.substr(0, 1015)}`, true)
    embed.addField('Canal', `${message.channel.mention}`, true)
    embed.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.dynamicAvatarURL())
    channelLog.createMessage({ embed })
  }
}
