const CommandRequirements = require('./CommandRequirements')
const CommandParameters = require('./parameters/CommandParameters')
const Logger = require('../../utils/Logger')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const utils = require('../../utils/Utilities')

module.exports = class CommandHandler {
  /**
     *
     * @param {Client} client
     * @param {Object} options
     */
  constructor (client, options) {
    this.client = client
    this.labels = options.labels
    this.category = options.category || 'Miscellaneous'
    this.requirements = options.requirements || {}
    this.parameters = options.parameters || []
    this.description = options.description || 'Por algum motivo, ninguém colocou uma descrição nesse comando! Desculpe pela inconveniência'
    this.example = options.example || 'Infelizmente ninguém quis me dar exemplos de como executar isso'
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async _execute (ctx) {
    let parameters = []
    try {
      await CommandRequirements.handle(ctx, this.requirements)
    } catch (err) {
      return ctx.reply(err.message)
    }
    try {
      parameters = await CommandParameters.handle(
        ctx,
        ctx.args,
        this.parameters
      )
    } catch (err) {
      if (err.message.includes('InsuficientArgs')) {
        const embed = new EmbedBuilder()
          .setColor('DEFAULT')
          .setTitle(`⁉ Como usar o ${ctx.guild.storage.prefix}${ctx.labelUsed}`)
          .setDescription(`${this.description}\n\n**\uD83D\uDCD6 Genéricos**\n${this.example}\n\n**\uD83D\uDD00 Sinônimos**\n${this.labels.join(' | ')}`.replace(/<<1>>/g, ctx.guild.storage.prefix).replace(/<<2>>/g, ctx.labelUsed))
          .setFooter(`${ctx.author.tag} | ${this.category}`, ctx.author.dynamicAvatarURL())
        await ctx.reply({ embed })
        return
      }
      return ctx.reply(err.message)
    }

    try {
      const start = process.hrtime()
      await this.execute(ctx, [...parameters])
      const stop = process.hrtime(start)

      Logger.debug(`Executed ${ctx.labelUsed} and took ${Math.round(((stop[0] * 1e9) + stop[1]) / 1e6)}ms to complete ${ctx.guild.name} -> ${ctx.channel.name} (${ctx.author.tag})`)
    } catch (err) {
      Logger.error(`Attempt to execute ${ctx.message.content} in ${ctx.guild.name} -> ${ctx.channel.name} failed! ${err.stack}`)
      return ctx.reply(`<:close:858094081304166433> Algo que não era pra ter acontecido, aconteceu. O provável erro foi capaz de impedir que eu executasse o comando por inteiro. Esse é o causador do problema:\n\`${err}\``)
    }
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) { }
}
