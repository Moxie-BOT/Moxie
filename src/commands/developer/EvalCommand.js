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
      labels: ['eval', 'ev'],
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
      description: 'Executa pedaços de códigos usando javascript com implementação node.js',
      example: '**🔹 Os argumentos são obrigatórios, ou seja, você precisa fornecer as informações que eu preciso para executar o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> ctx`\n`<<1>><<2>> this`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} code
     */
  async execute (ctx, [code]) {
    try {
      const util = require('util')
      code = code.replace(/(^`{3}(\w+)?|`{3}$)/g, '')
      // eslint-disable-next-line no-eval
      const ev = await eval(code)
      let str = this.clean(
        util.inspect(ev, {
          depth: 0
        })
      )
      str = `${str.replace(
                new RegExp(`${this.client.token}`, 'g'),
                'undefined'
            )}`
      if (str.length > 1800) str = str.substr(0, 1800) + '...'

      await ctx.reply(`\`\`\`xl\n${str}\`\`\``)
    } catch (err) {
      await ctx.reply(`\`\`\`xl\n${err.stack}\`\`\``)
    }
  }

  clean (text) {
    const blankSpace = String.fromCharCode(8203)
    return typeof text === 'string'
      ? text
        .replace(/`/g, '`' + blankSpace)
        .replace(/@/g, '@' + blankSpace)
      : text
  }
}
