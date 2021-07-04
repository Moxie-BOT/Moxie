const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])

module.exports = class StringParameter {
  static parseOptions (options = {}) {
    return {
      ...options,
      required: defVar(options, 'required', true),
      maxLength: Number(options.maxLength) || Infinity,
      minLength: Number(options.minLength) || 0,
      onlyAlphanumeric: !!options.onlyAlphanumeric
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
    if (!arg) {
      if (options.required) throw new Error('InsuficientArgs')
      if (!options.required) return
    }
    arg = arg ? (typeof arg === 'string' ? arg : String(arg)) : undefined
    if (arg.length > options.maxLength) throw new Error(`<:close:858094081304166433> Essa frase é tãão grande que superou minhas expectativas. O máximo de caracteres é de \`${options.maxLength}\``)
    if (arg.length < options.minLength) throw new Error(`<:close:858094081304166433> Essa frase é tãão pequena que ficou difícil trabalhar só com esses dados. O número mínimo de caracteres é de \`${options.minLength}\``)
    if (options.onlyAlphanumeric && !/^\w+$/.test(arg)) throw new Error('<:close:858094081304166433> Apenas letras e números são aceitos')

    return arg
  }
}
