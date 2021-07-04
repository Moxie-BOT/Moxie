const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const fetch = require('node-fetch')
const humanizeDuration = require('humanize-duration')

module.exports = class TwitchCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['twitch'],
      requirements: {},
      category: 'Outros',
      parameters: [
        {
          type: 'string',
          full: true
        }
      ],
      description: 'Mostra informações de uma conta na twitch',
      example: '**🔹 Os argumentos são obrigatórios nesse comando, ou seja, se você não escolher nenhum usuário válido, não conseguirei usar o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> Srluiskk`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    const request = async (endpoint, meta) => await fetch(`https://api.twitch.tv/helix/${endpoint}?${meta}`, {
      method: 'GET',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`
      }
    })
      .then(res => res.json())

    let dataUser
    let dataStream
    const fetched = async () => {
      dataUser = await request('users', `login=${content}`).then(ds => ds.data[0]) || await request('users', `id=${content}`).then(ds => ds.data[0])
      if (!dataUser) return false
      dataStream = await request('streams', `user_login=${content}`).then(ds => ds.data[0]) || await request('streams', `user_id=${content}`).then(ds => ds.data[0])
      return true
    }

    if (!await fetched()) return ctx.reply(`Não encontrei nenhum usuário an twitch parecido com \`${content.replace(/`/, '').substr(0, 40)}\`! Eu procuro por nomes e IDs`)
    if (dataUser.error === 'Unauthorized') {
      await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(data => {
          process.env.TWITCH_TOKEN = data.access_token
          console.log(`Twitch token refresh to ${process.env.TWITCH_TOKEN}`)
        })
        .then(async () => {
          await fetched()
        })
    }

    const timeConfig = {
      largest: 3,
      units: ['y', 'mo', 'd', 'h', 'm', 's'],
      language: 'pt',
      round: true,
      conjunction: ' e ',
      serialComma: false
    }

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setDescription(dataUser.description)
      .setThumbnail(dataUser.profile_image_url)
    embed.addField('👤 Nome', `[${dataUser.display_name || dataUser.login}](https://twitch.tv/${dataUser.login})`, true)
    embed.addField('💻 ID', dataUser.id, true)
    embed.addField('👁 Visualizações', dataUser.view_count, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - new Date(dataUser.created_at).getTime(), timeConfig) + ` (${new Date(dataUser.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)
    if (!dataStream) return ctx.reply({ embed })

    embed.addField('🎥 Ao vivo', `Jogando ${dataStream.game_name}`, true)
    embed.addField('👁 Assistindo', `${dataStream.viewer_count} espectadores`, true)
    embed.addField('📆 Em live há', humanizeDuration(Date.now() - new Date(dataStream.started_at).getTime(), timeConfig) + ` (${new Date(dataStream.started_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)
    await ctx.reply({ embed })
  }
}
