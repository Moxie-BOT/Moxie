const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')
const { Constants } = require('eris')

module.exports = class UserinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['userinfo'],
      requirements: {},
      category: 'discord',
      parameters: [
        {
          type: 'user',
          required: false,
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
    const timeConfig = {
      largest: 3,
      units: ['y', 'mo', 'd', 'h', 'm', 's'],
      language: 'pt',
      round: true,
      conjunction: ' e ',
      serialComma: false
    }
    const emojis = {
      VERIFIED_BOT_DEVELOPER: '<:dev:851108795694448680>',
      HYPESQUAD_EVENTS: '<:hypeevent:851109159113588766>',
      DISCORD_EMPLOYEE: '<:teamdisc:851108217337151518>',
      BUGHUNTER_LEVEL_2: '<:hunterlvl2:851109579601215498>',
      BUGHUNTER_LEVEL_1: '<:bughunter:851109365149859860>',
      HOUSE_BRILLIANCE: '<:briliance:851108271376039936>',
      PARTNERED_SERVER_OWNER: '<:partner:851108691507150918>',
      HOUSE_BRAVERY: '<:bravery:851108120562630686>',
      HOUSE_BALANCE: '<:balance:851108061883531285>',
      EARLY_SUPPORTER: '<:earlywumpus:851108590605172766>',
      VERIFIED_BOT: '<:vbot1:851109964009439232><:vbot2:851110026873012234>',
      TEAM_USER: '',
      SYSTEM: ''
    }
    const flags = user.publicFlags
    const embed = new EmbedBuilder(ctx)
    let title
    if (flags) {
      const filterFlags = Object.entries(Constants.UserFlags).filter(([, bit]) => (flags & bit) === bit).map(([field]) => field).map(f => emojis[f])
      title = `${user.tag} ${filterFlags.join(' ')}`
      if (title.length > 256) {
        title = user.tag
        embed.addField('🚩 Emblemas', filterFlags.join(' '), true)
      }
    } else title = user.tag

    embed.setTitle(title)
    embed.setThumbnail(user.dynamicAvatarURL())
    embed.setColor('DEFAULT')
    embed.addField('📚 Tag', `\`${user.tag}\``, true)
    embed.addField('💻 ID do usuário', `\`${user.id}\``, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - user.createdAt, timeConfig), true)

    if (ctx.guild.members.has(user.id)) embed.addField('📆 Entrou há', humanizeDuration(Date.now() - ctx.guild.members.get(user.id).joinedAt, timeConfig), true)
    await ctx.reply({ embed })
  }
}
