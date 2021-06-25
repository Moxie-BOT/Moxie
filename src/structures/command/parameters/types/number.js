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
      required: defVar(options, 'required', true),

      errors: {
        numberBiggerThen: 'commands:numberBiggerThen',
        numberLessThan: 'commands:numberLessThan',
        isNotNumber: 'commands:notNumber',
        denyFloat: 'commands:denyFloat'
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

    if (!arg && options.required) throw new Error('InsuficientArgs')

    arg = arg ? (typeof util.convertAbbreviatedNum(arg) === 'number' ? util.convertAbbreviatedNum(arg) : util.convertAbbreviatedNum(arg)) : undefined
    if (!/^[+-]?[0-9]+(?:.[0-9]+)?$/.test(arg) && isNaN(arg)) throw new Error(util.getTranslation(options.errors.isNotNumber, { 1: arg.substr(0, 40) }, ctx))
    if (options.denyFloat && Number(arg) % 1 !== 0) throw new Error(options.errors.denyFloat)
    if (arg > options.maxInt) throw new Error(util.getTranslation(options.errors.numberBiggerThen, { 1: options.maxInt }, ctx))
    if (arg < options.minInt) throw new Error(util.getTranslation(options.errors.numberLessThan, { 1: options.minInt }, ctx))

    return arg
  }
}
