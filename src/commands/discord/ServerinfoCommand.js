const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')

module.exports = class ServerinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['serverinfo', 'guildinfo'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'guild',
          required: false,
          acceptLocal: true
        }
      ],
      description: 'Mostra informações de algum servidor que estou',
      example: '**🔹 Você pode usar nomes e IDs\n🔹 Os argumentos são opcionais, ou seja, você não precisa forncer um servidor.**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> 849000250168442901`\n`<<1>><<2>> Doce lar da Moxie`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Guild} guild
     */
  async execute (ctx, [guild]) {
    const owner = this.client.users.get(guild.ownerID) || await this.client.getRESTUser(guild.ownerID)
    let text = 0
    let voice = 0
    let category = 0
    let news = 0
    let users = 0
    let bots = 0
    let stage = 0
    const allChannels = guild.channels.size
    const allMembers = guild.members.size
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    guild.channels.forEach(ch => {
      if (ch.type === 0) text++
      if (ch.type === 2) voice++
      if (ch.type === 4) category++
      if (ch.type === 5) news++
      if (ch.type === 13) stage++
    })
    guild.members.forEach(u => {
      if (!u.bot) users++
      if (u.bot) bots++
    })

    const embed = new EmbedBuilder()
      .setTitle(`<:DISCORD:861761730190377001> ${guild.name} ${guild.premiumTier ? '<:boost:860564288186875936>' : ''}`)
      .setColor('DEFAULT')
      .setDescription(guild.description)
      .setThumbnail(guild.iconURL)
      .setImage(guild.splashURL || guild.bannerURL)
    embed.addField('💻 ID do servidor', `\`${guild.id}\``, true)
    embed.addField('💻 Shard', `\`${ctx.guild.shard.id + 1}/${this.client.shards.size}\``, true)
    embed.addField('<:owner:861716252883025961> Dono', `${owner.username}#${owner.discriminator} \`(${owner.id})\``, true)
    embed.addField(`<:chat:861754863633039391> Canais [${allChannels}]`, (category > 0 ? `┗ <:category:861970309966725120> Categoria ❯ **${category}**\n` : '') + (text > 0 ? `┗ <:txt:861751247467053076> Texto ❯ **${text}**\n` : '') + (voice > 0 ? `┗ <:voice:861751272755691541> Voz ❯ **${voice}**\n` : '') + (news > 0 ? `┗ <:news:861751303457079296> Anúncios ❯ **${news}**\n` : '') + (stage > 0 ? `┗ <:stage:861751587277111326> Palco ❯ **${stage}**` : ''), true)
    embed.addField(`<:members:861751455635079168> Membros [${allMembers}]`, `┗ <:members:861751455635079168> Usuários ❯ **${users}**\n┗ <:bot:861751502325415946> Bots ❯ **${bots}**`, true)
    if (guild.roles.size > 0) embed.addField(`<:roles:861767476931854338> Cargos [${guild.roles.size}]`, 'ﾠ', true)
    embed.addField('🔞 Servidor NSFW', guild.nsfw ? 'Sim' : 'Não', true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - guild.createdAt, timeConfig) + ` (<t:${Math.floor(guild.createdAt / 1000)}:d>)`, true)
    await ctx.reply({ embed })
  }
}
