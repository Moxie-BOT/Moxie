const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class InviteCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['invite', 'convite'],
      requirements: {},
      category: 'Outros',
      parameters: [],
      description: 'Envia meu convite para que você possa me adicionar no seu servidor ^-^',
      example: '**🔹 Os argumentos são opcionais nesse comando!**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     */
  async execute (ctx) {
    const embed = new EmbedBuilder()
      .setColor('DEFAULT')
      .setDescription('Obrigada por querer me adicionar no seu servidor! Basta clicar **[aqui](https://discord.com/api/oauth2/authorize?client_id=623235960448221196&permissions=388166&scope=bot)**, além disso, se você precisar de suporte ou quiser dar sugestões de novas funcionalidades, conhecer novas pessoas e muito mais, ficaremos felizes em receber você no meu servidor! Clique [aqui](https://discord.gg/RkAtsxQbFH).\n\nSaiba que eu sou open source, ou seja, você pode dar uma olhada e até mesmo contribuir no meu [código fonte](https://github.com/Moxie-BOT/Moxie).')
    await ctx.reply({ embed })
  }
}
