const CommandHandler = require('../../structures/command/CommandHandler')
const funCheck = require('../../utils/others/CheckMsg')

module.exports = class BanCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['ban', 'banir', 'hackban', 'b'],
      requirements: {
        permissions: ['banMembers'],
        botPermissions: ['banMembers']
      },
      category: 'Moderação',
      parameters: [
        {
          type: 'user',
          acceptAuthor: false
        },
        {
          type: 'string',
          full: true,
          required: false
        }
      ],
      description: 'Bane membros do seu servidor. Eles só poderão voltar se forem desbanidos',
      example: '**🔹 Você pode usar menções e IDs, nomes e apelidos\n🔹 Os argumentos são obrigatórios nesse comando, ou seja, você precisa especificar alguém para que eu possa banir!\n🔹 Você também pode especificar o motivo, dessa forma, ficará mais fácil de saber por que o membro foi banido**\n\n**🔸 Possíveis usos**\n`<<1>><<2>> @Luís`\n`<<1>><<2>> Luís Fazer spam`\n`<<1>><<2>> 730425354870587473 Ser arrogante`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {User} user
     * @param {String} reason
     */
  async execute (ctx, [user, reason]) {
    if (user.id === this.client.user.id) {
      await funCheck.CheckMsg(ctx, null, {
        me: true
      })
      return
    }
    const action = async (ds) => {
      try {
        await ds.guild.banMember(user.id, 7, reason)
        return true
      } catch (err) {
        ctx.channel.createMessage('<:close:858094081304166433> Eu não consegui banir o usuário por um desses motivos:\n- O cargo dele é maior que o meu;\n- Ele é o dono do servidor.')
        return false
      }
    }
    await funCheck.CheckMsg(ctx, action, {
      punishmentTxt: true,
      stringQuestion: `⚠ Você quer mesmo banir ${user.mention} (\`${user.tag}\`/\`${user.id}\`)? Para confirmar o banimento, clique em ✅`
    })
  }
}
