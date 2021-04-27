const CommandContext = require("../../CommandContext");

let defVar = (o, b, c) => (typeof o[b] === "undefined" ? c : o[b]);
module.exports = class StringParameter {
    static parseOptions(options = {}) {
        return {
            ...options,
            maxLength: Number(options.maxLength) || 500,
            minLength: Number(options.minLength) || 0,
            onlyAlphanumeric: !!options.onlyAlphanumeric,
            includesThat: options.includesThat,

            errors: {
                manyLetters: "errors:manyLetters",
                littleLetters: "errors:littleLetters",
                onlyAlphanumeric: "errors:onlyAlphanumeric"
            }
        };
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    static async parse(arg, ctx, opt) {
        const options = this.parseOptions(opt);
        arg = arg ? (typeof arg === "string" ? arg : String(arg)) : undefined;
        if (!arg) return null;
        if (options.includesThat && options.includesThat.includes(arg.toLowerCase())) return true
        if (arg.length > options.maxLength) throw new Error(options.errors.manyLetters);
        if (arg.length < options.minLength) throw new Error(options.errors.littleLetters);
        if (options.onlyAlphanumeric && !/^\w+$/.test(arg)) throw new Error(options.errors.onlyAlphanumeric);

        return arg
    }
};