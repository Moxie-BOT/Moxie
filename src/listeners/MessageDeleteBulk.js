module.exports = class messageDeleteBulkListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageDeleteBulk'
  }

  async execute (message) {
    const msgIDs = message.map(m => m.id)
    const collectors = []

    this.client.reactionCollectors.forEach(collector => {
      if (msgIDs.includes(collector.message.id)) {
        collectors.push(collector)
      }
    })
    collectors.forEach(c => c.stop('Message Delete'))

    // eslint-disable-next-line array-callback-return
    const log = await message.map(m => {
      if (m.author) return `${m.author.username}#${m.author.discriminator}: ${m?.content}`
    }).filter(e => e)

    const cachedGuild = await this.client.guildCache.get(message[0].guildID)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = message[0].channel.guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    channelLog.createMessage('Mensagens apagadas', {
      name: 'log.txt',
      file: log.join(' \n')
    })
  }
}
