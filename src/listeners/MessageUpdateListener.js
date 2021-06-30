const EmbedBuilder = require('../utils/EmbedBuilder')

module.exports = class MessageUpdateListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageUpdate'
  }

  /**
   *
   * @param {Message} message
   * @param {Message} oldMessage
   */
  async execute (message, oldMessage) {
    if (!message || !oldMessage) return
    if (message.author.bot) return
    if (oldMessage.content === message.content) return
    const { prefix, logEventID, activedLogs } = await this.client.guildCache.get(message.guildID)
    if (message.content.startsWith(prefix.toLowerCase())) this.client.emit('messageCreate', message)
    if (!logEventID && !activedLogs?.includes(this.name)) return

    const channelLog = message.channel.guild.channels.get(logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder()
      .setTitle('✏ Mensagem editada')
      .setColor('RED')
    embed.addField('Mensagem antiga', `\`\`\`${oldMessage.content.substr(0, 1015)}\`\`\``)
    embed.addField('Nova mensagem', `\`\`\`${message.content.substr(0, 1015)}\`\`\``)
    embed.addField('Canal', `${message.channel.mention}`, true)
    embed.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.dynamicAvatarURL())
    channelLog.createMessage({ embed })
  }
}
