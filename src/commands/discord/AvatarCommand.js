const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class AvatarCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['avatar', 'user-icon'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'user',
          acceptAuthor: true
        }
      ],
      description: 'Mostra o avatar atual de qualquer usuário do discord',
      usage: '`<<1>>avatar (usuário)`',
      example: '\uD83D\uDCCC Se você não por nenhum usuário, irá mostrar seu avatar\n`<<1>>avatar`\n\uD83D\uDCCC Avatar do usuário por ID\n`<<1>>avatar 730425354870587473`\n\uD83D\uDCCC Buscando usuário por nome\n`<<1>>avatar Luís`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {User} user
     */
  async execute (ctx, [user]) {
    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setTitle(`\uD83D\uDDBC Avatar de ${user.tag}`)
      .setDescription(`**Baixe clicando [aqui](${user.dynamicAvatarURL()})**`)
      .setImage(user.dynamicAvatarURL())
    await ctx.reply({ embed })
  }
}
