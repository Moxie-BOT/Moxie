const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')

module.exports = class GuildCreateListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'guildCreate'
  }

  /**
     *
     * @param {Guild} guild
     */
  async execute (guild) {
    await this.client.guildCache.add(guild.id)

    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    const embed = new EmbedBuilder()
      .setTitle(`Novo servidor | ${guild.name}`)
      .setColor('GREEN')
      .setThumbnail(guild.dynamicIconURL())
    embed.addField('<:owner:861716252883025961> Dono', `${guild.members.get(guild.ownerID).username}#${guild.members.get(guild.ownerID).discriminator} (\`${guild.ownerID}\`)`, true)
    embed.addField('<:members:861751455635079168> Membros', guild.memberCount, true)
    embed.addField('💻 Shard', guild.shard.id, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - guild.createdAt, timeConfig) + ` (<t:${Math.floor(guild.createdAt / 1000)}:d>)`)
    this.client.guilds.get('849000250168442901').channels.get('861654529254490192').createMessage({ embed })
  }
}
