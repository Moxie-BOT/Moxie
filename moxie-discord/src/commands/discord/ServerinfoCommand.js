const CommandContext = require('../../structures/command/CommandContext')
const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')
const Eris = require('eris')

module.exports = class ServerinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['serverinfo', 'guildinfo'],
      requirements: {},
      category: 'discord',
      parameters: [
        {
          type: 'guild',
          acceptLocal: true
        }
      ]
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Eris.Guild} guild
     */
  async execute (ctx, [guild]) {
    const owner = this.client.users.get(guild.ownerID)
    let text = 0
    let voice = 0
    let category = 0
    const allChannels = guild.channels.size
    let users = 0
    let bots = 0
    const allMembers = guild.members.size
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    guild.channels.forEach(ch => {
      if (ch.type === 0) text++
      if (ch.type === 2) voice++
      if (ch.type === 4) category++
    })
    guild.members.forEach(u => {
      if (!u.bot) users++
      if (u.bot) bots++
    })

    const embed = new EmbedBuilder()
    embed.setTitle(`${guild.name} ${guild.premiumTier ? '<:boost:825875610425360494>' : ''}`)
    embed.setColor('DEFAULT')
    embed.setDescription(guild.description)
    embed.setThumbnail(guild.iconURL)
    embed.setImage(guild.splashURL || guild.bannerURL)
    embed.addField('💻 ID do servidor', `\`${guild.id}\``, true)
    embed.addField('👑 Dono', `\`${owner.username}#${owner.discriminator}\``, true)
    embed.addField('💻 Shard', `\`${Number(ctx.guild.shard.id)}/${this.client.shards.size}\``, true)
    embed.addField(`🔖 Canais ${allChannels}`, `Texto: ${text}\nVoz: ${voice}\nCategorias: ${category}`, true)
    embed.addField(`👥 Membros ${allMembers}`, `Usuários: ${users}\nBots: ${bots}`, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - guild.createdAt, timeConfig), true)
    embed.setFooter(ctx.author.tag, ctx.author.dynamicAvatarURL())
    await ctx.reply({ embed })
  }
}
