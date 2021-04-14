const Eris = require("eris");
const Loaders = require("./registry");
const CommandRegistry = require("./registry/CommandRegistry");

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
        this.CommandRegistry = new CommandRegistry(this);

        for (const Loader of Object.values(Loaders)) new Loader(this);
    }
}