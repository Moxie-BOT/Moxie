const CommandContext = require('../../CommandContext')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class Guild {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidGuild: 'errors:invalidGuild',
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
    let guild

    if (!arg) {
      if (options.acceptLocal) return ctx.guild
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }

    try {
      guild = !/^\d+$/.test(arg) ? ctx.client.guilds.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.client.guilds.get(arg)
    } catch { }

    if (!guild) throw new Error(options.errors.invalidGuild)
    return guild
  }
}
