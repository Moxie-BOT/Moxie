const CommandContext = require("./CommandContext");
const Client = require("../../Client");
const Logger = require("../../utils/Logger");
const CommandRequirements = require("./CommandRequirements");
const CommandParameters = require("./parameters/CommandParameters");

module.exports = class CommandHandler {
    /**
     *
     * @param {Client} client
     */
    constructor(client, options) {
        this.client = client;
        this.labels = options.labels;
        this.category = options.category || "miscellaneous";
        this.requirements = options.requirements || {};
        this.parameters = options.parameters || [];
    }

    /**
     *
     * @param {CommandContext} ctx
     */
    async _execute(ctx) {
        let parameters = [];
        try {
            await CommandRequirements.handle(ctx, this.requirements);
        } catch (err) {
            return ctx.reply(err.message);
        }
        try {
            parameters = await CommandParameters.handle(
                ctx,
                ctx.args,
                this.parameters
            );
        } catch (err) {
            ctx.reply(err.message);
        }

        try {
            await this.execute(ctx, [...parameters]);
        } catch (err) {
            Logger.error(err.stack);
            ctx.reply("erro")
        }
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    async execute(ctx) { }
};
