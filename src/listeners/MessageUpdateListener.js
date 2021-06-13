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
     * @param {Eris.Message} message
     * @param {Eris.Message} oldMessage
     */
  execute (message, oldMessage) {
    if (!message || !oldMessage) return
    if (message.author.bot) return
    if (oldMessage.content === message.content) return
    this.client.emit('messageCreate', message)
  }
}
