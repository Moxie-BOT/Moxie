const CommandHandler = require('../../structures/command/CommandHandler')
const funCheck = require('../../utils/others/CheckMsg')

module.exports = class KickCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['kick', 'expulsar'],
      requirements: {
        permissions: ['banMembers'],
        botPermissions: ['banMembers']
      },
      category: 'Moderação',
      parameters: [
        {
          type: 'member',
          acceptAuthor: false
        },
        {
          type: 'string',
          full: true,
          required: false
        }
      ],
      description: 'Expulsa membros do seu servidor. Eles poderão voltar se quiserem',
      example: '**🔹 Você pode usar menções e IDs, nomes e apelidos\n🔹 Os argumentos são obrigatórios nesse comando, ou seja, você precisa especificar alguém para que eu possa expulsar!\n🔹 Você também pode especificar o motivo, dessa forma, ficará mais fácil de saber por que o membro foi expulso**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> @Luís`\n`<<1>><<2>> Luís Fazer spam`\n`<<1>><<2>> 730425354870587473 Ser arrogante`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Member} member
     * @param {String} reason
     */
  async execute (ctx, [member, reason]) {
    if (member.id === this.client.user.id) {
      await funCheck.CheckMsg(ctx, null, {
        me: true
      })
      return
    }
    const action = async (ds) => {
      try {
        await ds.guild.kickMember(member.id, reason)
      } catch (err) {
        return ctx.channel.send('<:close:858094081304166433> Eu não consegui expulsar o usuário por um desses motivos:\n- O cargo dele é maior que o meu;\n- Ele é o dono do servidor.')
      }
    }
    await funCheck.CheckMsg(ctx, action, {
      punishmentTxt: true,
      stringQuestion: `⚠ Você quer mesmo expulsar ${member.user.mention} (\`${member.user.tag}\`/\`${member.id}\`)? Para confirmar a punição, clique em ✅`
    })
  }
}
