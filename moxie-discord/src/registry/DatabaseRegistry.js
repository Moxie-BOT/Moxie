const Logger = require("../utils/Logger");
const { PrismaClient } = require('@prisma/client');

module.exports = class DatabaseRegistry {
    constructor(client) {
        this.client = client;
        try {
            this.client.database = new PrismaClient();
            Logger.info("Connected with PostgreSQL")
        } catch (error) {
            Logger.error("Database returned an " + error.stack)
        }
    }
};