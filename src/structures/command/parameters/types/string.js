const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
const tr = require('../../../../utils/Utilities')

module.exports = class StringParameter {
  static parseOptions (options = {}) {
    return {
      ...options,
      required: defVar(options, 'required', true),
      maxLength: Number(options.maxLength) || Infinity,
      minLength: Number(options.minLength) || 0,
      onlyAlphanumeric: !!options.onlyAlphanumeric,

      errors: {
        manyLetters: 'commands:manyLetters',
        littleLetters: 'commands:littleLetters',
        onlyAlphanumeric: 'commands:manyLetters'
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
    if (!arg && !options.required) return null
    arg = arg ? (typeof arg === 'string' ? arg : String(arg)) : undefined
    if (arg.length > options.maxLength) throw new Error(tr.getTranslation(options.errors.manyLetters, { 1: options.maxLength }, ctx.guild))
    if (arg.length < options.minLength) throw new Error(tr.getTranslation(options.errors.littleLetters, { 1: options.minLength }, ctx.guild))
    if (options.onlyAlphanumeric && !/^\w+$/.test(arg)) throw new Error(options.errors.onlyAlphanumeric)

    return arg
  }
}
