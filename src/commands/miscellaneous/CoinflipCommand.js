const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class CoinflipCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['coinflip', 'flipcoin'],
      requirements: {},
      category: 'Outros',
      parameters: [],
      description: 'Gire uma moeda e teste sua sorte',
      example: '**🔹 Os argumentos são opcionais nesse comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) {
    await ctx.reply(`🔹 Você girou a moeda e caiu **${Math.random() < 0.5 ? 'coroa' : 'cara'}**`)
  }
}
