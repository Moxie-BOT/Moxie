const CommandContext = require("../../CommandContext");

let defVar = (o, b, c) => (typeof o[b] === "undefined" ? c : o[b]);
module.exports = class Channel {
    static parseOptions(options = {}) {
        return {
            ...options,
            acceptLocal: !!options.acceptLocal,
            required: defVar(options, "required", true),

            errors: {
                invalidChannel: 'errors:invalidChannel',
            }
        };
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    static async parse(arg, ctx, opt) {
        const options = this.parseOptions(opt);
        let channel

        if (options.acceptLocal && !arg) return ctx.guild.channels.get(ctx.channel.id);

        try {
            channel = !/^\d+$/.test(arg) ? ctx.guild.channels.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.channels.get(arg)
        } catch { }

        if (!channel) throw new Error(options.errors.invalidChannel);
        return channel;
    }
};