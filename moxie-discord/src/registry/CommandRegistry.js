const { readdirSync } = require("fs");
const Client = require("../Client");
const CommandHandler = require("../structures/command/CommandHandler");
const Logger = require("../utils/Logger");

module.exports = class CommandRegistry {
    /**
     *
     * @param {Client} client Eris client
     */
    constructor(client) {
        this.client = client;

        this.load();
    }

    load() {
        Logger.info("Initializing commands");
        let categorys = readdirSync("moxie-discord/src/commands");
        for (let category of categorys) {
            let commands = readdirSync("moxie-discord/src/commands/" + category);
            for (let command of commands) {
                /**
                 * @type {CommandHandler}
                 */
                let cmd = new (require("../commands/" +
                    category +
                    "/" +
                    command))(this.client);
                cmd.dir = category + "/" + command;
                this.client.commands.set(cmd.labels[0], cmd);
            }
        }
    }
    /**
     *
     * @param {String} name
     * @returns {Boolean}
     */
    reloadCommand(name) {
        if (name === "all") {
            this.client.commands = new Map();
            this.load();
            return true;
        } else {
            let command = this.getCommand(name);
            if (!command) return false

            let dir = command.dir;
            this.client.commands.delete(command.name);
            delete require.cache[require.resolve("../commands/" + dir)];
            const cm = require(`../commands/${dir}`);

            let command2 = new cm(this.client);
            command2.dir = dir;
            this.client.commands.set(command2.labels[0], command2);

            return true;
        }
    }
    /**
     *
     * @param {String} label
     * @returns
     */
    getCommand(label) {
        let final;
        this.client.commands.forEach((a) => {
            if (a.labels.includes(label)) final = a;
        });
        return final;
    }
    /**
     *
     * @param {String} categoryName
     * @returns {Array}
     */
    getCommandsFromCategory(categoryName) {
        let a = []
        this.client.commands.forEach(o => {
            if (o.category === categoryName) {
                a.push(o);
            }
        })
        return a;
    }
    async getAllCategories() {
        const a = []
        await this.client.commands.forEach(o => a.push(o.category))
        return a.filter((v, i) => a.indexOf(v) === i);
    }
};
