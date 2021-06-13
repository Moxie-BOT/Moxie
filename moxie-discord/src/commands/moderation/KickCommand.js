const CommandContext = require('../../structures/command/CommandContext')
const CommandHandler = require('../../structures/command/CommandHandler')
const Eris = require('eris')
const funCheck = require('../../utils/others/CheckMsg')

module.exports = class KickCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['kick', 'expulsar'],
      requirements: {
        permissions: ['banMembers'],
        botPermissions: ['banMembers']
      },
      category: 'moderation',
      parameters: [
        {
          type: 'member',
          acceptAuthor: false
        },
        {
          type: 'string',
          full: true,
          required: false
        }
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Eris.Member} member
     * @param {String} reason
     */
  async execute (ctx, [member, reason]) {
    if (member.id === this.client.user.id) {
      await funCheck.CheckMsg(ctx, null, {
        me: true
      })
      return
    }
    const action = async (ds) => await ds.guild.kickMember(member.id, reason)
    await funCheck.CheckMsg(ctx, action, {
      punishmentTxt: true,
      stringQuestion: `⚠ Você quer mesmo expulsar ${member.user.mention} (\`${member.user.tag}\`/\`${member.id}\`)? Para confirmar o banimento, clique em ✅`
    })
  }
}
