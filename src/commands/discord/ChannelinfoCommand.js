const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')

module.exports = class ChannelinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['channelinfo', 'categoryinfo', 'voiceinfo'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'channel',
          acceptLocal: true
        }
      ],
      description: 'Mostra informações de canais, categorias e tudo mais, desde que eu esteja no servidor em que o canal está',
      example: '**🔹 Você pode usar menções e IDs, caso o canal esteja no servidor onde foi executado o comando, nomes\n🔹 Os argumentos são opcionais, ou seja, se você não escolher nenhum canal, irei mostrar informações do canal onde foi executado o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> 849000250739523627`\n`<<1>><<2>> bate-papo`\n`<<1>><<2>> #bate-papo`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Channel} channel
     */
  async execute (ctx, [channel]) {
    const channelType = {
      0: {
        name: 'Canal de texto',
        emoji: '<:txt:861751247467053076>'
      },
      2: {
        name: 'Canal de voz',
        emoji: '<:voice:861751272755691541>'
      },
      4: {
        name: 'Categoria',
        emoji: '<:category:861970309966725120>'
      },
      5: {
        name: 'Canal de anúncios',
        emoji: '<:news:861751303457079296>'
      },
      6: {
        name: 'Canal de vendas',
        emoji: '<:store:861970839242539018>'
      },
      10: {
        name: 'Subcanal de vendas',
        emoji: ''
      },
      11: {
        name: 'Subcanal público',
        emoji: '<:threadtxt:861751217193222144>'
      },
      12: {
        name: 'Subcanal privado',
        emoji: '<:private_thread:861751433371451422>'
      },
      13: {
        name: 'Canal de palco',
        emoji: '<:stage:861751587277111326>'
      }
    }
    const booleans = {
      null: 'Nenhum',
      true: 'Sim',
      false: 'Não'
    }
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    const embed = new EmbedBuilder()
      .setTitle(`${channelType[channel.type].emoji} ${channel.name}`)
      .setDescription(channel.topic ? `${channel.topic.substr(0, 1024)}` : '\uD83E\uDD37 Nenhum tópico encontrado')
    embed.addField('💻 ID do canal', channel.id, true)
    embed.addField('💈 Tipo de canal', channelType[channel.type].name, true)
    embed.addField('👀 Canal de', channel.guild.name, true)
    embed.setColor('DEFAULT')

    switch (channel.type) {
      case 0:
      case 5:
      case 6:
        // embed.addField("🔞 NSFW", booleans[channel.nsfw], true)
        embed.addField('\uD83D\uDC0C Modo lento', channel.rateLimitPerUser > 0 ? `${channel.rateLimitPerUser} segundos` : booleans.null, true)
        break
      case 2:
      case 13:
        embed.addField('🎙 Taxa de bits', channel.bitrate ? channel.bitrate : booleans.null, true)
        embed.addField('<:members:861751455635079168> Limite de membros', channel.userLimit ? channel.userLimit : booleans.null, true)
        embed.addField('🎥 Qualidade de vídeo', channel.videoQualityMode === 1 ? 'auto' : '720p', true)
        // embed.addField("🗣️ Membros no canal", channel.voiceMembers ? channel.voiceMembers.map(lk => lk.user.mention).slice(0, 10).join(", ") : booleans[null]);
        break
    }
    embed.addField('\uD83D\uDCC6 Criado há', humanizeDuration(Date.now() - channel.createdAt, timeConfig) + ` (<t:${Math.floor(channel.createdAt / 1000)}:d>)`, true)
    await ctx.reply({ embed })
  }
}
