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
          acceptAuthor: false
        }
      ],
      description: 'Mostra o avatar atual de qualquer usuário',
      example: '**🔹 Você pode usar menções e IDs, caso o usuário esteja no servidor, nomes e apelidos\n🔹 Os argumentos são opcionais nesse comando, ou seja, se você não escolher nenhum usuário eu irei mostrar seu próprio avatar!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> @Luís`\n`<<1>><<2>> 730425354870587473`\n`<<1>><<2>> Luís`'
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
