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
        if (content) ctx.reply("Nada por enquanto")
        else ctx.reply(`🏓 Pong! Seu servidor está na shard \`(${Number(ctx.guild.shard.id) + 1}/${this.client.shards.size})\`\n📡 Latência da shard - **${ctx.guild.shard.latency}ms**\n💻 Latência - **${new Date - ctx.message.timestamp}ms**`)

    }
};