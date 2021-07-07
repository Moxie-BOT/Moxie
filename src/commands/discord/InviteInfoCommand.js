const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class InviteInfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['inviteinfo'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'string'
        }
      ],
      description: 'Mostra informações de qualquer convite de servidor',
      example: '**🔹 Os argumentos são obrigatórios, ou seja, você precisa fornecer um convite!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> RkAtsxQbFH`\n`<<1>><<2>> discord.gg/RkAtsxQbFH`\n`<<1>><<2>> https://discord.com/invite/lori`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    const contentArr = content.split('/')
    content = contentArr[contentArr.length - 1]
    let invite
    try {
      invite = await this.client.getInvite(content, true)
    } catch (e) {
      return ctx.reply(`<:close:858094081304166433> Não encontrei nenhum convite parecido com \`${content.replace(/`/g, '').substr(0, 40)}\``)
    }
    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setThumbnail(invite.guild.dynamicIconURL())
      .setTitle(`<:DISCORD:861761730190377001> ${invite.guild.name}`)
    embed.addField('💻 ID do servidor', invite.guild.id, true)
    embed.addField('<:chat:861754863633039391> Canal do convite', `${invite.channel.name} (\`${invite.channel.id}\`)`, true)
    embed.addField(`<:members:861751455635079168> Membros [${invite.memberCount}]`, `┗ 🤚 Online ❯ **${invite.presenceCount}**`, true)
    embed.addField('👋 Convite de', invite.inviter ? `${invite.inviter.username}#${invite.inviter.discriminator} (\`${invite.inviter.id}\`)` : 'Vanity URL', true)
    embed.setFooter('🤷‍ Alguns dos dados não são exatos')
    await ctx.reply({ embed })
  }
}
