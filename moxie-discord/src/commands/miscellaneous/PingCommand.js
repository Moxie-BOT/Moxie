const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const { chunkArray } = require("../../utils/Utilities");

module.exports = class PingCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["ping", "lag"],
            requirements: {},
            category: "miscellaneous",
            parameters: [
                {
                    type: "string",
                    includesThat: ["shards", "shard", "clusters", "cluster"]
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [content]) {
        if (content) await ctx.reply("Nada por enquanto")
        else await ctx.reply(`🏓 Pong! Seu servidor está na shard \`(${ctx.guild.shard.id}/${this.client.shards.size})\`\n📡 Latência da shard - **${ctx.guild.shard.latency}ms**\n💻 Latência - **${ctx.message.timestamp - new Date}ms**`)
    }
};