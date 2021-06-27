const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])

module.exports = class Guild {
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
    let guild

    if (!arg) {
      if (options.acceptLocal) return ctx.guild
      if (options.required) throw new Error('InsuficientArgs')
      return
    }

    try {
      guild = !/^\d+$/.test(arg) ? ctx.client.guilds.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.client.guilds.get(arg)
    } catch { }

    if (!guild) throw new Error(`<:close:858094081304166433> Não encontrei nenhum servidor parecido com \`${arg.replace(/`/g, '').substr(0, 40)}\`, além disso, eu preciso estar nela para que o comando funcione! Eu procuro por nomes e IDs`)
    return guild
  }
}
