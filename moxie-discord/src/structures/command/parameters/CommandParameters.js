const CommandContext = require("../CommandContext");
const types = require("./types")
/**
 *
 * @param {CommandContext} ctx
 * @param {object} opt
 */
module.exports.handle = async function handle(ctx, a, paramArray) {
    let result = [];
    for (let i = 0; i < paramArray.length; i++) {
        let param = paramArray[i];
        console.log(param)
        let arg = ctx.args[i];
        if (param.full) arg = ctx.args.slice(i).join(" ");
        let tipo = types[param.type];

        let parsed = await tipo.parse(arg, ctx, param);
        result.push(parsed);
    }
    return result;
};
