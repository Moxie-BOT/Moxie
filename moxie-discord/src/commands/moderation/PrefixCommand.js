const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");

module.exports = class PrefixCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["setprefix"],
            requirements: {
                permissions: ["manageGuild"]
            },
            category: "moderation",
            parameters: [
                {
                    type: "string",
                    maxLength: 4,
                    minLength: 0,
                },
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     * @param {String} content
     */
    async execute(ctx, [content]) {
        await this.client.guildCache.update(ctx.guild.id, {
            prefix: content
        });
        await ctx.reply(`Prefixo alterado para ${content}`)
    }
};