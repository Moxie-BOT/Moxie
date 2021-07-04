const PermissionsJSON = require('../../utils/others/ErisPermissions.json')

function parseOptions (options) {
  return {
    permissions: options.permissions,
    botPermissions: options.botPermissions,

    onlyDevs: !!options.onlyDevs
  }
}

/**
 *
 * @param {CommandContext} ctx
 * @param {Object} opt
 */
module.exports.handle = async function handle (ctx, opt) {
  const options = parseOptions(opt)
  const developers = JSON.parse(process.env.BOT_OWNERS)

  if (options.onlyDevs && !developers.includes(ctx.author.id)) {
    throw new Error(
      'Você não pode usar esse comando'
    )
  }

  if (options.permissions && options.permissions.length > 0) {
    const perms = Object.keys(ctx.member.permissions.json)
    let includes = false
    for (const item in perms) {
      if (options.permissions.includes(perms[item])) {
        includes = true
        break
      }
    }
    if (!includes) throw new Error(`<:close:858094081304166433> Você não tem permissão de ${options.permissions.map(p => PermissionsJSON[p]).join(', ')}`)
  }

  if (options.botPermissions && options.botPermissions.length > 0) {
    const perms = Object.keys(ctx.guild.members.get(ctx.client.user.id).permissions.json)
    let includes = false
    for (const item in perms) {
      if (options.botPermissions.includes(perms[item])) {
        includes = true
        break
      }
    }
    if (!includes) throw new Error(`<:close:858094081304166433> Eu não tenho permissão de ${options.botPermissions.map(p => PermissionsJSON[p]).join(', ')}`)
  }

  const { commandsChannels } = await ctx.client.guildCache.get(ctx.guild.id)
  if (commandsChannels.length > 0 && !commandsChannels.some(ds => ds.includes(ctx.channel.id)) /**&& !ctx.member.permissions.has('banMembers')**/) throw new Error(`<:close:858094081304166433> Eu sinto muito, mas me disseram que eu não posso executar comandos no ${ctx.channel.mention}!`)
}
