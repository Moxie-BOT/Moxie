const CommandRequirements = require('./CommandRequirements')
const CommandParameters = require('./parameters/CommandParameters')
const Logger = require('../../utils/Logger')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const tr = require('../../utils/Utilities')

module.exports = class CommandHandler {
  /**
     *
     * @param {Client} client
     * @param {Object} options
     */
  constructor (client, options) {
    this.client = client
    this.labels = options.labels
    this.category = options.category || 'miscellaneous'
    this.requirements = options.requirements || {}
    this.parameters = options.parameters || []
    this.description = options.description || 'commands:commonOptCommands.description'
    this.usage = options.usage || 'commands:commonOptCommands.usage'
    this.example = options.example || 'commands:commonOptCommands.examples'
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
        const embed = new EmbedBuilder(ctx)
          .setColor('DEFAULT')
          .setTitle('commands:commonNoArgs.howToUse', { 1: ctx.guild.storage.prefix, 2: this.labels[0] })
          .setDescription(`${tr.getTranslation(this.description, null, ctx.guild)}\n\n**${tr.getTranslation('commands:commonNoArgs.use', null, ctx.guild)}: ${tr.getTranslation(this.usage, { 1: ctx.guild.storage.prefix }, ctx.guild)}**\n**${tr.getTranslation('commands:commonNoArgs.examples', null, ctx.guild)}**\n${tr.getTranslation(this.example, { 1: ctx.guild.storage.prefix }, ctx.guild)}\n**${tr.getTranslation('commands:commonNoArgs.aliases', null, ctx.guild)}**\n${this.labels.join(' | ')}`)
          .setFooter(`${ctx.author.tag} | ${tr.getTranslation(this.category, null, ctx.guild)}`, ctx.author.dynamicAvatarURL())
        await ctx.reply({ embed })
        return
      }
      return ctx.reply(err.message)
    }

    try {
      const start = process.hrtime()
      await this.execute(ctx, [...parameters])
      const stop = process.hrtime(start)

      Logger.debug(`Executed ${ctx.commandName} and took ${Math.round(((stop[0] * 1e9) + stop[1]) / 1e6)}ms to complete ${ctx.guild.name} -> ${ctx.channel.name} (${ctx.author.tag})`)
    } catch (err) {
      Logger.error(`Attempt to execute ${ctx.message.content} in ${ctx.guild.name} -> ${ctx.channel.name} failed! ${err.stack}`)
      return ctx.reply(`<:error:849430452624162816> Algo que não era pra ter acontecido, aconteceu. O provável erro foi capaz de impedir que eu executasse o comando por inteiro. Esse é o causador do problema:\n\`${err}\``)
    }
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) { }
}
