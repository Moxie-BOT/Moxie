const chalk = require("chalk");

module.exports = class Logger {
    static get processType() {
        return chalk.bgBlue("LOG")
    }

    static generateLog(logType, message) {
        console.log(
            `[${chalk.yellow(new Date().getHours() + ":" + new Date().getMinutes())}] ${
                this.processType
            } ${logType} ${message}`
        );
    }

    static debug(message) {
        this.generateLog(chalk.rgb(80, 250, 159)("[DEBUG]"), message);
    }

    static info(message) {
        this.generateLog(chalk.blue("[INFO]"), message);
    }

    static warning(message) {
        this.generateLog(chalk.yellow("[WARNING]"), message);
    }

    static error(message) {
        this.generateLog(chalk.red("[ERROR]"), message);
    }

    static shardMessage(message) {
        this.generateLog(chalk.rgb(49, 204, 201)("[SHARD MANAGER]"), message);
    }

    static fatalError(message) {
        this.generateLog(chalk.bgRed("[FATAL ERROR]"), message);
        process.exit();
    }
};
