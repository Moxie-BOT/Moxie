const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class PrefixCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['setprefix'],
      requirements: {
        permissions: ['manageGuild']
      },
      category: 'Moderação',
      parameters: [
        {
          type: 'string',
          maxLength: 4,
          minLength: 0
        }
      ],
      description: `Altere meu prefixo a qualquer momento! O prefixo padrão é \`${process.env.PREFIX}\``,
      example: '**🔹 Os argumentos são obrigatórios nesse comando, ou seja, você precisa especificar um prefixo!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> +`\n`<<1>><<2>> m!`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    await this.client.guildCache.update(ctx.guild.id, {
      prefix: content
    })
    await ctx.reply(`Prefixo alterado para \`${content}\``)
  }
}
