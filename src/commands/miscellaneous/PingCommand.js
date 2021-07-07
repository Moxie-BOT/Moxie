const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class PingCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['ping', 'lag'],
      requirements: {},
      category: 'Outros',
      parameters: [],
      description: 'Mostra a minha latência/ping',
      example: '**🔹 Os argumentos são opcionais nesse comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String[]} content
     */
  async execute (ctx, [content]) {
    await ctx.reply(`🏓 Pong! Seu servidor está na shard \`(${ctx.guild.shard.id + 1}/${this.client.shards.size})\`\n📡 Latência da shard - **${ctx.guild.shard.latency}ms**\n💻 Latência - **${new Date() - ctx.message.timestamp}ms**`)
  }
}
