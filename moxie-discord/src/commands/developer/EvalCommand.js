const Client = require("../../Client");
const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");

module.exports = class EvalCommand extends (
    CommandHandler
) {
    /**
     *
     * @param {Client} client
     */
    constructor(client) {
        super(client, {
            labels: ["eval", "ev"],
            requirements: {
                onlyDevs: true,
            },
            category: "developers",
            parameters: [
                {
                    type: "string",
                    full: true,
                },
            ],
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     * @param {String} code
     */
    async execute(ctx, [code]) {
        try {
            let util = require("util");
            code = code.replace(/(^`{3}(\w+)?|`{3}$)/g, "");
            let ev = await eval(code)
            let str = this.clean(
                util.inspect(ev, {
                    depth: 0,
                })
            );
            str = `${str.replace(
                new RegExp(`${this.client.token}`, "g"),
                "undefined"
            )}`;
            if (str.length > 1800) str = str.substr(0, 1800) + "...";

            await ctx.reply(`\`\`\`xl\n${str}\`\`\``);
        } catch (err) {
            await ctx.reply(`\`\`\`xl\n${err.stack}\`\`\``);
        }
    }
    clean(text) {
        const blankSpace = String.fromCharCode(8203);
        return typeof text === "string"
            ? text
                .replace(/`/g, "`" + blankSpace)
                .replace(/@/g, "@" + blankSpace)
            : text;
    }
};
