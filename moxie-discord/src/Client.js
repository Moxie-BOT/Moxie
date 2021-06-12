const Eris = require("eris");
const Loaders = require("./registry");

module.exports = class Client extends Eris.Client {
    /**
     *
     * @param {string} token
     * @param {Eris.ClientOptions} options
     */
    constructor(token, options = {}) {
        super(token, options);

        this.reactionCollectors = [];
        this.messageCollectors = [];
        this.commands = new Map();
        this.database = null;
        this.guildCache = new (require("./managers/GuildCacheManager"))(this);
        this.commandTools = new (require("./registry/CommandRegistry"))(this);

        for (const Loader of Object.values(Loaders)) new Loader(this);
    }
}