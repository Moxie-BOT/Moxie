const Eris = require("eris");
const Client = require("../../Client");

module.exports = class CommandContext {
    /**
     *
     * @param {Client} client
     * @param {Eris.Message} msg
     * @param {string[]} args
     */
    constructor(client, msg, args) {
        this.client = client;

        /**
         * @type {Eris.Guild}
         */
        this.guild = msg.channel.guild;
        this.author = msg.author;
        this.author.tag = `${msg.author.username}#${msg.author.discriminator}`
        this.channel = msg.channel;
        this.attachments = msg.attachments;
        this.args = args;
        this.member = msg.member;
        this.messageID = msg.id;
        this.message = msg;
    }
    async reply(content, file) {
        if (typeof content !== "object") content = { content };
        const msg = await this.channel.getMessage(this.messageID).catch(() => { });
        if (msg) {
            content.messageReferenceID = msg.id;
            content.allowedMentions = { repliedUser: true }
        }

        return this.channel.createMessage(content, file)
    }
};
