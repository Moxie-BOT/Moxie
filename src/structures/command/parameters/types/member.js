const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class Member {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidMember: 'errors:invalidMember',
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
    let member

    if (!arg) {
      if (options.acceptLocal) return ctx.member
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }

    try {
      member = !/^\d+$/.test(arg) ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.members.get(arg)
    } catch { }

    if (!member) throw new Error(options.errors.invalidMember)
    else member.user.tag = `${member.user.username}#${member.user.discriminator}`
    return member
  }
}
