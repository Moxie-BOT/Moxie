const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");

module.exports = class TestCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["test", "teste"],
            requirements: {
                onlyDevs: true
            },
            category: "developers",
            parameters: [
                {
                    type: "number",
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [user]) {
        console.log(user)
    }
};