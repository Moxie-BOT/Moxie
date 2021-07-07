const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const fetch = require('node-fetch')
const humanizeDuration = require('humanize-duration')

module.exports = class GithubCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['github'],
      requirements: {},
      category: 'Outros',
      parameters: [
        {
          type: 'string',
          full: true
        }
      ],
      description: 'Mostra informações de uma conta no github',
      example: '**🔹 Os argumentos são obrigatórios nesse comando, ou seja, se você não escolher nenhum usuário válido, não conseguirei usar o comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> MrSannyY`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    const user = await fetch(`https://api.github.com/users/${content}`).then(res => res.json())
    if (user.message) return ctx.reply('<:close:858094081304166433> Não consegui achar esse usuário no github')

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
      .setDescription(user.bio)
      .setThumbnail(user.avatar_url)
    embed.addField('👤 Nome', `[${user.name || user.login}](${user.html_url})`, true)
    embed.addField('💻 ID', user.id, true)
    embed.addField('🌎 Localização', user.location || 'Desconhecida', true)
    embed.addField('📂 Repositórios', user.public_repos, true)
    embed.addField('👥 Seguidores', user.followers, true)
    embed.addField('<:pencil:861965120959676416> Ultima atualização há', humanizeDuration(Date.now() - new Date(user.updated_at).getTime(), timeConfig) + ` (<t:${Math.floor((new Date(user.updated_at).getTime()) / 1000)}:d>)`, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - new Date(user.created_at).getTime(), timeConfig) + ` (<t:${Math.floor((new Date(user.created_at).getTime()) / 1000)}:d>)`, true)
    await ctx.reply({ embed })
  }
}
