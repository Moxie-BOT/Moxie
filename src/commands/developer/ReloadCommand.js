const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class EvalCommand extends (
  CommandHandler
) {
  /**
     *
     * @param {Client} client
     */
  constructor (client) {
    super(client, {
      labels: ['reload'],
      requirements: {
        onlyDevs: true
      },
      category: 'Desenvolvedor',
      parameters: [
        {
          type: 'string',
          full: true
        }
      ],
      description: 'Recarrega meus arquivos',
      example: '**🔹 Os argumentos são obrigatórios, ou seja, você precisa fornecer as informações que eu preciso para executar o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> --command userinfo`\n`<<1>><<2>> --file ../../Client`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    const arr = content.split(' ')
    switch (arr[0]) {
      case '--command':
        if (this.client.commandTools.reloadCommand(arr[1])) await ctx.reply('🎉 Comando recarregado com sucesso!')
        else await ctx.reply('<:close:858094081304166433> Não foi possível recarregar o comando')
        break
      case '--file':
        delete require.cache[require.resolve(arr[1])]
        await ctx.reply('🎉 Arquivo recarregado com sucesso!')
        break
    }
  }
}
