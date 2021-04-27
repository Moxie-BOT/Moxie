const CommandContext = require("../../CommandContext");
const util = require("../../../../utils/Utilities");

let defVar = (o, b, c) => (typeof o[b] === "undefined" ? c : o[b]);
module.exports = class NumberParameter  {
    static parseOptions(options = {}) {
        return {
            ...options,
            maxInt: Number(options.maxInt) || Infinity,
            minInt: Number(options.minInt) || 0,
            allowNegative: !!options.allowNegative,
            denyFloat: !!options.denyFloat || true,

            errors: {
                missingNumber: "errors:missingNumber",
                numberBiggerThen: "errors:numberBiggerThen",
                numberLessThan: "errors:numberLessThan",
                isNotNumber: "errors:notNumber",
                denyFloat: "errors:denyFloat"
            }
        };
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    static async parse(arg, ctx, opt) {
        const options = this.parseOptions(opt);

        arg = arg ? (typeof util.convertAbbreviatedNum(arg) === "number" ? util.convertAbbreviatedNum(arg) : util.convertAbbreviatedNum(arg)) : undefined;

        if (!arg) throw new Error(options.errors.missingNumber);
        if (!/^[+-]?[0-9]{1,}(?:.[0-9]{1,})?$/.test(arg) && isNaN(arg)) throw new Error(options.errors.isNotNumber);
        if (options.denyFloat && Number(arg) === arg && arg % 1 !== 0) throw new Error(options.errors.denyFloat);
        if (arg > options.maxInt) throw new Error(options.errors.numberBiggerThen);
        if (arg < options.minInt) throw new Error(options.errors.numberLessThan);

        return arg;
    }
};