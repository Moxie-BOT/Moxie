const CommandRequirements = require('./CommandRequirements')
const CommandParameters = require('./parameters/CommandParameters')

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
      return ctx.reply(err.message)
    }

    try {
      await this.execute(ctx, [...parameters])
    } catch (err) {
      return ctx.reply(`<:error:849430452624162816> Algo que não era pra ter acontecido, aconteceu. O provável erro foi capaz de impedir que eu executasse o comando por inteiro. Esse é o causador do problema:\n\`${err}\``)
    }
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) { }
}
