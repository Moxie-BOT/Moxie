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
      description: 'Mostra informações de um convite de servidor',
      usage: '`<<1>>inviteinfo [convite]`',
      example: '\uD83D\uDCCC Mostra o icon do sevidor onde foi executado o comando\n`<<1>>inviteinfo` RkAtsxQbFH'
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
      return ctx.reply(`<:close:858094081304166433> Não encontrei nenhum convite parecido com \`${content.substr(0, 40)}\``)
    }
    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setThumbnail(invite.guild.dynamicIconURL())
      .setTitle(invite.guild.name)
    embed.addField('\uD83D\uDCBB ID do servidor', invite.guild.id, true)
    embed.addField('\uD83D\uDCD8 Canal do convite', `${invite.channel.name} \`(${invite.channel.id})\``, true)
    embed.addField(`\uD83D\uDC65 Membros [${invite.memberCount}]`, `\uD83D\uDD90 Online [${invite.presenceCount}]`, true)
    embed.addField('\uD83D\uDC4B Convite de', invite.inviter ? `${invite.inviter.username}#${invite.inviter.discriminator}\`(${invite.inviter.id})\`` : 'Vanity URL', true)
    embed.addField('⏳ Convite temporário', !invite.temporary ? 'Não' : 'Sim', true)
    embed.setFooter('\uD83E\uDD37 Alguns dos dados não são exatos')
    await ctx.reply({ embed })
  }
}
