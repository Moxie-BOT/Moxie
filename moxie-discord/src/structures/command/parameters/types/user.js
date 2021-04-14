const CommandContext = require("../../CommandContext");

let defVar = (o, b, c) => (typeof o[b] === "undefined" ? c : o[b]);
module.exports = class User {
    static parseOptions(options = {}) {
        return {
            ...options,
            acceptAuthor: !!options.acceptAuthor,
            required: defVar(options, "required", true),

            errors: {
                whereArgs: "errors:insufficientArgs",
                invalidUser: 'errors:invalidUser',
            }
        };
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    static async parse(arg, ctx, opt) {
        const options = this.parseOptions(opt);

        let user;
        if (options.acceptAuthor && !arg) return ctx.guild.members.get(ctx.author.id).user;

        arg = arg.replace(/<|>|!|@/g, "");
        try {
            user = !/^\d+$/.test(arg) ? ctx.guild.members.find(s => `${s.user.username}#${s.user.discriminator}`.toLowerCase().includes(arg.toLowerCase())).user
                : ctx.guild.members.get(arg).user || ctx.client.users.get(arg) || await ctx.client.getRESTUser(arg)
        } catch { };

        if (!user) throw new Error(options.errors.invalidUser);
        else user.tag = `${user.username}#${user.discriminator}`;

        return user;
    }
};