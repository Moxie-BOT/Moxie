const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class Channel {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidChannel: 'commands:channelNotFound'
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
      if (options.acceptLocal) return ctx.guild.channels.get(ctx.channel.id)
      if (options.required) throw new Error('InsuficientArgs')
      return
    }

    try {
      channel = !/^\d+$/.test(arg) ? ctx.guild.channels.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.channels.get(arg)
    } catch { }

    if (!channel) throw new Error(tr.getTranslation(options.errors.invalidChannel, { 1: arg.substr(0, 40) }, ctx.guild))
    return channel
  }
}
