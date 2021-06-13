const CommandContext = require('../../CommandContext')
const util = require('../../../../utils/Utilities')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class Role {
  static parseOptions (options = {}) {
    return {
      ...options,
      highestRole: !!options.highestRole || false,
      required: defVar(options, 'required', false),

      errors: {
        invalidRole: 'errors:invalidRole',
        whereArgs: 'Cade as args'
      }
    }
  }

  /**
     *
     * @param arg
     * @param {CommandContext} ctx
     * @param opt
     */
  static async parse (arg, ctx, opt) {
    const options = this.parseOptions(opt)

    let role
    arg = arg.replace(/[<>@&]/g, '')
    if (!arg) {
      if (options.highestRole && ctx.member.roles.length > 0) return ctx.guild.roles.get(ctx.member.roles[0])
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }

    try {
      role = !/^\d+$/.test(arg) ? ctx.guild.roles.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.roles.get(arg)
    } catch { }
    if (!role) throw new Error(options.errors.invalidRole)

    return role
  }
}
