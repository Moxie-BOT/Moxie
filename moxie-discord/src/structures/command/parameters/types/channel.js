const CommandContext = require('../../CommandContext')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class Channel {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidChannel: 'errors:invalidChannel',
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
    let channel

    if (!arg) {
      if (options.acceptLocal) return ctx.channel.id
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }

    try {
      channel = !/^\d+$/.test(arg) ? ctx.guild.channels.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.channels.get(arg)
    } catch { }

    if (!channel) throw new Error(options.errors.invalidChannel)
    return channel
  }
}
