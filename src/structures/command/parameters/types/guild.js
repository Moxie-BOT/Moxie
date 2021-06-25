const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class Guild {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true),

      errors: {
        invalidGuild: 'commands:guildNotFound'
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
      if (options.required) throw new Error('InsuficientArgs')
      return
    }

    try {
      guild = !/^\d+$/.test(arg) ? ctx.client.guilds.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.client.guilds.get(arg)
    } catch { }

    if (!guild) throw new Error(tr.getTranslation(options.errors.invalidGuild, { 1: arg.substr(0, 40) }, ctx.guild))
    return guild
  }
}
