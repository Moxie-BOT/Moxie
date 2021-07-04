
module.exports = class CommandContext {
  /**
     *
     * @param {Client} client
     * @param {Message} msg
     * @param {string[]} args
     * @param {String} commandName
     */
  constructor (client, msg, args, commandName) {
    this.client = client
    this.guild = msg.channel.guild
    this.author = msg.author
    this.author.tag = `${msg.author.username}#${msg.author.discriminator}`
    this.channel = msg.channel
    this.attachments = msg.attachments
    this.labelUsed = commandName
    this.args = args
    this.member = msg.member
    this.messageID = msg.id
    this.message = msg
    this.messages = msg.channel.messages
  }

  /**
   *
   * @param content
   * @param file
   * @returns {Promise<*>}
   */
  async reply (content, file) {
    if (typeof content !== 'object') content = { content }
    const msg = await this.channel.getMessage(this.messageID).catch(() => {})
    if (!msg) return
    content.messageReferenceID = msg.id
    content.allowedMentions = { repliedUser: true }

    return this.channel.createMessage(content, file)
  }
}
