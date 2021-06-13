const CommandContext = require('../../CommandContext')

const defVar = (o, b, c) => (typeof o[b] === 'undefined' ? c : o[b])
module.exports = class StringParameter {
  static parseOptions (options = {}) {
    return {
      ...options,
      required: defVar(options, 'required', true),
      maxLength: Number(options.maxLength) || 500,
      minLength: Number(options.minLength) || 0,
      onlyAlphanumeric: !!options.onlyAlphanumeric,
      includesThat: options.includesThat,

      errors: {
        manyLetters: `Muitos caracteres! (O máximo é ${options.maxLength})`,
        littleLetters: `Poucos caracteres! (O mínimo é ${options.littleLetters}`,
        onlyAlphanumeric: 'Apenas letras e números são aceitos!',
        whereArgs: 'Cade os caracteres'
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
    arg = arg ? (typeof arg === 'string' ? arg : String(arg)) : undefined
    if (!arg) {
      if (options.required) throw new Error(options.errors.whereArgs)
      else return
    }
    if (options.includesThat && options.includesThat.includes(arg.toLowerCase())) return true
    if (arg.length > options.maxLength) throw new Error(options.errors.manyLetters)
    if (arg.length < options.minLength) throw new Error(options.errors.littleLetters)
    if (options.onlyAlphanumeric && !/^\w+$/.test(arg)) throw new Error(options.errors.onlyAlphanumeric)

    return arg
  }
}
