const types = require('./types')
/**
 *
 * @param {CommandContext} ctx
 * @param a
 * @param paramArray
 */
module.exports.handle = async function handle (ctx, a, paramArray) {
  const result = []
  for (let i = 0; i < paramArray.length; i++) {
    const param = paramArray[i]
    let arg = ctx.args[i]
    if (param.full) arg = ctx.args.slice(i).join(' ')
    const tipo = types[param.type]

    const parsed = await tipo.parse(arg, ctx, param)
    result.push(parsed)
  }
  return result
}
