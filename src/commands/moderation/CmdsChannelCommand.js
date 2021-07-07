const CommandHandler = require('../../structures/command/CommandHandler')

module.exports = class CmdsChannelCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['cmdschannel'],
      requirements: {
        permissions: ['manageGuild']
      },
      category: 'Moderação',
      parameters: [
        {
          type: 'string',
          full: true
        }
      ],
      description: 'Irei responder comandos apenas nos canais que você escolher',
      example: '**🔹 Os argumentos são obrigatórios nesse comando, ou seja, você precisa especificar um ou mais canais!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> 849000250739523627 851593623953735700`\n`<<1>><<2>> <#849000250739523627> <#851593623953735700>`\n`<<1>><<2>> comandos1 staff`\n`<<1>><<2>> removeAll`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
  async execute (ctx, [content]) {
    let arrChannels = content.trim().split(' ')
    const gRes = await this.client.database.guilds.get(ctx.guild.id)
    if (arrChannels[0].toLowerCase() === 'removeall') {
      gRes.settings.commandsChannels = []
      await gRes.save()
      await this.client.guildCache.update(ctx.guild.id, { commandsChannels: [] })
      return ctx.reply('🎉 Sucesso, os canais de comandos permitidos foram removidos')
    }
    if (arrChannels.length > 5) return ctx.reply('<:close:858094081304166433> O máximo de canais que vc pode escolher por comando é de **4**')
    if (gRes.settings.commandsChannels.length > 5) return ctx.reply(`<:close:858094081304166433> Esse servidor já tem 5 canais escolhidos como de comandos, remova-os usando \`${this.client.guildCache.get(ctx.guild.id).prefix}cmdschannel removeAll\`!`)
    const arr = []
    arrChannels = arrChannels.filter((v, i) => arrChannels.indexOf(v) === i)

    try {
      arrChannels.forEach(channel => {
        channel = channel.replace(/[<>#]/g, '')
        const ch = !/^\d+$/.test(channel) ? ctx.guild.channels.find(s => s.name.toLowerCase().includes(channel.toLowerCase())) : ctx.guild.channels.get(channel)
        if (ch) {
          arr.push(ch.id)
          gRes.settings.commandsChannels.push(ch.id)
        } else throw new Error()
      })
    } catch (e) { return ctx.reply('<:close:858094081304166433> Não consegui encontrar alguns desses canais, escolha um canal válido!') }

    await gRes.save()
    await this.client.guildCache.update(ctx.guild.id, { commandsChannels: arr })
    await ctx.reply(`Esses foram os canais que eu encontrei:\n${arr.map(ch => `<#${ch}>`).join(' \n')}\nE só irei responder á comandos neles!`)
  }
}
