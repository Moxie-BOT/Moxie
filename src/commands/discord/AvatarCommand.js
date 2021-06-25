const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class AvatarCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['avatar', 'user-icon'],
      requirements: {},
      category: 'discord',
      parameters: [
        {
          type: 'user',
          acceptAuthor: true
        }
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {User} user
     */
  async execute (ctx, [user]) {
    const embed = new EmbedBuilder(ctx)
      .setColor('DEFAULT')
      .setTitle(`🖼️ Avatar de ${user.tag}`)
      .setDescription(`**Baixe clicando [aqui](${user.dynamicAvatarURL()})**`)
      .setImage(user.dynamicAvatarURL())
    await ctx.reply({ embed })
  }
}
