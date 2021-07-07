const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')

module.exports = class GuildCreateListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'guildDelete'
  }

  /**
     *
     * @param {Guild} guild
     */
  async execute (guild) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.guildID === guild.id) {
        collector.stop('Guild Delete')
      }
    })

    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.type === 0 && collector.channel.guild.id === guild.id) {
        collector.stop('Guild Delete')
      }
    })

    await this.client.guildCache.remove(guild.id)

    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    const embed = new EmbedBuilder()
      .setTitle(`Menos um servidor | ${guild.name}`)
      .setColor('RED')
      .setThumbnail(guild.dynamicIconURL())
    embed.addField('<:owner:861716252883025961> Dono', `${guild.members.get(guild.ownerID).username}#${guild.members.get(guild.ownerID).discriminator} (\`${guild.ownerID}\`)`, true)
    embed.addField('<:members:861751455635079168> Membros', guild.memberCount, true)
    embed.addField('💻 Shard', guild.shard.id, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - guild.createdAt, timeConfig) + ` (<t:${Math.floor(guild.createdAt / 1000)}:d>)`)
    this.client.guilds.get('849000250168442901').channels.get('861654529254490192').createMessage({ embed })
  }
}
