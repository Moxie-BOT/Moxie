const CommandContext = require('../structures/command/CommandContext')

module.exports = class MessageListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageCreate'
  }

  /**
     *
     * @param {Message} message
     */
  async execute (message) {
    if (message.author.bot) return
    if (message.author.discriminator === '0000') return

    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.id === message.channel.id) collector.collect(message)
    })

    const { prefix } = await this.client.guildCache.get(message.guildID)
    if (!message.content.startsWith(prefix.toLowerCase())) return
    const args = message.content.trim().replace(prefix.toLowerCase(), '').split(' ')
    const commandName = args.shift().toLowerCase()
    const cmd = this.client.commandTools.getCommand(commandName)

    if (!cmd) return
    const ctx = new CommandContext(this.client, message, args, commandName)
    await cmd._execute(ctx)
  }
}
