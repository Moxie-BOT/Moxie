const util = require('../../../../utils/Utilities')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class NumberParameter {
  static parseOptions (options = {}) {
    return {
      ...options,
      maxInt: Number(options.maxInt) || Infinity,
      minInt: Number(options.minInt) || 0,
      allowNegative: !!options.allowNegative,
      denyFloat: !!options.denyFloat || true,
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

    if (!arg && options.required) throw new Error('InsuficientArgs')

    arg = arg ? (typeof util.convertAbbreviatedNum(arg) === 'number' ? util.convertAbbreviatedNum(arg) : util.convertAbbreviatedNum(arg)) : undefined
    if (!/^[+-]?[0-9]+(?:.[0-9]+)?$/.test(arg) && isNaN(arg)) throw new Error(`<:close:858094081304166433> Talvez \`${arg.replace(/`/g, '').substr(0, 40)}\` seja um número, mesmo assim não consegui reconhecê-lo como um número`)
    if (options.denyFloat && Number(arg) % 1 !== 0) throw new Error('<:close:858094081304166433> Apenas números inteiros por aqui')
    if (arg > options.maxInt) throw new Error(`<:close:858094081304166433> Esse número é tãão grande que passou da quantidade máxima aceita por mim neste comando. Tente usar números menores que \`${options.maxInt}\``)
    if (arg < options.minInt) throw new Error(`<:close:858094081304166433> Esse número é tãão pequeno que não foi aceito por mim nesse comando. Tente usar números maiores que \`${options.minInt}\``)

    return arg
  }
}
