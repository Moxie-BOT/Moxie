const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class GuildIconCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['guildicon', 'servericon'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'guild',
          acceptLocal: true
        }
      ],
      description: 'Mostra o icon atual do servidor',
      usage: '`<<1>>guildicon (canal)`',
      example: '\uD83D\uDCCC Mostra o icon do sevidor onde foi executado o comando\n`<<1>>guildicon`\n\uD83D\uDCCC Ícone do servidor pelo nome\n`<<1>>guildicon Doce lar da Moxie`\n\uD83D\uDCCC E também pelo ID\n`<<1>>guildicon 849000250168442901`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Guild} guild
     */
  async execute (ctx, [guild]) {
    if (!guild.dynamicIconURL()) return ctx.reply('<:close:858094081304166433> Este servidor não possui um icon para ser mostrado')

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setTitle(`Ícone de ${guild.name}`)
      .setDescription(`Baixe clicando [aqui](${guild.dynamicIconURL()})`)
      .setImage(guild.dynamicIconURL())
    await ctx.reply({ embed })
  }
}
