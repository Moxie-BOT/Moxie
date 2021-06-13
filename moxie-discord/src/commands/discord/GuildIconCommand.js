const CommandContext = require('../../structures/command/CommandContext')
const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const Eris = require('eris')

module.exports = class GuildIconCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['guildicon', 'servericon'],
      requirements: {},
      category: 'discord',
      parameters: [
        {
          type: 'guild',
          acceptLocal: true
        }
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Eris.Guild} guild
     */
  async execute (ctx, [guild]) {
    if (!guild.dynamicIconURL()) return ctx.reply('<:error:849430452624162816> Este servidor não possui um icon para ser mostrado')

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setTitle(`Icon de ${guild.name}`)
      .setDescription(`**Baixe clicando [aqui](${guild.dynamicIconURL()})**`)
      .setImage(guild.dynamicIconURL())
      .setFooter(ctx.author.tag, ctx.author.dynamicAvatarURL())
    await ctx.reply({ embed })
  }
}
