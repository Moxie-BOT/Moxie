const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class Member {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidMember: 'command:invalidMember'
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
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg.replace(/[<>!@]/g, '')

    try {
      member = !/^\d+$/.test(arg) ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.members.get(arg)
    } catch { }

    if (!member) throw new Error(tr.getTranslation(options.errors.invalidMember, { 1: arg.substr(0, 40) }, ctx.guild))
    else member.user.tag = `${member.user.username}#${member.user.discriminator}`
    return member
  }
}
