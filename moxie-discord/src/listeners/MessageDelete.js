const Client = require("../Client");

module.exports = class MessageDeleteListener {
    /**
     *
     * @param {Client} client Eris client
     */
    constructor(client) {
        this.client = client;
        this.name = "messageDelete";
    }
    async execute(message) {
        this.client.reactionCollectors.forEach(collector => {
            if (collector.message.id === message.id) {
                collector.stop('Message Delete');
            }
        });
    }
};