const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class GuildBannerCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['serverbanner', 'guildbanner'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'guild',
          acceptLocal: true
        }
      ],
      description: 'Mostra o banner de algum servidor',
      example: '**🔹 Você pode usar IDs ou nomes\n🔹 Os argumentos são opcionais, ou seja, se você não escolher nenhum servidor, irei mostrar o banner do servidor onde foi executado o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> 849000250168442901`\n`<<1>><<2>> Doce lar da Moxie`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Guild} guild
     */
  async execute (ctx, [guild]) {
    if (!guild.dynamicBannerURL()) return ctx.reply('<:close:858094081304166433> Este servidor não possui um banner para ser mostrado')

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setTitle(`Banner de ${guild.name}`)
      .setDescription(`Baixe clicando [aqui](${guild.dynamicBannerURL()})`)
      .setImage(guild.dynamicBannerURL())
    await ctx.reply({ embed })
  }
}
