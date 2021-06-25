const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class Role {
  static parseOptions (options = {}) {
    return {
      ...options,
      highestRole: !!options.highestRole || false,
      required: defVar(options, 'required', false),

      errors: {
        invalidRole: 'commands:roleNotFound'
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
    if (!arg) {
      if (options.highestRole && ctx.member.roles.length < 0) throw new Error('InsuficientArgs')
      if (options.highestRole && ctx.member.roles.length > 0) return ctx.guild.roles.get(ctx.member.roles[0])
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg ? (typeof arg === 'string' ? arg : String(arg)) : undefined

    try {
      role = !/^\d+$/.test(arg) ? ctx.guild.roles.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.roles.get(arg)
    } catch { }
    if (!role) throw new Error(tr.getTranslation(options.errors.invalidRole, { 1: arg.substr(0, 40) }, ctx.guild))

    return role
  }
}
