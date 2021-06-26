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
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    let invite
    try {
      invite = await this.client.getInvite(content, true)
    } catch (e) {
      return ctx.reply('Não encontrei esse convite')
    }
    const embed = new EmbedBuilder(ctx)
      .setColor('DEFAULT')
      .setThumbnail(invite.guild.dynamicIconURL())
      .setTitle(invite.guild.name)
    embed.addField('💻 ID', invite.guild.id, true)
    embed.addField('📘 Canal do convite', `${invite.channel.name} \`(${invite.channel.id})\``, true)
    embed.addField(`👥 Membros [${invite.memberCount}]`, `🖐 Online ${invite.presenceCount}`, true)
    embed.addField('👋 Convite de', invite.inviter ? `${invite.inviter.username}#${invite.inviter.discriminator}\`(${invite.inviter.id})\`` : 'Vanity URL', true)
    embed.addField('⏳ Convite temporário', !invite.temporary ? 'Não' : 'Sim', true)
    embed.setFooter('🤷 Alguns dos dados não são exatos')
    await ctx.reply({ embed })
  }
}
