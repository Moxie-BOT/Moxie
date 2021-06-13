const CommandContext = require('../../CommandContext')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class User {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptAuthor: !!options.acceptAuthor,
      required: defVar(options, 'required', true),

      errors: {
        whereArgs: 'errors:insufficientArgs',
        invalidUser: 'errors:invalidUser'
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
    arg = arg.replace(/[<>!@]/g, '')

    if (!arg) {
      if (options.acceptAuthor) return ctx.guild.members.get(ctx.author.id).user
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }

    try {
      user = !/^\d+$/.test(arg)
        ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())).user
        : ctx.client.users.get(arg) || await ctx.client.getRESTUser(arg)
    } catch { }

    if (!user) throw new Error(options.errors.invalidUser)
    else user.tag = `${user.username}#${user.discriminator}`

    return user
  }
}
