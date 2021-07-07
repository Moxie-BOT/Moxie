const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class HelpCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['help', 'ajuda', 'comandos', 'commands'],
      requirements: {},
      category: 'Outros',
      parameters: [
        {
          type: 'string',
          required: false,
          full: true
        }
      ]
    })
  }

  /**
   *
   * @param {CommandContext} ctx
   * @param {String} content
   */
  async execute (ctx, content) {
    if (content[0]) {
      const command = this.client.commandTools.getCommand(content[0])
      if (!command) return
      const embed2 = new EmbedBuilder()
        .setColor('DEFAULT')
        .setTitle(`❓ Como usar o ${ctx.guild.storage.prefix}${content[0]}`)
        .setDescription(`${command.description}\n\n**\uD83D\uDCD6 Genéricos**\n${command.example}\n\n**\uD83D\uDD00 Sinônimos**\n${command.labels.join(' | ')}`.replace(/<<1>>/g, ctx.guild.storage.prefix).replace(/<<2>>/g, content[0]))
        .setFooter(`${ctx.author.tag} | ${command.category}`, ctx.author.dynamicAvatarURL())
      await ctx.reply({ embed: embed2 })
      return
    }

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setFooter(`Use ${ctx.guild.storage.prefix}help [comando] para ver mais informações`)
    const categories = this.client.commandTools.getAllCategories()
    for (let i = 0; i < categories.length; i++) {
      const commandCategory = this.client.commandTools.getCommandsFromCategory(categories[i])
      const a = []
      commandCategory.forEach(ds => a.push(ds.labels[0]))

      embed.addField(`> ${categories[i]}`, `\`${a.join(' | ')}\``)
    }
    await ctx.reply({ embed })
  }
}
