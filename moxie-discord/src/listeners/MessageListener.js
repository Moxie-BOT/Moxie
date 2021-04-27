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
        if (message.channel.type === 1) return;
        if (message.author.discriminator === '0000') return;

        this.client.messageCollectors.forEach(collector => {
            if (collector.channel.id === message.channel.id) {
                collector.collect(message);
            }
        });

        const { prefix } = await this.client.databaseTools.getGuildCache(message.channel.guild.id);

        if (message.content.startsWith(prefix)) {
            let args = message.content.trim().replace(prefix, "").split(" ");
            let commandName = args.shift().toLowerCase();
            let cmd = this.client.commandTools.getCommand(commandName);

            if (cmd != null) {
                let ctx = new CommandContext(this.client, message, args);
                try {
                    cmd._execute(ctx);
                } finally {
                    if (this.client.vanilla.get("dataCommans")) {
                        const { executed } = this.client.vanilla.get("dataCommans");
                        this.client.vanilla.set("dataCommans", {
                            executed: executed + 1
                        })
                    } else 
                    this.client.vanilla.set("dataCommans", {
                        executed: 1
                    })
                }
            };
        };
    };
};