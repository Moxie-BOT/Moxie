const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')
const { ReactionCollector } = require('../../utils/Collector')
const os = require('os')

module.exports = class BotInfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['botinfo'],
      requirements: {},
      category: 'Outros',
      parameters: [],
      description: 'Mostra algumas informações sobre mim 🤗',
      example: '**🔹 Os argumentos são opcionais nesse comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) {
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }
    const owner = this.client.users.get('730425354870587473') || await this.client.getRESTUser('730425354870587473')

    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setThumbnail(this.client.user.dynamicAvatarURL())
      .setTitle('👋 Saudações')
      .setDescription(`Me chamo Moxie, sou mais uma bot dentre várias outras com algumas funcionalidades incríveis <:sparkles:862047213794361394>, quem sabe não tenha nada de especial e diferente esperando por você e pelo seu servidor!\n\nCriada com JavaScript <:js:862045737960341544> e com uma pitada de [Eris](https://abal.moe/Eris/docs/getting-started) em 2019! Atualmente, online há **${humanizeDuration(Date.now() - this.client.startTime, timeConfig)}** em **${this.client.guilds.size} servidores** fabulosos com um total de **${this.client.commands.size} comandos**.\n\n**🔗 Links rápidos**\n┗ **[Meu convite](https://discord.com/api/oauth2/authorize?client_id=623235960448221196&permissions=388166&scope=bot)**\n┗ **[Servidor de suporte](https://discord.gg/RkAtsxQbFH)**\n┗ **[Código fonte](https://github.com/Moxie-BOT/Moxie)**`)
      .setFooter(`Moxie foi criada por ${owner.username}#${owner.discriminator}`, owner.dynamicAvatarURL())
    const msg = await ctx.reply({ embed })
    await msg.addReaction('dev:851108795694448680')

    const filter = (r, user) => (r.name === 'dev' && r.id === '851108795694448680') && user === ctx.author
    const collector = new ReactionCollector(this.client, msg, filter, { time: 120000 })
    collector.on('collect', async () => {
      ctx.channel.createMessage(`**Ficha técnica**\n┗ RAM\n    ┗ Usada ❯ **${this.bytesToSize(process.memoryUsage().rss)}**\n    ┗ Alocada ❯ **${this.bytesToSize(os.freemem())}**\n    ┗ Disponível ❯ **${this.bytesToSize(os.totalmem())}**\n┗ CPU\n    ┗ ${os.cpus()[0].model}\n    ┗ Usada ❯ **${await this.getCpuUsage()}%**\n┗ Máquina\n    ┗ Plataforma ❯ **${os.platform()}**\n┗ Versões\n    ┗ Node ❯ **${process.version}**\n    ┗ Eris ❯ **DEV**`)
    })
  }

  bytesToSize (bytes) {
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2).toFixed(0) + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB'][i]
  }

  cpuAverage () {
    let totalIdle = 0
    let totalTick = 0
    const cpus = os.cpus()
    for (let i = 0, len = cpus.length; i < len; i++) {
      const cpu = cpus[i]
      const cpuTimes = cpu.times
      for (const type in cpuTimes) {
        totalTick += cpuTimes[type]
      }
      totalIdle += cpuTimes.idle
    }

    return {
      avgIdle: (totalIdle / cpus.length),
      avgTotal: (totalTick / cpus.length)
    }
  }

  getCpuUsage () {
    return new Promise((resolve) => {
      const startMeasure = this.cpuAverage()

      setTimeout(() => {
        const endMeasure = this.cpuAverage()
        const idleDifference = endMeasure.avgIdle - startMeasure.avgIdle
        const totalDifference = endMeasure.avgTotal - startMeasure.avgTotal
        const cpuPercentage = (10000 - Math.round(10000 * idleDifference / totalDifference)) / 100

        resolve(cpuPercentage.toFixed(0))
      }, 1000)
    })
  }
  // CpuUsage by https://github.com/davidffa/D4rkBot/blob/master/src/commands/Info/botinfo.ts
}
