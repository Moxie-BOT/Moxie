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
    const embed = new EmbedBuilder()
    const channelType = {
      0: 'Canal de texto',
      1: 'Mensagem direta',
      2: 'Canal de voz',
      3: 'Grupo de mensagens diretas',
      4: 'Categoria',
      5: 'Canal de anúncios',
      6: 'Canal de vendas',
      10: 'Subcanal de vendas temporário',
      11: 'Subcanal público temporário',
      12: 'Subcanal privado temporário',
      13: 'Canal estágio'
    }
    const booleans = {
      null: 'Nenhum',
      true: 'Sim',
      false: 'Não'
    }
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    embed.setTitle(channel.name)
    embed.setDescription(channel.topic ? `${channel.topic.substr(0, 1024)}` : '\uD83E\uDD37 Nenhum tópico encontrado')
    embed.addField('\uD83D\uDCBB ID do canal', channel.id, true)
    embed.addField('\uD83D\uDC88 Tipo de canal', channelType[channel.type], true)
    embed.addField('\uD83D\uDC40 Canal de', channel.guild.name, true)
    embed.setColor('DEFAULT')

    switch (channel.type) {
      case 0:
      case 5:
      case 6:
        // embed.addField("🔞 NSFW", booleans[channel.nsfw], true)
        embed.addField('\uD83D\uDC0C Modo lento', channel.rateLimitPerUser > 0 ? `${channel.rateLimitPerUser} segundos` : booleans.null, true)
        break
      case 2:
        embed.addField('\uD83C\uDF99 Taxa de bits', channel.bitrate ? channel.bitrate : booleans.null, true)
        embed.addField('\uD83D\uDC65 Limite de membros', channel.userLimit ? channel.userLimit : booleans.null, true)
        embed.addField('\uD83D\uDCF7 Qualidade de vídeo', channel.videoQualityMode === 1 ? 'auto' : '720p', true)
        // embed.addField("🗣️ Membros no canal", channel.voiceMembers ? channel.voiceMembers.map(lk => lk.user.mention).slice(0, 10).join(", ") : booleans[null]);
        break
    }
    embed.addField('\uD83D\uDCC6 Criado há', humanizeDuration(Date.now() - channel.createdAt, timeConfig) + ` (${new Date(channel.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)
    await ctx.reply({ embed })
  }
}
