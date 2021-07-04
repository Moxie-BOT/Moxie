const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])

module.exports = class User {
  static parseOptions (options = {}) {
    return {
      ...options,
      acceptAuthor: !!options.acceptAuthor,
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

    let user

    if (!arg) {
      if (options.acceptAuthor) return ctx.author
      if (options.required) throw new Error('InsuficientArgs')
      return
    }
    arg = arg.replace(/[<>!@]/g, '')

    try {
      user = !/^\d+$/.test(arg)
        ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase()) || s.nick?.toLowerCase().includes(arg.toLowerCase())).user
        : ctx.guild.members.get(arg) || ctx.client.users.get(arg) || await ctx.client.getRESTUser(arg)
    } catch { }

    if (!user) throw new Error(`<:close:858094081304166433> Não encontrei nenhum usuário parecido com \`${arg.replace(/`/g, '').substr(0, 40)}\`! Eu procuro por IDs e menções, caso ele esteja no servidor, por apelidos e nomes`)
    else user.tag = `${user.username}#${user.discriminator}`

    return user
  }
}
