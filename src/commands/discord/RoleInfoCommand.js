const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')
const PermissionsJSON = require('../../utils/others/ErisPermissions.json')

module.exports = class RoleInfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['roleinfo'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'role',
          highestRole: true
        }
      ],
      description: 'Mostra informações de cargos no discord',
      example: '**🔹 Você pode usar menções e IDs, caso o cargo esteja no servidor onde foi executado o comando, nomes\n🔹 Os argumentos são obrigatórios, ou seja, você precisa fornecer um cargo. Caso você tenha mais de um cargo, irei mostrá-lo**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> @Administrador`\n`<<1>><<2>> 849022129488134154`\n`<<1>><<2>> Administrador`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Role} role
     */
  async execute (ctx, [role]) {
    const booleans = {
      null: 'Nenhum',
      true: 'Sim',
      false: 'Não'
    }
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }
    const permsRole = role.permissions.json
    const realPerms = Object.keys(permsRole)

    const embed = new EmbedBuilder()
      .setTitle(`<:roles:861767476931854338> ${role.name}`)
      .setColor('DEFAULT')
    embed.addField('💻 ID do cargo', role.id, true)
    embed.addField('👀 Cargo de', role.guild.name, true)
    embed.addField('🎨 Cor', role.color === 0 ? role.color = '#000000' : '#' + ((role.color) >>> 0).toString(16).toUpperCase(), true)
    embed.addField('❓ Mencionável', booleans[role.mentionable], true)
    embed.addField('<:mention:861751174134628413> Menção', `\`${role.mention}\``, true)
    embed.addField('❓ Exibir separadamente', booleans[role.hoist], true)
    embed.addField('🏆 Posição', `#${role.position}`, true)
    embed.addField(`<:members:861751455635079168> Membros [${role.guild.members.filter(a => a.roles.includes(role.id)).length}]`, 'ﾠ', true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - role.createdAt, timeConfig) + ` (<t:${Math.floor(role.createdAt / 1000)}:d>)`, true)
    embed.addField('📛 Permissões', realPerms.length > 0 ? realPerms.map(p => `\`${PermissionsJSON[p]}\``).join(', ') : booleans.null)

    await ctx.reply({ embed })
  }
}
