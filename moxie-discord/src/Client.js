const Eris = require("eris");
const { commandTools, databaseTools, ListenerLoader } = require("./registry");

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

        this.commandTools = new commandTools(this);
        this.databaseTools = new databaseTools(this);
        this.vanilla = new Map();
        new ListenerLoader(this)
    }
}