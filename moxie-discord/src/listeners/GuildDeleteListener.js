const Eris = require("eris");
const Client = require("../Client");

module.exports = class GuildCreateListener {
    /**
     *
     * @param {Client} client Eris client
     */
    constructor(client) {
        this.client = client;
        this.name = "guildDelete";
    }

    /**
     *
     * @param {Eris.Guild} guild
     */
    async execute(guild) {
        this.client.reactionCollectors.forEach(collector => {
            if (collector.message.guildID === guild.id) {
                collector.stop('Guild Delete');
            }
        });

        this.client.messageCollectors.forEach(collector => {
            if (collector.channel.type === 0 && collector.channel.guild.id === guild.id) {
                collector.stop('Guild Delete');
            }
        })
    }
};