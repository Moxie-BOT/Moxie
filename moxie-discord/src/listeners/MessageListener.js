const Eris = require("eris");
const Client = require("../Client");
const CommandContext = require("../structures/command/CommandContext");

module.exports = class MessageListener {
    /**
     *
     * @param {Client} client Eris client
     */
    constructor(client) {
        this.client = client;
        this.name = "messageCreate";
    }

    /**
     *
     * @param {Eris.Message} message
     */
    async execute(message) {
        if (message.author.bot) return;
        if (message.author.discriminator === '0000') return;

        this.client.messageCollectors.forEach(collector => {
            if (collector.channel.id === message.channel.id) collector.collect(message);
        });

        const {prefix} = await this.client.database.guilds.get(message.guildID);

        if (message.content.startsWith(prefix.toLowerCase())) {
            let args = message.content.trim().replace(prefix.toLowerCase(), "").split(" ");
            let commandName = args.shift().toLowerCase();
            let cmd = this.client.commandTools.getCommand(commandName);

            if (cmd != null) {
                let ctx = new CommandContext(this.client, message, args);
                await cmd._execute(ctx);
            }
        }
    }
};