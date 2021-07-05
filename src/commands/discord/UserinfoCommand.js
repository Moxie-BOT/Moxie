const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')
const { Constants } = require('eris')
const { ReactionCollector } = require('../../utils/Collector')
const PermissionsJSON = require('../../utils/others/ErisPermissions.json')

module.exports = class UserinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['userinfo'],
      requirements: {
        botPermissions: ['addReactions']
      },
      category: 'Discord',
      parameters: [
        {
          type: 'user',
          required: false,
          acceptAuthor: true
        }
      ],
      description: 'Veja informações de qualquer usuário no discord',
      example: '**🔹 Você pode usar menções e IDs, caso o usuário esteja no servidor, nomes e apelidos\n🔹 Os argumentos são opcionais nesse comando, ou seja, se você não escolher nenhum usuário eu irei mostrar suas próprias informações!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> @Luís`\n`<<1>><<2>> 730425354870587473`\n`<<1>><<2>> Luís`'
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
    const embed = new EmbedBuilder()
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
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - user.createdAt, timeConfig) + ` (${new Date(user.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)

    const member = ctx.guild.members.get(user.id)

    if (!member) return ctx.reply({ embed })
    embed.addField('📆 Entrou há', humanizeDuration(Date.now() - member.joinedAt, timeConfig) + ` (${new Date(member.joinedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)
    if (member.premiumSince) embed.addField('📆 Booster há', humanizeDuration(Date.now() - member.premiumSince, timeConfig) + ` (${new Date(member.premiumSince).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`)

    const msg = await ctx.reply({ embed })
    await msg.addReaction('▶')
    await msg.addReaction('◀')

    const filter = (r, user) => (r.name === '▶' || r.name === '◀') && user === ctx.author
    const collector = new ReactionCollector(this.client, msg, filter, { time: 120000 })

    const embed2 = new EmbedBuilder()
    const permsRole = member.permissions.json
    const realPerms = Object.keys(permsRole).filter(field => permsRole[field])
    embed2.addField('📛 Permissões', realPerms.length > 0 ? realPerms.map(p => `\`${PermissionsJSON[p]}\``).join(', ') : 'Nenhuma')
    embed2.setColor('DEFAULT')
    let page = 1

    collector.on('collect', (r) => {
      switch (r.name) {
        case '▶':
          if (page === 2) return
          page++
          msg.edit({ embed: embed2 })
          break
        case '◀':
          if (page === 1) return
          page--
          msg.edit({ embed })
          break
      }
    })
  }
}
