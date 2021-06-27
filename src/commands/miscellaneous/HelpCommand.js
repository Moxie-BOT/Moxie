const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class HelpCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['help', 'ajuda', 'comandos', 'commands'],
      requirements: {},
      category: 'Miscellaneous'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) {
    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
    const categories = this.client.commandTools.getAllCategories()
    for (let i = 0; i < categories.length; i++) {
      const commandCategory = this.client.commandTools.getCommandsFromCategory(categories[i])
      const a = []
      commandCategory.forEach(ds => a.push(ds.labels[0]))

      embed.addField(categories[i], `\`${a.join(' | ')}\``)
    }
    await ctx.reply({ embed })
  }
}
