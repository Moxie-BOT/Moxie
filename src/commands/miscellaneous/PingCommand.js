const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class PingCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['ping', 'lag'],
      requirements: {},
      category: 'miscellaneous',
      parameters: [
        {
          type: 'string',
          includesThat: ['shards', 'shard', 'clusters', 'cluster'],
          required: false
        }
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String[]} content
     */
  async execute (ctx, [content]) {
    if (content) return ctx.reply('Nada por enquanto')
    await ctx.reply(`🏓 Pong! Seu servidor está na shard \`(${ctx.guild.shard.id}/${this.client.shards.size})\`\n📡 Latência da shard - **${ctx.guild.shard.latency}ms**\n💻 Latência - **${new Date() - ctx.message.timestamp}ms**`)
  }
}
