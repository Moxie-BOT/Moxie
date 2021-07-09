const EmbedBuilder = require('../../utils/EmbedBuilder')

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

    if (!message.content && message?.attachments?.length === 0) return
    const cachedGuild = await this.client.guildCache.get(message.guildID)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = message.channel.guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder()
      .setTitle('🗑 Mensagem deletada')
      .setColor('RED')
    if (message.content) embed.addField('Mensagem apagada', `\`\`\`${message.content.replace(/`/g, '').substr(0, 1015)}\`\`\``, true)
    if (message?.attachments?.length > 0) {
      embed.setTitle('🗑 Imagem apagada')
      embed.setImage(message.attachments[0].proxy_url)
    }
    embed.addField('Canal', `${message.channel.mention}`, true)
    embed.setFooter(`Autor da mensagem - ${message.author.username}#${message.author.discriminator}`, message.author.dynamicAvatarURL())
    channelLog.createMessage({ embed })
  }
}
