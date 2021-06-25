const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class User {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptAuthor: !!options.acceptAuthor,
      required: defVar(options, 'required', true),

      errors: {
        invalidUser: 'commands:userNotFound'
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

    let user

    if (!arg) {
      if (options.acceptAuthor) return ctx.guild.members.get(ctx.author.id).user
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg.replace(/[<>!@]/g, '')

    try {
      user = !/^\d+$/.test(arg)
        ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())).user
        : ctx.client.users.get(arg) || await ctx.client.getRESTUser(arg)
    } catch { }

    if (!user) throw new Error(tr.getTranslation(options.errors.invalidUser, { 1: arg.substr(0, 40) }, ctx.guild))
    else user.tag = `${user.username}#${user.discriminator}`

    return user
  }
}
