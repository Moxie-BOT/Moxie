const EmbedBuilder = require('../../utils/EmbedBuilder')

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
    if (message.author.bot) return
    if (!message.content) return
    const { prefix, logEventID, activedLogs } = await this.client.guildCache.get(message.guildID)
    if (message.content.startsWith(prefix.toLowerCase())) this.client.emit('messageCreate', message)
    if (!logEventID && !activedLogs?.includes(this.name)) return

    const channelLog = message.channel.guild.channels.get(logEventID)
    if (!channelLog) return

    const embed = new EmbedBuilder()
      .setTitle('<:pencil:861965120959676416> Mensagem editada')
      .setColor('RED')
      .setDescription(`**[Vá até ela!](https://discord.com/channels/${message.guildID}/${message.channel.id}/${message.id})**`)
    if (oldMessage) embed.addField('Mensagem antiga', `\`\`\`${oldMessage.content.replace(/`/g, '').substr(0, 1015)}\`\`\``)
    embed.addField('Nova mensagem', `\`\`\`${message.content.replace(/`/g, '').substr(0, 1015)}\`\`\``)
    embed.addField('Canal', `${message.channel.mention}`, true)
    embed.setFooter(`Autor da mensagem - ${message.author.username}#${message.author.discriminator}`, message.author.dynamicAvatarURL())
    channelLog.createMessage({ embed })
  }
}
