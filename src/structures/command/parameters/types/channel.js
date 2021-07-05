const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])

module.exports = class Channel {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptLocal: !!options.acceptLocal,
      required: defVar(options, 'required', true)
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
      if (options.acceptLocal) return ctx.channel
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg.replace(/[<>#]/g, '')
    try {
      channel = !/^\d+$/.test(arg) ? ctx.guild.channels.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.channels.get(arg)
    } catch { }

    if (!channel) throw new Error(`<:close:858094081304166433> Não encontrei nenhum canal parecido com \`${arg.replace(/`/g, '').substr(0, 40)}\`! Eu procuro por nomes, IDs, menções e apelidos`)
    return channel
  }
}
