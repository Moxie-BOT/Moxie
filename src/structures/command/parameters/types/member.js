const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])

module.exports = class Member {
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
    let member

    if (!arg) {
      if (options.acceptLocal) return ctx.member
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg.replace(/[<>!@]/g, '')

    try {
      member = !/^\d+$/.test(arg) ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.members.get(arg) || await ctx.guild.getRESTMember(arg)
    } catch { }

    if (!member) throw new Error(`<:close:858094081304166433> Não encontrei nenhum membro parecido com \`${arg.replace(/`/g, '').substr(0, 40)}\`, talvez ele exista, mas não esteja no servidor! Eu procuro por nomes, IDs, menções e apelidos`)
    member.user.tag = `${member.user.username}#${member.user.discriminator}`
    return member
  }
}
